import React, { useState } from 'react';
import { MapPin, Clock, ArrowUpRight, Compass, Sparkles } from 'lucide-react';
import { HANOI_HIGHLIGHTS, TOURS_DATA, Tour } from '../data/toursData';

interface HanoiMapGuideProps {
  currentLang: 'vi' | 'en';
  onSelectTourById: (tourId: string) => void;
}

export const HanoiMapGuide: React.FC<HanoiMapGuideProps> = ({
  currentLang,
  onSelectTourById,
}) => {
  const [activeSpotId, setActiveSpotId] = useState<string>(HANOI_HIGHLIGHTS[0].id);

  const activeSpot = HANOI_HIGHLIGHTS.find((s) => s.id === activeSpotId) || HANOI_HIGHLIGHTS[0];
  const relatedTour = TOURS_DATA.find((t) => t.id === activeSpot.recommendTourId);

  return (
    <section id="map-guide" className="py-20 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-wider text-amber-800 font-semibold mb-2">
            {currentLang === 'vi' ? 'Bản đồ trải nghiệm văn hóa' : 'Hanoi Cultural Map & Landmarks'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight mb-4">
            {currentLang === 'vi' ? 'Những Tọa Độ Không Thể Bỏ Lỡ' : 'Unmissable Iconic Landmarks'}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {currentLang === 'vi'
              ? 'Mỗi góc phố Hà Nội đều cất giấu một câu chuyện lịch sử. Khám phá các điểm đến trứ danh cùng thời điểm đẹp nhất trong ngày và hành trình khám phá tương ứng.'
              : 'Every corner of Hanoi holds a layered history. Explore iconic coordinates with insider timing and the corresponding tour journeys.'}
          </p>
        </div>

        {/* Spot Selectors Tabs (Interactive Buttons with Active states) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {HANOI_HIGHLIGHTS.map((spot) => {
            const isActive = spot.id === activeSpotId;
            return (
              <button
                key={spot.id}
                onClick={() => setActiveSpotId(spot.id)}
                className={`px-4 py-2.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-2 border ${
                  isActive
                    ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-stone-400'}`} />
                <span>{currentLang === 'vi' ? spot.name.split('&')[0] : spot.nameEn.split('&')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Spot Detail Showcase */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 lg:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-xs text-amber-800 font-medium">
              <span>{currentLang === 'vi' ? activeSpot.category : activeSpot.categoryEn}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-stone-500">{activeSpot.coordinates}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              {currentLang === 'vi' ? activeSpot.name : activeSpot.nameEn}
            </h3>

            <p className="text-stone-600 text-sm leading-relaxed">
              {currentLang === 'vi' ? activeSpot.description : activeSpot.descriptionEn}
            </p>

            <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-4 flex items-start gap-3">
              <Clock className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-amber-900 block">
                  {currentLang === 'vi' ? 'Thời điểm ghé thăm đẹp nhất:' : 'Optimal Visiting Time:'}
                </span>
                <span className="text-xs text-stone-700">
                  {currentLang === 'vi' ? activeSpot.bestTime : activeSpot.bestTimeEn}
                </span>
              </div>
            </div>

            {relatedTour && (
              <div className="pt-2">
                <span className="text-xs text-stone-500 block mb-2 font-medium">
                  {currentLang === 'vi' ? 'Hành trình trải nghiệm trọn vẹn điểm này:' : 'Curated Tour Covering This Landmark:'}
                </span>
                <button
                  onClick={() => onSelectTourById(relatedTour.id)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-amber-900 hover:text-amber-700 bg-amber-100/70 hover:bg-amber-200/60 px-4 py-2.5 rounded-lg transition-colors group"
                >
                  <span>{currentLang === 'vi' ? relatedTour.title : relatedTour.titleEn}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 relative">
            {relatedTour && (
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-stone-200 shadow-inner group">
                <img
                  src={relatedTour.image}
                  alt={relatedTour.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white text-xs">
                  <div className="font-semibold text-amber-300">
                    {currentLang === 'vi' ? relatedTour.categoryLabel : relatedTour.categoryLabelEn}
                  </div>
                  <div className="text-stone-200 font-light text-[11px] mt-0.5">
                    {currentLang === 'vi' ? relatedTour.duration : relatedTour.durationEn} · {relatedTour.departureTime}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
