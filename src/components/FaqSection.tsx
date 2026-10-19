import React from 'react';

const QUESTIONS = [
  {
    vi: 'Đặt cọc như thế nào?',
    en: 'How does the deposit work?',
    answerVi: 'Khách chuyển 30% tổng tour và ghi mã đặt chỗ. Trang quản lý chỉ ghi nhận khi khách xác nhận đã chuyển. Tài khoản trên trang là tài khoản mẫu, chưa nối cổng thanh toán.',
    answerEn: 'Guests transfer 30% of the tour total and include the booking code. The desk list records it when the guest confirms the transfer. The account shown is a sample and is not a live payment gateway.',
  },
  {
    vi: 'Tour cuối tuần đi ngày nào?',
    en: 'Which days do weekend tours run?',
    answerVi: 'Tour cuối tuần chỉ khởi hành thứ Bảy và Chủ nhật. Ngày thường và ngày đã qua không đặt được.',
    answerEn: 'Weekend tours depart on Saturday and Sunday only. Weekdays and past dates are not accepted.',
  },
  {
    vi: 'Trẻ em tính giá ra sao?',
    en: 'How are children priced?',
    answerVi: 'Trẻ từ 4 đến 10 tuổi tính 70% giá người lớn. Đón khách sạn thêm 100.000₫ cho cả nhóm. Thêm nhiếp ảnh tính 350.000₫.',
    answerEn: 'Children aged 4–10 pay 70% of the adult price. Hotel pickup adds 100,000₫ for the group. A photographer adds 350,000₫.',
  },
  {
    vi: 'Liên hệ ai khi cần đổi lịch?',
    en: 'Who do I contact to change a booking?',
    answerVi: 'Gọi người phụ trách trang theo số +84 842 204 679. Mã xác thực trên trang là mã thử, chưa gửi SMS hay email.',
    answerEn: 'Call the person responsible for the site on +84 842 204 679. The verification code on the page is a preview and is not sent by SMS or email.',
  },
];

export const FaqSection: React.FC<{ currentLang: 'vi' | 'en' }> = ({ currentLang }) => {
  const vi = currentLang === 'vi';
  return (
    <section id="faq" className="bg-white py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-brand">{vi ? 'Hỏi đáp' : 'Questions'}</p>
        <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-stone-900">{vi ? 'Câu hỏi thường gặp' : 'Frequently asked questions'}</h2>
        <dl className="mt-8 space-y-6">
          {QUESTIONS.map((item) => (
            <div key={item.en}>
              <dt className="font-semibold text-stone-900">{vi ? item.vi : item.en}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-stone-600">{vi ? item.answerVi : item.answerEn}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
