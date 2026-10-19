import { Tour } from '../data/toursData';

export const DEPOSIT_RATE = 0.3;
export const CHILD_RATE = 0.7;
export const HOTEL_PICKUP_FEE = 100000;
export const PHOTO_ADDON_FEE = 350000;

export type PickupOption = 'hotel' | 'meeting';
export type VerifyChannel = 'email' | 'phone';

export interface BookingQuote {
  adultPrice: number;
  childPrice: number;
  addOnCost: number;
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  total: number;
  deposit: number;
  balance: number;
}

export function voucherPercent(code: string): number | null {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return 0;
  if (normalized === 'HANOI2026') return 10;
  if (normalized === 'WELCOME') return 5;
  return null;
}

export function quoteBooking(
  tour: Tour,
  adults: number,
  children: number,
  pickup: PickupOption,
  photo: boolean,
  discountPercent: number,
): BookingQuote {
  const adultPrice = tour.priceVnd;
  const childPrice = Math.round(tour.priceVnd * CHILD_RATE);
  const addOnCost = (photo ? PHOTO_ADDON_FEE : 0) + (pickup === 'hotel' ? HOTEL_PICKUP_FEE : 0);
  const subtotal = adults * adultPrice + children * childPrice + addOnCost;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal - discountAmount);
  const deposit = Math.round((total * DEPOSIT_RATE) / 1000) * 1000;
  return {
    adultPrice,
    childPrice,
    addOnCost,
    subtotal,
    discountPercent,
    discountAmount,
    total,
    deposit,
    balance: total - deposit,
  };
}

export function hanoiToday(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? '';
  return `${value('year')}-${value('month')}-${value('day')}`;
}

export function tomorrowIso(now = new Date()) {
  const [year, month, day] = hanoiToday(now).split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day + 1)).toISOString().slice(0, 10);
}

export function isWeekendDate(iso: string) {
  const date = new Date(`${iso}T00:00:00`);
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function makeBookingCode() {
  return `HE-${Math.floor(100000 + Math.random() * 900000)}`;
}

export function makeOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function maskEmail(email: string) {
  const [name, host] = email.split('@');
  if (!host) return email;
  const visible = name.slice(0, 2);
  return `${visible}•••@${host}`;
}

export function maskPhone(phone: string) {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 6) return phone;
  return `${digits.slice(0, 3)} ••• ${digits.slice(-3)}`;
}
