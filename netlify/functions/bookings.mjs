import { getStore } from '@netlify/blobs';

const STATUSES = new Set(['new', 'called', 'done', 'cancelled']);
const PREFIX = 'booking/';

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

function clip(value, max) {
  return String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
}

function store() {
  return getStore('hana-bookings');
}

function bookingKey(code) {
  return `${PREFIX}${code}`;
}

function deletedKey(code) {
  return `deleted/${code}`;
}

function authorized(request) {
  const expected = process.env.ADMIN_PASSWORD || '';
  if (!expected) return false;
  const header = request.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (token.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < token.length; i += 1) diff |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}

const TOURS = {
  'hanoi-night-food-street': { price: 680000, weekend: false, name: 'Hà Nội Đêm & Hương Vị Ẩm Thực Phố Cổ' },
  'hanoi-night-long-bien-bridge': { price: 550000, weekend: false, name: 'Cầu Long Biên Hoàng Hôn & Ký Ức Đêm Sông Hồng' },
  'hanoi-express-egg-coffee-workshop': { price: 450000, weekend: false, name: 'Tinh Hoa Cà Phê Trứng & Ngõ Nhỏ Phố Cổ' },
  'hanoi-express-cyclo-heritage': { price: 420000, weekend: false, name: 'Thảnh Thơi Xích Lô 36 Phố Phường' },
  'hanoi-halfday-heritage-temple-hoangthanh': { price: 790000, weekend: false, name: 'Dấu Ấn Hoàng Thành & Văn Miếu Quốc Tử Giám' },
  'hanoi-halfday-west-lake-zen': { price: 720000, weekend: false, name: 'Hồ Tây Lộng Gió, Chùa Trấn Quốc & Trà Sen Quý' },
  'hanoi-fullday-signature-thousand-years': { price: 1350000, weekend: false, name: 'Hà Nội Trọn Vẹn: Di Sản 1000 Năm Văn Hiến' },
  'hanoi-weekend-duong-lam-ancient-village': { price: 1150000, weekend: true, name: 'Cuối Tuần Bình Yên: Làng Cổ Đường Lâm & Đất Hai Vua' },
  'hanoi-weekend-ba-vi-mountain-fresh': { price: 1250000, weekend: true, name: 'Cuối Tuần Xanh: Vườn Quốc Gia Ba Vì & Rừng Thông Mây' },
};

function hanoiToday(now) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const value = (type) => parts.find((part) => part.type === type).value;
  return `${value('year')}-${value('month')}-${value('day')}`;
}

function dayAfter(iso) {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day + 1)).toISOString().slice(0, 10);
}

function realDate(iso) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function wholeNumber(value, min, max) {
  const number = typeof value === 'number' ? value : Number(value);
  if (!Number.isInteger(number) || number < min || number > max) return null;
  return number;
}

function quoteTour(tour, adults, children, pickup, photo, percent) {
  const childPrice = Math.round(tour.price * 0.7);
  const addOn = (photo ? 350000 : 0) + (pickup === 'hotel' ? 100000 : 0);
  const subtotal = adults * tour.price + children * childPrice + addOn;
  const total = Math.max(0, subtotal - Math.round((subtotal * percent) / 100));
  const deposit = Math.round((total * 0.3) / 1000) * 1000;
  return { total, deposit, balance: total - deposit };
}

export function assessBooking(input, now = new Date()) {
  if (!input || typeof input !== 'object') return null;
  const bookingCode = clip(input.bookingCode, 16).toUpperCase();
  const phoneDigits = String(input.phone ?? '').replace(/\D/g, '');
  const email = clip(input.email, 120);
  const date = clip(input.date, 10);
  const adults = wholeNumber(input.adults, 1, 30);
  const children = wholeNumber(input.children, 0, 30);
  const tour = TOURS[clip(input.tourId, 80)];
  const pickup = input.pickup === 'hotel' ? 'hotel' : input.pickup === 'meeting' ? 'meeting' : '';
  const hotel = clip(input.hotel, 120);
  if (!/^HE-\d{6}$/.test(bookingCode)) return null;
  if (clip(input.fullName, 80).length < 2) return null;
  if (phoneDigits.length < 8 || phoneDigits.length > 15) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  if (!realDate(date) || date < dayAfter(hanoiToday(now))) return null;
  if (!tour || adults === null || children === null || !pickup) return null;
  if (tour.weekend && ![0, 6].includes(new Date(`${date}T00:00:00Z`).getUTCDay())) return null;
  if (pickup === 'hotel' && hotel.length < 2) return null;
  const photo = input.photo === true;
  const quotes = [0, 5, 10].map((percent) => quoteTour(tour, adults, children, pickup, photo, percent));
  const matched = quotes.find((item) => item.total === Number(input.total) && item.deposit === Number(input.deposit) && item.balance === Number(input.balance));
  if (!matched) return null;
  return {
    bookingCode,
    tourId: clip(input.tourId, 80),
    tourName: tour.name,
    date,
    adults,
    children,
    pickup,
    photo,
    fullName: clip(input.fullName, 80),
    phone: clip(phoneDigits, 20),
    email,
    hotel,
    notes: clip(input.notes, 400),
    total: matched.total,
    deposit: matched.deposit,
    balance: matched.balance,
    createdAt: clip(input.createdAt, 40) || now.toISOString(),
    status: 'new',
  };
}

function sameBooking(existing, record) {
  const fields = ['tourId', 'tourName', 'date', 'adults', 'children', 'pickup', 'photo', 'fullName', 'phone', 'email', 'hotel', 'notes', 'total', 'deposit', 'balance'];
  return fields.every((field) => existing[field] === record[field]);
}

async function migrateLegacy(blobs) {
  const legacy = await blobs.get('items', { type: 'json' });
  if (!Array.isArray(legacy)) return;
  for (const item of legacy) {
    if (!item || typeof item.bookingCode !== 'string') continue;
    const key = bookingKey(item.bookingCode.toUpperCase());
    const existing = await blobs.get(key, { type: 'json' });
    if (!existing) await blobs.setJSON(key, item);
  }
  await blobs.delete('items');
}

async function readSubscribers(blobs) {
  const listed = await blobs.list({ prefix: 'subscriber/' });
  const items = [];
  for (const blob of listed.blobs || []) {
    const item = await blobs.get(blob.key, { type: 'json' });
    if (item && item.email) items.push(item);
  }
  items.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  return items;
}

function removedBooking(item) {
  return Boolean(item && (item.status === 'deleted' || item.deletedAt));
}

async function readJSON(blobs, key) {
  try {
    return await blobs.get(key, { type: 'json', consistency: 'strong' });
  } catch (error) {
    if (error?.name !== 'BlobsConsistencyError') throw error;
    return blobs.get(key, { type: 'json' });
  }
}

async function readRecord(blobs, key) {
  try {
    return await blobs.getWithMetadata(key, { type: 'json', consistency: 'strong' });
  } catch (error) {
    if (error?.name !== 'BlobsConsistencyError') throw error;
    const data = await blobs.get(key, { type: 'json' });
    return data ? { data, etag: undefined, metadata: {} } : null;
  }
}

async function readItems(blobs) {
  await migrateLegacy(blobs);
  const [listed, removed] = await Promise.all([
    blobs.list({ prefix: PREFIX }),
    blobs.list({ prefix: 'deleted/' }),
  ]);
  const removedCodes = new Set((removed.blobs || []).map((blob) => blob.key.slice('deleted/'.length).toUpperCase()));
  const items = [];
  for (const blob of listed.blobs || []) {
    const item = await blobs.get(blob.key, { type: 'json' });
    const code = item?.bookingCode ? String(item.bookingCode).toUpperCase() : '';
    if (item && code && !removedBooking(item) && !removedCodes.has(code)) items.push(item);
  }
  return items;
}

async function handle(request) {
  const blobs = store();

  if (request.method === 'POST') {
    let input;
    try {
      input = await request.json();
    } catch {
      return json(400, { error: 'Đơn không hợp lệ.' });
    }
    if (input && input.kind === 'subscribe') {
      const email = clip(input.email, 120).toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(400, { error: 'Email chưa đúng.' });
      const key = `subscriber/${encodeURIComponent(email)}`;
      const existing = await blobs.get(key, { type: 'json' });
      if (!existing) await blobs.setJSON(key, { email, createdAt: new Date().toISOString() });
      return json(200, { ok: true });
    }
    const record = assessBooking(input);
    if (!record) return json(400, { error: 'Đơn không hợp lệ.' });
    const key = bookingKey(record.bookingCode);
    const removed = await readJSON(blobs, deletedKey(record.bookingCode));
    if (removed) return json(409, { error: 'Đơn này đã được xóa. Không tạo lại.' });
    const existing = await readJSON(blobs, key);
    if (removedBooking(existing)) return json(409, { error: 'Đơn này đã được xóa. Không tạo lại.' });
    if (existing) {
      if (!sameBooking(existing, record)) return json(409, { error: 'Mã đặt chỗ này đã có. Không ghi đè đơn cũ.' });
      return json(200, { ok: true });
    }
    const write = await blobs.setJSON(key, record, { onlyIfNew: true });
    if (!write.modified) {
      const winner = await readJSON(blobs, key);
      if (removedBooking(winner)) return json(409, { error: 'Đơn này đã được xóa. Không tạo lại.' });
      if (winner && sameBooking(winner, record)) return json(200, { ok: true });
      return json(409, { error: 'Mã đặt chỗ này vừa được dùng. Hãy đặt lại để lấy mã mới.' });
    }
    return json(200, { ok: true });
  }

  if (!process.env.ADMIN_PASSWORD) return json(503, { error: 'Chưa cấu hình mật khẩu quản lý.' });
  if (!authorized(request)) return json(401, { error: 'Mật khẩu chưa đúng.' });

  if (request.method === 'GET') {
    const items = await readItems(blobs);
    items.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    const subscribers = await readSubscribers(blobs);
    return json(200, { items, subscribers });
  }

  let input = {};
  try {
    input = await request.json();
  } catch {
    return json(400, { error: 'Không đọc được yêu cầu.' });
  }
  const bookingCode = clip(input.bookingCode, 16).toUpperCase();
  const key = bookingKey(bookingCode);

  if (request.method === 'PATCH') {
    if (!STATUSES.has(input.status)) return json(400, { error: 'Trạng thái không hợp lệ.' });
    if (await readJSON(blobs, deletedKey(bookingCode))) return json(409, { error: 'Đơn này đã được xóa. Không cập nhật.' });
    const current = await readRecord(blobs, key);
    if (!current?.data || removedBooking(current.data)) return json(404, { error: 'Không thấy đơn này.' });
    if (await readJSON(blobs, deletedKey(bookingCode))) return json(409, { error: 'Đơn này đã được xóa. Không cập nhật.' });
    if (!current.etag) return json(409, { error: 'Đơn vừa thay đổi. Hãy tải lại.' });
    const write = await blobs.setJSON(key, { ...current.data, status: input.status }, { onlyIfMatch: current.etag });
    if (!write.modified) {
      const winner = await readJSON(blobs, key);
      const gone = await readJSON(blobs, deletedKey(bookingCode));
      if (!winner || removedBooking(winner) || gone) return json(409, { error: 'Đơn này đã được xóa. Không cập nhật.' });
      return json(409, { error: 'Đơn vừa thay đổi. Hãy tải lại.' });
    }
    return json(200, { ok: true });
  }

  if (request.method === 'DELETE') {
    if (!/^HE-\d{6}$/.test(bookingCode)) return json(400, { error: 'Mã không hợp lệ.' });
    const deletedAt = new Date().toISOString();
    await blobs.setJSON(deletedKey(bookingCode), { bookingCode, deletedAt });
    await blobs.setJSON(key, { bookingCode, status: 'deleted', deletedAt });
    return json(200, { ok: true });
  }

  return json(405, { error: 'Không hỗ trợ.' });
}

export default async (request) => {
  try {
    return await handle(request);
  } catch (error) {
    console.error(error);
    return json(500, { error: 'Không lưu được đơn. Thử lại sau giây lát.' });
  }
};
