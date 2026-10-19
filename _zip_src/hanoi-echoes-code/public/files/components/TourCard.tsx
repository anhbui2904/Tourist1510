import React, { useState } from 'react';
import { Clock, Star, Users, ArrowUpRight, Heart, Check, Calendar } from 'lucide-react';
import { Tour } from '../data/toursData';

interface TourCardProps {
  tour: Tour;
  currentLang: 'vi' | 'en';
  isSaved: boolean;
  onToggleSave: (tourId: string) => void;
  onSelectTour: (tour: Tour) => void;
  onQuickBook: (tour: Tour) => void;
}

export const TourCard: React.FC<TourCardProps> = ({
  tour,
  currentLang,
  isSaved,
  onToggleSave,
  onSelectTour,
  onQuickBook,
}) => {
  const [imgError, setImgError] = useState(false);

  // Format currency
  const formatVnd = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
  };

  return (
    <article className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden hover:shadow-lg hover:border-amber-700/30 transition-all flex flex-col justify-between">
      {/* Top Media Slot */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        {!imgError ? (
          <img
            src={tour.image}
            alt={tour.imageAlt}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 p-6 text-center">
            <span className="font-serif text-lg font-bold text-stone-700">{tour.title}</span>
            <span className="text-xs text-stone-500 mt-1">{tour.categoryLabel}</span>
          </div>
        )}

        {/* Subtle category & duration overlay label (unboxed clean tag on scrim) */}
        <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-amber-300 text-xs font-medium px-2.5 py-1 rounded-md">
          {currentLang === 'vi' ? tour.categoryLabel : tour.categoryLabelEn}
        </div>

        {/* Favorite Wishlist button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(tour.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            isSaved
              ? 'bg-rose-500 text-white'
              : 'bg-stone-900/60 text-white hover:bg-stone-900 hover:text-rose-400'
          }`}
          aria-label="Save tour to favorites"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Price & Rating Bottom Scrim */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-stone-950/80 via-stone-950/40 to-transparent flex items-end justify-between text-white">
          <div className="flex items-center gap-1.5 text-xs font-medium text-amber-300">
            <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            <span className="font-mono tabular-nums">{tour.rating}</span>
            <span className="text-stone-300 font-normal">({tour.reviewsCount})</span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-stone-300 block">{currentLang === 'vi' ? 'Giá từ' : 'From'}</span>
            <span className="text-base font-bold font-mono tabular-nums text-white">
              {formatVnd(tour.priceVnd)}
            </span>
          </div>
        </div>
      </div>

      {/* Content Slot */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata clean unboxed row */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2 font-medium">
            <span className="flex items-center gap-1 text-stone-700">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              {currentLang === 'vi' ? tour.duration : tour.durationEn}
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{currentLang === 'vi' ? tour.groupSize : tour.groupSizeEn}</span>
          </div>

          {/* Tour Title */}
          <h3
            onClick={() => onSelectTour(tour)}
            className="text-lg font-serif font-bold text-stone-900 group-hover:text-amber-800 transition-colors cursor-pointer line-clamp-2 leading-snug mb-2"
          >
            {currentLang === 'vi' ? tour.title : tour.titleEn}
          </h3>

          {/* Tagline / short description */}
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
            {currentLang === 'vi' ? tour.tagline : tour.taglineEn}
          </p>

          {/* 2 Key Highlights bulletless */}
          <div className="space-y-1.5 mb-5 border-t border-stone-100 pt-3">
            {(currentLang === 'vi' ? tour.highlights : tour.highlightsEn).slice(0, 2).map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                <Check className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
          <button
            onClick={() => onSelectTour(tour)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200/90 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <span>{currentLang === 'vi' ? 'Xem Lịch Trình' : 'View Itinerary'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onQuickBook(tour)}
            className="inline-flex items-center justify-center gap-1 px-4 py-2 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{currentLang === 'vi' ? 'Đặt Ngay' : 'Book'}</span>
          </button>
        </div>
      </div>
    </article>
  );
};
