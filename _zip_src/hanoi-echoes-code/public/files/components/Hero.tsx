import React from 'react';
import { Clock, Moon, Sparkles, Sun, Compass, ShieldCheck, Users, MapPin, ArrowRight } from 'lucide-react';
import { TourCategory } from '../data/toursData';

interface HeroProps {
  currentLang: 'vi' | 'en';
  onSelectCategory: (category: TourCategory | 'all') => void;
  onOpenTripFinder: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onSelectCategory,
  onOpenTripFinder,
}) => {
  const quickCategories = [
    {
      id: 'night' as TourCategory,
      title: currentLang === 'vi' ? 'Tour Buổi Tối' : 'Night Tours',
      desc: currentLang === 'vi' ? 'Phố đêm, ẩm thực & Cầu Long Biên' : 'Night food, street life & bridge lights',
      time: currentLang === 'vi' ? '18:00 - 21:30' : '18:00 - 21:30',
      icon: Moon,
    },
    {
      id: 'express' as TourCategory,
      title: currentLang === 'vi' ? 'Ngắn 2 - 3 Giờ' : '2 - 3 Hours',
      desc: currentLang === 'vi' ? 'Cà phê trứng & xích lô phố cổ' : 'Egg coffee workshop & cyclo ride',
      time: currentLang === 'vi' ? '2 - 2.5 giờ' : '2 - 2.5 hours',
      icon: Clock,
    },
    {
      id: 'halfday' as TourCategory,
      title: currentLang === 'vi' ? 'Nửa Ngày' : 'Half Day',
      desc: currentLang === 'vi' ? 'Văn Miếu, Hoàng Thành, Hồ Tây' : 'Imperial Citadel, Temple & West Lake',
      time: currentLang === 'vi' ? '4 - 4.5 giờ' : '4 - 4.5 hours',
      icon: Sun,
    },
    {
      id: 'fullday' as TourCategory,
      title: currentLang === 'vi' ? 'Trọn 1 Ngày' : 'Full Day',
      desc: currentLang === 'vi' ? 'Di sản nghìn năm & Múa rối nước' : 'Comprehensive heritage & puppet show',
      time: currentLang === 'vi' ? '8.5 giờ' : '8.5 hours',
      icon: Compass,
    },
    {
      id: 'weekend' as TourCategory,
      title: currentLang === 'vi' ? 'Tour Cuối Tuần' : 'Weekend Trip',
      desc: currentLang === 'vi' ? 'Làng cổ Đường Lâm & Rừng Ba Vì' : 'Ancient stone village & pine mountains',
      time: currentLang === 'vi' ? 'Thứ 7 & Chủ Nhật' : 'Sat & Sun Escapes',
      icon: Sparkles,
    },
  ];

  const scrollToTours = (cat: TourCategory) => {
    onSelectCategory(cat);
    const section = document.getElementById('tours-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-stone-900 text-stone-100">
      {/* Background Image Anchor with measured contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_hanoi_twilight_1791949155360.jpg"
          alt="Hà Nội Phố Cổ hoàng hôn lung linh"
          className="w-full h-full object-cover object-center filter brightness-[0.68] scale-[1.02] transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/60 to-stone-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-3xl">
          {/* Section Kicker */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-amber-300 font-medium tracking-wide uppercase mb-4">
            <span>{currentLang === 'vi' ? 'Thủ Đô Ngàn Năm Văn Hiến' : 'Capital of Thousand-Year Heritage'}</span>
            <span aria-hidden="true">·</span>
            <span>{currentLang === 'vi' ? 'Thiết Kế Cho Mọi Quỹ Thời Gian' : 'Tailored For Every Time Budget'}</span>
          </div>

          {/* Primary Refined Headline with text-wrap: balance */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15] text-balance mb-6">
            {currentLang === 'vi' ? (
              <>
                Trọn Vẹn Vẻ Đẹp Hà Nội <br />
                <span className="italic font-normal text-amber-200">Theo Thời Gian</span> Của Bạn
              </>
            ) : (
              <>
                Experience The Soul of Hanoi <br />
                <span className="italic font-normal text-amber-200">At Your Own</span> Rhythm
              </>
            )}
          </h1>

          {/* Value proposition paragraph */}
          <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-2xl mb-8 font-light">
            {currentLang === 'vi'
              ? 'Dù bạn chỉ có 2-3 giờ quá cảnh thảnh thơi nhâm nhi cà phê trứng, muốn đắm mình trong ẩm thực phố đêm, viếng thăm di tích nửa ngày, hay dành trọn ngày cuối tuần trốn về làng cổ rêu phong — chúng tôi luôn có hành trình hoàn hảo dành riêng cho bạn.'
              : 'Whether you have a 2-hour layover for egg coffee, want to savor lantern-lit night food alleys, explore half-day royal temples, or embark on a serene weekend village getaway — our curated journeys are ready for you.'}
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <button
              onClick={() => {
                const section = document.getElementById('tours-section');
                if (section) section.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] rounded-lg transition-all shadow-md whitespace-nowrap"
            >
              <span>{currentLang === 'vi' ? 'Khám Phá Các Tour Hà Nội' : 'Explore All Tours'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenTripFinder}
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 rounded-lg transition-all whitespace-nowrap"
            >
              <Compass className="w-4 h-4 text-amber-300" />
              <span>{currentLang === 'vi' ? 'Gợi Ý Tour Theo Giờ Rảnh' : 'Match Tour By Your Schedule'}</span>
            </button>
          </div>
        </div>

        {/* 5 Duration Jump Cards Grid */}
        <div className="pt-6 border-t border-stone-700/60">
          <div className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-4">
            {currentLang === 'vi' ? 'Chọn nhanh theo thời lượng bạn muốn đi:' : 'Choose by your available duration:'}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {quickCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => scrollToTours(cat.id)}
                  className="group text-left p-3.5 sm:p-4 rounded-xl bg-stone-800/80 hover:bg-stone-800 border border-stone-700/80 hover:border-amber-400/60 backdrop-blur-sm transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-stone-700/60 group-hover:bg-amber-500/20 text-amber-300 flex items-center justify-center transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-mono text-amber-300/90 whitespace-nowrap">
                      {cat.time}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-amber-200 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-stone-300 mt-1 line-clamp-1">
                      {cat.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4-Column Trust Strip Full-Width Row Below Hero */}
      <div className="bg-stone-950/90 border-t border-stone-800 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-stone-300 text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="font-semibold text-white">
                  {currentLang === 'vi' ? 'Nhóm Nhỏ Thân Mật' : 'Intimate Small Groups'}
                </div>
                <div className="text-stone-400 text-xs">
                  {currentLang === 'vi' ? 'Tối đa 6 - 8 khách/đoàn' : 'Max 6 - 8 guests per group'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="font-semibold text-white">
                  {currentLang === 'vi' ? '100% Bản Địa Hà Nội' : '100% Hanoi Born & Bred'}
                </div>
                <div className="text-stone-400 text-xs">
                  {currentLang === 'vi' ? 'Hướng dẫn viên am tường' : 'Knowledgeable native guides'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="font-semibold text-white">
                  {currentLang === 'vi' ? 'Cam Kết Minh Bạch' : 'All-Inclusive Pricing'}
                </div>
                <div className="text-stone-400 text-xs">
                  {currentLang === 'vi' ? 'Không phí ẩn, không ép mua' : 'No hidden fees or shopping traps'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="font-semibold text-white">
                  {currentLang === 'vi' ? 'Khởi Hành Linh Hoạt' : 'Flexible Departures'}
                </div>
                <div className="text-stone-400 text-xs">
                  {currentLang === 'vi' ? 'Đổi giờ miễn phí trước 24h' : 'Free reschedule up to 24h'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
