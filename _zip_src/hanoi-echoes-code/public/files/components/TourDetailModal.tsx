import React, { useState, useEffect } from 'react';
import {
  X,
  Clock,
  Star,
  Users,
  MapPin,
  Check,
  Calendar,
  Sparkles,
  Phone,
  Mail,
  User,
  ShieldCheck,
  Tag,
  ArrowRight,
  Printer,
  CheckCircle2,
} from 'lucide-react';
import { Tour } from '../data/toursData';

interface TourDetailModalProps {
  tour: Tour | null;
  currentLang: 'vi' | 'en';
  onClose: () => void;
  initialTab?: 'detail' | 'booking';
}

export const TourDetailModal: React.FC<TourDetailModalProps> = ({
  tour,
  currentLang,
  onClose,
  initialTab = 'detail',
}) => {
  const [activeTab, setActiveTab] = useState<'detail' | 'booking'>(initialTab);
  const [bookingDate, setBookingDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [pickupOption, setPickupOption] = useState<'hotel' | 'meeting'>('hotel');
  const [addOnPhoto, setAddOnPhoto] = useState(false);
  const [voucherInput, setVoucherInput] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [voucherError, setVoucherError] = useState('');

  // Form fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  useEffect(() => {
    setActiveTab(initialTab);
    setConfirmedBookingId(null);
  }, [tour, initialTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!tour) return null;

  // Format currency
  const formatVnd = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
  };

  // Pricing calculations
  const basePricePerAdult = tour.priceVnd;
  const basePricePerChild = Math.round(tour.priceVnd * 0.7);
  const addOnCost = (addOnPhoto ? 350000 : 0) + (pickupOption === 'hotel' ? 100000 : 0);
  const rawSubtotal = adults * basePricePerAdult + children * basePricePerChild + addOnCost;
  const discountAmount = Math.round((rawSubtotal * discountPercent) / 100);
  const grandTotal = Math.max(0, rawSubtotal - discountAmount);

  const applyVoucher = () => {
    setVoucherError('');
    const code = voucherInput.trim().toUpperCase();
    if (code === 'HANOI2026') {
      setDiscountPercent(10);
    } else if (code === 'WELCOME') {
      setDiscountPercent(5);
    } else {
      setVoucherError(
        currentLang === 'vi'
          ? 'Mã không hợp lệ. Hãy thử: HANOI2026'
          : 'Invalid coupon code. Try: HANOI2026'
      );
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      alert(currentLang === 'vi' ? 'Vui lòng điền họ tên và số điện thoại / Zalo!' : 'Please fill in your name and phone/WhatsApp!');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = 'HN-' + Math.floor(100000 + Math.random() * 900000);
      setConfirmedBookingId(generatedId);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-stone-900 bg-white/90 hover:bg-white rounded-full shadow-sm backdrop-blur-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedBookingId ? (
          /* Confirmation Receipt State */
          <div className="p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                {currentLang === 'vi' ? 'Đặt Tour Thành Công' : 'Booking Confirmed'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
                {currentLang === 'vi' ? 'Hẹn Gặp Bạn Tại Hà Nội!' : 'See You in Hanoi!'}
              </h3>
              <p className="text-sm text-stone-600 mt-2">
                {currentLang === 'vi'
                  ? `Mã đặt tour của bạn là ${confirmedBookingId}. Hướng dẫn viên bản địa sẽ gọi xác nhận qua SĐT/Zalo trong vòng 15 phút.`
                  : `Your confirmation code is ${confirmedBookingId}. Our local guide will message you via WhatsApp/Zalo within 15 minutes.`}
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 text-left text-xs space-y-2.5">
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">{currentLang === 'vi' ? 'Chuyến đi' : 'Experience'}</span>
                <span className="font-semibold text-stone-900 text-right">
                  {currentLang === 'vi' ? tour.title : tour.titleEn}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{currentLang === 'vi' ? 'Ngày khởi hành' : 'Date'}</span>
                <span className="font-mono font-medium text-stone-900">{bookingDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{currentLang === 'vi' ? 'Số khách' : 'Guests'}</span>
                <span className="font-medium text-stone-900">
                  {adults} {currentLang === 'vi' ? 'người lớn' : 'adults'}
                  {children > 0 && `, ${children} ${currentLang === 'vi' ? 'trẻ em' : 'children'}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{currentLang === 'vi' ? 'Khách hàng' : 'Lead Traveler'}</span>
                <span className="font-medium text-stone-900">{fullName} ({phone})</span>
              </div>
              <div className="flex justify-between border-t border-stone-200 pt-2 text-sm font-semibold text-stone-900">
                <span>{currentLang === 'vi' ? 'Tổng thanh toán (sau giảm)' : 'Total Paid / Due'}</span>
                <span className="font-mono tabular-nums text-amber-800">{formatVnd(grandTotal)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg transition-colors"
              >
                {currentLang === 'vi' ? 'Hoàn Tất & Đóng' : 'Done & Close'}
              </button>
            </div>
          </div>
        ) : (
          /* Normal Modal View (2 Tabs: Detail & Booking) */
          <div>
            {/* Modal Top Banner Image */}
            <div className="relative h-60 sm:h-72 w-full bg-stone-900">
              <img
                src={tour.image}
                alt={tour.imageAlt}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

              <div className="absolute bottom-4 left-6 right-16 text-white">
                <div className="flex items-center gap-2 text-xs font-medium text-amber-300 mb-1">
                  <span>{currentLang === 'vi' ? tour.categoryLabel : tour.categoryLabelEn}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    {currentLang === 'vi' ? tour.duration : tour.durationEn}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-300" />
                    <span className="font-mono">{tour.rating}</span>
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold leading-tight">
                  {currentLang === 'vi' ? tour.title : tour.titleEn}
                </h2>
              </div>
            </div>

            {/* Segmented Tab Switcher */}
            <div className="border-b border-stone-200 bg-stone-50 px-6 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('detail')}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                    activeTab === 'detail'
                      ? 'bg-white text-stone-900 shadow-sm border border-stone-200'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {currentLang === 'vi' ? 'Lịch Trình & Điểm Nổi Bật' : 'Itinerary & Inclusions'}
                </button>
                <button
                  onClick={() => setActiveTab('booking')}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                    activeTab === 'booking'
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{currentLang === 'vi' ? 'Biểu Phí & Đặt Chỗ' : 'Book & Rates'}</span>
                </button>
              </div>

              <div className="hidden sm:block text-xs font-mono text-stone-700">
                <span className="text-stone-500 font-sans mr-1">{currentLang === 'vi' ? 'Giá chỉ:' : 'Price:'}</span>
                <span className="text-sm font-bold text-amber-800 tabular-nums">
                  {formatVnd(tour.priceVnd)}
                </span>
                <span className="text-[11px] text-stone-500 font-sans ml-1">/ khách</span>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6">
              {activeTab === 'detail' ? (
                <>
                  {/* Summary */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-700 mb-2">
                      {currentLang === 'vi' ? 'Tổng quan trải nghiệm' : 'Overview'}
                    </h4>
                    <p className="text-stone-700 text-sm leading-relaxed">
                      {currentLang === 'vi' ? tour.summary : tour.summaryEn}
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-700 mb-3">
                      {currentLang === 'vi' ? 'Trải nghiệm độc bản của tour' : 'Key Highlights'}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {(currentLang === 'vi' ? tour.highlights : tour.highlightsEn).map((hl, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-stone-700 bg-stone-50 p-3 rounded-lg border border-stone-200/70">
                          <Check className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hour-by-hour Itinerary Timeline */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-700 mb-4">
                      {currentLang === 'vi' ? 'Lịch trình chi tiết từng khung giờ' : 'Detailed Hour-by-Hour Timeline'}
                    </h4>
                    <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                      {tour.itinerary.map((stop, idx) => (
                        <div key={idx} className="relative group">
                          {/* Dot indicator */}
                          <div className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full bg-amber-700 border-2 border-white" />
                          <div className="flex items-baseline gap-2">
                            <span className="text-xs font-mono font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded">
                              {stop.time}
                            </span>
                            <span className="text-sm font-semibold text-stone-900">
                              {currentLang === 'vi' ? stop.title : stop.titleEn}
                            </span>
                          </div>
                          <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                            {currentLang === 'vi' ? stop.description : stop.descriptionEn}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Included / Excluded Columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-200">
                    <div className="bg-emerald-50/50 border border-emerald-200/60 rounded-xl p-4">
                      <h5 className="text-xs font-semibold text-emerald-900 mb-2">
                        {currentLang === 'vi' ? 'Giá tour đã bao gồm:' : 'What is Included:'}
                      </h5>
                      <ul className="space-y-1.5 text-xs text-stone-700">
                        {(currentLang === 'vi' ? tour.included : tour.includedEn).map((inc, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
                      <h5 className="text-xs font-semibold text-stone-800 mb-2">
                        {currentLang === 'vi' ? 'Chưa bao gồm:' : 'Not Included:'}
                      </h5>
                      <ul className="space-y-1.5 text-xs text-stone-600">
                        {(currentLang === 'vi' ? tour.notIncluded : tour.notIncludedEn).map((notInc, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-stone-400 font-bold">·</span>
                            <span>{notInc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Switch to Booking Button */}
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => setActiveTab('booking')}
                      className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg transition-colors shadow-sm"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{currentLang === 'vi' ? 'Tiếp tục chọn ngày & Đặt chỗ' : 'Select Date & Book Now'}</span>
                    </button>
                  </div>
                </>
              ) : (
                /* Interactive Booking Tab */
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  {/* Step 1: Date & Guests */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                        {currentLang === 'vi' ? 'Ngày khởi hành:' : 'Tour Date:'}
                      </label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600 text-stone-800 font-mono"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                        {currentLang === 'vi' ? 'Người lớn (>10 tuổi):' : 'Adults (>10 yrs):'}
                      </label>
                      <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center text-xs font-mono tabular-nums font-semibold">
                          {adults}
                        </span>
                        <button
                          type="button"
                          onClick={() => setAdults(adults + 1)}
                          className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1.5">
                        {currentLang === 'vi' ? 'Trẻ em (4-10 tuổi):' : 'Children (4-10 yrs):'}
                      </label>
                      <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center text-xs font-mono tabular-nums font-semibold">
                          {children}
                        </span>
                        <button
                          type="button"
                          onClick={() => setChildren(children + 1)}
                          className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Add-ons and Pickup Options */}
                  <div className="space-y-2 pt-2">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700">
                      {currentLang === 'vi' ? 'Tùy chọn đón & Dịch vụ cộng thêm:' : 'Pickup & Optional Add-ons:'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <label className="flex items-center gap-2 p-3 rounded-xl border border-stone-200 bg-stone-50 cursor-pointer hover:bg-stone-100">
                        <input
                          type="radio"
                          name="pickup"
                          checked={pickupOption === 'hotel'}
                          onChange={() => setPickupOption('hotel')}
                          className="text-amber-800"
                        />
                        <div>
                          <span className="font-semibold block text-stone-900">
                            {currentLang === 'vi' ? 'Đón tận sảnh khách sạn phố cổ' : 'Old Quarter Hotel Pickup'}
                          </span>
                          <span className="text-[11px] text-stone-500">+100.000 ₫ trọn đoàn</span>
                        </div>
                      </label>

                      <label className="flex items-center gap-2 p-3 rounded-xl border border-stone-200 bg-stone-50 cursor-pointer hover:bg-stone-100">
                        <input
                          type="radio"
                          name="pickup"
                          checked={pickupOption === 'meeting'}
                          onChange={() => setPickupOption('meeting')}
                          className="text-amber-800"
                        />
                        <div>
                          <span className="font-semibold block text-stone-900">
                            {currentLang === 'vi' ? 'Tự đến điểm hẹn tập trung' : 'Meet at Tour Departure Spot'}
                          </span>
                          <span className="text-[11px] text-stone-500">Miễn phí / Free</span>
                        </div>
                      </label>
                    </div>

                    <label className="flex items-center gap-2 p-3 rounded-xl border border-amber-200 bg-amber-50/50 cursor-pointer hover:bg-amber-50 mt-2 text-xs">
                      <input
                        type="checkbox"
                        checked={addOnPhoto}
                        onChange={(e) => setAddOnPhoto(e.target.checked)}
                        className="rounded text-amber-800"
                      />
                      <div className="flex-1">
                        <span className="font-semibold block text-amber-950">
                          {currentLang === 'vi'
                            ? 'Kèm gói thợ chụp ảnh kỷ niệm phong cách Film Hà Nội xưa (+350.000 ₫)'
                            : 'Personal vintage film-style photographer package (+350,000 ₫)'}
                        </span>
                        <span className="text-[11px] text-stone-600">
                          {currentLang === 'vi' ? 'Trả 30+ ảnh chỉnh màu nghệ thuật' : 'Includes 30+ color-graded art photos'}
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* Customer Contact Details */}
                  <div className="space-y-3 pt-3 border-t border-stone-200">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700">
                      {currentLang === 'vi' ? 'Thông tin liên hệ của bạn:' : 'Your Contact Details:'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <div className="relative">
                          <User className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                          <input
                            type="text"
                            placeholder={currentLang === 'vi' ? 'Họ và tên của bạn *' : 'Your Full Name *'}
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <div className="relative">
                          <Phone className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                          <input
                            type="tel"
                            placeholder={currentLang === 'vi' ? 'Số điện thoại / Zalo / WhatsApp *' : 'Phone / WhatsApp *'}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <div className="relative">
                          <Mail className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                          <input
                            type="email"
                            placeholder={currentLang === 'vi' ? 'Email nhận phiếu xác nhận' : 'Email address for voucher'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600"
                          />
                        </div>
                      </div>

                      <div>
                        <input
                          type="text"
                          placeholder={currentLang === 'vi' ? 'Yêu cầu đặc biệt (Ăn chay, dị ứng, giờ đón)' : 'Dietary restrictions or pickup hotel'}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600 text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Coupon Voucher Bar */}
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-stone-700">
                      <Tag className="w-4 h-4 text-amber-700" />
                      <span>{currentLang === 'vi' ? 'Mã ưu đãi:' : 'Promo Voucher:'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="HANOI2026"
                        value={voucherInput}
                        onChange={(e) => setVoucherInput(e.target.value)}
                        className="uppercase w-32 px-2.5 py-1.5 rounded-md border border-stone-300 text-xs font-mono"
                      />
                      <button
                        type="button"
                        onClick={applyVoucher}
                        className="px-3 py-1.5 bg-stone-900 text-white rounded-md text-xs font-semibold hover:bg-stone-800"
                      >
                        {currentLang === 'vi' ? 'Áp dụng' : 'Apply'}
                      </button>
                    </div>
                    {voucherError && <span className="w-full text-[11px] text-rose-600">{voucherError}</span>}
                    {discountPercent > 0 && (
                      <span className="w-full text-[11px] text-emerald-700 font-semibold">
                        {currentLang === 'vi' ? `Đã áp dụng giảm ${discountPercent}%!` : `Coupon applied: -${discountPercent}%!`}
                      </span>
                    )}
                  </div>

                  {/* Summary & Price Checkout Strip */}
                  <div className="bg-stone-900 text-white p-5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-xs text-stone-300">
                        {adults} {currentLang === 'vi' ? 'người lớn' : 'adults'}
                        {children > 0 && ` + ${children} ${currentLang === 'vi' ? 'trẻ em' : 'children'}`}
                        {discountPercent > 0 && ` (Đã giảm ${discountPercent}%)`}
                      </div>
                      <div className="text-2xl font-bold font-mono tabular-nums text-amber-300">
                        {formatVnd(grandTotal)}
                      </div>
                      <div className="text-[11px] text-stone-400">
                        {currentLang === 'vi' ? 'Không thu phụ phí · Thanh toán linh hoạt tại tour' : 'No hidden fees · Pay easily on departure'}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] rounded-lg transition-all shadow-md disabled:opacity-50 whitespace-nowrap"
                    >
                      <span>
                        {isSubmitting
                          ? (currentLang === 'vi' ? 'Đang xác nhận...' : 'Confirming...')
                          : (currentLang === 'vi' ? 'Xác Nhận Đặt Tour' : 'Confirm Tour Booking')}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
