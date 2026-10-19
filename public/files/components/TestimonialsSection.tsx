import React from 'react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/toursData';

interface TestimonialsSectionProps {
  currentLang: 'vi' | 'en';
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ currentLang }) => {
  return (
    <section id="testimonials" className="py-20 bg-stone-900 text-stone-100 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-2">
            {currentLang === 'vi' ? 'Tiếng nói từ những người lữ hành' : 'Traveler Stories & Feedback'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight mb-4">
            {currentLang === 'vi'
              ? 'Hà Nội Trong Ký Ức Của Du Khách'
              : 'Hanoi in the Hearts of Our Travelers'}
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            {currentLang === 'vi'
              ? 'Hơn 2.400 du khách từ khắp nơi trên thế giới đã chọn đồng hành cùng chúng tôi để cảm nhận một Hà Nội nguyên bản, chân thành và đọng lại nhiều xúc cảm.'
              : 'Over 2,400 travelers from around the globe have trusted us to experience an authentic, tender, and culturally resonant Hanoi.'}
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="bg-stone-800/80 rounded-2xl border border-stone-700/80 p-6 flex flex-col justify-between hover:border-amber-400/50 transition-colors shadow-sm"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 mb-4 text-amber-300">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-300" />
                  ))}
                </div>

                {/* Comment quote */}
                <p className="text-stone-200 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  "{currentLang === 'vi' ? t.comment : t.commentEn}"
                </p>
              </div>

              {/* Author & Tour taken */}
              <div className="pt-4 border-t border-stone-700/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-stone-700 text-amber-300 flex items-center justify-center font-serif font-bold text-xs shrink-0">
                  {t.avatarText}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white truncate">{t.name}</div>
                  <div className="text-xs text-stone-400 truncate">
                    {t.origin} · <span className="text-amber-300/80">{currentLang === 'vi' ? t.tourTaken : t.tourTakenEn}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
