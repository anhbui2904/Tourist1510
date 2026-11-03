import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Heart, Menu, Phone, X, ArrowRight } from 'lucide-react';
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from '../lib/contact';

interface NavbarProps {
  currentLang: 'vi' | 'en';
  onSetLang: (lang: 'vi' | 'en') => void;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenQuickBooking: () => void;
  activeSection: string;
}

const LINKS = [
  { id: 'home', href: '#home', vi: 'Trang chủ', en: 'Home' },
  { id: 'tours', href: '#tours', vi: 'Tour', en: 'Tours' },
  { id: 'destinations', href: '#destinations', vi: 'Điểm đến', en: 'Destinations' },
  { id: 'experiences', href: '#experiences', vi: 'Trải nghiệm', en: 'Experiences' },
  { id: 'about', href: '#about', vi: 'Về chúng tôi', en: 'About' },
  { id: 'contact', href: '#contact', vi: 'Liên hệ', en: 'Contact' },
];

function FlowerMark() {
  return (
    <svg viewBox="0 0 40 40" className="w-10 h-10 shrink-0" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#c4376b" />
      <g fill="none" stroke="white" strokeWidth="1.35">
        <ellipse cx="20" cy="11.2" rx="3.1" ry="5.4" />
        <ellipse cx="20" cy="11.2" rx="3.1" ry="5.4" transform="rotate(60 20 20)" />
        <ellipse cx="20" cy="11.2" rx="3.1" ry="5.4" transform="rotate(120 20 20)" />
        <ellipse cx="20" cy="11.2" rx="3.1" ry="5.4" transform="rotate(180 20 20)" />
        <ellipse cx="20" cy="11.2" rx="3.1" ry="5.4" transform="rotate(240 20 20)" />
        <ellipse cx="20" cy="11.2" rx="3.1" ry="5.4" transform="rotate(300 20 20)" />
      </g>
      <circle cx="20" cy="20" r="2.3" fill="white" />
    </svg>
  );
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onSetLang,
  savedCount,
  onOpenSaved,
  onOpenQuickBooking,
  activeSection,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    window.addEventListener('mousedown', close);
    return () => window.removeEventListener('mousedown', close);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[78px] gap-2 sm:gap-4 min-w-0">
          <a href="#home" className="flex items-center gap-2 sm:gap-2.5 shrink min-w-0 max-w-[58%]">
            <FlowerMark />
            <span className="leading-tight min-w-0">
              <span className="block font-serif text-[18px] sm:text-[22px] font-semibold text-stone-900 tracking-tight truncate">Hana Echoes</span>
              <span className="hidden sm:block text-[9px] tracking-[0.16em] uppercase text-stone-400 font-semibold truncate">
                {currentLang === 'vi' ? 'Người thật. Hà Nội sâu hơn.' : 'Real people. Deeper Hanoi.'}
              </span>
            </span>
          </a>

          <nav className="hidden xl:flex items-center gap-7 text-[15px] text-stone-600">
            {LINKS.map((link) => {
              const active = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative py-1 whitespace-nowrap transition-colors ${active ? 'text-stone-900 font-medium' : 'hover:text-stone-900'}`}
                >
                  {currentLang === 'vi' ? link.vi : link.en}
                  {active && <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand" />}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="inline-flex items-center gap-1 px-2 py-1.5 text-sm font-medium text-stone-700 hover:text-stone-900"
                aria-expanded={langOpen}
                aria-haspopup="listbox"
              >
                {currentLang === 'vi' ? 'VI' : 'EN'}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-xl bg-white shadow-xl border border-stone-100 py-1 z-50" role="listbox">
                  <button
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-brand-soft ${currentLang === 'en' ? 'text-brand font-semibold' : 'text-stone-700'}`}
                    onClick={() => {
                      onSetLang('en');
                      setLangOpen(false);
                    }}
                  >
                    English
                  </button>
                  <button
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-brand-soft ${currentLang === 'vi' ? 'text-brand font-semibold' : 'text-stone-700'}`}
                    onClick={() => {
                      onSetLang('vi');
                      setLangOpen(false);
                    }}
                  >
                    Tiếng Việt
                  </button>
                </div>
              )}
            </div>

            <a
              href={`tel:${SITE_PHONE_TEL}`}
              className="hidden lg:inline-flex items-center gap-1.5 text-sm font-semibold text-stone-700 hover:text-brand"
            >
              <Phone className="w-4 h-4" />
              {SITE_PHONE_DISPLAY}
            </a>

            <button
              onClick={onOpenSaved}
              className="relative p-2 text-stone-700 hover:text-brand rounded-full hover:bg-brand-soft transition-colors"
              aria-label={currentLang === 'vi' ? 'Tour đã lưu' : 'Saved tours'}
            >
              <Heart className="w-[18px] h-[18px]" />
              {savedCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 bg-brand text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenQuickBooking}
              className="hidden sm:inline-flex items-center gap-1.5 pl-4 pr-3 py-2.5 text-sm font-semibold text-white bg-brand hover:bg-brand-dark rounded-full transition-colors shadow-sm"
            >
              {currentLang === 'vi' ? 'Đặt ngay' : 'Book Now'}
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="xl:hidden p-2 text-stone-700 rounded-full hover:bg-stone-100"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="xl:hidden border-t border-stone-100 bg-white px-4 py-4 shadow-lg">
          <nav className="flex flex-col">
            {LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-2 py-3 text-sm font-medium text-stone-700 border-b border-stone-100"
              >
                {currentLang === 'vi' ? link.vi : link.en}
              </a>
            ))}
          </nav>
          <a
            href={`tel:${SITE_PHONE_TEL}`}
            onClick={() => setMobileOpen(false)}
            className="mt-4 w-full inline-flex items-center justify-center gap-2 py-3 text-sm font-semibold text-brand border border-brand rounded-full"
          >
            <Phone className="w-4 h-4" />
            {SITE_PHONE_DISPLAY}
          </a>
          <button
            onClick={() => {
              setMobileOpen(false);
              onOpenQuickBooking();
            }}
            className="mt-4 w-full inline-flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-brand rounded-full"
          >
            {currentLang === 'vi' ? 'Đặt ngay' : 'Book Now'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
