import React, { useMemo, useState } from 'react';
import { ArrowRight, Check, Clock, RotateCcw } from 'lucide-react';
import { TOURS_DATA, Tour, TourCategory } from '../data/toursData';
import { formatVnd } from '../lib/search';
import { SectionLabel } from './SectionLabel';

interface CustomTripFinderProps {
  currentLang: 'vi' | 'en';
  onSelectTour: (tour: Tour) => void;
  onQuickBook: (tour: Tour) => void;
}

type Interest = 'food' | 'history' | 'coffee' | 'nature';
type Traveler = 'solo' | 'couple' | 'family' | 'friends';

function hasWord(blob: string, words: string[]) {
  return words.some((word) => blob.includes(` ${word} `) || blob.startsWith(`${word} `) || blob.endsWith(` ${word}`) || blob === word);
}

function scoreTour(tour: Tour, interest: Interest, traveler: Traveler) {
  const blob = ` ${tour.titleEn} ${tour.taglineEn} ${tour.suitedForEn} ${tour.highlightsEn.join(' ')} ${tour.summaryEn} `.toLowerCase();
  let score = tour.rating;
  if (interest === 'food' && hasWord(blob, ['food', 'street', 'culinary', 'gastronomy'])) score += 4;
  if (interest === 'history' && hasWord(blob, ['heritage', 'temple', 'citadel', 'imperial', 'scholar', 'history'])) score += 4;
  if (interest === 'coffee' && hasWord(blob, ['coffee', 'cyclo', 'alley'])) score += 4;
  if (interest === 'nature' && hasWord(blob, ['lake', 'village', 'mountain', 'pine', 'lotus', 'forest', 'sunset'])) score += 4;
  if (traveler === 'family' && hasWord(blob, ['family', 'families', 'seniors', 'toddlers'])) score += 2;
  if (traveler === 'couple' && hasWord(blob, ['couples', 'couple', 'romantic'])) score += 2;
  if (traveler === 'solo' && hasWord(blob, ['transit', 'layover'])) score += 2;
  if (traveler === 'friends' && hasWord(blob, ['group', 'friends'])) score += 2;
  return score;
}

export const CustomTripFinder: React.FC<CustomTripFinderProps> = ({ currentLang, onSelectTour, onQuickBook }) => {
  const [duration, setDuration] = useState<TourCategory>('night');
  const [interest, setInterest] = useState<Interest>('food');
  const [traveler, setTraveler] = useState<Traveler>('couple');
  const vi = currentLang === 'vi';

  const matchedTour = useMemo(() => {
    const pool = TOURS_DATA.filter((tour) => tour.category === duration);
    return [...pool].sort((a, b) => scoreTour(b, interest, traveler) - scoreTour(a, interest, traveler))[0] || TOURS_DATA[0];
  }, [duration, interest, traveler]);

  const durations: { id: TourCategory; vi: string; en: string }[] = [
    { id: 'night', vi: 'Buổi tối', en: 'Evening' },
    { id: 'express', vi: '2–3 giờ', en: '2–3 hours' },
    { id: 'halfday', vi: 'Nửa ngày', en: 'Half day' },
    { id: 'fullday', vi: 'Trọn ngày', en: 'Full day' },
    { id: 'weekend', vi: 'Cuối tuần', en: 'Weekend' },
  ];
  const interests: { id: Interest; vi: string; en: string }[] = [
    { id: 'food', vi: 'Ẩm thực', en: 'Street food' },
    { id: 'history', vi: 'Di sản', en: 'Heritage' },
    { id: 'coffee', vi: 'Cà phê', en: 'Coffee' },
    { id: 'nature', vi: 'Thiên nhiên', en: 'Nature' },
  ];
  const travelers: { id: Traveler; vi: string; en: string }[] = [
    { id: 'couple', vi: 'Cặp đôi', en: 'Couple' },
    { id: 'solo', vi: 'Một mình', en: 'Solo' },
    { id: 'family', vi: 'Gia đình', en: 'Family' },
    { id: 'friends', vi: 'Nhóm bạn', en: 'Friends' },
  ];

  return (
    <section id="trip-finder" className="bg-white py-16 sm:py-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <SectionLabel>{vi ? 'Gợi ý theo quỹ giờ' : 'Match a tour to your time'}</SectionLabel>
          <h2 className="mt-2 font-serif text-4xl sm:text-5xl text-stone-900">
            {vi ? 'Bạn có bao lâu ở Hà Nội?' : 'How much time do you have?'}
          </h2>
          <p className="mt-3 text-stone-500">
            {vi
              ? 'Chọn thời lượng, sở thích và người đi cùng. Chúng tôi ghép tour phù hợp nhất trong bộ sưu tập.'
              : 'Choose your hours, interest, and who is traveling. We pair you with the closest tour in the collection.'}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 bg-canvas rounded-[24px] p-6 sm:p-8 border border-stone-100">
            <fieldset>
              <legend className="text-xs font-semibold tracking-wide uppercase text-stone-500 mb-3">{vi ? '1. Thời gian' : '1. Time window'}</legend>
              <div className="grid sm:grid-cols-2 gap-2">
                {durations.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setDuration(opt.id)}
                    className={`text-left px-4 py-3 rounded-2xl border text-sm font-medium ${duration === opt.id ? 'bg-white border-brand text-brand shadow-sm' : 'bg-white/60 border-transparent text-stone-700 hover:bg-white'}`}
                  >
                    {vi ? opt.vi : opt.en}
                  </button>
                ))}
              </div>
            </fieldset>

            <ChoiceRow label={vi ? '2. Sở thích' : '2. Interest'} options={interests} value={interest} onChange={setInterest} vi={vi} />
            <ChoiceRow label={vi ? '3. Đi cùng ai' : '3. Traveling with'} options={travelers} value={traveler} onChange={setTraveler} vi={vi} />

            <button
              type="button"
              onClick={() => {
                setDuration('night');
                setInterest('food');
                setTraveler('couple');
              }}
              className="mt-6 inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {vi ? 'Đặt lại' : 'Reset'}
            </button>
          </div>

          <div className="lg:col-span-5 bg-stone-900 text-white rounded-[24px] overflow-hidden flex flex-col">
            <div className="relative h-44">
              <img src={matchedTour.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent" />
            </div>
            <div className="p-6 flex flex-col flex-1 -mt-8 relative">
              <p className="text-[11px] tracking-[0.16em] uppercase text-rose-200">{vi ? 'Tour hợp với bạn' : 'Recommended for you'}</p>
              <h3 className="mt-2 font-serif text-2xl leading-snug">{vi ? matchedTour.title : matchedTour.titleEn}</h3>
              <p className="mt-2 text-sm text-stone-300 line-clamp-3">{vi ? matchedTour.summary : matchedTour.summaryEn}</p>
              <div className="mt-4 space-y-2 text-sm text-stone-200">
                <p className="flex gap-2"><Check className="w-4 h-4 text-rose-300 shrink-0" /><span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{vi ? matchedTour.duration : matchedTour.durationEn}</span></p>
                <p className="flex gap-2"><Check className="w-4 h-4 text-rose-300 shrink-0" /><span>{vi ? matchedTour.suitedFor : matchedTour.suitedForEn}</span></p>
              </div>
              <div className="mt-auto pt-5 flex items-center justify-between gap-3">
                <span className="font-semibold">{formatVnd(matchedTour.priceVnd)}</span>
                <div className="flex gap-2">
                  <button onClick={() => onSelectTour(matchedTour)} className="px-4 py-2 rounded-full bg-brand text-white text-sm font-semibold inline-flex items-center gap-1">
                    {vi ? 'Chi tiết' : 'Details'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => onQuickBook(matchedTour)} className="px-4 py-2 rounded-full border border-white/20 text-sm">
                    {vi ? 'Đặt' : 'Book'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function ChoiceRow<T extends string>({
  label,
  options,
  value,
  onChange,
  vi,
}: {
  label: string;
  options: { id: T; vi: string; en: string }[];
  value: T;
  onChange: (id: T) => void;
  vi: boolean;
}) {
  return (
    <div className="mt-6">
      <div className="text-xs font-semibold tracking-wide uppercase text-stone-500 mb-3">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`px-3.5 py-2 rounded-full text-sm ${value === opt.id ? 'bg-brand text-white' : 'bg-white text-stone-700'}`}
          >
            {vi ? opt.vi : opt.en}
          </button>
        ))}
      </div>
    </div>
  );
}
