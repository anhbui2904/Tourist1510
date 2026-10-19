import React from 'react';
import { ArrowRight } from 'lucide-react';

export const CtaBanner: React.FC<{ currentLang: 'vi' | 'en'; onBook: () => void }> = ({ currentLang, onBook }) => {
  return (
    <section className="bg-canvas pb-16 sm:pb-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] min-h-[280px] sm:min-h-[320px] flex items-center">
          <img
            src="/images/hanoi_heritage_temple_1791949156492.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />
          <div className="relative z-10 px-8 sm:px-12 py-12 max-w-xl text-white">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/80">
              {currentLang === 'vi' ? 'Sẵn sàng cho câu chuyện Hà Nội của bạn?' : 'Ready for your Hanoi story?'}
            </p>
            <h2 className="mt-2 font-serif text-4xl sm:text-5xl leading-tight">
              {currentLang === 'vi' ? 'Cùng khám phá Hà Nội' : "Let's Explore Hanoi Together"}
            </h2>
            <p className="mt-3 text-white/80 text-sm sm:text-base">
              {currentLang === 'vi'
                ? 'Người thật. Nơi khó quên. Một cách đi có ý nghĩa hơn.'
                : 'Authentic people. Unforgettable places. A more meaningful way to travel.'}
            </p>
            <button
              onClick={onBook}
              className="mt-6 inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold rounded-full px-5 py-3"
            >
              {currentLang === 'vi' ? 'Đặt tour ngay' : 'Book Your Tour Now'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
