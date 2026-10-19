import React, { useState, useMemo } from 'react';
import {
  Compass,
  Search,
  SlidersHorizontal,
  Moon,
  Clock,
  Sun,
  Sparkles,
  Calendar,
  Heart,
  ChevronDown,
} from 'lucide-react';
import { TOURS_DATA, Tour, TourCategory } from './data/toursData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TourCard } from './components/TourCard';
import { CustomTripFinder } from './components/CustomTripFinder';
import { HanoiMapGuide } from './components/HanoiMapGuide';
import { TourDetailModal } from './components/TourDetailModal';
import { SavedToursDrawer } from './components/SavedToursDrawer';
import { TestimonialsSection } from './components/TestimonialsSection';
import { WhyUsSection } from './components/WhyUsSection';
import { Footer } from './components/Footer';

export default function App() {
  const [currentLang, setCurrentLang] = useState<'vi' | 'en'>('vi');
  const [selectedCategory, setSelectedCategory] = useState<TourCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recommended' | 'priceAsc' | 'priceDesc' | 'rating'>('recommended');

  // Selected tour for detail modal
  const [activeTour, setActiveTour] = useState<Tour | null>(null);
  const [modalInitialTab, setModalInitialTab] = useState<'detail' | 'booking'>('detail');

  // Wishlist state
  const [savedTourIds, setSavedTourIds] = useState<string[]>(['hanoi-night-food-street']);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  // Filter tabs definition
  const categoryTabs = [
    { id: 'all', labelVi: 'Tất cả tour', labelEn: 'All Tours' },
    { id: 'night', labelVi: 'Tour buổi tối', labelEn: 'Night Tours', icon: Moon },
    { id: 'express', labelVi: 'Ngắn 2 - 3 giờ', labelEn: '2 - 3 Hours', icon: Clock },
    { id: 'halfday', labelVi: 'Nửa ngày (4h)', labelEn: 'Half Day', icon: Sun },
    { id: 'fullday', labelVi: 'Trọn 1 ngày', labelEn: 'Full Day', icon: Compass },
    { id: 'weekend', labelVi: 'Tour cuối tuần', labelEn: 'Weekend Getaway', icon: Sparkles },
  ];

  // Wishlist actions
  const toggleSaveTour = (tourId: string) => {
    setSavedTourIds((prev) =>
      prev.includes(tourId) ? prev.filter((id) => id !== tourId) : [...prev, tourId]
    );
  };

  const savedTours = useMemo(() => {
    return TOURS_DATA.filter((t) => savedTourIds.includes(t.id));
  }, [savedTourIds]);

  // Filtered & Sorted Tours
  const filteredTours = useMemo(() => {
    return TOURS_DATA.filter((tour) => {
      // Category match
      if (selectedCategory !== 'all' && tour.category !== selectedCategory) {
        return false;
      }
      // Search match
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = tour.title.toLowerCase().includes(query) || tour.titleEn.toLowerCase().includes(query);
        const matchesTagline = tour.tagline.toLowerCase().includes(query) || tour.taglineEn.toLowerCase().includes(query);
        const matchesHighlights = tour.highlights.some((h) => h.toLowerCase().includes(query));
        return matchesTitle || matchesTagline || matchesHighlights;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'priceAsc') return a.priceVnd - b.priceVnd;
      if (sortBy === 'priceDesc') return b.priceVnd - a.priceVnd;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // recommended order from data
    });
  }, [selectedCategory, searchQuery, sortBy]);

  // Handlers for modal
  const handleOpenDetail = (tour: Tour) => {
    setActiveTour(tour);
    setModalInitialTab('detail');
  };

  const handleQuickBook = (tour: Tour) => {
    setActiveTour(tour);
    setModalInitialTab('booking');
  };

  const handleSelectTourById = (tourId: string) => {
    const found = TOURS_DATA.find((t) => t.id === tourId);
    if (found) {
      handleOpenDetail(found);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 flex flex-col font-sans selection:bg-amber-800 selection:text-white">
      {/* 1. Header / Navbar conforming to Top Bar Contract */}
      <Navbar
        currentLang={currentLang}
        onToggleLang={() => setCurrentLang((prev) => (prev === 'vi' ? 'en' : 'vi'))}
        savedCount={savedTourIds.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        onOpenQuickBooking={() => handleQuickBook(TOURS_DATA[0])}
      />

      {/* 2. Hero Section */}
      <Hero
        currentLang={currentLang}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        onOpenTripFinder={() => {
          const el = document.getElementById('trip-finder');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 3. Main Tour Collections Section */}
      <main id="tours-section" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-stone-200">
          <div>
            <div className="text-xs uppercase tracking-wider text-amber-800 font-semibold mb-2">
              {currentLang === 'vi' ? 'Bộ sưu tập trải nghiệm Hà Nội' : 'Hanoi Tour Catalog'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              {currentLang === 'vi' ? 'Chọn Tour Phù Hợp Với Bạn' : 'Find Your Perfect Journey'}
            </h2>
            <p className="text-stone-600 text-sm mt-1 max-w-xl">
              {currentLang === 'vi'
                ? 'Tất cả các tour đều được dẫn dắt bởi hướng dẫn viên người Hà Nội, nhóm nhỏ ấm cúng, cam kết giá minh bạch trọn gói.'
                : 'All tours are guided by native Hanoi storytellers with intimate small groups and transparent, all-inclusive pricing.'}
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder={currentLang === 'vi' ? 'Tìm món ăn, địa danh...' : 'Search street, landmark, food...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-700 bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-stone-400 hover:text-stone-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          {/* Category Tabs (Interactive Segmented Buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            {categoryTabs.map((tab) => {
              const isSelected = selectedCategory === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id as any)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'bg-white text-stone-700 border border-stone-200/80 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  {Icon && <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-200' : 'text-stone-400'}`} />}
                  <span>{currentLang === 'vi' ? tab.labelVi : tab.labelEn}</span>
                </button>
              );
            })}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center justify-between lg:justify-end gap-3 shrink-0">
            <span className="text-xs text-stone-500 whitespace-nowrap font-medium">
              {filteredTours.length} {currentLang === 'vi' ? 'tour sẵn sàng' : 'available tours'}
            </span>
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-xs text-stone-500 whitespace-nowrap">
                {currentLang === 'vi' ? 'Sắp xếp:' : 'Sort:'}
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-medium bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-700 text-stone-800"
              >
                <option value="recommended">{currentLang === 'vi' ? 'Khuyên chọn' : 'Recommended'}</option>
                <option value="rating">{currentLang === 'vi' ? 'Đánh giá cao nhất' : 'Highest Rated'}</option>
                <option value="priceAsc">{currentLang === 'vi' ? 'Giá từ thấp đến cao' : 'Price: Low to High'}</option>
                <option value="priceDesc">{currentLang === 'vi' ? 'Giá từ cao đến thấp' : 'Price: High to Low'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tour Cards Grid */}
        {filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredTours.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                currentLang={currentLang}
                isSaved={savedTourIds.includes(tour.id)}
                onToggleSave={toggleSaveTour}
                onSelectTour={handleOpenDetail}
                onQuickBook={handleQuickBook}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center max-w-md mx-auto my-8">
            <Compass className="w-12 h-12 text-stone-300 stroke-1 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-stone-800">
              {currentLang === 'vi' ? 'Không tìm thấy tour phù hợp' : 'No matching tours found'}
            </h3>
            <p className="text-xs text-stone-500 mt-1 mb-4">
              {currentLang === 'vi'
                ? 'Hãy thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục thời lượng khác.'
                : 'Try altering your search keywords or switching duration filters.'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-semibold text-amber-800 bg-amber-50 rounded-lg hover:bg-amber-100"
            >
              {currentLang === 'vi' ? 'Xem tất cả tour' : 'View all tours'}
            </button>
          </div>
        )}
      </main>

      {/* 4. Smart Trip Finder / Matcher */}
      <CustomTripFinder
        currentLang={currentLang}
        onSelectTour={handleOpenDetail}
        onQuickBook={handleQuickBook}
      />

      {/* 5. Hanoi Iconic Landmarks Map Guide */}
      <HanoiMapGuide
        currentLang={currentLang}
        onSelectTourById={handleSelectTourById}
      />

      {/* 6. Authentic Traveler Stories / Testimonials */}
      <TestimonialsSection currentLang={currentLang} />

      {/* 7. Guiding Principles & Why Us */}
      <WhyUsSection currentLang={currentLang} />

      {/* 8. Quiet Footer */}
      <Footer
        currentLang={currentLang}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('tours-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 9. Interactive Tour Detail & Booking Modal */}
      <TourDetailModal
        tour={activeTour}
        currentLang={currentLang}
        onClose={() => setActiveTour(null)}
        initialTab={modalInitialTab}
      />

      {/* 10. Saved Tours Wishlist Drawer */}
      <SavedToursDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedTours={savedTours}
        currentLang={currentLang}
        onRemoveSaved={toggleSaveTour}
        onSelectTour={handleOpenDetail}
        onQuickBook={handleQuickBook}
      />
    </div>
  );
}
