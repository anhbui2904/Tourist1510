import React from 'react';
import { X, Heart, Trash2, ArrowRight, Clock } from 'lucide-react';
import { Tour } from '../data/toursData';

interface SavedToursDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedTours: Tour[];
  currentLang: 'vi' | 'en';
  onRemoveSaved: (tourId: string) => void;
  onSelectTour: (tour: Tour) => void;
  onQuickBook: (tour: Tour) => void;
}

export const SavedToursDrawer: React.FC<SavedToursDrawerProps> = ({
  isOpen,
  onClose,
  savedTours,
  currentLang,
  onRemoveSaved,
  onSelectTour,
  onQuickBook,
}) => {
  if (!isOpen) return null;

  const formatVnd = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-stone-200">
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-brand fill-brand" />
            <h3 className="text-base font-serif font-bold text-stone-900">
              {currentLang === 'vi' ? 'Danh Sách Đã Lưu' : 'Saved Itineraries'}
            </h3>
            <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-mono">
              {savedTours.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Saved List Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {savedTours.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
              <Heart className="w-12 h-12 text-stone-300 stroke-1 mb-3" />
              <p className="text-sm font-medium text-stone-700">
                {currentLang === 'vi' ? 'Chưa có tour nào được lưu' : 'No saved tours yet'}
              </p>
              <p className="text-xs text-stone-400 mt-1 max-w-xs">
                {currentLang === 'vi'
                  ? 'Bấm vào biểu tượng trái tim trên các thẻ tour để lưu lại so sánh thời lượng và giá.'
                  : 'Click the heart icon on any tour card to bookmark and compare durations easily.'}
              </p>
            </div>
          ) : (
            savedTours.map((tour) => (
              <div
                key={tour.id}
                className="bg-stone-50 border border-stone-200/80 rounded-xl p-3.5 flex gap-3.5 group hover:border-brand/40 transition-colors"
              >
                <img
                  src={tour.image}
                  alt={tour.imageAlt}
                  className="w-20 h-20 rounded-lg object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-center justify-between gap-1 text-[11px] text-stone-500 mb-1">
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-brand" />
                        {currentLang === 'vi' ? tour.duration : tour.durationEn}
                      </span>
                      <button
                        onClick={() => onRemoveSaved(tour.id)}
                        className="text-stone-400 hover:text-rose-600 p-0.5"
                        title={currentLang === 'vi' ? 'Xóa khỏi danh sách' : 'Remove'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h4
                      onClick={() => {
                        onClose();
                        onSelectTour(tour);
                      }}
                      className="text-xs font-semibold text-stone-900 group-hover:text-brand transition-colors cursor-pointer truncate"
                    >
                      {currentLang === 'vi' ? tour.title : tour.titleEn}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-200/60 mt-1">
                    <span className="text-xs font-bold font-mono tabular-nums text-stone-900">
                      {formatVnd(tour.priceVnd)}
                    </span>
                    <button
                      onClick={() => {
                        onClose();
                        onQuickBook(tour);
                      }}
                      className="text-[11px] font-semibold text-brand hover:text-brand-dark flex items-center gap-1"
                    >
                      <span>{currentLang === 'vi' ? 'Đặt ngay' : 'Book'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {savedTours.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between gap-3">
            <span className="text-xs text-stone-500">
              {savedTours.length} {currentLang === 'vi' ? 'tour đã chọn' : 'selected'}
            </span>
            <button
              onClick={() => {
                onClose();
                onQuickBook(savedTours[0]);
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-brand hover:bg-brand-dark rounded-full transition-colors"
            >
              {currentLang === 'vi' ? 'Đặt Tour Đầu Tiên' : 'Book First Tour'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
