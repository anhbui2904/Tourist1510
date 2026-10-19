import React from 'react';
import { BadgeCheck, CalendarClock, Map, Users } from 'lucide-react';
import { SectionLabel } from './SectionLabel';

const ITEMS = [
  {
    icon: Users,
    titleVi: 'Hướng dẫn viên địa phương',
    titleEn: 'Local Expert Guides',
    descVi: 'Người Hà Nội kể chuyện phố mình — ngõ nhỏ, quán gia truyền, điều không có trong sách.',
    descEn: 'Passionate locals who share real stories and hidden gems.',
  },
  {
    icon: Map,
    titleVi: 'Lịch trình được chọn lọc',
    titleEn: 'Curated Itineraries',
    descVi: 'Thiết kế theo quỹ giờ của bạn: 2 giờ, buổi tối, nửa ngày, trọn ngày hay cuối tuần.',
    descEn: 'Thoughtfully designed experiences, not just checklists.',
  },
  {
    icon: BadgeCheck,
    titleVi: 'Giá minh bạch',
    titleEn: 'Transparent Pricing',
    descVi: 'Giá trọn gói, không phí ẩn, không dẫn vào cửa hàng hoa hồng.',
    descEn: 'No hidden fees, great value for authentic experiences.',
  },
  {
    icon: CalendarClock,
    titleVi: 'Đặt chỗ linh hoạt',
    titleEn: 'Flexible Booking',
    descVi: 'Đổi giờ miễn phí trước 24 giờ. Hỗ trợ trước và trong suốt chuyến đi.',
    descEn: 'Easy changes and full support before and during your trip.',
  },
];

export const WhyUsSection: React.FC<{ currentLang: 'vi' | 'en' }> = ({ currentLang }) => {
  return (
    <section id="about" className="bg-white py-16 sm:py-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mb-12">
          <SectionLabel>{currentLang === 'vi' ? 'Vì sao đi cùng Hana Echoes' : 'Why travel with Hana Echoes'}</SectionLabel>
          <h2 className="mt-2 font-serif text-4xl sm:text-5xl text-stone-900">
            {currentLang === 'vi' ? 'Du lịch có ý nghĩa hơn' : 'More Meaningful Travel'}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.titleEn}>
                <div className="w-14 h-14 rounded-full bg-brand-soft text-brand flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl text-stone-900">{currentLang === 'vi' ? item.titleVi : item.titleEn}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">{currentLang === 'vi' ? item.descVi : item.descEn}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
