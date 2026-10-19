import React from 'react';
import { ArrowRight, Calendar, ChevronDown, Clock, MapPin, Play, Search, SlidersHorizontal, Wallet } from 'lucide-react';
import { TourCategory } from '../data/toursData';
import { DestinationId, PriceId, StyleId, TripSearch } from '../lib/search';

interface HeroProps {
  currentLang: 'vi' | 'en';
  search: TripSearch;
  onChange: (next: TripSearch) => void;
  onSearch: () => void;
  onExplore: () => void;
  onWatchStory: () => void;
}

const t = (lang: 'vi' | 'en', vi: string, en: string) => (lang === 'vi' ? vi : en);

export const Hero: React.FC<HeroProps> = ({ currentLang, search, onChange, onSearch, onExplore, onWatchStory }) => {
  const set = (patch: Partial<TripSearch>) => onChange({ ...search, ...patch });

  return (
    <section id="home" className="relative bg-canvas">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-4">
              {t(currentLang, 'Trải nghiệm chân thật tại Hà Nội', 'Authentic experiences in Hanoi')}
            </p>
            <h1 className="font-serif text-[42px] sm:text-6xl lg:text-[64px] leading-[1.05] text-stone-900 font-semibold">
              {t(currentLang, 'Khám phá Hà Nội', 'Discover Hanoi')}
              <br />
              {t(currentLang, 'qua ', 'Through ')}
              <span className="italic text-brand font-medium">{t(currentLang, 'ánh nhìn địa phương.', 'Local Eyes.')}</span>
            </h1>
            <p className="mt-5 text-stone-500 text-base sm:text-[17px] leading-relaxed max-w-xl">
              {t(
                currentLang,
                'Những tour được chọn lọc, cuộc gặp ý nghĩa và câu chuyện thật — để bạn chạm vào Hà Nội vượt khỏi trang sách hướng dẫn.',
                'Curated tours, meaningful encounters, and real stories that let you experience the true spirit of Hanoi — beyond the guidebooks.'
              )}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={onExplore}
                className="inline-flex items-center gap-2 pl-5 pr-4 py-3 text-sm font-semibold text-white bg-brand hover:bg-brand-dark rounded-full shadow-sm"
              >
                {t(currentLang, 'Khám phá tour', 'Explore Tours')}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onWatchStory}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-stone-800 bg-white border border-stone-200 hover:border-stone-300 rounded-full"
              >
                <span className="w-6 h-6 rounded-full bg-brand-soft text-brand flex items-center justify-center">
                  <Play className="w-3 h-3 fill-current" />
                </span>
                {t(currentLang, 'Xem câu chuyện', 'Watch Our Story')}
              </button>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-2">
                {['SL', 'MT', 'ER', 'BN'].map((initials, i) => (
                  <span
                    key={initials}
                    className="w-9 h-9 rounded-full border-2 border-canvas text-[10px] font-bold text-white flex items-center justify-center"
                    style={{ background: ['#c4376b', '#7c4a3a', '#3f6f62', '#c4893a'][i] }}
                  >
                    {initials}
                  </span>
                ))}
              </div>
              <div>
                <div className="text-sm font-semibold text-stone-800">
                  {t(currentLang, 'Được hơn 10.000 du khách tin chọn', 'Trusted by 10,000+ travelers')}
                </div>
                <div className="text-amber-400 text-sm tracking-tight" aria-label="5 stars">★★★★★</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-[28px] overflow-hidden aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] shadow-[0_20px_50px_rgba(80,40,40,0.18)]">
              <img
                src="/images/hero_hanoi_twilight_1791949155360.jpg"
                alt={t(currentLang, 'Phố cổ Hà Nội về đêm với đèn lồng', 'Hanoi Old Quarter at night with lanterns')}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
              <p className="absolute left-6 bottom-16 sm:bottom-20 font-script text-white text-5xl sm:text-6xl drop-shadow-md leading-none">
                {t(currentLang, 'Hơn một chuyến đi', 'More Than a Trip')}
              </p>
              <div className="absolute right-4 bottom-4 inline-flex items-center gap-2 bg-white/95 text-stone-800 text-xs font-medium px-3 py-1.5 rounded-full shadow">
                <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                {t(currentLang, 'Phố cổ Hà Nội', 'Hanoi Old Quarter')}
              </div>
            </div>
          </div>
        </div>

        <form
          className="relative z-10 mt-8 lg:-mt-2 bg-white rounded-[28px] shadow-[0_18px_50px_rgba(70,30,40,0.12)] border border-white p-2 lg:p-2.5 flex flex-col lg:flex-row lg:items-stretch gap-1"
          onSubmit={(e) => {
            e.preventDefault();
            onSearch();
          }}
        >
          <Field icon={<MapPin className="w-4 h-4" />} label={t(currentLang, 'Điểm đến', 'Destination')}>
            <select
              className="field-select w-full text-sm font-medium text-stone-800 outline-none"
              value={search.destination}
              onChange={(e) => set({ destination: e.target.value as DestinationId })}
            >
              <option value="all">{t(currentLang, 'Hà Nội (mọi khu vực)', 'Hanoi (All areas)')}</option>
              <option value="old-quarter">{t(currentLang, 'Phố cổ', 'Old Quarter')}</option>
              <option value="long-bien">{t(currentLang, 'Cầu Long Biên', 'Long Bien Bridge')}</option>
              <option value="citadel">{t(currentLang, 'Hoàng thành & Văn Miếu', 'Citadel & Temple')}</option>
              <option value="west-lake">{t(currentLang, 'Hồ Tây', 'West Lake')}</option>
              <option value="countryside">{t(currentLang, 'Đường Lâm & Ba Vì', 'Countryside escapes')}</option>
            </select>
          </Field>

          <Field icon={<Calendar className="w-4 h-4" />} label={t(currentLang, 'Ngày đi', 'Date')} hideChevron>
            <input
              type="date"
              className="w-full text-sm font-medium text-stone-800 outline-none bg-transparent"
              value={search.date}
              onChange={(e) => set({ date: e.target.value })}
            />
          </Field>

          <Field icon={<Clock className="w-4 h-4" />} label={t(currentLang, 'Thời lượng', 'Duration')}>
            <select
              className="field-select w-full text-sm font-medium text-stone-800 outline-none"
              value={search.duration}
              onChange={(e) => set({ duration: e.target.value as TourCategory | 'all' })}
            >
              <option value="all">{t(currentLang, 'Mọi thời lượng', 'Any duration')}</option>
              <option value="night">{t(currentLang, 'Tour buổi tối', 'Night tours')}</option>
              <option value="express">{t(currentLang, '2–3 giờ', '2–3 hours')}</option>
              <option value="halfday">{t(currentLang, 'Nửa ngày', 'Half day')}</option>
              <option value="fullday">{t(currentLang, 'Trọn ngày', 'Full day')}</option>
              <option value="weekend">{t(currentLang, 'Cuối tuần', 'Weekend')}</option>
            </select>
          </Field>

          <Field icon={<SlidersHorizontal className="w-4 h-4" />} label={t(currentLang, 'Phong cách', 'Travel style')}>
            <select
              className="field-select w-full text-sm font-medium text-stone-800 outline-none"
              value={search.style}
              onChange={(e) => set({ style: e.target.value as StyleId })}
            >
              <option value="all">{t(currentLang, 'Mọi phong cách', 'Any style')}</option>
              <option value="food">{t(currentLang, 'Ẩm thực', 'Food')}</option>
              <option value="heritage">{t(currentLang, 'Di sản', 'Heritage')}</option>
              <option value="night">{t(currentLang, 'Về đêm', 'Night')}</option>
              <option value="nature">{t(currentLang, 'Thiên nhiên', 'Nature')}</option>
              <option value="coffee">{t(currentLang, 'Cà phê & đi chậm', 'Coffee & slow')}</option>
            </select>
          </Field>

          <Field icon={<Wallet className="w-4 h-4" />} label={t(currentLang, 'Mức giá', 'Price range')} last>
            <select
              className="field-select w-full text-sm font-medium text-stone-800 outline-none"
              value={search.price}
              onChange={(e) => set({ price: e.target.value as PriceId })}
            >
              <option value="all">{t(currentLang, 'Mọi mức giá', 'Any price')}</option>
              <option value="under500">{t(currentLang, 'Dưới 500.000₫', 'Under 500,000₫')}</option>
              <option value="mid">{t(currentLang, '500.000₫ – 1 triệu', '500,000₫ – 1M')}</option>
              <option value="over1m">{t(currentLang, 'Trên 1 triệu', 'Over 1,000,000₫')}</option>
            </select>
          </Field>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold rounded-full px-6 py-3.5 lg:my-1 lg:mr-1 whitespace-nowrap"
          >
            <Search className="w-4 h-4" />
            {t(currentLang, 'Tìm tour', 'Search Tours')}
          </button>
        </form>
      </div>
    </section>
  );
};

function Field({
  icon,
  label,
  children,
  last,
  hideChevron,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  last?: boolean;
  hideChevron?: boolean;
}) {
  return (
    <label className={`flex items-center gap-3 px-3 py-2 min-w-0 flex-1 ${last ? '' : 'lg:border-r lg:border-stone-100'}`}>
      <span className="text-brand shrink-0">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-semibold tracking-wide uppercase text-stone-400">{label}</span>
        <span className="flex items-center gap-1">
          <span className="min-w-0 flex-1">{children}</span>
          {!hideChevron && <ChevronDown className="w-3.5 h-3.5 text-stone-300 shrink-0 pointer-events-none" />}
        </span>
      </span>
    </label>
  );
}
