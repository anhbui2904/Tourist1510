import React from 'react';
import { MapPin, Phone, Mail, Compass } from 'lucide-react';

interface FooterProps {
  currentLang: 'vi' | 'en';
  onSelectCategory: (cat: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onSelectCategory }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & About (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <a
              href="#"
              className="inline-flex items-center gap-2.5 text-2xl font-serif font-bold text-white tracking-tight"
            >
              <span className="w-8 h-8 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center text-sm font-semibold">
                HN
              </span>
              <span>Hà Nội Echoes</span>
            </a>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              {currentLang === 'vi'
                ? 'Đơn vị tổ chức các trải nghiệm du lịch di sản, ẩm thực phố đêm và nghỉ dưỡng cuối tuần tinh tế hàng đầu tại Hà Nội. Thiết kế may đo theo thời lượng của từng du khách.'
                : 'Curated heritage, night culinary explorations, and weekend countryside getaways in Hanoi. Tailored to your exact time budget with native local storytellers.'}
            </p>

            <div className="pt-2 text-xs text-stone-400 space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>38 Hàng Bạc, Phường Hàng Bạc, Quận Hoàn Kiếm, Hà Nội</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Hotline / WhatsApp / Zalo: (+84) 0988.246.357</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>explore@hanoiechoes.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links by Duration (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
              {currentLang === 'vi' ? 'Khám Phá Theo Thời Lượng' : 'Explore by Duration'}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onSelectCategory('night')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {currentLang === 'vi' ? '· Tour Buổi Tối (Phố đêm, ẩm thực, Cầu Long Biên)' : '· Night Tours (Food alleys & Eiffel bridge)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('express')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {currentLang === 'vi' ? '· Tour Ngắn 2 - 3 Giờ (Cà phê trứng & xích lô phố cổ)' : '· Express 2-3 Hours (Egg coffee & cyclo)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('halfday')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {currentLang === 'vi' ? '· Tour Nửa Ngày (Hoàng Thành Thăng Long & Hồ Tây)' : '· Half-Day Tours (Citadel & West Lake)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('fullday')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {currentLang === 'vi' ? '· Tour Trọn 1 Ngày (1000 Năm Văn Hiến & Rối Nước VIP)' : '· Full-Day Tour (1,000-Year Heritage & Puppet)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('weekend')}
                  className="hover:text-amber-300 transition-colors"
                >
                  {currentLang === 'vi' ? '· Tour Cuối Tuần (Làng cổ Đường Lâm & Rừng Ba Vì)' : '· Weekend Escapes (Ancient Village & Ba Vi)'}
                </button>
              </li>
            </ul>
          </div>

          {/* Trust Badges & Operating Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
              {currentLang === 'vi' ? 'Giờ Hoạt Động & Hỗ Trợ' : 'Operating Hours & Care'}
            </h4>
            <div className="text-xs text-stone-400 space-y-2">
              <p>{currentLang === 'vi' ? 'Tư vấn & Đặt tour: 07:30 - 22:30 mỗi ngày' : 'Desk & Inquiries: 07:30 - 22:30 Daily'}</p>
              <p>{currentLang === 'vi' ? 'Hỗ trợ khẩn cấp lữ hành: 24/7' : '24/7 Traveler Emergency Assistance'}</p>
              <div className="pt-3 border-t border-stone-800 text-[11px] text-stone-500">
                {currentLang === 'vi'
                  ? 'Giấy phép lữ hành quốc tế số: 01-1829/2026/TCDL-GP LHQT'
                  : 'International Tour Operator License: 01-1829/2026/TCDL'}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Hà Nội Echoes. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-300 transition-colors">
              {currentLang === 'vi' ? 'Điều khoản dịch vụ' : 'Terms of Service'}
            </span>
            <span className="hover:text-stone-300 transition-colors">
              {currentLang === 'vi' ? 'Chính sách bảo mật' : 'Privacy Policy'}
            </span>
            <span className="hover:text-stone-300 transition-colors">
              {currentLang === 'vi' ? 'Bảo hiểm du khách' : 'Traveler Insurance'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
