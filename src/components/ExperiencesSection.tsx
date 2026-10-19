import React from 'react';
import { Gem, Landmark, Moon, Sun, UtensilsCrossed, ArrowRight } from 'lucide-react';
import { TourCategory } from '../data/toursData';
import { StyleId } from '../lib/search';
import { SectionLabel } from './SectionLabel';

interface ExperiencesSectionProps {
  currentLang: 'vi' | 'en';
  onPick: (category: TourCategory, style: StyleId) => void;
  onViewAll: () => void;
}

const ITEMS: {
  category: TourCategory;
  style: StyleId;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  titleVi: string;
  titleEn: string;
  subVi: string;
  subEn: string;
}[] = [
  {
    category: 'night',
    style: 'food',
    image: '/images/hanoi_night_streetfood_1791949154924.jpg',
    icon: UtensilsCrossed,
    titleVi: 'Tour ẩm thực',
    titleEn: 'Food Tours',
    subVi: 'Hương vị phố cổ',
    subEn: 'Savor authentic flavors',
  },
  {
    category: 'halfday',
    style: 'heritage',
    image: '/images/hanoi_heritage_temple_1791949156492.jpg',
    icon: Landmark,
    titleVi: 'Dạo di sản',
    titleEn: 'Heritage Walks',
    subVi: 'Văn hóa còn sống',
    subEn: 'Discover living culture',
  },
  {
    category: 'fullday',
    style: 'heritage',
    image: '/images/hanoi_weekend_getaway_1791949156933.jpg',
    icon: Sun,
    titleVi: 'Tour trong ngày',
    titleEn: 'Day Trips',
    subVi: 'Ra khỏi trung tâm',
    subEn: 'Beyond the city',
  },
  {
    category: 'night',
    style: 'night',
    image: '/images/hero_hanoi_twilight_1791949155360.jpg',
    icon: Moon,
    titleVi: 'Trải nghiệm đêm',
    titleEn: 'Night Experiences',
    subVi: 'Một Hà Nội khác',
    subEn: 'See a different side',
  },
  {
    category: 'weekend',
    style: 'nature',
    image: '/images/hanoi_egg_coffee_culture_1791949155871.jpg',
    icon: Gem,
    titleVi: 'Kỳ nghỉ riêng',
    titleEn: 'Luxury Escapes',
    subVi: 'Nhỏ, chậm, riêng tư',
    subEn: 'Private & unhurried',
  },
];

export const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({ currentLang, onPick, onViewAll }) => {
  return (
    <section id="experiences" className="bg-canvas py-16 sm:py-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <SectionLabel>{currentLang === 'vi' ? 'Khám phá theo trải nghiệm' : 'Explore by experience'}</SectionLabel>
            <h2 className="mt-2 font-serif text-4xl sm:text-5xl text-stone-900">
              {currentLang === 'vi' ? 'Những cách gặp Hà Nội' : 'Ways to Experience Hanoi'}
            </h2>
          </div>
          <button onClick={onViewAll} className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-brand-dark whitespace-nowrap">
            {currentLang === 'vi' ? 'Xem mọi trải nghiệm' : 'View all experiences'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 lg:grid lg:grid-cols-5 lg:overflow-visible">
          {ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.titleEn}
                onClick={() => onPick(item.category, item.style)}
                className="relative min-w-[210px] lg:min-w-0 text-left rounded-[22px] overflow-hidden aspect-[3/4] group shadow-sm"
              >
                <img src={item.image} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/10" />
                <div className="absolute left-4 top-4 w-10 h-10 rounded-xl bg-white/90 text-brand flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="absolute left-4 right-4 bottom-4 text-white">
                  <div className="font-serif text-xl font-semibold">{currentLang === 'vi' ? item.titleVi : item.titleEn}</div>
                  <div className="text-sm text-white/80 mt-0.5">{currentLang === 'vi' ? item.subVi : item.subEn}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
