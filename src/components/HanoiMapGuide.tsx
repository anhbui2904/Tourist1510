import React, { useState } from 'react';
import { ArrowUpRight, Clock, MapPin } from 'lucide-react';
import { HANOI_HIGHLIGHTS, TOURS_DATA } from '../data/toursData';
import { SectionLabel } from './SectionLabel';

interface HanoiMapGuideProps {
  currentLang: 'vi' | 'en';
  onSelectTourById: (tourId: string) => void;
}

export const HanoiMapGuide: React.FC<HanoiMapGuideProps> = ({ currentLang, onSelectTourById }) => {
  const [activeId, setActiveId] = useState(HANOI_HIGHLIGHTS[0].id);
  const spot = HANOI_HIGHLIGHTS.find((item) => item.id === activeId) || HANOI_HIGHLIGHTS[0];
  const tour = TOURS_DATA.find((item) => item.id === spot.recommendTourId);
  const vi = currentLang === 'vi';

  return (
    <section id="destinations" className="bg-canvas py-16 sm:py-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8">
          <SectionLabel>{vi ? 'Điểm đến' : 'Destinations'}</SectionLabel>
          <h2 className="mt-2 font-serif text-4xl sm:text-5xl text-stone-900">
            {vi ? 'Những nơi đáng nán lại' : 'Places worth slowing down for'}
          </h2>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4">
          {HANOI_HIGHLIGHTS.map((item) => {
            const active = item.id === spot.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm border ${active ? 'bg-brand text-white border-brand' : 'bg-white text-stone-700 border-stone-200'}`}
              >
                <MapPin className="w-3.5 h-3.5" />
                {(vi ? item.name : item.nameEn).split('&')[0].trim()}
              </button>
            );
          })}
        </div>

        <div className="mt-2 bg-white rounded-[24px] overflow-hidden border border-stone-100 grid lg:grid-cols-2">
          <div className="p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-wide uppercase text-brand">
              {vi ? spot.category : spot.categoryEn}
              <span className="text-stone-300 mx-2">·</span>
              <span className="text-stone-400 font-medium normal-case tracking-normal">{spot.coordinates}</span>
            </p>
            <h3 className="mt-3 font-serif text-3xl text-stone-900">{vi ? spot.name : spot.nameEn}</h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">{vi ? spot.description : spot.descriptionEn}</p>
            <div className="mt-5 flex gap-3 rounded-2xl bg-brand-soft px-4 py-3 text-sm text-stone-700">
              <Clock className="w-4 h-4 text-brand shrink-0 mt-0.5" />
              <span>
                <span className="font-semibold text-brand-dark block">{vi ? 'Giờ đẹp nhất' : 'Best time to go'}</span>
                {vi ? spot.bestTime : spot.bestTimeEn}
              </span>
            </div>
            {tour && (
              <button
                onClick={() => onSelectTourById(tour.id)}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dark"
              >
                {vi ? tour.title : tour.titleEn}
                <ArrowUpRight className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="relative min-h-[260px]">
            {tour && (
              <>
                <img src={tour.image} alt={tour.imageAlt} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white text-sm">
                  {vi ? tour.duration : tour.durationEn}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
