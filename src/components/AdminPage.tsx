import React, { useEffect, useMemo, useState } from 'react';
import { BookingStatus, StoredBooking, Subscriber, deleteBooking, forgetAdminKey, loadBookings, rememberAdminKey, savedAdminKey, updateBookingStatus } from '../lib/adminApi';
import { formatVnd } from '../lib/search';

const FILTERS: { id: 'all' | BookingStatus; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'new', label: 'Mới' },
  { id: 'called', label: 'Đã gọi' },
  { id: 'done', label: 'Xong' },
  { id: 'cancelled', label: 'Hủy' },
];

const STATUS_ACTIONS = FILTERS.filter((entry): entry is { id: BookingStatus; label: string } => entry.id !== 'all');

const STATUS_LABEL: Record<BookingStatus, string> = {
  new: 'Mới',
  called: 'Đã gọi',
  done: 'Xong',
  cancelled: 'Hủy',
};

function formatDay(iso: string) {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('vi-VN');
}

function phoneText(phone: unknown) {
  if (typeof phone === 'string') return phone.trim();
  if (typeof phone === 'number' && Number.isFinite(phone)) return String(phone);
  return '';
}

function formatWhen(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' });
}

export const AdminPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [key, setKey] = useState(savedAdminKey);
  const [items, setItems] = useState<StoredBooking[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]['id']>('all');
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [busyCode, setBusyCode] = useState('');

  const refresh = async (passwordValue: string) => {
    setLoading(true);
    setError('');
    try {
      const desk = await loadBookings(passwordValue);
      setItems(desk.items);
      setSubscribers(desk.subscribers);
      setLoaded(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không tải được danh sách.');
      if (err instanceof Error && err.message.includes('Mật khẩu')) {
        forgetAdminKey();
        setKey('');
        setLoaded(false);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (key) void refresh(key);
  }, [key]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) => {
      if (filter !== 'all' && item.status !== filter) return false;
      if (!needle) return true;
      return [item.fullName, item.phone, item.bookingCode, item.tourName, item.email]
        .map((part) => (part == null ? '' : String(part)))
        .join(' ')
        .toLowerCase()
        .includes(needle);
    });
  }, [items, filter, query]);

  const signIn = async (event: React.FormEvent) => {
    event.preventDefault();
    const next = password.trim();
    if (!next) return;
    setLoading(true);
    setError('');
    try {
      const desk = await loadBookings(next);
      rememberAdminKey(next);
      setKey(next);
      setItems(desk.items);
      setSubscribers(desk.subscribers);
      setLoaded(true);
      setQuery('');
      setFilter('all');
      setPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không đăng nhập được.');
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (bookingCode: string, status: BookingStatus) => {
    setBusyCode(bookingCode);
    setError('');
    try {
      await updateBookingStatus(key, bookingCode, status);
      setItems((current) => current.map((item) => (item.bookingCode === bookingCode ? { ...item, status } : item)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không cập nhật được.');
      try {
        const desk = await loadBookings(key);
        setItems(desk.items);
        setSubscribers(desk.subscribers);
      } catch {
        /* keep the update error on screen */
      }
    } finally {
      setBusyCode('');
    }
  };

  const remove = async (bookingCode: string) => {
    if (!window.confirm('Xóa đơn này khỏi danh sách?')) return;
    setBusyCode(bookingCode);
    setError('');
    try {
      await deleteBooking(key, bookingCode);
      setItems((current) => current.filter((item) => item.bookingCode !== bookingCode));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không xóa được.');
    } finally {
      setBusyCode('');
    }
  };

  if (!key) {
    return (
      <div className="min-h-screen bg-canvas text-ink flex items-center justify-center px-4">
        <form onSubmit={signIn} className="w-full max-w-sm bg-white rounded-3xl border border-stone-100 p-6 shadow-sm">
          <p className="text-xs tracking-[0.16em] uppercase text-brand">Hana Echoes</p>
          <h1 className="font-serif text-3xl mt-2">Đơn đặt tour</h1>
          <p className="text-sm text-stone-500 mt-2">Nhập mật khẩu để xem những người đã đặt.</p>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-5 w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-brand"
            placeholder="Mật khẩu"
            autoFocus
          />
          {error && <p className="mt-3 text-sm text-brand">{error}</p>}
          <button type="submit" disabled={loading} className="mt-4 w-full rounded-full bg-brand text-white py-3 text-sm font-semibold disabled:opacity-60">
            {loading ? 'Đang mở…' : 'Vào trang quản lý'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <header className="bg-white border-b border-stone-100">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs tracking-[0.16em] uppercase text-brand">Hana Echoes</p>
            <h1 className="font-serif text-2xl">Đơn đặt tour</h1>
          </div>
          <button
            type="button"
            onClick={() => {
              forgetAdminKey();
              setKey('');
              setItems([]);
              setSubscribers([]);
              setLoaded(false);
              setError('');
              setQuery('');
              setFilter('all');
            }}
            className="text-sm text-stone-500"
          >
            Đăng xuất
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-5 space-y-4">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`px-3 py-1.5 rounded-full text-sm ${filter === item.id ? 'bg-brand text-white' : 'bg-white text-stone-600 border border-stone-200'}`}
            >
              {item.label}
              {loaded ? (item.id === 'all' ? ` ${items.length}` : ` ${items.filter((booking) => booking.status === item.id).length}`) : ''}
            </button>
          ))}
        </div>

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Tìm tên, số điện thoại, mã đơn"
          className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand"
        />

        {error && (
          <div className="bg-white rounded-3xl border border-brand/20 p-4">
            <p className="text-sm text-brand">{error}</p>
            <button type="button" onClick={() => refresh(key)} className="mt-3 rounded-full bg-brand text-white px-4 py-2 text-sm font-semibold">
              Thử lại
            </button>
          </div>
        )}
        {loading && <p className="text-sm text-stone-500">Đang tải…</p>}

        {!loading && loaded && !error && visible.length === 0 && (
          <p className="bg-white rounded-3xl border border-stone-100 p-6 text-sm text-stone-500">
            {items.length === 0 ? 'Chưa có đơn nào.' : 'Không có đơn trong mục này.'}
          </p>
        )}

        <ul className="space-y-3">
          {visible.map((item) => (
            <li key={item.bookingCode} className="bg-white rounded-3xl border border-stone-100 p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-stone-900">{item.fullName}</p>
                  {phoneText(item.phone) ? (
                    <a className="text-brand font-semibold text-sm" href={`tel:${phoneText(item.phone).replace(/\s/g, '')}`}>
                      {phoneText(item.phone)}
                    </a>
                  ) : (
                    <p className="text-sm text-stone-400">Chưa có số điện thoại</p>
                  )}
                </div>
                <span className="text-xs font-semibold uppercase tracking-wide text-brand bg-brand-soft px-2 py-1 rounded-full">
                  {STATUS_LABEL[item.status] || 'Mới'}
                </span>
              </div>
              <p className="mt-3 text-sm text-stone-800">{item.tourName}</p>
              <p className="mt-1 text-sm text-stone-500">
                {formatDay(item.date)} · {item.adults} lớn{item.children > 0 ? ` · ${item.children} trẻ` : ''}
                {item.pickup === 'hotel' && item.hotel ? ` · Đón tại ${item.hotel}` : ''}
              </p>
              <p className="mt-1 text-sm text-stone-500">
                Cọc {formatVnd(item.deposit || 0)} · Tổng {formatVnd(item.total || 0)}
              </p>
              {item.notes && <p className="mt-2 text-sm text-stone-600">{item.notes}</p>}
              <p className="mt-2 text-xs text-stone-400">
                {item.bookingCode} · {item.email} · {formatWhen(item.createdAt)}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {STATUS_ACTIONS.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    disabled={busyCode === item.bookingCode || item.status === entry.id}
                    onClick={() => changeStatus(item.bookingCode, entry.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                      item.status === entry.id ? 'border-brand text-brand' : 'border-stone-200 text-stone-600'
                    } disabled:opacity-50`}
                  >
                    {entry.label}
                  </button>
                ))}
                <button
                  type="button"
                  disabled={busyCode === item.bookingCode}
                  onClick={() => remove(item.bookingCode)}
                  className="px-3 py-1.5 rounded-full text-xs text-stone-400"
                >
                  Xóa
                </button>
              </div>
            </li>
          ))}
        </ul>

        <section className="bg-white rounded-3xl border border-stone-100 p-4 sm:p-5">
          <h2 className="font-serif text-xl">Email đăng ký</h2>
          {!loaded ? (
            <p className="mt-2 text-sm text-stone-500">{error ? 'Chưa tải được email đăng ký.' : 'Đang tải…'}</p>
          ) : subscribers.length === 0 ? (
            <p className="mt-2 text-sm text-stone-500">Chưa có email.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {subscribers.map((item) => (
                <li key={item.email} className="text-sm text-stone-700 flex justify-between gap-3">
                  <span>{item.email}</span>
                  <span className="text-stone-400">{formatWhen(item.createdAt)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};
