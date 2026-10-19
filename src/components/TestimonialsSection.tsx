import React from 'react';
import { Star } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/toursData';
import { SectionLabel } from './SectionLabel';

export const TestimonialsSection: React.FC<{ currentLang: 'vi' | 'en' }> = ({ currentLang }) => {
  return (
    <section id="testimonials" className="bg-canvas py-16 sm:py-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <SectionLabel>{currentLang === 'vi' ? 'Chuyện của khách' : "Travelers' stories"}</SectionLabel>
          <h2 className="mt-2 font-serif text-4xl sm:text-5xl text-stone-900">
            {currentLang === 'vi' ? 'Khách của chúng tôi nói gì' : 'What Our Guests Say'}
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS_DATA.map((item) => (
            <figure key={item.id} className="bg-white rounded-[22px] p-6 shadow-[0_10px_30px_rgba(60,30,30,0.05)] border border-white flex flex-col">
              <div className="flex gap-0.5 text-amber-400 mb-4" aria-label={`${item.rating} stars`}>
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="text-[15px] leading-relaxed text-stone-600 flex-1">
                “{currentLang === 'vi' ? item.comment : item.commentEn}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="w-11 h-11 rounded-full bg-brand-soft text-brand font-semibold text-sm flex items-center justify-center">
                  {item.avatarText}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-stone-900">{item.name}</span>
                  <span className="block text-xs text-stone-400">{item.origin}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
