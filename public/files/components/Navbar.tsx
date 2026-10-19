import React, { useState } from 'react';
import { Compass, Calendar, Heart, Menu, X, Phone, Globe } from 'lucide-react';

interface NavbarProps {
  currentLang: 'vi' | 'en';
  onToggleLang: () => void;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenQuickBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onToggleLang,
  savedCount,
  onOpenSaved,
  onOpenQuickBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#faf8f5]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark (Single text element in display face, no subtext pill clutter) */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-2xl font-serif font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 group"
          >
            <span className="w-8 h-8 rounded-full bg-stone-900 text-amber-500 flex items-center justify-center text-sm font-semibold group-hover:bg-amber-700 transition-colors">
              HN
            </span>
            <span>Hà Nội Echoes</span>
          </a>

          {/* Zone 2: 4-5 concise single-line text navigation links with subtle hover underlines */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
            <a
              href="#tours-section"
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-600 hover:after:w-full after:transition-all"
            >
              {currentLang === 'vi' ? 'Lựa Chọn Tour' : 'Tour Collections'}
            </a>
            <a
              href="#trip-finder"
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-600 hover:after:w-full after:transition-all"
            >
              {currentLang === 'vi' ? 'Gợi Ý Theo Giờ' : 'Trip Matcher'}
            </a>
            <a
              href="#map-guide"
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-600 hover:after:w-full after:transition-all"
            >
              {currentLang === 'vi' ? 'Điểm Hẹn Hà Nội' : 'Hanoi Landmarks'}
            </a>
            <a
              href="#testimonials"
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-600 hover:after:w-full after:transition-all"
            >
              {currentLang === 'vi' ? 'Đánh Giá' : 'Guest Stories'}
            </a>
            <a
              href="#why-us"
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-600 hover:after:w-full after:transition-all"
            >
              {currentLang === 'vi' ? 'Về Chúng Tôi' : 'Our Story'}
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action + Utility controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Direct ZIP download link */}
            <a
              href="/hanoi-echoes-code.zip"
              download="hanoi-echoes-code.zip"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-100/80 hover:bg-amber-200/80 rounded-md transition-colors whitespace-nowrap shrink-0"
              title="Tải toàn bộ source code .ZIP về máy"
            >
              <span>⬇ Tải Code ZIP</span>
            </a>

            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200/80 rounded-md transition-colors whitespace-nowrap shrink-0"
              title="Đổi ngôn ngữ / Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-stone-500" />
              <span>{currentLang === 'vi' ? 'EN' : 'VI'}</span>
            </button>

            {/* Saved Wishlist Drawer Trigger */}
            <button
              onClick={onOpenSaved}
              className="relative p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
              title={currentLang === 'vi' ? 'Tour đã lưu' : 'Saved tours'}
            >
              <Heart className="w-4 h-4" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* 1 Primary Action Button */}
            <button
              onClick={onOpenQuickBooking}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 active:scale-[0.98] rounded-lg transition-all shadow-sm whitespace-nowrap shrink-0"
            >
              <Calendar className="w-4 h-4" />
              <span>{currentLang === 'vi' ? 'Đặt Tour Ngay' : 'Book a Tour'}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:bg-stone-100 rounded-md transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-50 border-b border-stone-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-stone-700">
            <a
              href="#tours-section"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-stone-200 transition-colors"
            >
              {currentLang === 'vi' ? 'Lựa Chọn Tour (Buổi Tối, 2-3h, Nửa Ngày, 1 Ngày, Cuối Tuần)' : 'All Tour Collections'}
            </a>
            <a
              href="#trip-finder"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-stone-200 transition-colors"
            >
              {currentLang === 'vi' ? 'Tìm Tour Nhanh Theo Quỹ Giờ' : 'Find Your Perfect Tour'}
            </a>
            <a
              href="#map-guide"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-stone-200 transition-colors"
            >
              {currentLang === 'vi' ? 'Điểm Hẹn Hà Nội' : 'Hanoi Landmarks'}
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-stone-200 transition-colors"
            >
              {currentLang === 'vi' ? 'Cảm Nhận Du Khách' : 'Guest Reviews'}
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-stone-200 transition-colors"
            >
              {currentLang === 'vi' ? 'Về Chúng Tôi & Cam Kết' : 'Our Story'}
            </a>
          </nav>
          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuickBooking();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>{currentLang === 'vi' ? 'Đặt Tour Nhanh' : 'Book a Tour'}</span>
            </button>
            <div className="flex items-center justify-between text-xs text-stone-500 px-1 pt-1">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-stone-600" />
                Hotline: 0988.246.357 (Zalo/WhatsApp)
              </span>
              <span>8:00 - 22:30</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
