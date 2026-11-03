export type BookingStatus = 'new' | 'called' | 'done' | 'cancelled';

export interface StoredBooking {
  bookingCode: string;
  tourId: string;
  tourName: string;
  date: string;
  adults: number;
  children: number;
  pickup: 'hotel' | 'meeting';
  photo: boolean;
  voucher?: string;
  fullName: string;
  phone: string;
  email: string;
  hotel: string;
  notes: string;
  total: number;
  deposit: number;
  balance: number;
  createdAt: string;
  status: BookingStatus;
}

const KEY = 'hana-admin-key';

export function savedAdminKey() {
  try {
    return sessionStorage.getItem(KEY) || '';
  } catch {
    return '';
  }
}

export function rememberAdminKey(password: string) {
  sessionStorage.setItem(KEY, password);
}

export function forgetAdminKey() {
  sessionStorage.removeItem(KEY);
}

async function readError(response: Response) {
  try {
    const body = await response.json();
    if (body && typeof body.error === 'string') return body.error;
  } catch {
    /* ignore */
  }
  return 'Không kết nối được trang quản lý.';
}

export async function syncSavedBookings(tourNameById: Record<string, string>) {
  try {
    const previous = JSON.parse(localStorage.getItem('hana-bookings') || '[]');
    if (!Array.isArray(previous)) return;
    const kept = [];
    for (const item of previous) {
      if (!item || typeof item !== 'object') continue;
      const tourId = String(item.tourId || '');
      try {
        await submitBooking({
          bookingCode: String(item.bookingCode || ''),
          tourId,
          tourName: String(item.tourName || tourNameById[tourId] || 'Tour'),
          date: String(item.date || ''),
          adults: Number(item.adults) || 1,
          children: Number(item.children) || 0,
          pickup: item.pickup === 'hotel' ? 'hotel' : 'meeting',
          photo: Boolean(item.photo),
          voucher: String(item.voucher || ''),
          fullName: String(item.fullName || ''),
          phone: String(item.phone || ''),
          email: String(item.email || ''),
          hotel: String(item.hotel || ''),
          notes: String(item.notes || ''),
          total: Number(item.total) || 0,
          deposit: Number(item.deposit) || 0,
          balance: Number(item.balance) || 0,
          createdAt: String(item.createdAt || new Date().toISOString()),
          status: 'new',
        });
        kept.push(item);
      } catch (err) {
        const message = err instanceof Error ? err.message : '';
        const retired = message.includes('đã được xóa') || message.includes('đã có') || message.includes('vừa được dùng');
        if (!retired) kept.push(item);
      }
    }
    localStorage.setItem('hana-bookings', JSON.stringify(kept));
  } catch {
    /* this browser has no saved bookings */
  }
}

export async function submitBooking(record: StoredBooking) {
  const response = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record),
  });
  if (!response.ok) throw new Error(await readError(response));
}

export interface Subscriber {
  email: string;
  createdAt: string;
}

export async function subscribeEmail(email: string) {
  const response = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kind: 'subscribe', email }),
  });
  if (!response.ok) throw new Error(await readError(response));
}

export async function loadBookings(password: string) {
  const response = await fetch('/api/bookings', {
    headers: { Authorization: `Bearer ${password}` },
  });
  if (!response.ok) throw new Error(await readError(response));
  const body = await response.json();
  return {
    items: (Array.isArray(body.items) ? body.items : []) as StoredBooking[],
    subscribers: (Array.isArray(body.subscribers) ? body.subscribers : []) as Subscriber[],
  };
}

export async function updateBookingStatus(password: string, bookingCode: string, status: BookingStatus) {
  const response = await fetch('/api/bookings', {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${password}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bookingCode, status }),
  });
  if (!response.ok) throw new Error(await readError(response));
}

export async function deleteBooking(password: string, bookingCode: string) {
  const response = await fetch('/api/bookings', {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${password}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bookingCode }),
  });
  if (!response.ok) throw new Error(await readError(response));
}
