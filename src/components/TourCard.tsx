import React, { useState } from 'react';
import { Clock, Heart, Star, Users } from 'lucide-react';
import { Tour } from '../data/toursData';
import { CARD_BADGE, compactGroup, formatVnd } from '../lib/search';

interface TourCardProps {
  tour: Tour;
  currentLang: 'vi' | 'en';
  isSaved: boolean;
  onToggleSave: (tourId: string) => void;
  onSelectTour: (tour: Tour) => void;
}

export const TourCard: React.FC<TourCardProps> = ({ tour, currentLang, isSaved, onToggleSave, onSelectTour }) => {
  const [imgError, setImgError] = useState(false);
  const badge = CARD_BADGE[tour.id];
  const title = currentLang === 'vi' ? tour.title : tour.titleEn;
  const blurb = currentLang === 'vi' ? tour.tagline : tour.taglineEn;

  return (
    <article className="group bg-white rounded-[22px] border border-stone-200/70 shadow-[0_8px_30px_rgba(60,30,30,0.04)] hover:shadow-[0_16px_40px_rgba(60,30,30,0.1)] transition-shadow flex flex-col overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        {!imgError ? (
          <img
            src={tour.image}
            alt={tour.imageAlt}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-6 text-center font-serif text-stone-500">{title}</div>
        )}
        <span className="absolute top-3.5 left-3.5 bg-white/95 text-brand text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
          {badge ? (currentLang === 'vi' ? badge.vi : badge.en) : currentLang === 'vi' ? tour.categoryLabel : tour.categoryLabelEn}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(tour.id);
          }}
          className={`absolute top-3.5 right-3.5 w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-colors ${
            isSaved ? 'bg-brand text-white' : 'bg-white/95 text-stone-500 hover:text-brand'
          }`}
          aria-label={currentLang === 'vi' ? 'Lưu tour' : 'Save tour'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <h3
          onClick={() => onSelectTour(tour)}
          className="font-serif text-[19px] leading-snug font-semibold text-stone-900 cursor-pointer hover:text-brand line-clamp-2"
        >
          {title}
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed text-stone-500 line-clamp-2">{blurb}</p>

        <div className="mt-4 flex items-center gap-3 text-[12px] text-stone-500">
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {currentLang === 'vi' ? tour.duration : tour.durationEn}
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {compactGroup(currentLang === 'vi' ? tour.groupSize : tour.groupSizeEn, currentLang)}
          </span>
          <span className="ml-auto inline-flex items-center gap-1 text-stone-700 font-medium">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {tour.rating.toFixed(1)}
            <span className="text-stone-400 font-normal">({tour.reviewsCount})</span>
          </span>
        </div>

        <div className="mt-4 pt-4 border-t border-stone-100 flex items-end justify-between gap-3">
          <div>
            <div className="text-[11px] uppercase tracking-wide text-stone-400">{currentLang === 'vi' ? 'Từ' : 'From'}</div>
            <div className="text-[15px] font-semibold text-stone-900">
              {formatVnd(tour.priceVnd)}
              <span className="text-stone-400 font-normal text-xs"> {currentLang === 'vi' ? '/ khách' : '/ person'}</span>
            </div>
          </div>
          <button
            onClick={() => onSelectTour(tour)}
            className="shrink-0 px-4 py-2 text-sm font-semibold text-white bg-brand hover:bg-brand-dark rounded-full"
          >
            {currentLang === 'vi' ? 'Xem chi tiết' : 'View Details'}
          </button>
        </div>
      </div>
    </article>
  );
};
