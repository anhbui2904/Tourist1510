import React, { useState } from 'react';
import { Compass, Sparkles, Clock, Check, ArrowRight, RotateCcw } from 'lucide-react';
import { Tour, TOURS_DATA, TourCategory } from '../data/toursData';

interface CustomTripFinderProps {
  currentLang: 'vi' | 'en';
  onSelectTour: (tour: Tour) => void;
  onQuickBook: (tour: Tour) => void;
}

export const CustomTripFinder: React.FC<CustomTripFinderProps> = ({
  currentLang,
  onSelectTour,
  onQuickBook,
}) => {
  const [selectedDuration, setSelectedDuration] = useState<TourCategory>('night');
  const [selectedInterest, setSelectedInterest] = useState<'food' | 'history' | 'coffee' | 'nature'>('food');
  const [selectedTraveler, setSelectedTraveler] = useState<'solo' | 'couple' | 'family' | 'friends'>('couple');

  // Logic to find best match
  const matchedTours = TOURS_DATA.filter((t) => t.category === selectedDuration);
  // Pick the most relevant one
  const matchedTour = matchedTours[0] || TOURS_DATA[0];

  const durationOptions = [
    {
      id: 'night' as TourCategory,
      labelVi: 'Buổi Tối (18:00+)',
      labelEn: 'Evening / Night',
      descVi: 'Khám phá ẩm thực & cầu đêm',
      descEn: 'Street food & bridge lights',
    },
    {
      id: 'express' as TourCategory,
      labelVi: 'Ngắn 2 - 3 Giờ',
      labelEn: '2 - 3 Hours',
      descVi: 'Cà phê trứng & xích lô phố cổ',
      descEn: 'Egg coffee & cyclo ride',
    },
    {
      id: 'halfday' as TourCategory,
      labelVi: 'Nửa Ngày (4 - 5h)',
      labelEn: 'Half Day (4 - 5h)',
      descVi: 'Hoàng Thành, Văn Miếu, Hồ Tây',
      descEn: 'Citadel, Temple, West Lake',
    },
    {
      id: 'fullday' as TourCategory,
      labelVi: 'Trọn 1 Ngày (8h)',
      labelEn: 'Full Day (8h)',
      descVi: 'Di sản trọn vẹn & Múa rối VIP',
      descEn: 'Complete sights & puppet show',
    },
    {
      id: 'weekend' as TourCategory,
      labelVi: 'Cuối Tuần (Thứ 7 & CN)',
      labelEn: 'Weekend Getaway',
      descVi: 'Làng cổ Đường Lâm & Rừng Ba Vì',
      descEn: 'Ancient village & pine forests',
    },
  ];

  const interestOptions = [
    { id: 'food', labelVi: 'Ẩm thực & Đồ uống', labelEn: 'Street Food & Drinks' },
    { id: 'history', labelVi: 'Di sản & Lịch sử ngàn năm', labelEn: 'Ancient Heritage' },
    { id: 'coffee', labelVi: 'Cà phê & Đi dạo hoài niệm', labelEn: 'Coffee & Slow Walk' },
    { id: 'nature', labelVi: 'Thiên nhiên & Làng quê', labelEn: 'Nature & Rural Escape' },
  ];

  const travelerOptions = [
    { id: 'couple', labelVi: 'Cặp đôi lãng mạn', labelEn: 'Couples' },
    { id: 'solo', labelVi: 'Đi một mình khám phá', labelEn: 'Solo Traveler' },
    { id: 'family', labelVi: 'Gia đình nhiều thế hệ', labelEn: 'Family with Kids/Seniors' },
    { id: 'friends', labelVi: 'Nhóm bạn thân', labelEn: 'Group of Friends' },
  ];

  const formatVnd = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
  };

  return (
    <section id="trip-finder" className="py-20 bg-stone-100/70 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="text-xs uppercase tracking-wider text-amber-800 font-semibold mb-2">
            {currentLang === 'vi' ? 'Trợ lý gợi ý thông minh' : 'Smart Itinerary Matcher'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight mb-4">
            {currentLang === 'vi'
              ? 'Bạn Có Bao Nhiêu Thời Gian Ở Hà Nội?'
              : 'How Much Time Do You Have in Hanoi?'}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {currentLang === 'vi'
              ? 'Chỉ cần chọn quỹ thời gian và sở thích của bạn, hệ thống sẽ đề xuất ngay hành trình tinh tế và tối ưu nhất.'
              : 'Select your available hours and preferences. We will immediately pair you with the best matching cultural experience.'}
          </p>
        </div>

        {/* 2-Column Balanced Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Selector Quiz (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div className="space-y-6">
              {/* Question 1: Duration */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-3">
                  {currentLang === 'vi'
                    ? '1. Thời gian bạn có thể dành đi chơi:'
                    : '1. Your available time window:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {durationOptions.map((opt) => {
                    const isSelected = selectedDuration === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedDuration(opt.id)}
                        className={`text-left p-3 rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-amber-50/70 border-amber-600 ring-1 ring-amber-600'
                            : 'bg-stone-50 border-stone-200 hover:bg-stone-100/80 text-stone-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-semibold ${isSelected ? 'text-amber-900' : 'text-stone-900'}`}>
                            {currentLang === 'vi' ? opt.labelVi : opt.labelEn}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-amber-700" />}
                        </div>
                        <span className="text-[11px] text-stone-500 block mt-0.5">
                          {currentLang === 'vi' ? opt.descVi : opt.descEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 2: Interest */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-3">
                  {currentLang === 'vi' ? '2. Sở thích bạn ưu tiên nhất:' : '2. Your prime travel interest:'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((opt) => {
                    const isSelected = selectedInterest === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedInterest(opt.id as any)}
                        className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                          isSelected
                            ? 'bg-stone-900 text-white'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        {currentLang === 'vi' ? opt.labelVi : opt.labelEn}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 3: Group */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-3">
                  {currentLang === 'vi' ? '3. Bạn tham gia cùng ai?' : '3. Who is traveling with you?'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {travelerOptions.map((opt) => {
                    const isSelected = selectedTraveler === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedTraveler(opt.id as any)}
                        className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                          isSelected
                            ? 'bg-amber-800 text-white'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        {currentLang === 'vi' ? opt.labelVi : opt.labelEn}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                {currentLang === 'vi' ? 'Hành trình được tùy biến tự động' : 'Automatically customized schedule'}
              </span>
              <button
                onClick={() => {
                  setSelectedDuration('night');
                  setSelectedInterest('food');
                  setSelectedTraveler('couple');
                }}
                className="inline-flex items-center gap-1 text-stone-600 hover:text-stone-900"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{currentLang === 'vi' ? 'Đặt lại' : 'Reset'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Recommended Match Card (5 cols) */}
          <div className="lg:col-span-5 bg-stone-900 text-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-md relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-600/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              {/* Header result unboxed */}
              <div className="flex items-center justify-between text-xs text-amber-300 font-medium tracking-wide uppercase mb-3">
                <span>{currentLang === 'vi' ? 'Hành trình khuyên chọn' : 'Recommended For You'}</span>
                <span className="font-mono text-stone-300">
                  {currentLang === 'vi' ? matchedTour.categoryLabel : matchedTour.categoryLabelEn}
                </span>
              </div>

              {/* Matched Tour Image Preview */}
              <div className="relative aspect-video rounded-xl overflow-hidden mb-4 border border-stone-800">
                <img
                  src={matchedTour.image}
                  alt={matchedTour.imageAlt}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="font-mono text-amber-300 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {currentLang === 'vi' ? matchedTour.duration : matchedTour.durationEn}
                  </span>
                  <span className="font-mono tabular-nums text-white font-semibold">
                    {formatVnd(matchedTour.priceVnd)} / khách
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-serif font-bold text-white mb-2 leading-snug">
                {currentLang === 'vi' ? matchedTour.title : matchedTour.titleEn}
              </h3>

              <p className="text-xs text-stone-300 leading-relaxed mb-4 line-clamp-3">
                {currentLang === 'vi' ? matchedTour.summary : matchedTour.summaryEn}
              </p>

              {/* Reasons why it matches */}
              <div className="space-y-2 mb-6">
                <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold">
                  {currentLang === 'vi' ? 'Vì sao tour này phù hợp với bạn:' : 'Why this fits you:'}
                </div>
                <div className="text-xs text-stone-300 flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    {currentLang === 'vi'
                      ? `Đúng quỹ thời gian ${matchedTour.duration}, xuất phát ${matchedTour.departureTime.split('hàng')[0]}`
                      : `Exact match for ${matchedTour.durationEn}, departures ${matchedTour.departureTimeEn}`}
                  </span>
                </div>
                <div className="text-xs text-stone-300 flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    {currentLang === 'vi' ? matchedTour.suitedFor : matchedTour.suitedForEn}
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-stone-800 flex items-center gap-3">
              <button
                onClick={() => onSelectTour(matchedTour)}
                className="flex-1 inline-flex items-center justify-center gap-1 px-4 py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] rounded-lg transition-colors whitespace-nowrap"
              >
                <span>{currentLang === 'vi' ? 'Xem Chi Tiết Lịch Trình' : 'View Full Plan'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onQuickBook(matchedTour)}
                className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold text-white bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors border border-stone-700 whitespace-nowrap"
              >
                <span>{currentLang === 'vi' ? 'Đặt Ngay' : 'Book Now'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
