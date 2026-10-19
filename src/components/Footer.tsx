import React, { useState } from 'react';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { TourCategory } from '../data/toursData';
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from '../lib/contact';
import { subscribeEmail } from '../lib/adminApi';

interface FooterProps {
  currentLang: 'vi' | 'en';
  onSelectCategory: (cat: TourCategory | 'all') => void;
  onOpenCodeViewer: () => void;
  onOpenLegal: (page: 'privacy' | 'terms' | 'cookies') => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onSelectCategory, onOpenCodeViewer, onOpenLegal }) => {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const [joinError, setJoinError] = useState('');
  const [joining, setJoining] = useState(false);
  const vi = currentLang === 'vi';

  const jump = (cat: TourCategory | 'all') => {
    onSelectCategory(cat);
    document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-white border-t border-stone-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <a href="#home" className="inline-flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center font-serif">H</span>
              <span>
                <span className="block font-serif text-xl text-stone-900">Hana Echoes</span>
                <span className="block text-[9px] tracking-[0.14em] uppercase text-stone-400">
                  {vi ? 'Người thật. Hà Nội sâu hơn.' : 'Real people. Deeper Hanoi.'}
                </span>
              </span>
            </a>
            <p className="mt-4 text-sm text-stone-500 max-w-xs leading-relaxed">
              {vi
                ? 'Tour di sản, ẩm thực phố đêm và cuối tuần chậm rãi tại Hà Nội, dẫn bởi người bản địa.'
                : 'Heritage walks, night food, and unhurried weekend escapes in Hanoi, led by people who live here.'}
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-stone-900 mb-3">{vi ? 'Liên kết' : 'Quick Links'}</h4>
            <ul className="space-y-2 text-sm text-stone-500">
              <li><a className="hover:text-brand" href="#home">{vi ? 'Trang chủ' : 'Home'}</a></li>
              <li><a className="hover:text-brand" href="#about">{vi ? 'Về chúng tôi' : 'About Us'}</a></li>
              <li><button className="hover:text-brand" onClick={() => jump('all')}>{vi ? 'Tour' : 'Tours'}</button></li>
              <li><a className="hover:text-brand" href="#contact">{vi ? 'Liên hệ' : 'Contact'}</a></li>
              <li><a className="hover:text-brand" href="#destinations">{vi ? 'Điểm đến' : 'Destinations'}</a></li>
              <li><a className="hover:text-brand" href="#trip-finder">{vi ? 'Gợi ý theo giờ' : 'Trip Finder'}</a></li>
              <li><a className="hover:text-brand" href="#experiences">{vi ? 'Trải nghiệm' : 'Experiences'}</a></li>
              <li><a className="hover:text-brand" href="#faq">{vi ? 'Câu hỏi thường gặp' : 'FAQ'}</a></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold text-stone-900 mb-3">{vi ? 'Liên hệ' : 'Get in Touch'}</h4>
            <ul className="space-y-3 text-sm text-stone-500">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                <span>38 Hàng Bạc, Hoàn Kiếm, Hà Nội, Vietnam</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand shrink-0" />
                <a className="hover:text-brand" href="mailto:explore@hanoiechoes.com">explore@hanoiechoes.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand shrink-0" />
                <a className="hover:text-brand" href={`tel:${SITE_PHONE_TEL}`}>{SITE_PHONE_DISPLAY}</a>
              </li>
            </ul>
            <p className="mt-4 text-xs text-stone-400">
              {vi ? 'Tư vấn 07:30–22:30 mỗi ngày · Hỗ trợ khẩn 24/7' : 'Desk 07:30–22:30 daily · 24/7 traveler assistance'}
            </p>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold text-stone-900 mb-3">{vi ? 'Cộng đồng' : 'Join Our Community'}</h4>
            <p className="text-sm text-stone-500 mb-3">
              {vi ? 'Nhận gợi ý lịch trình, mẹo phố cổ và ưu đãi.' : 'Get travel inspiration, tips and exclusive offers.'}
            </p>
            {joined ? (
              <p className="text-sm font-medium text-brand">{vi ? 'Đã ghi danh. Hẹn gặp bạn ở Hà Nội.' : "You're on the list. See you in Hanoi."}</p>
            ) : (
              <form
                className="flex items-center bg-stone-50 border border-stone-200 rounded-full pl-4 pr-1 py-1"
                onSubmit={async (event) => {
                  event.preventDefault();
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return;
                  setJoining(true);
                  setJoinError('');
                  try {
                    await subscribeEmail(email.trim());
                    setJoined(true);
                  } catch (err) {
                    setJoinError(err instanceof Error ? err.message : vi ? 'Chưa lưu được email.' : 'Could not save this email.');
                  } finally {
                    setJoining(false);
                  }
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={vi ? 'Email của bạn' : 'Your email address'}
                  className="flex-1 bg-transparent text-sm outline-none min-w-0"
                />
                <button type="submit" disabled={joining} className="w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center disabled:opacity-60" aria-label={vi ? 'Đăng ký' : 'Subscribe'}>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
            {joinError && <p className="mt-2 text-sm text-brand">{joinError}</p>}
            <button onClick={onOpenCodeViewer} className="mt-4 text-xs text-stone-400 hover:text-brand">
              {vi ? 'Xem mã nguồn công khai' : 'View public source'}
            </button>
            <a href="/hanoi-echoes-code.zip" download className="mt-1 block text-xs text-stone-400 hover:text-brand">
              {vi ? 'Tải gói mã nguồn ZIP' : 'Download source ZIP'}
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-400">
          <span>© {new Date().getFullYear()} Hana Echoes. {vi ? 'Bảo lưu mọi quyền.' : 'All rights reserved.'}</span>
          <div className="flex items-center gap-5">
            <button className="hover:text-brand" onClick={() => onOpenLegal('privacy')}>{vi ? 'Chính sách bảo mật' : 'Privacy Policy'}</button>
            <button className="hover:text-brand" onClick={() => onOpenLegal('terms')}>{vi ? 'Điều khoản' : 'Terms of Service'}</button>
            <button className="hover:text-brand" onClick={() => onOpenLegal('cookies')}>{vi ? 'Cookie' : 'Cookie Policy'}</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

