import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Clock, Mail, MapPin, Phone, ShieldCheck, Star, X } from 'lucide-react';
import { TOURS_DATA, Tour } from '../data/toursData';
import { formatVnd } from '../lib/search';
import {
  PickupOption,
  VerifyChannel,
  isWeekendDate,
  makeBookingCode,
  makeOtp,
  maskEmail,
  maskPhone,
  quoteBooking,
  tomorrowIso,
  voucherPercent,
} from '../lib/booking';
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from '../lib/contact';
import { submitBooking } from '../lib/adminApi';

interface BookingFlowProps {
  open: boolean;
  currentLang: 'vi' | 'en';
  initialTour: Tour | null;
  preferredDate?: string;
  onClose: () => void;
  onSetLang: (lang: 'vi' | 'en') => void;
}

const STEPS = [
  { vi: 'Chọn tour', en: 'Choose tour' },
  { vi: 'Ngày & khách', en: 'Date & guests' },
  { vi: 'Thông tin', en: 'Your details' },
  { vi: 'Xác thực', en: 'Verify' },
  { vi: 'Đặt cọc', en: 'Deposit' },
  { vi: 'Xác nhận', en: 'Confirmed' },
];

export const BookingFlow: React.FC<BookingFlowProps> = ({
  open,
  currentLang,
  initialTour,
  preferredDate,
  onClose,
  onSetLang,
}) => {
  const vi = currentLang === 'vi';
  const t = (a: string, b: string) => (vi ? a : b);
  const wasOpen = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(1);
  const [tourId, setTourId] = useState<string | null>(initialTour?.id ?? null);
  const [date, setDate] = useState(preferredDate || tomorrowIso());
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [pickup, setPickup] = useState<PickupOption>('meeting');
  const [photo, setPhoto] = useState(false);
  const [voucher, setVoucher] = useState('');
  const [discount, setDiscount] = useState(0);
  const [voucherNote, setVoucherNote] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [hotel, setHotel] = useState('');
  const [notes, setNotes] = useState('');
  const [channel, setChannel] = useState<VerifyChannel>('phone');
  const [otp, setOtp] = useState('');
  const [sentCode, setSentCode] = useState('');
  const [sentTo, setSentTo] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [otpError, setOtpError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [paidAck, setPaidAck] = useState(false);
  const [typedRef, setTypedRef] = useState('');
  const [bookingCode, setBookingCode] = useState(makeBookingCode);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  const tour = TOURS_DATA.find((item) => item.id === tourId) || null;
  const quote = tour ? quoteBooking(tour, adults, children, pickup, photo, discount) : null;

  useEffect(() => {
    if (open && !wasOpen.current) {
      setStep(1);
      setTourId(initialTour?.id ?? null);
      setDate(preferredDate || tomorrowIso());
      setAdults(2);
      setChildren(0);
      setPickup('meeting');
      setPhoto(false);
      setVoucher('');
      setDiscount(0);
      setVoucherNote('');
      setFullName('');
      setPhone('');
      setEmail('');
      setHotel('');
      setNotes('');
      setChannel('phone');
      setOtp('');
      setSentCode('');
      setSentTo('');
      setSeconds(0);
      setOtpError('');
      setAttempts(0);
      setPaidAck(false);
      setTypedRef('');
      setBookingCode(makeBookingCode());
      setFormError('');
      setSaving(false);
      window.scrollTo(0, 0);
    }
    wasOpen.current = open;
  }, [open, initialTour, preferredDate]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 });
  }, [step]);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = window.setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [seconds]);

  const weekendIssue = Boolean(tour && tour.category === 'weekend' && date && !isWeekendDate(date));
  const contactKey = `${phone.replace(/\D/g, '')}|${email.trim().toLowerCase()}`;

  useEffect(() => {
    if (!sentCode || !sentTo || sentTo === contactKey) return;
    setSentCode('');
    setSentTo('');
    setOtp('');
    setSeconds(0);
    setAttempts(0);
    setOtpError('');
  }, [contactKey, sentCode, sentTo]);

  const sendCode = () => {
    const next = makeOtp();
    setSentCode(next);
    setSentTo(contactKey);
    setOtp('');
    setOtpError('');
    setAttempts(0);
    setSeconds(60);
  };

  const goNext = async () => {
    setFormError('');
    if (saving) return;
    if (step === 1) {
      if (!tour) {
        setFormError(t('Hãy chọn một tour để tiếp tục.', 'Choose a tour to continue.'));
        return;
      }
    }
    if (step === 2) {
      if (!date) {
        setFormError(t('Hãy chọn ngày khởi hành.', 'Choose a departure date.'));
        return;
      }
      if (date < tomorrowIso()) {
        setFormError(t('Chỉ nhận ngày từ ngày mai trở đi.', 'Departures start from tomorrow.'));
        return;
      }
      if (weekendIssue) {
        setFormError(t('Tour cuối tuần chỉ khởi hành thứ Bảy hoặc Chủ nhật.', 'Weekend tours depart on Saturday or Sunday.'));
        return;
      }
    }
    if (step === 3) {
      if (fullName.trim().length < 2) {
        setFormError(t('Nhập họ tên người đặt.', 'Enter the lead traveler’s name.'));
        return;
      }
      const phoneDigits = phone.replace(/\D/g, '');
      if (phoneDigits.length < 9 || phoneDigits.length > 15) {
        setFormError(
          phoneDigits.length > 15
            ? t('Số điện thoại chỉ được tối đa 15 chữ số.', 'Phone number can have at most 15 digits.')
            : t('Số điện thoại cần ít nhất 9 chữ số.', 'Phone number needs at least 9 digits.'),
        );
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        setFormError(t('Nhập email để nhận phiếu xác nhận.', 'Enter an email for the confirmation.'));
        return;
      }
      if (pickup === 'hotel' && hotel.trim().length < 2) {
        setFormError(t('Nhập tên khách sạn để xe đón.', 'Enter the hotel name for pickup.'));
        return;
      }
    }
    if (step === 4) {
      if (sentTo !== contactKey) {
        setSentCode('');
        setSentTo('');
        setOtp('');
        setSeconds(0);
        setFormError(t('Số điện thoại hoặc email đã đổi. Hãy gửi mã mới.', 'The phone number or email changed. Send a new code.'));
        return;
      }
      if (!sentCode || attempts >= 5) {
        setFormError(
          attempts >= 5
            ? t('Mã cũ đã hết hiệu lực. Hãy gửi mã mới.', 'That code has expired. Send a new one.')
            : t('Hãy gửi mã xác thực trước.', 'Send a verification code first.'),
        );
        return;
      }
      if (otp !== sentCode) {
        const nextAttempts = attempts + 1;
        setAttempts(nextAttempts);
        if (nextAttempts >= 5) {
          setSentCode('');
          setOtp('');
          setSeconds(0);
          setOtpError(t('Bạn đã nhập sai 5 lần. Mã cũ không dùng được nữa. Hãy gửi mã mới.', 'Five incorrect tries. The old code no longer works. Send a new one.'));
        } else {
          setOtpError(t('Mã chưa đúng. Kiểm tra lại 6 số.', 'That code does not match. Check the 6 digits.'));
        }
        return;
      }
    }
    if (step === 5) {
      if (!paidAck) {
        setFormError(t('Xác nhận bạn đã chuyển khoản đặt cọc.', 'Confirm that the deposit has been transferred.'));
        return;
      }
      if (typedRef.trim().toUpperCase() !== bookingCode) {
        setFormError(t('Nhập đúng mã đặt chỗ đã ghi trong nội dung chuyển khoản.', 'Type the booking code used in the transfer note.'));
        return;
      }
      if (!tour || !quote) {
        setFormError(t('Không lưu được đơn. Hãy chọn lại tour.', 'Could not save the booking. Choose the tour again.'));
        return;
      }
      const record = {
        bookingCode,
        tourId: tour.id,
        date,
        adults,
        children,
        pickup,
        photo,
        fullName: fullName.trim(),
        phone,
        email: email.trim(),
        hotel,
        notes,
        tourName: tour.title,
        total: quote.total,
        deposit: quote.deposit,
        balance: quote.balance,
        createdAt: new Date().toISOString(),
        status: 'new' as const,
      };
      try {
        const previous = JSON.parse(localStorage.getItem('hana-bookings') || '[]');
        const list = Array.isArray(previous) ? previous : [];
        const prior = list.find((item) => item && item.bookingCode === record.bookingCode);
        const saved = prior?.createdAt ? { ...record, createdAt: prior.createdAt } : record;
        const rest = list.filter((item) => !item || item.bookingCode !== record.bookingCode);
        localStorage.setItem('hana-bookings', JSON.stringify([saved, ...rest].slice(0, 20)));
      } catch {
        /* the server copy is the one the desk uses */
      }
      setSaving(true);
      try {
        await submitBooking(record);
      } catch (err) {
        setSaving(false);
        setFormError(err instanceof Error ? err.message : t('Không lưu được đơn. Thử lại.', 'Could not save the booking. Try again.'));
        return;
      }
      setSaving(false);
    }
    setStep((value) => Math.min(6, value + 1));
  };

  if (!open) return null;

  return (
    <div ref={panelRef} className="fixed inset-0 z-[60] overflow-y-auto bg-canvas text-ink">
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-4">
          <button onClick={onClose} className="flex items-center gap-2 text-left">
            <span className="w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center font-serif">H</span>
            <span className="hidden sm:block">
              <span className="block font-serif text-lg leading-none text-stone-900">Hana Echoes</span>
              <span className="text-[10px] tracking-[0.14em] uppercase text-stone-400">{t('Đặt tour', 'Booking')}</span>
            </span>
          </button>
          <p className="text-sm text-stone-500">
            {t('Bước', 'Step')} {step}/6 · {vi ? STEPS[step - 1].vi : STEPS[step - 1].en}
          </p>
          <div className="flex items-center gap-2">
            <a href={`tel:${SITE_PHONE_TEL}`} className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-stone-700 hover:text-brand">
              <Phone className="w-4 h-4" />
              {SITE_PHONE_DISPLAY}
            </a>
            <button onClick={() => onSetLang(vi ? 'en' : 'vi')} className="text-sm font-medium text-stone-600 px-2">
              {vi ? 'VI' : 'EN'}
            </button>
            <button onClick={onClose} className="w-9 h-9 rounded-full hover:bg-stone-100 flex items-center justify-center" aria-label={t('Đóng', 'Close')}>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 lg:py-8 grid lg:grid-cols-12 gap-8">
        <div className="lg:hidden">
          <ol className="flex items-center gap-1.5">
            {STEPS.map((item, index) => {
              const number = index + 1;
              const done = number < step;
              const current = number === step;
              return (
                <li key={item.en} className="flex-1">
                  <button
                    type="button"
                    disabled={number > step || step === 6}
                    onClick={() => number < step && step < 6 && setStep(number)}
                    aria-label={vi ? item.vi : item.en}
                    className={`h-1.5 w-full rounded-full ${done || current ? 'bg-brand' : 'bg-stone-200'} disabled:cursor-default`}
                  />
                </li>
              );
            })}
          </ol>
          {tour && quote && (
            <p className="mt-2 text-sm text-stone-600 truncate">
              {vi ? tour.title : tour.titleEn}
              <span className="text-brand font-semibold"> · {formatVnd(quote.deposit)}</span>
            </p>
          )}
        </div>
        <aside className="hidden lg:block lg:col-span-4 space-y-4">
          <ol className="bg-white rounded-[24px] p-4 border border-stone-100">
            {STEPS.map((item, index) => {
              const number = index + 1;
              const done = number < step;
              const current = number === step;
              return (
                <li key={item.en}>
                  <button
                    type="button"
                    disabled={number > step || step === 6}
                    onClick={() => number < step && step < 6 && setStep(number)}
                    className="w-full flex items-center gap-3 py-2 text-left disabled:cursor-default"
                  >
                    <span
                      className={`w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center ${
                        done || current ? 'bg-brand text-white' : 'bg-stone-100 text-stone-400'
                      }`}
                    >
                      {done ? <Check className="w-3.5 h-3.5" /> : number}
                    </span>
                    <span className={`text-sm ${current ? 'text-stone-900 font-semibold' : 'text-stone-500'}`}>
                      {vi ? item.vi : item.en}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          {tour && quote && <Summary tour={tour} quote={quote} date={date} adults={adults} children={children} vi={vi} />}
        </aside>

        <main className="lg:col-span-8">
          <div className="bg-white rounded-[28px] border border-stone-100 p-5 sm:p-8 shadow-[0_10px_40px_rgba(80,30,40,0.04)]">
            {step === 1 && (
              <TourStep
                vi={vi}
                tourId={tourId}
                onSelect={(id) => {
                  setTourId(id);
                  setFormError('');
                }}
              />
            )}
            {step === 2 && tour && quote && (
              <DateStep
                vi={vi}
                tour={tour}
                date={date}
                adults={adults}
                children={children}
                pickup={pickup}
                photo={photo}
                voucher={voucher}
                voucherNote={voucherNote}
                weekendIssue={weekendIssue}
                onDate={setDate}
                onAdults={setAdults}
                onChildren={setChildren}
                onPickup={setPickup}
                onPhoto={setPhoto}
                onVoucher={setVoucher}
                onApply={() => {
                  const percent = voucherPercent(voucher);
                  if (percent === null) {
                    setDiscount(0);
                    setVoucherNote(t('Mã không hợp lệ. Thử HANOI2026 hoặc WELCOME.', 'Invalid code. Try HANOI2026 or WELCOME.'));
                    return;
                  }
                  setDiscount(percent);
                  setVoucherNote(percent ? t(`Đã giảm ${percent}%.`, `${percent}% off applied.`) : '');
                }}
              />
            )}
            {step === 3 && (
              <DetailsStep
                vi={vi}
                pickup={pickup}
                fullName={fullName}
                phone={phone}
                email={email}
                hotel={hotel}
                notes={notes}
                onName={setFullName}
                onPhone={setPhone}
                onEmail={setEmail}
                onHotel={setHotel}
                onNotes={setNotes}
              />
            )}
            {step === 4 && (
              <VerifyStep
                vi={vi}
                channel={channel}
                email={email}
                phone={phone}
                otp={otp}
                sent={Boolean(sentCode)}
                sentCode={sentCode}
                seconds={seconds}
                error={otpError}
                onChannel={setChannel}
                onOtp={setOtp}
                onSend={sendCode}
              />
            )}
            {step === 5 && quote && (
              <DepositStep
                vi={vi}
                code={bookingCode}
                deposit={quote.deposit}
                balance={quote.balance}
                paidAck={paidAck}
                typedRef={typedRef}
                onAck={setPaidAck}
                onRef={setTypedRef}
              />
            )}
            {step === 6 && tour && quote && (
              <ConfirmStep
                vi={vi}
                tour={tour}
                code={bookingCode}
                date={date}
                adults={adults}
                children={children}
                fullName={fullName}
                phone={phone}
                email={email}
                quote={quote}
                onClose={onClose}
              />
            )}

            {formError && <p className="mt-4 text-sm text-brand">{formError}</p>}

            {step < 6 && (
              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => (step === 1 ? onClose() : setStep((value) => value - 1))}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-stone-600 hover:bg-stone-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {step === 1 ? t('Về trang chủ', 'Back home') : t('Quay lại', 'Back')}
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand hover:bg-brand-dark text-white text-sm font-semibold disabled:opacity-60"
                >
                  {saving ? t('Đang gửi đơn…', 'Sending booking…') : step === 5 ? t('Xác nhận đặt tour', 'Confirm booking') : t('Tiếp tục', 'Continue')}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

function Summary({
  tour,
  quote,
  date,
  adults,
  children,
  vi,
}: {
  tour: Tour;
  quote: ReturnType<typeof quoteBooking>;
  date: string;
  adults: number;
  children: number;
  vi: boolean;
}) {
  return (
    <div className="bg-white rounded-[24px] overflow-hidden border border-stone-100">
      <img src={tour.image} alt="" className="h-36 w-full object-cover" />
      <div className="p-4 space-y-2">
        <h3 className="font-serif text-xl leading-snug text-stone-900">{vi ? tour.title : tour.titleEn}</h3>
        <p className="text-xs text-stone-500 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {vi ? tour.duration : tour.durationEn}
          {date ? ` · ${date}` : ''}
        </p>
        <p className="text-xs text-stone-500">
          {adults} {vi ? 'người lớn' : 'adults'}
          {children > 0 ? ` · ${children} ${vi ? 'trẻ em' : 'children'}` : ''}
        </p>
        <div className="pt-2 border-t border-stone-100 text-sm space-y-1">
          <Row label={vi ? 'Tổng tour' : 'Tour total'} value={formatVnd(quote.total)} />
          <Row label={vi ? 'Đặt cọc 30%' : '30% deposit'} value={formatVnd(quote.deposit)} strong />
          <Row label={vi ? 'Còn lại khi đi' : 'Due on the day'} value={formatVnd(quote.balance)} />
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between gap-3 ${strong ? 'font-semibold text-brand' : 'text-stone-600'}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function TourStep({ vi, tourId, onSelect }: { vi: boolean; tourId: string | null; onSelect: (id: string) => void }) {
  const [query, setQuery] = useState('');
  const tours = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TOURS_DATA;
    return TOURS_DATA.filter((tour) => `${tour.title} ${tour.titleEn} ${tour.taglineEn}`.toLowerCase().includes(q));
  }, [query]);

  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-brand">{vi ? 'Bước 1' : 'Step 1'}</p>
      <h2 className="mt-1 font-serif text-3xl sm:text-4xl text-stone-900">{vi ? 'Chọn tour' : 'Choose your tour'}</h2>
      <p className="mt-2 text-sm text-stone-500">
        {vi ? 'Chọn một hành trình. Bạn vẫn đổi được trước khi nhập thông tin.' : 'Pick one journey. You can change it before entering your details.'}
      </p>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={vi ? 'Tìm theo tên tour' : 'Search by tour name'}
        className="mt-5 w-full rounded-full border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-brand"
      />
      <div className="mt-4 space-y-3 max-h-[520px] overflow-y-auto pr-1">
        {tours.map((tour) => {
          const selected = tour.id === tourId;
          return (
            <button
              key={tour.id}
              type="button"
              onClick={() => onSelect(tour.id)}
              className={`w-full flex gap-3 p-3 rounded-2xl border text-left ${selected ? 'border-brand bg-brand-soft' : 'border-stone-200 hover:border-stone-300'}`}
            >
              <img src={tour.image} alt="" className="w-24 h-20 rounded-xl object-cover shrink-0" />
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2 text-[11px] text-stone-500">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {tour.rating.toFixed(1)} · {vi ? tour.duration : tour.durationEn}
                </span>
                <span className="block font-serif text-lg leading-snug text-stone-900">{vi ? tour.title : tour.titleEn}</span>
                <span className="block text-sm font-semibold text-brand mt-1">{vi ? 'Từ' : 'From'} {formatVnd(tour.priceVnd)}</span>
              </span>
              <span className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${selected ? 'border-brand bg-brand text-white' : 'border-stone-300'}`}>
                {selected && <Check className="w-3 h-3" />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DateStep(props: {
  vi: boolean;
  tour: Tour;
  date: string;
  adults: number;
  children: number;
  pickup: PickupOption;
  photo: boolean;
  voucher: string;
  voucherNote: string;
  weekendIssue: boolean;
  onDate: (value: string) => void;
  onAdults: (value: number) => void;
  onChildren: (value: number) => void;
  onPickup: (value: PickupOption) => void;
  onPhoto: (value: boolean) => void;
  onVoucher: (value: string) => void;
  onApply: () => void;
}) {
  const { vi, tour } = props;
  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-brand">{vi ? 'Bước 2' : 'Step 2'}</p>
      <h2 className="mt-1 font-serif text-3xl sm:text-4xl text-stone-900">{vi ? 'Ngày và số khách' : 'Date and guests'}</h2>
      <p className="mt-2 text-sm text-stone-500">{vi ? tour.departureTime : tour.departureTimeEn}</p>
      <label className="block mt-6 text-xs font-semibold uppercase tracking-wide text-stone-500">
        {vi ? 'Ngày khởi hành' : 'Departure date'}
        <input
          type="date"
          min={tomorrowIso()}
          value={props.date}
          onChange={(event) => props.onDate(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm text-stone-800 outline-none focus:border-brand"
        />
      </label>
      {props.weekendIssue && (
        <p className="mt-2 text-sm text-brand">{vi ? 'Tour này chỉ đi thứ Bảy và Chủ nhật.' : 'This tour runs on Saturday and Sunday only.'}</p>
      )}
      <div className="mt-5 grid sm:grid-cols-2 gap-3">
        <Counter label={vi ? 'Người lớn' : 'Adults'} hint={formatVnd(tour.priceVnd)} value={props.adults} min={1} onChange={props.onAdults} />
        <Counter label={vi ? 'Trẻ em 4–10 tuổi' : 'Children 4–10'} hint={vi ? '70% giá người lớn' : '70% of adult fare'} value={props.children} min={0} onChange={props.onChildren} />
      </div>
      <div className="mt-5 grid sm:grid-cols-2 gap-3">
        <Choice
          selected={props.pickup === 'meeting'}
          title={vi ? 'Tự đến điểm hẹn' : 'Meet at the start point'}
          detail={vi ? 'Không phụ phí' : 'No extra fee'}
          onClick={() => props.onPickup('meeting')}
        />
        <Choice
          selected={props.pickup === 'hotel'}
          title={vi ? 'Đón khách sạn phố cổ' : 'Old Quarter hotel pickup'}
          detail={`+${formatVnd(100000)}`}
          onClick={() => props.onPickup('hotel')}
        />
      </div>
      <label className="mt-3 flex items-start gap-3 rounded-2xl border border-stone-200 p-4 cursor-pointer">
        <input type="checkbox" checked={props.photo} onChange={(event) => props.onPhoto(event.target.checked)} className="mt-1" />
        <span>
          <span className="block text-sm font-semibold text-stone-900">{vi ? 'Thợ ảnh phong cách film' : 'Film-style photographer'}</span>
          <span className="block text-xs text-stone-500">+{formatVnd(350000)} · {vi ? '30 ảnh chỉnh màu' : '30 graded photos'}</span>
        </span>
      </label>
      <div className="mt-4 flex gap-2">
        <input
          value={props.voucher}
          onChange={(event) => props.onVoucher(event.target.value.toUpperCase())}
          placeholder="HANOI2026"
          className="flex-1 rounded-full border border-stone-200 px-4 py-2.5 text-sm uppercase outline-none focus:border-brand"
        />
        <button type="button" onClick={props.onApply} className="px-4 rounded-full bg-stone-900 text-white text-sm font-semibold">
          {vi ? 'Áp dụng' : 'Apply'}
        </button>
      </div>
      {props.voucherNote && <p className="mt-2 text-sm text-stone-600">{props.voucherNote}</p>}
    </div>
  );
}

function Counter({ label, hint, value, min, onChange }: { label: string; hint: string; value: number; min: number; onChange: (value: number) => void }) {
  return (
    <div className="rounded-2xl border border-stone-200 p-4">
      <div className="text-sm font-semibold text-stone-900">{label}</div>
      <div className="text-xs text-stone-400">{hint}</div>
      <div className="mt-3 flex items-center justify-between">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))} className="w-8 h-8 rounded-full bg-stone-100 font-semibold">-</button>
        <span className="font-semibold">{value}</span>
        <button type="button" onClick={() => onChange(Math.min(20, value + 1))} className="w-8 h-8 rounded-full bg-stone-100 font-semibold">+</button>
      </div>
    </div>
  );
}

function Choice({ selected, title, detail, onClick }: { selected: boolean; title: string; detail: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`text-left rounded-2xl border p-4 ${selected ? 'border-brand bg-brand-soft' : 'border-stone-200'}`}>
      <span className="block text-sm font-semibold text-stone-900">{title}</span>
      <span className="block text-xs text-stone-500 mt-1">{detail}</span>
    </button>
  );
}

function DetailsStep(props: {
  vi: boolean;
  pickup: PickupOption;
  fullName: string;
  phone: string;
  email: string;
  hotel: string;
  notes: string;
  onName: (value: string) => void;
  onPhone: (value: string) => void;
  onEmail: (value: string) => void;
  onHotel: (value: string) => void;
  onNotes: (value: string) => void;
}) {
  const { vi } = props;
  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-brand">{vi ? 'Bước 3' : 'Step 3'}</p>
      <h2 className="mt-1 font-serif text-3xl sm:text-4xl text-stone-900">{vi ? 'Thông tin liên hệ' : 'Your details'}</h2>
      <p className="mt-2 text-sm text-stone-500">
        {vi ? 'Người này nhận mã xác thực và phiếu giữ chỗ.' : 'This person receives the verification code and the hold.'}
      </p>
      <div className="mt-6 grid sm:grid-cols-2 gap-3">
        <Field label={vi ? 'Họ và tên' : 'Full name'} value={props.fullName} onChange={props.onName} />
        <Field label={vi ? 'Điện thoại / Zalo' : 'Phone / Zalo'} value={props.phone} onChange={props.onPhone} type="tel" />
        <Field label="Email" value={props.email} onChange={props.onEmail} type="email" />
        {props.pickup === 'hotel' && (
          <Field label={vi ? 'Khách sạn đón' : 'Pickup hotel'} value={props.hotel} onChange={props.onHotel} />
        )}
      </div>
      <label className="block mt-3 text-xs font-semibold uppercase tracking-wide text-stone-500">
        {vi ? 'Ghi chú' : 'Notes'}
        <textarea
          value={props.notes}
          onChange={(event) => props.onNotes(event.target.value)}
          rows={3}
          placeholder={vi ? 'Ăn chay, dị ứng, giờ đón...' : 'Diet, allergies, pickup time...'}
          className="mt-2 w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-brand"
        />
      </label>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <label className="block text-xs font-semibold uppercase tracking-wide text-stone-500">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm font-normal normal-case tracking-normal text-stone-800 outline-none focus:border-brand"
      />
    </label>
  );
}

function VerifyStep(props: {
  vi: boolean;
  channel: VerifyChannel;
  email: string;
  phone: string;
  otp: string;
  sent: boolean;
  sentCode: string;
  seconds: number;
  error: string;
  onChannel: (value: VerifyChannel) => void;
  onOtp: (value: string) => void;
  onSend: () => void;
}) {
  const { vi } = props;
  const target = props.channel === 'email' ? maskEmail(props.email) : maskPhone(props.phone);
  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-brand">{vi ? 'Bước 4' : 'Step 4'}</p>
      <h2 className="mt-1 font-serif text-3xl sm:text-4xl text-stone-900">{vi ? 'Xác thực liên hệ' : 'Verify your contact'}</h2>
      <p className="mt-2 text-sm text-stone-500">
        {vi ? 'Chọn một kênh. Nhập sai 5 lần thì mã cũ hết hiệu lực.' : 'Choose one channel. Five wrong tries retire the current code.'}
      </p>
      <div className="mt-6 grid sm:grid-cols-2 gap-3">
        <Choice
          selected={props.channel === 'phone'}
          title={vi ? 'Điện thoại' : 'Phone'}
          detail={maskPhone(props.phone)}
          onClick={() => props.onChannel('phone')}
        />
        <Choice
          selected={props.channel === 'email'}
          title="Email"
          detail={maskEmail(props.email)}
          onClick={() => props.onChannel('email')}
        />
      </div>
      <button
        type="button"
        disabled={props.seconds > 0}
        onClick={props.onSend}
        className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-stone-900 text-white text-sm font-semibold disabled:opacity-50"
      >
        {props.channel === 'email' ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
        {props.sent ? (props.seconds > 0 ? `${vi ? 'Gửi lại sau' : 'Resend in'} ${props.seconds}s` : vi ? 'Gửi mã mới' : 'Send a new code') : vi ? 'Gửi mã' : 'Send code'}
      </button>
      {props.sent && (
        <div className="mt-4 rounded-2xl border border-dashed border-brand/40 bg-brand-soft px-4 py-3 text-sm text-stone-700">
          <span className="flex items-center gap-2 font-semibold text-brand-dark">
            <ShieldCheck className="w-4 h-4" />
            {vi ? `Mã gửi tới ${target}` : `Code for ${target}`}
          </span>
          <p className="mt-1">
            {vi
              ? 'Bản trên máy này chưa nối tổng đài SMS hay hộp thư. Mã của phiên hiện ngay để bạn thử nốt quy trình.'
              : 'This local preview is not connected to SMS or email. The session code is shown here so you can finish the flow.'}
          </p>
          <p className="mt-2 font-mono text-2xl tracking-[0.3em] text-stone-900">{props.sentCode}</p>
        </div>
      )}
      <label className="block mt-5 text-xs font-semibold uppercase tracking-wide text-stone-500">
        {vi ? 'Nhập 6 số' : 'Enter 6 digits'}
        <input
          inputMode="numeric"
          maxLength={6}
          value={props.otp}
          onChange={(event) => props.onOtp(event.target.value.replace(/\D/g, '').slice(0, 6))}
          className="mt-2 w-full rounded-2xl border border-stone-200 px-4 py-3 text-center font-mono text-2xl tracking-[0.4em] outline-none focus:border-brand"
        />
      </label>
      {props.error && <p className="mt-2 text-sm text-brand">{props.error}</p>}
    </div>
  );
}

function DepositStep(props: {
  vi: boolean;
  code: string;
  deposit: number;
  balance: number;
  paidAck: boolean;
  typedRef: string;
  onAck: (value: boolean) => void;
  onRef: (value: string) => void;
}) {
  const { vi } = props;
  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-brand">{vi ? 'Bước 5' : 'Step 5'}</p>
      <h2 className="mt-1 font-serif text-3xl sm:text-4xl text-stone-900">{vi ? 'Đặt cọc giữ chỗ' : 'Pay the deposit'}</h2>
      <p className="mt-2 text-sm text-stone-500">
        {vi
          ? 'Cọc 30% giữ chỗ trong 2 giờ. Phần còn lại trả cho hướng dẫn viên khi gặp mặt.'
          : 'A 30% deposit holds the seat for 2 hours. The rest is paid to your guide at meeting time.'}
      </p>
      <div className="mt-6 rounded-[24px] bg-stone-900 text-white p-5">
        <p className="text-xs uppercase tracking-[0.16em] text-rose-200">{vi ? 'Số tiền cọc' : 'Deposit due'}</p>
        <p className="mt-1 font-serif text-4xl">{formatVnd(props.deposit)}</p>
        <p className="mt-2 text-sm text-stone-300">{vi ? 'Còn lại khi đi' : 'Balance on the day'}: {formatVnd(props.balance)}</p>
      </div>
      <dl className="mt-4 rounded-2xl border border-stone-200 divide-y divide-stone-100 text-sm">
        <Info label={vi ? 'Ngân hàng' : 'Bank'} value="Vietcombank — Hà Nội" />
        <Info label={vi ? 'Chủ tài khoản' : 'Account name'} value="HANA ECHOES" />
        <Info label={vi ? 'Số tài khoản mẫu' : 'Sample account'} value="1018 889 2026" />
        <Info label={vi ? 'Nội dung chuyển khoản' : 'Transfer note'} value={props.code} />
      </dl>
      <p className="mt-3 text-sm text-stone-600">
        {vi ? 'Mọi liên hệ với người phụ trách: ' : 'Every enquiry goes to the site contact: '}
        <a className="font-semibold text-brand" href={`tel:${SITE_PHONE_TEL}`}>{SITE_PHONE_DISPLAY}</a>
      </p>
      <p className="mt-3 text-xs text-stone-400 flex items-start gap-2">
        <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
        {vi
          ? 'Số tài khoản trên là mẫu cho bản chạy trên máy, chưa phải cổng thanh toán thật.'
          : 'The account number is a sample for this local preview, not a live payment gateway.'}
      </p>
      <label className="mt-4 flex items-start gap-3 text-sm text-stone-700">
        <input type="checkbox" checked={props.paidAck} onChange={(event) => props.onAck(event.target.checked)} className="mt-1" />
        <span>{vi ? 'Tôi đã chuyển đúng số cọc và ghi mã đặt chỗ trong nội dung.' : 'I transferred the deposit and used the booking code as the note.'}</span>
      </label>
      <label className="block mt-4 text-xs font-semibold uppercase tracking-wide text-stone-500">
        {vi ? 'Nhập lại mã đặt chỗ' : 'Re-enter the booking code'}
        <input
          value={props.typedRef}
          onChange={(event) => props.onRef(event.target.value.toUpperCase())}
          placeholder={props.code}
          className="mt-2 w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm font-mono tracking-wider outline-none focus:border-brand"
        />
      </label>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <dt className="text-stone-400">{label}</dt>
      <dd className="font-semibold text-stone-900 text-right">{value}</dd>
    </div>
  );
}

function ConfirmStep(props: {
  vi: boolean;
  tour: Tour;
  code: string;
  date: string;
  adults: number;
  children: number;
  fullName: string;
  phone: string;
  email: string;
  quote: ReturnType<typeof quoteBooking>;
  onClose: () => void;
}) {
  const { vi, tour, quote } = props;
  return (
    <div className="text-center sm:text-left">
      <div className="w-14 h-14 rounded-full bg-brand-soft text-brand flex items-center justify-center mx-auto sm:mx-0">
        <Check className="w-7 h-7" />
      </div>
      <p className="mt-4 text-[11px] font-semibold tracking-[0.16em] uppercase text-brand">{vi ? 'Bước 6' : 'Step 6'}</p>
      <h2 className="mt-1 font-serif text-3xl sm:text-4xl text-stone-900">{vi ? 'Đặt tour đã được xác nhận' : 'Your booking is confirmed'}</h2>
      <p className="mt-2 text-sm text-stone-500">
        {vi
          ? 'Chỗ được giữ sau khi ghi nhận đặt cọc. Hướng dẫn viên sẽ gọi lại trong giờ làm việc.'
          : 'The seat is held once the deposit is recorded. A guide will call during desk hours.'}
      </p>
      <p className="mt-4 text-sm text-stone-600">
        {vi ? 'Liên hệ người phụ trách: ' : 'Contact the person in charge: '}
        <a className="font-semibold text-brand" href={`tel:${SITE_PHONE_TEL}`}>{SITE_PHONE_DISPLAY}</a>
      </p>
      <p className="mt-6 font-mono text-3xl tracking-wider text-stone-900">{props.code}</p>
      <div className="mt-6 rounded-2xl bg-canvas p-4 text-sm text-left space-y-2">
        <Row label={vi ? 'Tour' : 'Tour'} value={vi ? tour.title : tour.titleEn} />
        <Row label={vi ? 'Ngày' : 'Date'} value={props.date} />
        <Row label={vi ? 'Khách' : 'Guests'} value={`${props.adults} + ${props.children}`} />
        <Row label={vi ? 'Người đặt' : 'Lead'} value={`${props.fullName} · ${props.phone}`} />
        <Row label="Email" value={props.email} />
        <Row label={vi ? 'Đã cọc' : 'Deposit'} value={formatVnd(quote.deposit)} />
        <Row label={vi ? 'Còn lại' : 'Balance'} value={formatVnd(quote.balance)} />
        <Row label={vi ? 'Phụ trách' : 'Contact'} value={SITE_PHONE_DISPLAY} />
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={() => window.print()} className="px-5 py-3 rounded-full border border-stone-200 text-sm font-semibold">
          {vi ? 'In phiếu' : 'Print'}
        </button>
        <button type="button" onClick={props.onClose} className="px-5 py-3 rounded-full bg-brand text-white text-sm font-semibold">
          {vi ? 'Về trang chủ' : 'Back home'}
        </button>
      </div>
    </div>
  );
}
