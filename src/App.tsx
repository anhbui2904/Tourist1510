import React, { useEffect, useMemo, useState } from 'react';
import { Compass, Search } from 'lucide-react';
import { TOURS_DATA, Tour, TourCategory } from './data/toursData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TourCard } from './components/TourCard';
import { ExperiencesSection } from './components/ExperiencesSection';
import { CustomTripFinder } from './components/CustomTripFinder';
import { HanoiMapGuide } from './components/HanoiMapGuide';
import { TourDetailModal } from './components/TourDetailModal';
import { SavedToursDrawer } from './components/SavedToursDrawer';
import { TestimonialsSection } from './components/TestimonialsSection';
import { WhyUsSection } from './components/WhyUsSection';
import { Footer } from './components/Footer';
import { FaqSection } from './components/FaqSection';
import { CodeViewerModal } from './components/CodeViewerModal';
import { CtaBanner } from './components/CtaBanner';
import { LegalModal, StoryModal } from './components/StoryModal';
import { BookingFlow } from './components/BookingFlow';
import { SectionLabel } from './components/SectionLabel';
import { FEATURED_IDS, StyleId, TripSearch, tourMatchesSearch } from './lib/search';
import { syncSavedBookings } from './lib/adminApi';

const EMPTY_SEARCH: TripSearch = {
  destination: 'all',
  date: '',
  duration: 'all',
  style: 'all',
  price: 'all',
};

const CATEGORIES: { id: TourCategory | 'all'; vi: string; en: string }[] = [
  { id: 'all', vi: 'Tất cả', en: 'All tours' },
  { id: 'night', vi: 'Buổi tối', en: 'Night' },
  { id: 'express', vi: '2–3 giờ', en: '2–3 hours' },
  { id: 'halfday', vi: 'Nửa ngày', en: 'Half day' },
  { id: 'fullday', vi: 'Trọn ngày', en: 'Full day' },
  { id: 'weekend', vi: 'Cuối tuần', en: 'Weekend' },
];

export default function App() {
  const [currentLang, setCurrentLang] = useState<'vi' | 'en'>('en');
  const [search, setSearch] = useState<TripSearch>(EMPTY_SEARCH);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recommended' | 'priceAsc' | 'priceDesc' | 'rating'>('recommended');
  const [browseAll, setBrowseAll] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const [activeTour, setActiveTour] = useState<Tour | null>(null);
  const [modalInitialTab, setModalInitialTab] = useState<'detail' | 'booking'>('detail');
  const [savedTourIds, setSavedTourIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('hana-saved-tours');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed.filter((id) => typeof id === 'string');
      }
    } catch {
      /* keep default */
    }
    return ['hanoi-night-food-street'];
  });
  const [savedOpen, setSavedOpen] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const [legalPage, setLegalPage] = useState<'privacy' | 'terms' | 'cookies' | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingTour, setBookingTour] = useState<Tour | null>(null);
  const [bookingSession, setBookingSession] = useState(0);

  useEffect(() => {
    localStorage.setItem('hana-saved-tours', JSON.stringify(savedTourIds));
  }, [savedTourIds]);

  useEffect(() => {
    const tourNameById: Record<string, string> = {};
    for (const tour of TOURS_DATA) tourNameById[tour.id] = tour.title;
    void syncSavedBookings(tourNameById);
  }, []);

  useEffect(() => {
    const ids = ['home', 'tours', 'experiences', 'about', 'testimonials', 'destinations', 'trip-finder', 'contact'];
    const map: Record<string, string> = {
      home: 'home',
      tours: 'tours',
      experiences: 'experiences',
      about: 'about',
      testimonials: 'about',
      destinations: 'destinations',
      'trip-finder': 'experiences',
      contact: 'contact',
    };
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSection(map[visible.target.id] || visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0.15, 0.4] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const filtersActive =
    search.destination !== 'all' ||
    search.duration !== 'all' ||
    search.style !== 'all' ||
    search.price !== 'all' ||
    searchQuery.trim() !== '';

  const filteredTours = useMemo(() => {
    return TOURS_DATA.filter((tour) => tourMatchesSearch(tour, search, searchQuery)).sort((a, b) => {
      if (sortBy === 'priceAsc') return a.priceVnd - b.priceVnd;
      if (sortBy === 'priceDesc') return b.priceVnd - a.priceVnd;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [search, searchQuery, sortBy]);

  const featuredTours = FEATURED_IDS.map((id) => TOURS_DATA.find((tour) => tour.id === id)).filter((tour): tour is Tour => Boolean(tour));
  const visibleTours = browseAll || filtersActive ? filteredTours : featuredTours;
  const savedTours = useMemo(() => TOURS_DATA.filter((tour) => savedTourIds.includes(tour.id)), [savedTourIds]);
  const vi = currentLang === 'vi';

  const toggleSave = (tourId: string) => {
    setSavedTourIds((prev) => (prev.includes(tourId) ? prev.filter((id) => id !== tourId) : [...prev, tourId]));
  };

  const openDetail = (tour: Tour) => {
    setActiveTour(tour);
    setModalInitialTab('detail');
  };

  const openBooking = (tour: Tour | null) => {
    setActiveTour(null);
    setBookingTour(tour);
    setBookingSession((value) => value + 1);
    setBookingOpen(true);
  };

  const scrollToTours = () => {
    document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' });
  };

  const applySearch = () => {
    setBrowseAll(true);
    scrollToTours();
  };

  const pickExperience = (category: TourCategory, style: StyleId) => {
    setSearch((prev) => ({ ...prev, duration: category, style, destination: 'all', price: 'all' }));
    setBrowseAll(true);
    scrollToTours();
  };

  const clearFilters = () => {
    setSearch(EMPTY_SEARCH);
    setSearchQuery('');
    setSortBy('recommended');
    setBrowseAll(false);
  };

  return (
    <div className="min-h-screen bg-canvas text-ink font-sans selection:bg-brand selection:text-white">
      <Navbar
        currentLang={currentLang}
        onSetLang={setCurrentLang}
        savedCount={savedTourIds.length}
        onOpenSaved={() => setSavedOpen(true)}
        onOpenQuickBooking={() => openBooking(null)}
        activeSection={activeSection}
      />

      <Hero
        currentLang={currentLang}
        search={search}
        onChange={setSearch}
        onSearch={applySearch}
        onExplore={scrollToTours}
        onWatchStory={() => setStoryOpen(true)}
      />

      <section id="tours" className="bg-canvas pt-6 pb-8">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <SectionLabel>{vi ? 'Chọn riêng cho bạn' : 'Handpicked for you'}</SectionLabel>
              <h2 className="mt-2 font-serif text-4xl sm:text-5xl text-stone-900 flex items-center gap-3">
                {vi ? 'Tour nổi bật' : 'Featured Tours'}
                <svg viewBox="0 0 72 16" className="hidden sm:block w-16 h-4 text-brand" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <path d="M2 10c8-8 12 8 20 0s12 8 20 0 12 8 28 0" strokeLinecap="round" />
                </svg>
              </h2>
            </div>
            <button
              onClick={() => {
                setBrowseAll(true);
                setSearch(EMPTY_SEARCH);
                setSearchQuery('');
              }}
              className="text-sm font-semibold text-brand hover:text-brand-dark whitespace-nowrap"
            >
              {vi ? 'Xem mọi tour →' : 'View all tours →'}
            </button>
          </div>

          {(browseAll || filtersActive) && (
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {CATEGORIES.map((tab) => {
                  const active = search.duration === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setBrowseAll(true);
                        setSearch((prev) => ({ ...prev, duration: tab.id }));
                      }}
                      className={`shrink-0 px-3.5 py-2 rounded-full text-sm font-medium ${active ? 'bg-brand text-white' : 'bg-white text-stone-600 border border-stone-200'}`}
                    >
                      {vi ? tab.vi : tab.en}
                    </button>
                  );
                })}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <label className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    value={searchQuery}
                    onChange={(e) => {
                      setBrowseAll(true);
                      setSearchQuery(e.target.value);
                    }}
                    placeholder={vi ? 'Tìm món ăn, địa danh, cà phê...' : 'Search food, streets, coffee...'}
                    className="w-full bg-white border border-stone-200 rounded-full pl-9 pr-4 py-2.5 text-sm outline-none focus:border-brand"
                  />
                </label>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs text-stone-500 whitespace-nowrap">
                    {filteredTours.length} {vi ? 'tour' : filteredTours.length === 1 ? 'tour' : 'tours'}
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="text-sm bg-white border border-stone-200 rounded-full px-3 py-2 outline-none"
                    aria-label={vi ? 'Sắp xếp' : 'Sort'}
                  >
                    <option value="recommended">{vi ? 'Khuyên chọn' : 'Recommended'}</option>
                    <option value="rating">{vi ? 'Đánh giá cao' : 'Highest rated'}</option>
                    <option value="priceAsc">{vi ? 'Giá thấp đến cao' : 'Price: low to high'}</option>
                    <option value="priceDesc">{vi ? 'Giá cao đến thấp' : 'Price: high to low'}</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {visibleTours.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {visibleTours.map((tour) => (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  currentLang={currentLang}
                  isSaved={savedTourIds.includes(tour.id)}
                  onToggleSave={toggleSave}
                  onSelectTour={openDetail}
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 bg-white rounded-[22px] border border-stone-100 p-10 text-center max-w-md mx-auto">
              <Compass className="w-10 h-10 text-stone-300 mx-auto" />
              <h3 className="mt-3 font-serif text-2xl text-stone-900">{vi ? 'Không có tour khớp' : 'No matching tours'}</h3>
              <p className="mt-2 text-sm text-stone-500">
                {vi ? 'Thử đổi điểm đến, thời lượng hoặc mức giá.' : 'Try another destination, duration, or price.'}
              </p>
              <button onClick={clearFilters} className="mt-4 px-4 py-2 rounded-full bg-brand text-white text-sm font-semibold">
                {vi ? 'Xem tour nổi bật' : 'Show featured tours'}
              </button>
            </div>
          )}
        </div>
      </section>

      <ExperiencesSection currentLang={currentLang} onPick={pickExperience} onViewAll={() => { setBrowseAll(true); scrollToTours(); }} />
      <WhyUsSection currentLang={currentLang} />
      <TestimonialsSection currentLang={currentLang} />
      <HanoiMapGuide currentLang={currentLang} onSelectTourById={(id) => { const found = TOURS_DATA.find((tour) => tour.id === id); if (found) openDetail(found); }} />
      <CustomTripFinder currentLang={currentLang} onSelectTour={openDetail} onQuickBook={openBooking} />
      <CtaBanner currentLang={currentLang} onBook={() => openBooking(null)} />
      <FaqSection currentLang={currentLang} />
      <Footer
        currentLang={currentLang}
        onSelectCategory={(cat) => {
          setBrowseAll(true);
          setSearch({ ...EMPTY_SEARCH, duration: cat });
        }}
        onOpenCodeViewer={() => setCodeOpen(true)}
        onOpenLegal={setLegalPage}
      />

      <TourDetailModal
        tour={activeTour}
        currentLang={currentLang}
        onClose={() => setActiveTour(null)}
        initialTab={modalInitialTab}
        preferredDate={search.date}
        onBook={() => activeTour && openBooking(activeTour)}
      />
      <BookingFlow
        key={bookingSession}
        open={bookingOpen}
        currentLang={currentLang}
        initialTour={bookingTour}
        preferredDate={search.date}
        onClose={() => setBookingOpen(false)}
        onSetLang={setCurrentLang}
      />
      <SavedToursDrawer
        isOpen={savedOpen}
        onClose={() => setSavedOpen(false)}
        savedTours={savedTours}
        currentLang={currentLang}
        onRemoveSaved={toggleSave}
        onSelectTour={(tour) => { setSavedOpen(false); openDetail(tour); }}
        onQuickBook={(tour) => { setSavedOpen(false); openBooking(tour); }}
      />
      <CodeViewerModal isOpen={codeOpen} onClose={() => setCodeOpen(false)} currentLang={currentLang} />
      <StoryModal open={storyOpen} onClose={() => setStoryOpen(false)} currentLang={currentLang} onExplore={scrollToTours} />
      <LegalModal page={legalPage} currentLang={currentLang} onClose={() => setLegalPage(null)} />
    </div>
  );
}
