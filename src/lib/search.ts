import { Tour, TourCategory } from '../data/toursData';
import { isWeekendDate } from './booking';

export type DestinationId = 'all' | 'old-quarter' | 'long-bien' | 'citadel' | 'west-lake' | 'countryside';
export type StyleId = 'all' | 'food' | 'heritage' | 'night' | 'nature' | 'coffee';
export type PriceId = 'all' | 'under500' | 'mid' | 'over1m';

export interface TripSearch {
  destination: DestinationId;
  date: string;
  duration: TourCategory | 'all';
  style: StyleId;
  price: PriceId;
}

const DESTINATION_TOURS: Record<Exclude<DestinationId, 'all'>, string[]> = {
  'old-quarter': [
    'hanoi-night-food-street',
    'hanoi-express-egg-coffee-workshop',
    'hanoi-express-cyclo-heritage',
  ],
  'long-bien': ['hanoi-night-long-bien-bridge', 'hanoi-night-food-street'],
  citadel: [
    'hanoi-halfday-heritage-temple-hoangthanh',
    'hanoi-fullday-signature-thousand-years',
  ],
  'west-lake': ['hanoi-halfday-west-lake-zen'],
  countryside: [
    'hanoi-weekend-duong-lam-ancient-village',
    'hanoi-weekend-ba-vi-mountain-fresh',
  ],
};

const STYLE_TOURS: Record<Exclude<StyleId, 'all'>, string[]> = {
  food: [
    'hanoi-night-food-street',
    'hanoi-express-egg-coffee-workshop',
    'hanoi-fullday-signature-thousand-years',
  ],
  heritage: [
    'hanoi-halfday-heritage-temple-hoangthanh',
    'hanoi-fullday-signature-thousand-years',
    'hanoi-express-cyclo-heritage',
    'hanoi-weekend-duong-lam-ancient-village',
  ],
  night: ['hanoi-night-food-street', 'hanoi-night-long-bien-bridge'],
  nature: [
    'hanoi-weekend-duong-lam-ancient-village',
    'hanoi-weekend-ba-vi-mountain-fresh',
    'hanoi-halfday-west-lake-zen',
  ],
  coffee: ['hanoi-express-egg-coffee-workshop', 'hanoi-express-cyclo-heritage'],
};

export const FEATURED_IDS = [
  'hanoi-night-food-street',
  'hanoi-night-long-bien-bridge',
  'hanoi-halfday-heritage-temple-hoangthanh',
  'hanoi-weekend-duong-lam-ancient-village',
];

export function tourMatchesSearch(tour: Tour, search: TripSearch, query: string) {
  if (search.duration !== 'all' && tour.category !== search.duration) return false;
  if (search.destination !== 'all' && !DESTINATION_TOURS[search.destination].includes(tour.id)) return false;
  if (search.style !== 'all' && !STYLE_TOURS[search.style].includes(tour.id)) return false;
  if (search.price === 'under500' && tour.priceVnd >= 500000) return false;
  if (search.price === 'mid' && (tour.priceVnd < 500000 || tour.priceVnd > 1000000)) return false;
  if (search.price === 'over1m' && tour.priceVnd <= 1000000) return false;
  if (search.date && tour.category === 'weekend' && !isWeekendDate(search.date)) return false;

  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [
    tour.title,
    tour.titleEn,
    tour.tagline,
    tour.taglineEn,
    tour.summary,
    tour.summaryEn,
    ...tour.highlights,
    ...tour.highlightsEn,
  ]
    .join(' ')
    .toLowerCase();
  return haystack.includes(q);
}

export function formatVnd(amount: number) {
  return new Intl.NumberFormat('vi-VN').format(amount) + '₫';
}

export function compactGroup(text: string, lang: 'vi' | 'en') {
  const range = text.match(/(\d+)\s*[-–]\s*(\d+)/);
  if (range) {
    return lang === 'vi' ? `${range[1]}–${range[2]} khách` : `Up to ${range[2]}`;
  }
  const n = text.match(/(\d+)/);
  if (n) return lang === 'vi' ? `Tối đa ${n[1]}` : `Up to ${n[1]}`;
  return text;
}

export const CARD_BADGE: Record<string, { vi: string; en: string }> = {
  'hanoi-night-food-street': { vi: 'Bán chạy', en: 'Bestseller' },
  'hanoi-night-long-bien-bridge': { vi: 'Được yêu thích', en: 'Most Popular' },
  'hanoi-express-egg-coffee-workshop': { vi: 'Hạng #1', en: 'Top Rated' },
  'hanoi-express-cyclo-heritage': { vi: 'Biểu tượng', en: 'Iconic' },
  'hanoi-halfday-heritage-temple-hoangthanh': { vi: 'Văn hóa', en: 'Cultural' },
  'hanoi-halfday-west-lake-zen': { vi: 'An yên', en: 'Zen' },
  'hanoi-fullday-signature-thousand-years': { vi: 'Trọn gói', en: 'Signature' },
  'hanoi-weekend-duong-lam-ancient-village': { vi: 'Trong ngày', en: 'Day Trip' },
  'hanoi-weekend-ba-vi-mountain-fresh': { vi: 'Thiên nhiên', en: 'Nature' },
};
