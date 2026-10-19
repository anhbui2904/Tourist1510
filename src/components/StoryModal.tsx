import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from '../lib/contact';

const SLIDES = [
  {
    image: '/images/hanoi_night_streetfood_1791949154924.jpg',
    vi: 'Hà Nội ngon nhất khi phố vừa lên đèn — bún chả than hoa, phở cuốn, và một bát nước dùng nhà nấu.',
    en: 'Hanoi tastes best just after the lights come on — charcoal bun cha, warm rice rolls, and a family broth.',
  },
  {
    image: '/images/hero_hanoi_twilight_1791949155360.jpg',
    vi: 'Chúng tôi không dẫn đoàn loa phóng thanh. Chúng tôi đi chậm qua 36 phố phường cùng người sống ở đó.',
    en: 'We do not lead megaphone groups. We walk the 36 guild streets slowly, with people who live on them.',
  },
  {
    image: '/images/hanoi_egg_coffee_culture_1791949155871.jpg',
    vi: 'Hai giờ rưỡi cũng đủ cho một lát Hà Nội: cà phê trứng, ban công gỗ, và một công thức mang về.',
    en: 'Two and a half hours is enough for a real slice of the city: egg coffee, a wooden balcony, a recipe to take home.',
  },
  {
    image: '/images/hanoi_heritage_temple_1791949156492.jpg',
    vi: 'Văn Miếu, Hoàng thành, Hồ Tây — những nơi cần người kể, không cần danh sách check-in.',
    en: 'Temple of Literature, the citadel, West Lake — places that need a storyteller, not a checklist.',
  },
  {
    image: '/images/hanoi_weekend_getaway_1791949156933.jpg',
    vi: 'Cuối tuần, thành phố nhường chỗ cho làng cổ và rừng thông. Vẫn là Hà Nội, chỉ chậm hơn.',
    en: 'On weekends the city gives way to laterite villages and pine air. Still Hanoi — just slower.',
  },
];

export const StoryModal: React.FC<{ open: boolean; onClose: () => void; currentLang: 'vi' | 'en'; onExplore: () => void }> = ({
  open,
  onClose,
  currentLang,
  onExplore,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 4200);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.clearInterval(timer);
    };
  }, [open, onClose]);

  if (!open) return null;
  const slide = SLIDES[index];

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative w-full max-w-3xl bg-stone-950 rounded-[24px] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <img src={slide.image} alt="" className="w-full h-[420px] sm:h-[480px] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20" />
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 text-stone-800 flex items-center justify-center" aria-label="Close">
          <X className="w-4 h-4" />
        </button>
        <div className="absolute left-6 right-6 bottom-6 text-white">
          <p className="text-[11px] tracking-[0.18em] uppercase text-white/70">
            {currentLang === 'vi' ? 'Câu chuyện của chúng tôi' : 'Our story'} · {index + 1}/{SLIDES.length}
          </p>
          <p className="mt-2 font-serif text-2xl sm:text-3xl leading-snug max-w-xl">{currentLang === 'vi' ? slide.vi : slide.en}</p>
          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex gap-1.5">
              {SLIDES.map((_, i) => (
                <button key={i} onClick={() => setIndex(i)} className={`h-1.5 rounded-full ${i === index ? 'w-6 bg-white' : 'w-2 bg-white/40'}`} aria-label={`Slide ${i + 1}`} />
              ))}
            </div>
            <button
              onClick={() => {
                onClose();
                onExplore();
              }}
              className="px-4 py-2 rounded-full bg-brand text-white text-sm font-semibold"
            >
              {currentLang === 'vi' ? 'Xem các tour' : 'Explore tours'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LegalModal: React.FC<{
  page: 'privacy' | 'terms' | 'cookies' | null;
  currentLang: 'vi' | 'en';
  onClose: () => void;
}> = ({ page, currentLang, onClose }) => {
  useEffect(() => {
    if (!page) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [page, onClose]);

  if (!page) return null;
  const vi = currentLang === 'vi';
  const copy = {
    privacy: {
      title: vi ? 'Chính sách bảo mật' : 'Privacy Policy',
      body: vi
        ? 'Chúng tôi chỉ dùng họ tên, số điện thoại và email bạn nhập khi đặt tour để xác nhận chỗ và liên hệ hướng dẫn viên. Danh sách tour đã lưu nằm trên trình duyệt của bạn. Chúng tôi không bán dữ liệu khách.'
        : 'We use the name, phone, and email you enter when booking only to confirm your seat and reach you. Saved tours stay in your browser. We do not sell guest data.',
    },
    terms: {
      title: vi ? 'Điều khoản dịch vụ' : 'Terms of Service',
      body: vi
        ? 'Giá hiển thị là giá trọn gói cho mỗi khách theo tour đã chọn. Trẻ em 4–10 tuổi tính 70%. Đón khách sạn phố cổ cộng 100.000₫/đoàn, gói ảnh cộng 350.000₫. Đổi giờ miễn phí trước 24 giờ. Mã HANOI2026 giảm 10%, WELCOME giảm 5%. Mỗi đoàn có bảo hiểm du lịch theo giấy phép lữ hành.'
        : 'Prices shown are per guest and include what each tour lists. Children aged 4–10 are 70%. Old Quarter hotel pickup is 100,000₫ per group; the photo add-on is 350,000₫. Reschedule free up to 24 hours before departure. Code HANOI2026 is 10% off, WELCOME is 5% off. Groups include traveler insurance under our operator license.',
    },
    cookies: {
      title: vi ? 'Chính sách cookie' : 'Cookie Policy',
      body: vi
        ? 'Trang này lưu tour bạn đánh dấu yêu thích trong localStorage của trình duyệt để bạn xem lại. Không dùng cookie quảng cáo bên thứ ba.'
        : 'This site stores tours you heart in your browser’s local storage so you can come back to them. We do not use third-party advertising cookies.',
    },
  }[page];

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-2xl text-stone-900">{copy.title}</h3>
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-800" aria-label="Close"><X className="w-5 h-5" /></button>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-stone-600">{copy.body}</p>
        <p className="mt-4 text-sm text-stone-600">
          {vi ? 'Mọi liên hệ với người phụ trách trang: ' : 'Every enquiry to the person responsible for this site: '}
          <a className="font-semibold text-brand" href={`tel:${SITE_PHONE_TEL}`}>{SITE_PHONE_DISPLAY}</a>
        </p>
      </div>
    </div>
  );
};
