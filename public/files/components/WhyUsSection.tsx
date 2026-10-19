import React from 'react';
import { ShieldCheck, HeartHandshake, Sparkles, Coffee } from 'lucide-react';

interface WhyUsSectionProps {
  currentLang: 'vi' | 'en';
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({ currentLang }) => {
  const principles = [
    {
      num: '01',
      titleVi: 'Hướng Dẫn Viên Bản Địa Gốc Tràng An',
      titleEn: 'Native Old Hanoi Storytellers',
      descVi: 'Mỗi hướng dẫn viên của chúng tôi đều sinh ra và lớn lên giữa lòng phố cổ. Không chỉ thuộc lòng từng ngõ ngách 0.8m, họ còn kể cho bạn những giai thoại sống động chưa từng có trên bản đồ.',
      descEn: 'Every guide was born and raised within the 36 guild streets. They don’t just know the 0.8m alleys; they share oral histories never published in standard guidebooks.',
      icon: HeartHandshake,
    },
    {
      num: '02',
      titleVi: 'Linh Hoạt Theo Mọi Quỹ Thời Gian',
      titleEn: 'Crafted For Every Hour & Layover',
      descVi: 'Dù bạn chỉ có 2-3 giờ giữa chuyến bay, một buổi tối thảnh thơi sau ngày làm việc, hay 2 ngày cuối tuần xả hơi — chúng tôi luôn có lịch trình vừa vặn, không vội vã, không mệt mỏi.',
      descEn: 'Whether you have a 2-hour flight layover, a free evening after business meetings, or a 2-day weekend retreat, our pacing is unhurried and finely calibrated.',
      icon: Coffee,
    },
    {
      num: '03',
      titleVi: 'Nói Không Với Ép Mua Sắm & Ồn Ào',
      titleEn: 'Zero Shopping Traps & Loud Megaphones',
      descVi: 'Cam kết 100% không dẫn khách vào các cửa hàng lưu niệm hoa hồng, không dùng loa phóng thanh ồn ào. Chúng tôi bảo tồn sự tôn nghiêm của di tích và không gian ấm cúng của nhóm nhỏ.',
      descEn: 'We strictly ban commission shopping traps and loud tour megaphones, preserving the solemnity of heritage sites and the intimacy of small gatherings.',
      icon: ShieldCheck,
    },
    {
      num: '04',
      titleVi: 'Ẩm Thực Tuyển Chọn Từ Hàng Quán Gia Truyền',
      titleEn: 'Curated Multi-Generational Culinary Gems',
      descVi: 'Mọi bát phở, đĩa bún chả hay ly cà phê trứng trong tour đều đến từ những gia đình gìn giữ nghề qua 3 thế hệ, tôn vinh trọn vẹn gia vị tự nhiên và sự sạch sẽ tuyệt đối.',
      descEn: 'Every bowl of pho, smoky bun cha, or whipped egg brew is sourced directly from multi-generational family masters committed to pristine craft and authentic taste.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs uppercase tracking-wider text-amber-800 font-semibold mb-2">
            {currentLang === 'vi' ? 'Triết lý làm tour của chúng tôi' : 'Our Guiding Philosophy'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight mb-4">
            {currentLang === 'vi' ? 'Vì Sao Du Khách Chọn Hà Nội Echoes?' : 'Why Travelers Choose Hanoi Echoes?'}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {currentLang === 'vi'
              ? 'Chúng tôi không bán những chuyến đi công nghiệp vội vã. Chúng tôi mang đến sự kết nối văn hóa chân thật, sâu lắng và bền vững cùng thủ đô.'
              : 'We do not sell rushed mass-market itineraries. We deliver mindful, deeply rooted cultural connection with our beloved city.'}
          </p>
        </div>

        {/* 4 Editorial Numbered Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.num} className="flex items-start gap-5 group">
                <div className="font-mono text-2xl font-bold text-amber-800/80 group-hover:text-amber-700 transition-colors shrink-0">
                  {p.num}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                    {currentLang === 'vi' ? p.titleVi : p.titleEn}
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    {currentLang === 'vi' ? p.descVi : p.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
