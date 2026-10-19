export interface ItineraryStop {
  time: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
}

export type TourCategory = 'night' | 'express' | 'halfday' | 'fullday' | 'weekend';

export interface Tour {
  id: string;
  title: string;
  titleEn: string;
  category: TourCategory;
  categoryLabel: string;
  categoryLabelEn: string;
  duration: string;
  durationEn: string;
  departureTime: string;
  departureTimeEn: string;
  priceVnd: number;
  originalPriceVnd: number;
  rating: number;
  reviewsCount: number;
  image: string;
  imageAlt: string;
  tagline: string;
  taglineEn: string;
  summary: string;
  summaryEn: string;
  highlights: string[];
  highlightsEn: string[];
  included: string[];
  includedEn: string[];
  notIncluded: string[];
  notIncludedEn: string[];
  itinerary: ItineraryStop[];
  suitedFor: string;
  suitedForEn: string;
  groupSize: string;
  groupSizeEn: string;
  badge?: string;
  badgeEn?: string;
}

export const TOURS_DATA: Tour[] = [
  // 1. TOUR BUỔI TỐI
  {
    id: 'hanoi-night-food-street',
    title: 'Hà Nội Đêm & Hương Vị Ẩm Thực Phố Cổ',
    titleEn: 'Hanoi Night Walk & Old Quarter Street Gastronomy',
    category: 'night',
    categoryLabel: 'Tour buổi tối',
    categoryLabelEn: 'Night Tour',
    duration: '3.5 giờ',
    durationEn: '3.5 hours',
    departureTime: '18:00 - 21:30 hàng ngày',
    departureTimeEn: '18:00 - 21:30 Daily',
    priceVnd: 680000,
    originalPriceVnd: 850000,
    rating: 4.96,
    reviewsCount: 342,
    image: '/images/hanoi_night_streetfood_1791949154924.jpg',
    imageAlt: 'Ẩm thực phố đêm Hà Nội với ánh đèn vàng ấm áp và món ngon truyền thống',
    tagline: 'Khám phá 36 phố phường khi màn đêm buông xuống cùng 6 món ăn gia truyền nức tiếng',
    taglineEn: 'Discover the nocturnal soul of Hanoi Old Quarter with 6 heritage culinary stops',
    summary: 'Khi phố lên đèn, Hà Nội bộc lộ vẻ đẹp quyến rũ nhất. Bạn sẽ len lỏi qua các con ngõ ẩm thực trứ danh như Tống Duy Tân, chợ đêm Đồng Xuân, thưởng thức phở cuốn Ngũ Xá, bún chả nướng than hoa, bánh cuốn nóng hổi và kết thúc bằng ly bia hơi sảng khoái tại Tạ Hiện.',
    summaryEn: 'As twilight falls, Hanoi reveals its most intimate charm. Stroll through storied food alleys like Tong Duy Tan, savour sizzling bun cha, steamed rice rolls, and toast with fresh craft beer in the historic Old Quarter.',
    highlights: [
      'Thưởng thức 6 món ăn đường phố di sản do đầu bếp địa phương dẫn lối',
      'Khám phá ngõ ẩm thực Tống Duy Tân & phố bích họa Phùng Hưng về đêm',
      'Dạo quanh Bờ Hồ Hoàn Kiếm rực rỡ ánh sáng tháp Rùa',
      'Uống bia hơi phố Tạ Hiện giao lưu cùng người dân bản địa'
    ],
    highlightsEn: [
      'Sample 6 heritage street dishes guided by a local culinary storyteller',
      'Wander through lantern-lit Tong Duy Tan alley and Phung Hung mural street',
      'Stroll around illuminated Hoan Kiem Lake and historic The Huc bridge',
      'Sip fresh Hanoi draught beer in lively Ta Hien quarter'
    ],
    included: [
      'Toàn bộ 6 món ăn truyền thống & đồ uống giải khát',
      'Hướng dẫn viên bản địa am hiểu ẩm thực & văn hóa (Việt / Anh)',
      'Vé tham quan & chỗ ngồi ưu tiên tại các quán ăn gia truyền',
      'Nước suối và quà lưu niệm thủ công Hà Nội'
    ],
    includedEn: [
      'All 6 street tastings and refreshments',
      'Bilingual expert cultural guide',
      'Reserved seating at iconic culinary stalls',
      'Mineral water & handcrafted souvenir'
    ],
    notIncluded: ['Chi phí mua sắm cá nhân ngoài tour', 'Tiền tip tùy tâm'],
    notIncludedEn: ['Personal shopping expenses', 'Optional gratuity'],
    itinerary: [
      {
        time: '18:00',
        title: 'Tập trung tại Đài phun nước Bờ Hồ',
        titleEn: 'Meet at Dong Kinh Nghia Thuc Square',
        description: 'Gặp gỡ hướng dẫn viên, nghe giới thiệu lịch sử hình thành 36 phố phường và phong vị ẩm thực thủ đô.',
        descriptionEn: 'Meet your guide, receive an introduction to the 36 guild streets and their culinary heritage.'
      },
      {
        time: '18:30',
        title: 'Thưởng thức Phở Cuốn & Bánh Cuốn Thanh Trì',
        titleEn: 'Steamed Rice Rolls & Rolled Pho Tastings',
        description: 'Tận mắt xem nghệ nhân tráng bánh cuốn mỏng tang thơm mùi hành phi giòn tan và thịt mộc nhĩ ngọt lành.',
        descriptionEn: 'Watch master makers steam razor-thin rice paper sheets filled with minced pork and wood-ear mushrooms.'
      },
      {
        time: '19:45',
        title: 'Bún chả nướng than hoa & Nem rán giòn',
        titleEn: 'Charcoal-Grilled Bun Cha & Crispy Spring Rolls',
        description: 'Thưởng thức thịt ba chỉ nướng vàng ruộm trên than củi thơm lừng, chấm nước mắm chua ngọt đu đủ cà rốt.',
        descriptionEn: 'Savor tender charcoal-grilled pork patties served with fresh rice noodles, herbs, and warm dipping sauce.'
      },
      {
        time: '20:45',
        title: 'Ghé ngõ cà phê đường tàu hoặc phố Bia Tạ Hiện',
        titleEn: 'Train Street Vista & Craft Draft Beer Toast',
        description: 'Ngắm nhìn tàu hỏa chạy qua sát vách nhà cổ hoặc hòa mình vào không khí sôi động của ngã tư quốc tế.',
        descriptionEn: 'Enjoy the vibrant nocturnal atmosphere and raise a glass of local Hanoi draft brew.'
      }
    ],
    suitedFor: 'Người yêu ẩm thực, nhóm bạn, cặp đôi',
    suitedForEn: 'Foodies, couples, photography lovers',
    groupSize: 'Nhóm nhỏ tối đa 8 khách',
    groupSizeEn: 'Small group, max 8 guests',
    badge: 'Được đặt nhiều nhất',
    badgeEn: 'Best Seller'
  },
  {
    id: 'hanoi-night-long-bien-bridge',
    title: 'Cầu Long Biên Hoàng Hôn & Ký Ức Đêm Sông Hồng',
    titleEn: 'Long Bien Bridge Sunset & Red River Night Whispers',
    category: 'night',
    categoryLabel: 'Tour buổi tối',
    categoryLabelEn: 'Night Tour',
    duration: '3 giờ',
    durationEn: '3 hours',
    departureTime: '18:30 - 21:30 hàng ngày',
    departureTimeEn: '18:30 - 21:30 Daily',
    priceVnd: 550000,
    originalPriceVnd: 690000,
    rating: 4.94,
    reviewsCount: 189,
    image: '/images/hero_hanoi_twilight_1791949155360.jpg',
    imageAlt: 'Cầu Long Biên lịch sử lung linh soi bóng dòng sông Hồng',
    tagline: 'Dạo bước trên cây cầu thép trăm tuổi, ngắm nhìn Hà Nội lộng lẫy từ mặt nước sông Hồng',
    taglineEn: 'Walk the century-old steel giant and gaze at Hanoi skyline glowing over the river',
    summary: 'Tour dành cho những tâm hồn say đắm vẻ đẹp hoài niệm. Cùng hướng dẫn viên tản bộ trên cầu Long Biên xây từ năm 1898, ngắm hoàng hôn đỏ rực buông xuống bãi bồi sông Hồng, thưởng thức ngô khoai nướng vỉa hè và lắng nghe những câu chuyện lịch sử không thể tìm thấy trong sách giáo khoa.',
    summaryEn: 'A poetic journey across the 1898 Eiffel-engineered bridge. Watch the crimson sunset over the alluvial sandbanks, taste roasted sweet corn on the bridge sidewalk, and hear oral histories of old Thang Long.',
    highlights: [
      'Chiêm ngưỡng toàn cảnh cầu Long Biên soi bóng sông Hồng lúc lên đèn',
      'Trải nghiệm ăn ngô nướng, khoai nướng thơm nức trên lộng gió cầu thép',
      'Thưởng thức tách trà cúc nóng ấm hoặc cà phê ngắm tàu đêm chạy qua',
      'Góc chụp ảnh nghệ thuật đậm chất điện ảnh hoài niệm'
    ],
    highlightsEn: [
      'Panoramic sunset and night skyline over the Red River',
      'Taste sidewalk-roasted corn and honeyed sweet potatoes in river breeze',
      'Enjoy hot chamomile tea or Vietnamese drip coffee near historical rails',
      'Cinematic nostalgic photography opportunities'
    ],
    included: [
      'Hướng dẫn viên kể chuyện lịch sử & văn hóa',
      'Bữa ăn nhẹ đặc sản vỉa hè (ngô, khoai nướng than củi, nem chua nướng)',
      'Thức uống tại quán cà phê view cầu Long Biên trên cao',
      'Chụp ảnh kỷ niệm miễn phí gửi qua drive chất lượng cao'
    ],
    includedEn: [
      'Historical storyteller guide',
      'Bridge-side winter street snacks',
      'Beverage at panoramic rooftop cafe overlooking bridge',
      'High-resolution digital photo album'
    ],
    notIncluded: ['Phương tiện di chuyển đến điểm hẹn ban đầu'],
    notIncludedEn: ['Personal transport to starting point'],
    itinerary: [
      {
        time: '18:30',
        title: 'Đón khách tại chân Tháp Nước Hàng Đậu',
        titleEn: 'Meet at Hang Dau Water Tower',
        description: 'Chiêm ngưỡng kiến trúc tráng lệ của tháp nước cổ kính kiểu La Mã xây dựng từ thế kỷ 19.',
        descriptionEn: 'Marvel at the 19th-century Roman-style water citadel of Hanoi.'
      },
      {
        time: '19:15',
        title: 'Tản bộ qua các nhịp cầu Long Biên lịch sử',
        titleEn: 'Walk the Iron Spans of Long Bien',
        description: 'Lắng nghe chuyện thăng trầm của cây cầu qua 3 thế kỷ và ngắm nhìn đoàn tàu hỏa rúc còi qua sông.',
        descriptionEn: 'Experience the rumble of the train and hear stories of resilience through three centuries.'
      },
      {
        time: '20:30',
        title: 'Thưởng trà & cà phê ngắm toàn cảnh sông Hồng',
        titleEn: 'Rooftop River View & Tea Ritual',
        description: 'Nghỉ chân tại ban công ngắm nhìn cầu Long Biên lung linh ánh đèn và dòng sông êm đềm trôi.',
        descriptionEn: 'Relax on a high terrace with soothing herbal tea overlooking the illuminated structure.'
      }
    ],
    suitedFor: 'Người yêu nhiếp ảnh, lãng mạn, tìm kiếm bình yên',
    suitedForEn: 'Photographers, couples, romantic travelers',
    groupSize: 'Nhóm nhỏ từ 2 - 6 người',
    groupSizeEn: 'Private or small group, 2-6 guests',
    badge: 'Trải nghiệm lãng mạn',
    badgeEn: 'Romantic Pick'
  },

  // 2. TOUR NGẮN 2 - 3 GIỜ
  {
    id: 'hanoi-express-egg-coffee-workshop',
    title: 'Tinh Hoa Cà Phê Trứng & Ngõ Nhỏ Phố Cổ',
    titleEn: 'Egg Coffee Masterclass & Hidden Alleys of Old Hanoi',
    category: 'express',
    categoryLabel: 'Ngắn 2 - 3 giờ',
    categoryLabelEn: '2 - 3 Hours',
    duration: '2.5 giờ',
    durationEn: '2.5 hours',
    departureTime: '09:00 / 14:30 / 16:30 mỗi ngày',
    departureTimeEn: '09:00 / 14:30 / 16:30 Daily',
    priceVnd: 450000,
    originalPriceVnd: 550000,
    rating: 4.99,
    reviewsCount: 512,
    image: '/images/hanoi_egg_coffee_culture_1791949155871.jpg',
    imageAlt: 'Ly cà phê trứng béo ngậy vàng óng trên bàn gỗ cổ kính Hà Nội',
    tagline: 'Tự tay đánh bông lớp kem trứng béo ngậy theo công thức bí truyền và khám phá các con ngõ siêu hẹp',
    taglineEn: 'Whisk rich golden egg cream from a 1946 secret recipe & venture inside half-meter alleys',
    summary: 'Một lát cắt tinh tế và thư thái hoàn hảo cho những ai có ít thời gian. Bạn sẽ bước vào ngôi nhà cổ trăm năm tuổi, học cách đánh lớp kem trứng bông mịn hòa quyện cùng cốt cà phê Robusta đậm đà. Sau đó, cùng dạo bước qua ngõ hẹp chỉ 60cm để chạm vào nếp sống thật nhất của người dân thủ đô.',
    summaryEn: 'An intimate 2.5-hour cultural immersion. Step inside a historic French villa courtyard, learn to whip velvet egg yolk cream over dark Vietnamese robusta, and discover hidden living quarters tucked behind modest street facades.',
    highlights: [
      'Workshop thực hành tự pha cà phê trứng gia truyền ngon chuẩn vị',
      'Khám phá câu chuyện ra đời của món cà phê độc nhất vô nhị từ năm 1946',
      'Băng qua những con ngõ chỉ vừa 1 người đi để chiêm ngưỡng nhà hình ống',
      'Nhận công thức bí truyền mang về nhà cùng 1 gói cà phê mộc đặc sản'
    ],
    highlightsEn: [
      'Hands-on workshop making authentic whipped egg coffee from scratch',
      'Discover the origins of this 1946 invention born from milk scarcity',
      'Navigate iconic narrow alleys under 1-meter wide to see tube houses',
      'Take home the secret recipe card and a bag of artisan Vietnamese beans'
    ],
    included: [
      'Toàn bộ nguyên liệu & dụng cụ pha chế cà phê trứng cao cấp',
      'Tặng 1 ly cà phê thành phẩm + 1 bánh ngọt ăn kèm',
      'Gói hạt cà phê Robusta rang mộc 100g làm quà lưu niệm',
      'Hướng dẫn viên song ngữ tận tâm, vui vẻ'
    ],
    includedEn: [
      'All premium workshop ingredients & barista equipment',
      'Your own crafted egg coffee + artisanal tea pastry',
      '100g freshly roasted Vietnamese artisan coffee beans',
      'English & Vietnamese speaking host'
    ],
    notIncluded: ['Các món đồ uống gọi thêm ngoài chương trình'],
    notIncludedEn: ['Additional drinks outside workshop menu'],
    itinerary: [
      {
        time: '00:00 - 00:30',
        title: 'Khám phá kiến trúc nhà cổ & ngõ nhỏ',
        titleEn: 'Alley Discovery Walk',
        description: 'Tản bộ qua ngõ Hàng Gai, nghe giới thiệu về cấu trúc nhà hình ống đặc trưng chống thuế mặt tiền thời xưa.',
        descriptionEn: 'Stroll through historic lanes and learn why Hanoi houses were built ultra-narrow and deep.'
      },
      {
        time: '00:30 - 01:45',
        title: 'Workshop pha chế Cà Phê Trứng',
        titleEn: 'Egg Coffee Masterclass',
        description: 'Học kỹ thuật tách lòng đỏ, đánh bông kem cùng mật ong và sữa đặc, rót cà phê phin nóng hổi tạo tầng bọt hoàn mỹ.',
        descriptionEn: 'Master the art of whisking fresh egg yolk with honey and condensed milk over boiling phin brew.'
      },
      {
        time: '01:45 - 02:30',
        title: 'Thưởng thức & Trò chuyện văn hóa',
        titleEn: 'Tasting & Cultural Conversation',
        description: 'Thưởng thức thành phẩm nóng hổi bên ban công ngắm nhìn phố cổ Hà Nội bình yên trôi.',
        descriptionEn: 'Sip your delicious creation on a charming colonial balcony overlooking the old tree canopy.'
      }
    ],
    suitedFor: 'Người đi công tác, khách quá cảnh, gia đình, người mê cà phê',
    suitedForEn: 'Transit travelers, coffee lovers, families, couples',
    groupSize: 'Tối đa 6 khách/buổi',
    groupSizeEn: 'Cozy boutique session, max 6 guests',
    badge: 'Xếp hạng #1 Trải nghiệm',
    badgeEn: '#1 Top Rated'
  },
  {
    id: 'hanoi-express-cyclo-heritage',
    title: 'Thảnh Thơi Xích Lô 36 Phố Phường',
    titleEn: 'Slow-Paced Heritage Cyclo Ride Through 36 Guilds',
    category: 'express',
    categoryLabel: 'Ngắn 2 - 3 giờ',
    categoryLabelEn: '2 - 3 Hours',
    duration: '2 giờ',
    durationEn: '2 hours',
    departureTime: '08:30 / 10:30 / 15:00 / 17:00 hàng ngày',
    departureTimeEn: '08:30 / 10:30 / 15:00 / 17:00 Daily',
    priceVnd: 420000,
    originalPriceVnd: 520000,
    rating: 4.91,
    reviewsCount: 278,
    image: '/images/hero_hanoi_twilight_1791949155360.jpg',
    imageAlt: 'Chiếc xích lô truyền thống chầm chậm lăn bánh trên phố Hàng Mã Hà Nội',
    tagline: 'Lướt nhẹ qua những con phố mang tên Hàng: Hàng Bạc, Hàng Chiếu, Hàng Mã mà không lo mỏi chân',
    taglineEn: 'Glide effortlessly through silver, silk, and lantern quarters on an iconic three-wheeled cyclo',
    summary: 'Cách tuyệt vời nhất để ngắm nhìn phố cổ mà không bị mệt hay lạc đường. Người lái xích lô hiền hậu sẽ đưa bạn qua những con phố sầm uất nhất, dừng chân chụp ảnh tại Ô Quan Chưởng và thưởng thức bát chè sen long nhãn ngọt thanh mát lành.',
    summaryEn: 'The quintessential way to soak in Hanoi without sore feet. A seasoned local cyclo driver pedals you gently past silver workshops, paper lanterns, and French colonial shutters with a refreshing lotus seed dessert stop.',
    highlights: [
      'Ngồi trên chiếc xích lô truyền thống cảm nhận nhịp sống chậm giữa phố xá',
      'Ghé thăm Ô Quan Chưởng - cửa ô thành cổ duy nhất còn nguyên vẹn',
      'Thưởng thức chè sen long nhãn thanh mát hoặc nộm bò khô trứ danh',
      'Bác tài địa phương nhiệt tình, chụp ảnh kỷ niệm siêu đẹp'
    ],
    highlightsEn: [
      'Experience vintage transport gliding along centuries-old guild streets',
      'Visit O Quan Chuong, the last surviving brick gate of the ancient citadel',
      'Enjoy chilled lotus seed sweet soup or beef jerky salad',
      'Friendly driver stops at prime angles for keepsake photos'
    ],
    included: [
      'Xe xích lô riêng phục vụ trong suốt 2 giờ',
      'Bát chè truyền thống hoặc đồ uống giải khát mát lạnh',
      'Bảo hiểm du lịch trọn chuyến',
      'Nón lá truyền thống đội che nắng và chụp ảnh'
    ],
    includedEn: [
      'Private cyclo with courteous driver for 2 hours',
      'Traditional lotus dessert or artisanal iced tea',
      'Full travel insurance',
      'Complimentary conical hat (non la) for photo props'
    ],
    notIncluded: ['Chi phí mua đồ lưu niệm trên phố'],
    notIncludedEn: ['Personal shopping souvenirs'],
    itinerary: [
      {
        time: '00:00 - 00:45',
        title: 'Xuất phát từ Đinh Tiên Hoàng qua Hàng Bạc - Hàng Đào',
        titleEn: 'Silver & Silk Street Promenade',
        description: 'Lướt qua các tiệm kim hoàn gia truyền và các cửa hàng tơ lụa rực rỡ sắc màu.',
        descriptionEn: 'Pass traditional goldsmith houses and silk merchants in the core heritage quarter.'
      },
      {
        time: '00:45 - 01:20',
        title: 'Check-in Ô Quan Chưởng & Chợ Đồng Xuân',
        titleEn: 'Ancient City Gate & Dong Xuan Market',
        description: 'Chiêm ngưỡng mái vòm đá cổ rêu phong và không khí buôn bán tấp nập của khu chợ lớn nhất Hà Nội.',
        descriptionEn: 'Photograph the weathered red-brick gate built in 1749 and Hanoi largest covered market.'
      },
      {
        time: '01:20 - 02:00',
        title: 'Vòng qua Hàng Mã và dừng chân ăn chè sen',
        titleEn: 'Lantern Lane & Chilled Lotus Sweet Dessert',
        description: 'Chiêm ngưỡng phố Hàng Mã ngập tràn sắc màu đèn lồng và thưởng thức món tráng miệng thanh nhã.',
        descriptionEn: 'Marvel at colorful festival crafts along Hang Ma street and refresh with sweet lotus seed soup.'
      }
    ],
    suitedFor: 'Người lớn tuổi, gia đình có trẻ nhỏ, khách muốn chụp ảnh đẹp',
    suitedForEn: 'Seniors, young families, photography enthusiasts',
    groupSize: '1 khách/xe xích lô (xe gia đình 1 lớn 1 bé)',
    groupSizeEn: '1 guest per cyclo (or 1 adult + 1 toddler)',
    badge: 'Trải nghiệm đặc trưng',
    badgeEn: 'Iconic Vietnam'
  },

  // 3. TOUR NỬA NGÀY (HALF-DAY 4-5 HOURS)
  {
    id: 'hanoi-halfday-heritage-temple-hoangthanh',
    title: 'Dấu Ấn Hoàng Thành & Văn Miếu Quốc Tử Giám',
    titleEn: 'Imperial Citadel & Temple of Literature Half-Day Journey',
    category: 'halfday',
    categoryLabel: 'Nửa ngày',
    categoryLabelEn: 'Half Day',
    duration: '4.5 giờ',
    durationEn: '4.5 hours',
    departureTime: 'Buổi sáng: 08:00 - 12:30 | Buổi chiều: 13:30 - 18:00',
    departureTimeEn: 'Morning: 08:00 - 12:30 | Afternoon: 13:30 - 18:00',
    priceVnd: 790000,
    originalPriceVnd: 990000,
    rating: 4.97,
    reviewsCount: 421,
    image: '/images/hanoi_heritage_temple_1791949156492.jpg',
    imageAlt: 'Khuê Văn Các tại Văn Miếu Quốc Tử Giám rực rỡ trong nắng sớm thanh tao',
    tagline: 'Hành trình xuyên thời gian chạm vào nghìn năm lịch sử Thăng Long cùng chuyên gia nghiên cứu văn hóa',
    taglineEn: 'A scholarly and scenic voyage through UNESCO Imperial Citadel and Vietnam oldest university',
    summary: 'Một hành trình sâu sắc và đầy cảm xúc về nguồn cội thủ đô. Bạn sẽ được chiêm ngưỡng Khuê Văn Các biểu tượng của Hà Nội, 82 bia Tiến sĩ vinh danh hiền tài, dạo bước trong khuôn viên rợp bóng cây cổ thụ của Văn Miếu và khám phá tầng khảo cổ nghìn năm tại Hoàng Thành Thăng Long.',
    summaryEn: 'An enriching exploration of Vietnamese scholastic and royal heritage. Walk beneath ancient canopy trees at the Temple of Literature (founded in 1070), admire 82 stone stele turtles carrying scholars names, and step onto the UNESCO-listed Imperial Citadel foundations.',
    highlights: [
      'Thuyết minh chuyên sâu từ hướng dẫn viên tốt nghiệp chuyên ngành lịch sử',
      'Chiêm ngưỡng giếng Thiên Quang và 82 tấm Bia Tiến sĩ Di sản Ký ức Thế giới',
      'Khám phá Đoan Môn, Hậu Lâu và hầm chỉ huy tác chiến D67 thời kháng chiến',
      'Bữa trưa đặc sản bún chả hoặc phở bò gia truyền đã bao gồm'
    ],
    highlightsEn: [
      'In-depth narratives by certified cultural history scholars',
      'View the Well of Heavenly Clarity and UNESCO Memory of the World tortoise steles',
      'Explore the monumental Doan Mon gates and revolutionary Bunker D67',
      'Authentic Hanoi lunch (bun cha or beef pho) included'
    ],
    included: [
      'Vé vào cổng Văn Miếu - Quốc Tử Giám & Hoàng Thành Thăng Long',
      'Xe du lịch đưa đón máy lạnh đời mới suốt hành trình',
      'Hướng dẫn viên chuyên nghiệp thẻ quốc tế',
      'Bữa ăn chính ấm cúng tại nhà hàng đặc sản Hà Nội',
      'Nước uống tinh khiết & khăn lạnh'
    ],
    includedEn: [
      'Entrance tickets to Temple of Literature & Imperial Citadel',
      'Comfortable air-conditioned private coach transfer',
      'Licensed professional heritage guide',
      'Full traditional Vietnamese lunch at a curated restaurant',
      'Cold towels and bottled water'
    ],
    notIncluded: ['Đồ uống có cồn trong bữa ăn', 'Chi phí cá nhân ngoài chương trình'],
    notIncludedEn: ['Alcoholic beverages during lunch', 'Personal souvenirs'],
    itinerary: [
      {
        time: '08:00 - 08:30',
        title: 'Đón khách tại khách sạn phố cổ',
        titleEn: 'Hotel Pickup in Old Quarter',
        description: 'Xe đón quý khách tại sảnh khách sạn hoặc điểm hẹn, khởi hành đi Văn Miếu.',
        descriptionEn: 'Meet at your hotel lobby and depart in comfort toward the Temple of Literature.'
      },
      {
        time: '08:30 - 10:15',
        title: 'Tham quan Văn Miếu - Quốc Tử Giám',
        titleEn: 'Temple of Literature & Imperial Academy',
        description: 'Chiêm bái đền thờ Khổng Tử, nghe câu chuyện về người thầy muôn đời Chu Văn An và phong tục cầu may thi cử.',
        descriptionEn: 'Learn how Vietnamese dynasties selected scholars through rigorous imperial exams.'
      },
      {
        time: '10:30 - 12:00',
        title: 'Khám phá Di sản Hoàng Thành Thăng Long',
        titleEn: 'UNESCO Imperial Citadel of Thang Long',
        description: 'Ngắm nhìn Cột cờ Hà Nội kỳ vĩ, khảo cổ học thời Lý - Trần - Lê và hầm quân sự thời hiện đại.',
        descriptionEn: 'Unravel 13 centuries of layered civilizational history at the military flag tower and royal palace ruins.'
      },
      {
        time: '12:00 - 12:45',
        title: 'Thưởng thức bữa trưa bún chả đặc sản',
        titleEn: 'Traditional Bun Cha Feast',
        description: 'Dùng bữa trưa đậm đà hương vị truyền thống Hà Nội trước khi xe đưa về khách sạn.',
        descriptionEn: 'Relax over a delicious authentic lunch before dropping back to your hotel.'
      }
    ],
    suitedFor: 'Gia đình, du khách lần đầu đến Hà Nội, người yêu lịch sử',
    suitedForEn: 'First-time visitors, families, history enthusiasts',
    groupSize: 'Tối đa 12 khách/đoàn',
    groupSizeEn: 'Small group, max 12 guests',
    badge: 'Di sản tinh hoa',
    badgeEn: 'Cultural Heritage'
  },
  {
    id: 'hanoi-halfday-west-lake-zen',
    title: 'Hồ Tây Lộng Gió, Chùa Trấn Quốc & Trà Sen Quý',
    titleEn: 'West Lake Breezes, Tran Quoc Pagoda & Lotus Tea Ritual',
    category: 'halfday',
    categoryLabel: 'Nửa ngày',
    categoryLabelEn: 'Half Day',
    duration: '4 giờ',
    durationEn: '4 hours',
    departureTime: 'Buổi chiều: 14:00 - 18:00 (Ngắm hoàng hôn)',
    departureTimeEn: 'Afternoon: 14:00 - 18:00 (Sunset Edition)',
    priceVnd: 720000,
    originalPriceVnd: 890000,
    rating: 4.93,
    reviewsCount: 164,
    image: '/images/hanoi_heritage_temple_1791949156492.jpg',
    imageAlt: 'Chùa Trấn Quốc uy nghiêm soi bóng xuống làn nước êm đềm của Hồ Tây',
    tagline: 'Khoảng lặng an yên ngắm hoàng hôn rực rỡ và nhâm nhi tách trà ướp bông sen Tây Hồ trăm cánh',
    taglineEn: 'Find tranquil inner stillness at the 1,500-year pagoda and sip rare Bách Diệp lotus flower tea',
    summary: 'Rời xa tiếng còi xe phố thị, hãy đến với Hồ Tây - lá phổi xanh của Hà Nội. Bạn sẽ viếng thăm Chùa Trấn Quốc hơn 1.500 năm tuổi trên bán đảo nhỏ, dạo quanh đường Thanh Niên thơ mộng, thưởng ngoạn buổi trà đạo ướp từ sen bách diệp quý hiếm và ngắm mặt trời đỏ rực lặn xuống mặt nước bao la.',
    summaryEn: 'Escape the bustling traffic to Hanoi largest natural freshwater lake. Visit Tran Quoc Pagoda, the oldest Buddhist temple in Hanoi founded in the 6th century, stroll along poetic Youth Road, and experience an authentic West Lake hundred-petal lotus tea infusion.',
    highlights: [
      'Viếng Chùa Trấn Quốc - ngôi chùa cổ nhất Hà Nội xây dựng từ thời Tiền Lý',
      'Thưởng thức Trà Sen Tây Hồ chính gốc được ướp kỳ công từ 1.000 bông hoa sen',
      'Ngắm hoàng hôn lộng lẫy phản chiếu trên mặt gương Hồ Tây',
      'Thưởng thức bánh tôm Hồ Tây vàng ruộm giòn tan kèm nước chấm chua ngọt'
    ],
    highlightsEn: [
      'Visit Tran Quoc Pagoda, Hanoi oldest Buddhist sanctuary from 6th century',
      'Taste authentic West Lake Lotus Tea made with 1,000 hand-picked blossoms',
      'Catch the breathtaking crimson sunset painting the vast lake surface',
      'Savor famous crispy West Lake shrimp cakes with sweet-tart herbs'
    ],
    included: [
      'Xe đưa đón máy lạnh suốt tuyến',
      'Bộ trà đạo sen Tây Hồ thượng hạng và bánh cốm Hàng Than',
      'Phần ăn nhẹ bánh tôm Hồ Tây truyền thống',
      'Hướng dẫn viên am tường tâm linh & trà đạo'
    ],
    includedEn: [
      'Air-conditioned private transport',
      'Rare West Lake lotus tea ceremony with young green sticky rice cakes',
      'Crispy shrimp cake tasting',
      'Mindfulness and cultural expert guide'
    ],
    notIncluded: ['Chi phí công đức tại chùa tùy tâm'],
    notIncludedEn: ['Voluntary pagoda donations'],
    itinerary: [
      {
        time: '14:00',
        title: 'Đón khách & di chuyển đến Hồ Tây',
        titleEn: 'Pickup & Scenic Drive to West Lake',
        description: 'Đi dọc theo đường Phan Đình Phùng - con đường có hàng cây sấu cổ thụ đẹp nhất Hà Nội.',
        descriptionEn: 'Scenic drive down Phan Dinh Phung tree-lined boulevard adorned with antique mansions.'
      },
      {
        time: '14:30 - 15:45',
        title: 'Chiêm bái Chùa Trấn Quốc & Cây Bồ Đề Tổng thống Ấn tặng',
        titleEn: 'Tran Quoc Pagoda & Sacred Bodhi Tree',
        description: 'Thăm bảo tháp 11 tầng, chiêm bái tượng Thích Ca nhập Niết bàn và lắng nghe hồi chuông chùa thanh tịnh.',
        descriptionEn: 'Contemplate the eleven-story stupa and the sacred Bodhi tree gifted by India president in 1959.'
      },
      {
        time: '16:00 - 17:15',
        title: 'Thưởng trà sen bách diệp & Bánh cốm Hà Nội',
        titleEn: 'Artisanal Lotus Tea Ceremony',
        description: 'Gặp gỡ nghệ nhân làng Quảng An, tìm hiểu bí quyết gom nhị hoa gạo sen và thưởng trà ấm nóng.',
        descriptionEn: 'Meet Quang An village tea artisans and learn the arduous art of scenting tea inside real blossoms.'
      },
      {
        time: '17:15 - 18:00',
        title: 'Ngắm hoàng hôn Hồ Tây & Bánh tôm giòn',
        titleEn: 'West Lake Golden Hour & Shrimp Cakes',
        description: 'Ngắm hoàng hôn lãng mạn buông xuống mặt hồ và thưởng thức món bánh tôm giòn rụm.',
        descriptionEn: 'Bask in golden sunset reflections while enjoying crispy freshwater shrimp patties.'
      }
    ],
    suitedFor: 'Người thích sự thư thái, nhiếp ảnh gia, các cặp đôi',
    suitedForEn: 'Mindfulness seekers, couples, sunset lovers',
    groupSize: 'Nhóm nhỏ tối đa 8 khách',
    groupSizeEn: 'Small intimate group, max 8 guests',
    badge: 'Thư giãn an yên',
    badgeEn: 'Zen & Scenic'
  },

  // 4. TOUR TRỌN 1 NGÀY (FULL DAY 8 - 9 HOURS)
  {
    id: 'hanoi-fullday-signature-thousand-years',
    title: 'Hà Nội Trọn Vẹn: Di Sản 1000 Năm Văn Hiến',
    titleEn: 'Ultimate Hanoi Full-Day: 1,000 Years of Grand Heritage',
    category: 'fullday',
    categoryLabel: '1 ngày',
    categoryLabelEn: 'Full Day',
    duration: '8.5 giờ',
    durationEn: '8.5 hours',
    departureTime: '08:00 - 16:30 hàng ngày',
    departureTimeEn: '08:00 - 16:30 Daily',
    priceVnd: 1350000,
    originalPriceVnd: 1650000,
    rating: 4.98,
    reviewsCount: 684,
    image: '/images/hanoi_heritage_temple_1791949156492.jpg',
    imageAlt: 'Quần thể di tích lịch sử và văn hóa cổ kính của thủ đô Hà Nội ngàn năm',
    tagline: 'Hành trình kinh điển hoàn hảo nhất gói trọn Lăng Bác, Văn Miếu, Bảo tàng Dân tộc học và Múa rối nước VIP',
    taglineEn: 'The definitive all-in-one itinerary spanning Ba Dinh, Temple of Literature, Ethnology & VIP Water Puppets',
    summary: 'Tour trọn ngày tinh tuyển nhất được thiết kế để du khách cảm nhận trọn vẹn mọi cung bậc cảm xúc của Hà Nội. Từ sự tôn kính tại Quảng trường Ba Đình và Chùa Một Cột, chiều sâu học thuật tại Văn Miếu, sự đa dạng của 54 dân tộc Việt Nam, đến chiếc vé VIP xem biểu diễn Múa Rối Nước truyền thống bên hồ Hoàn Kiếm.',
    summaryEn: 'The definitive full-day masterclass of Vietnam capital. Pay respects at Ba Dinh Square and the One Pillar Pagoda, wander the courtyards of the Temple of Literature, dive into tribal cultures at the Vietnam Museum of Ethnology, and enjoy premium VIP seats at Thang Long Water Puppet Theater.',
    highlights: [
      'Khám phá đầy đủ 5 địa danh biểu tượng của Hà Nội trong 1 ngày thoải mái',
      'Vé VIP xem show Múa Rối Nước Thăng Long truyền thống không phải xếp hàng',
      'Bữa trưa ẩm thực cung đình Thăng Long tại nhà hàng sân vườn biệt thự cổ',
      'Trải nghiệm xe limousine du lịch cao cấp ghế da êm ái'
    ],
    highlightsEn: [
      'Comprehensive exploration of Hanoi top 5 iconic landmarks in seamless comfort',
      'VIP skip-the-line seats at Thang Long Water Puppet Theater',
      'Indulgent Vietnamese set lunch inside a restored colonial garden villa',
      'Luxury air-conditioned transit with chilled water and wet wipes'
    ],
    included: [
      'Toàn bộ vé tham quan thắng cảnh & vé xem múa rối nước VIP',
      'Xe du lịch đưa đón khách sạn khứ hồi tại nội thành',
      'Bữa trưa 7 món tinh hoa ẩm thực Hà Nội',
      'Hướng dẫn viên chuyên nghiệp tiếng Việt và tiếng Anh',
      'Bảo hiểm du lịch mức cao nhất'
    ],
    includedEn: [
      'All entrance fees + VIP Water Puppet Theater tickets',
      'Round-trip luxury van hotel pickup & drop-off',
      '7-course authentic gourmet Vietnamese set lunch',
      'Expert licensed bilingual guide',
      'Comprehensive travel insurance'
    ],
    notIncluded: ['Chi tiêu cá nhân ngoài thực đơn', 'Tiền tip cho lái xe và hướng dẫn viên'],
    notIncludedEn: ['Beverages beyond set lunch', 'Tips for driver & guide'],
    itinerary: [
      {
        time: '08:00 - 10:00',
        title: 'Quần thể Lăng Chủ tịch Hồ Chí Minh & Chùa Một Cột',
        titleEn: 'Ho Chi Minh Complex & One Pillar Pagoda',
        description: 'Thăm Quảng trường Ba Đình lịch sử, Nhà sàn Bác Hồ, ao cá Bác và ngôi chùa đài sen nghìn tuổi độc đáo.',
        descriptionEn: 'Witness historic Ba Dinh Square, Ho Chi Minh stilt house, serene koi carp pond, and 1049 Lotus Pagoda.'
      },
      {
        time: '10:15 - 11:45',
        title: 'Văn Miếu - Quốc Tử Giám',
        titleEn: 'Temple of Literature Tour',
        description: 'Tìm hiểu hệ thống khoa cử Nho học xưa và chiêm ngưỡng nghệ thuật điêu khắc rùa đội bia đá độc đáo.',
        descriptionEn: 'Discover the ancient university system and the artistic stone tortoises guarding doctorate annals.'
      },
      {
        time: '12:00 - 13:15',
        title: 'Bữa trưa đặc sản tại Biệt thự Pháp cổ',
        titleEn: 'Colonial Garden Villa Gourmet Lunch',
        description: 'Thưởng thức 7 món ăn truyền thống Hà Nội như chả cá Lã Vọng, nem Hà Nội, canh sấu sườn non...',
        descriptionEn: 'Feast on Hanoi delicacies including turmeric grilled fish, golden spring rolls, and fragrant braised ribs.'
      },
      {
        time: '13:30 - 15:15',
        title: 'Bảo tàng Dân tộc học Việt Nam',
        titleEn: 'Vietnam Museum of Ethnology',
        description: 'Khám phá văn hóa 54 dân tộc anh em qua nhà rông Tây Nguyên, nhà sàn người Tày và nhà mồ Gia Rai thực tế.',
        descriptionEn: 'Explore full-scale tribal architecture, communal longhouses, and vibrant traditional costumes.'
      },
      {
        time: '15:30 - 16:30',
        title: 'Thưởng thức Múa Rối Nước Rồng Vàng Thăng Long',
        titleEn: 'VIP Thang Long Water Puppet Performance',
        description: 'Mãn nhãn với nghệ thuật dân gian độc đáo trên mặt nước với dàn nhạc chèo và tích xưa Tễu.',
        descriptionEn: 'Enjoy a 50-minute live folk orchestra and wooden marionettes dancing gracefully on water.'
      }
    ],
    suitedFor: 'Mọi du khách, gia đình, người đến Hà Nội lần đầu',
    suitedForEn: 'First-time visitors, families, international guests',
    groupSize: 'Đoàn tiêu chuẩn từ 8 - 15 khách',
    groupSizeEn: 'Standard group, 8-15 guests',
    badge: 'Tour hoàn hảo nhất',
    badgeEn: 'All-In-One Choice'
  },

  // 5. TOUR CUỐI TUẦN (WEEKEND ESCAPES)
  {
    id: 'hanoi-weekend-duong-lam-ancient-village',
    title: 'Cuối Tuần Bình Yên: Làng Cổ Đường Lâm & Đất Hai Vua',
    titleEn: 'Serene Weekend: Duong Lam Ancient Village & King Heritage',
    category: 'weekend',
    categoryLabel: 'Cuối tuần',
    categoryLabelEn: 'Weekend Getaway',
    duration: '1 ngày cuối tuần (8 giờ)',
    durationEn: 'Weekend Day Trip (8 hours)',
    departureTime: '08:00 - 16:30 Thứ Bảy & Chủ Nhật',
    departureTimeEn: '08:00 - 16:30 Saturday & Sunday',
    priceVnd: 1150000,
    originalPriceVnd: 1400000,
    rating: 4.95,
    reviewsCount: 215,
    image: '/images/hanoi_weekend_getaway_1791949156933.jpg',
    imageAlt: 'Cổng làng cổ Đường Lâm bằng đá ong rêu phong bình dị giữa cánh đồng xanh mướt',
    tagline: 'Trốn khỏi phố xá ồn ào để đạp xe qua những bức tường đá ong 400 năm tuổi và ăn cơm quê nhà cổ',
    taglineEn: 'Escape city buzz to cycle past 400-year-old laterite brick walls and feast in a timber heritage home',
    summary: 'Chuyến đi nghỉ cuối tuần hoàn hảo cách trung tâm Hà Nội chỉ 45km. Đường Lâm là ngôi làng cổ đầu tiên của Việt Nam được xếp hạng Di tích quốc gia, quê hương của 2 vị vua Ngô Quyền và Phùng Hưng. Bạn sẽ đạp xe qua cánh đồng lúa thơm ngát, ăn kẹo chè lam, nếm tương nếp tiến vua và thưởng thức bữa cơm quê thịnh soạn do chính tay chủ nhà cổ nấu nướng.',
    summaryEn: 'The perfect Saturday or Sunday rural escape just 45km from Hanoi. As Vietnam first recognized national heritage village, Duong Lam preserves ancient red laterite architecture, communal banyan trees, handmade rice candy workshops, and home-cooked family banquets inside 300-year courtyard dwellings.',
    highlights: [
      'Đạp xe thong dong trên đường làng lát gạch nghiêng rợp bóng tre xanh',
      'Thăm cổng làng Mông Phụ rêu phong và giếng đá ong nghìn năm tuổi',
      'Thưởng thức bữa cơm quê gia truyền với gà mía hấp lá chanh, thịt quay đòn giòn rụm',
      'Trải nghiệm làm kẹo lạc, kẹo chè lam cùng nghệ nhân trong nhà cổ'
    ],
    highlightsEn: [
      'Leisurely bicycle through brick-paved rural lanes shaded by bamboo groves',
      'Admire Mong Phu ancient village gate and sacred laterite freshwater well',
      'Savor a country feast with steamed Mia chicken, crackling pork roll & lotus salad',
      'Hands-on ginger rice sweet candy making with third-generation villagers'
    ],
    included: [
      'Xe du lịch đưa đón 2 chiều chất lượng cao từ trung tâm Hà Nội',
      'Xe đạp dạo quanh làng cổ suốt cả ngày',
      'Bữa trưa cơm quê thịnh soạn 8 món tại nhà cổ hơn 300 năm',
      'Vé tham quan tất cả các di tích, đền thờ Phùng Hưng, lăng Ngô Quyền',
      'Workshop thử làm kẹo truyền thống & quà mang về'
    ],
    includedEn: [
      'High-grade round-trip transfer from Hanoi city center',
      'All-day village bicycle rental with helmet',
      'Abundant 8-course country banquet inside a 300-year timber residence',
      'All entrance fees to village gates, temples, and king tombs',
      'Sweet candy workshop & gift package to take home'
    ],
    notIncluded: ['Chi tiêu cá nhân ngoài chương trình'],
    notIncludedEn: ['Personal shopping expenses'],
    itinerary: [
      {
        time: '08:00',
        title: 'Khởi hành từ Hà Nội đi Sơn Tây',
        titleEn: 'Depart Hanoi for Son Tay Countryside',
        description: 'Tận hưởng chuyến xe êm ái ngắm cảnh đồng quê ngoại thành đang vào mùa lúa xanh mướt.',
        descriptionEn: 'Enjoy a scenic drive past suburban paddy fields and river valleys.'
      },
      {
        time: '09:15 - 11:30',
        title: 'Đạp xe khám phá Làng cổ Mông Phụ',
        titleEn: 'Bicycle Tour of Mong Phu Hamlet',
        description: 'Đạp xe qua cổng làng cổ kính, viếng Đình Mông Phụ - đỉnh cao của kiến trúc điêu khắc gỗ thế kỷ 16.',
        descriptionEn: 'Cycle past laterite houses and explore the ornate 16th-century timber communal house.'
      },
      {
        time: '11:45 - 13:30',
        title: 'Bữa trưa đặc sản tại Nhà Cổ Ông Thể',
        titleEn: 'Country Lunch in 300-Year Ancestral House',
        description: 'Ngồi trong gian nhà gỗ lim cổ kính, thưởng thức thịt quay đòn nướng rơm, canh cua đồng và cà pháo giòn tan.',
        descriptionEn: 'Dine in an authentic heritage home, tasting straw-roasted pork belly and garden vegetables.'
      },
      {
        time: '13:45 - 15:00',
        title: 'Viếng Đền Phùng Hưng & Lăng Ngô Quyền',
        titleEn: 'King Ngo Quyen & Phung Hung Shrines',
        description: 'Tìm hiểu chiến thắng vang dội trên sông Bạch Đằng năm 938 mở ra kỷ nguyên độc lập lâu dài cho dân tộc.',
        descriptionEn: 'Discover Vietnam historical triumph at the sacred resting ground of King Ngo Quyen.'
      },
      {
        time: '15:15 - 16:30',
        title: 'Trải nghiệm làm kẹo chè lam & Trở về Hà Nội',
        titleEn: 'Ginger Candy Workshop & Return',
        description: 'Tự tay nhào bột nếp thơm nồng hương gừng mật mía trước khi xe đưa về đến trung tâm Hà Nội.',
        descriptionEn: 'Wrap fragrant ginger candies before boarding comfortable transport back to Hanoi.'
      }
    ],
    suitedFor: 'Gia đình, cặp đôi muốn đổi gió cuối tuần, người yêu văn hóa làng quê',
    suitedForEn: 'Weekend travelers, nature lovers, families, couples',
    groupSize: 'Đoàn cuối tuần 6 - 12 khách',
    groupSizeEn: 'Weekend group, 6-12 guests',
    badge: 'Tour cuối tuần số 1',
    badgeEn: '#1 Weekend Escape'
  },
  {
    id: 'hanoi-weekend-ba-vi-mountain-fresh',
    title: 'Cuối Tuần Xanh: Vườn Quốc Gia Ba Vì & Rừng Thông Mây',
    titleEn: 'Green Weekend: Ba Vi Mountain National Park & Mist Pines',
    category: 'weekend',
    categoryLabel: 'Cuối tuần',
    categoryLabelEn: 'Weekend Getaway',
    duration: '1 ngày cuối tuần (9 giờ)',
    durationEn: 'Weekend Nature Day (9 hours)',
    departureTime: '07:30 - 17:00 Thứ Bảy & Chủ Nhật',
    departureTimeEn: '07:30 - 17:00 Saturday & Sunday',
    priceVnd: 1250000,
    originalPriceVnd: 1550000,
    rating: 4.96,
    reviewsCount: 176,
    image: '/images/hanoi_weekend_getaway_1791949156933.jpg',
    imageAlt: 'Không khí trong lành mát mẻ của núi rừng Ba Vì gần Hà Nội',
    tagline: 'Hít căng lồng ngực không khí rừng nguyên sinh mát lạnh 20 độ C, ngắm nhà thờ đổ Pháp cổ huyền bí',
    taglineEn: 'Breathe crisp 20°C alpine forest air, explore mossy French cathedral ruins amidst pine groves',
    summary: 'Điểm trốn nóng và sạc lại năng lượng lý tưởng nhất cho người bận rộn. Nằm ở độ cao hơn 1.000m so với mực nước biển, Ba Vì mang khí hậu mát mẻ quanh năm. Bạn sẽ trekking nhẹ dưới tán thông reo, khám phá di tích nhà thờ đổ rêu phong huyền ảo như cổ tích và thưởng thức tiệc nướng gà đồi Ba Vì thơm lừng.',
    summaryEn: 'Hanoi ultimate alpine retreat at 1,100 meters above sea level. Feel the crisp mountain air, trek beneath soaring pines, photograph the hauntingly beautiful ruins of an overgrown 1940s French stone church, and feast on hill-roasted chicken.',
    highlights: [
      'Tận hưởng khí hậu trong lành mát mẻ như Đà Lạt giữa lòng miền Bắc',
      'Check-in nhà thờ Pháp cổ đổ rêu phong huyền bí giữa rừng già',
      'Thăm vườn xương rồng lớn nhất Đông Nam Á với hơn 1.200 loài quý hiếm',
      'Thưởng thức đặc sản gà đồi nướng than hoa, cá suối chiên giòn và sữa tươi Ba Vì'
    ],
    highlightsEn: [
      'Experience fresh alpine weather just 60km outside the metropolis',
      'Explore the mystical moss-covered ruins of a 1940s colonial church',
      'Discover the iconic glass dome greenhouse with 1,200 cactus species',
      'Taste charcoal-roasted mountain fowl, crispy river fish & fresh farm milk'
    ],
    included: [
      'Xe ô tô du lịch đời mới đưa đón tận nơi',
      'Vé vào cổng Vườn Quốc Gia Ba Vì & Vườn Xương Rồng',
      'Bữa trưa tiệc nướng đặc sản vùng cao Ba Vì',
      'Hướng dẫn viên dã ngoại nhiệt tình, am hiểu cung đường'
    ],
    includedEn: [
      'Private air-conditioned round-trip transport',
      'National Park entrance & Greenhouse tickets',
      'Mountain barbecue lunch featuring hill chicken and bamboo sticky rice',
      'Experienced outdoor trekking guide'
    ],
    notIncluded: ['Chi tiêu cá nhân'],
    notIncludedEn: ['Personal incidental expenses'],
    itinerary: [
      {
        time: '07:30',
        title: 'Đón khách tại Hà Nội, khởi hành đi Ba Vì',
        titleEn: 'Pickup in Hanoi & Drive to Mountains',
        description: 'Tận hưởng cung đường Đại lộ Thăng Long thoáng đãng hướng về dãy núi Tản Viên hùng vĩ.',
        descriptionEn: 'Cruise down scenic Thang Long highway toward Tan Vien mountain range.'
      },
      {
        time: '09:00 - 11:30',
        title: 'Trekking rừng thông & Nhà thờ Pháp cổ cốt 400m',
        titleEn: 'Pine Forest Walk & Mossy French Church',
        description: 'Tản bộ dưới rừng thông, khám phá vết tích của khu nghỉ dưỡng mùa hè thời Pháp với tháp chuông rêu phong.',
        descriptionEn: 'Hike through fragrant pine needles and photograph the stone walls embraced by ancient tree roots.'
      },
      {
        time: '12:00 - 13:30',
        title: 'Bữa trưa tiệc nướng giữa rừng',
        titleEn: 'Forest Barbecue Feast',
        description: 'Thưởng thức gà đồi nướng mọi chấm muối tiêu chanh, xôi nếp nương nướng ống nứa dẻo thơm.',
        descriptionEn: 'Savor organic hill-grazed chicken roasted over open embers with bamboo-tube sticky rice.'
      },
      {
        time: '14:00 - 15:30',
        title: 'Vườn Xương Rồng & Đỉnh Vua ngắm mây',
        titleEn: 'Cactus Sanctuary & Peak Vistas',
        description: 'Chiêm ngưỡng nhà kính xương rồng khổng lồ với muôn vàn hình thù kỳ thú và phóng tầm mắt ngắm đồng bằng.',
        descriptionEn: 'Marvel at the dramatic botanical geodesic dome and sweeping views of the Red River delta.'
      },
      {
        time: '15:30 - 17:00',
        title: 'Thưởng thức sữa chua nếp cẩm Ba Vì & Về lại phố',
        titleEn: 'Fresh Dairy Farm Tasting & Return',
        description: 'Dừng chân thưởng thức sữa tươi nguyên chất và sữa chua nếp cẩm đặc sản trước khi về Hà Nội.',
        descriptionEn: 'Taste fresh curd yogurt with purple sticky rice before returning to Hanoi city center.'
      }
    ],
    suitedFor: 'Gia đình, bạn trẻ yêu thiên nhiên, người muốn đổi gió cuối tuần',
    suitedForEn: 'Families, nature lovers, outdoor explorers, young groups',
    groupSize: 'Đoàn 6 - 15 khách',
    groupSizeEn: 'Small group, 6-15 guests',
    badge: 'Xanh & Trong lành',
    badgeEn: 'Pure Nature'
  }
];

export interface HanoiHighlightSpot {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  categoryEn: string;
  bestTime: string;
  bestTimeEn: string;
  description: string;
  descriptionEn: string;
  recommendTourId: string;
  coordinates: string;
}

export const HANOI_HIGHLIGHTS: HanoiHighlightSpot[] = [
  {
    id: 'hoan-kiem-lake',
    name: 'Hồ Hoàn Kiếm & Phố Cổ 36 Phố Phường',
    nameEn: 'Hoan Kiem Lake & The 36 Guild Streets',
    category: 'Trung tâm lịch sử & ẩm thực',
    categoryEn: 'Historic Core & Street Life',
    bestTime: 'Sáng sớm (06:00) hoặc Buổi tối (18:00 - 22:00)',
    bestTimeEn: 'Early morning (06:00) or Evening (18:00 - 22:00)',
    description: 'Trái tim của Hà Nội với Tháp Rùa huyền thoại, cầu Thê Húc đỏ son, các con phố mang tên Hàng buôn bán tấp nập và thiên đường ẩm thực vỉa hè nức tiếng thế giới.',
    descriptionEn: 'The heartbeat of Hanoi where ancient mythology meets vibrant street food, century-old shophouses, and tranquil lakeside strolls.',
    recommendTourId: 'hanoi-night-food-street',
    coordinates: '21.0285° N, 105.8542° E'
  },
  {
    id: 'long-bien-bridge',
    name: 'Cầu Long Biên & Sông Hồng',
    nameEn: 'Long Bien Eiffel Bridge & Red River',
    category: 'Biểu tượng lịch sử & Hoàng hôn',
    categoryEn: 'Architectural Icon & Sunset',
    bestTime: 'Hoàng hôn (17:30 - 18:30) & Đêm (19:30 - 22:00)',
    bestTimeEn: 'Sunset (17:30 - 18:30) & Night (19:30 - 22:00)',
    description: 'Chứng nhân lịch sử hơn 120 năm do người Pháp thiết kế, nối liền hai bờ sông Hồng. Nơi đón những chuyến tàu đêm và ngắm nhìn Hà Nội từ góc độ bình dị, trầm mặc nhất.',
    descriptionEn: 'A 120-year-old steel monument witnessing Hanoi resilience through wars. Walk in the twilight breeze with the aroma of roasted corn and passing trains.',
    recommendTourId: 'hanoi-night-long-bien-bridge',
    coordinates: '21.0422° N, 105.8558° E'
  },
  {
    id: 'van-mieu-quoc-tu-giam',
    name: 'Văn Miếu - Quốc Tử Giám & Ba Đình',
    nameEn: 'Temple of Literature & Ba Dinh Square',
    category: 'Di sản Nho học & Độc lập',
    categoryEn: 'Imperial Scholastic Heritage',
    bestTime: 'Sáng mát (08:00 - 10:30) hoặc Chiều (14:00 - 16:30)',
    bestTimeEn: 'Cool morning (08:00 - 10:30) or Afternoon (14:00 - 16:30)',
    description: 'Trường đại học đầu tiên của Việt Nam thành lập năm 1070, nơi lưu giữ 82 bia tiến sĩ bằng đá nghìn năm tuổi và Khuê Văn Các biểu tượng văn hiến Thăng Long.',
    descriptionEn: 'Founded in 1070 as Vietnam first university, celebrating centuries of academic dedication with shaded lotus ponds and imperial architecture.',
    recommendTourId: 'hanoi-halfday-heritage-temple-hoangthanh',
    coordinates: '21.0294° N, 105.8360° E'
  },
  {
    id: 'west-lake',
    name: 'Hồ Tây, Chùa Trấn Quốc & Làng Sen',
    nameEn: 'West Lake & Tran Quoc Pagoda',
    category: 'Tâm linh & Cảnh quan lãng mạn',
    categoryEn: 'Spiritual Serenity & Sunset Waters',
    bestTime: 'Chiều tà (16:00 - 18:30)',
    bestTimeEn: 'Late afternoon & dusk (16:00 - 18:30)',
    description: 'Hồ nước ngọt tự nhiên lớn nhất thủ đô với chu vi 17km. Nổi tiếng với Chùa Trấn Quốc cổ nhất Hà Nội, trà sen Tây Hồ đắt giá và hoàng hôn rực rỡ nhất miền Bắc.',
    descriptionEn: 'Hanoi largest scenic freshwater expanse. Home to 1,500-year-old Buddhist stupas, hundred-petal lotus ponds, and the most breathtaking sunsets in the north.',
    recommendTourId: 'hanoi-halfday-west-lake-zen',
    coordinates: '21.0537° N, 105.8239° E'
  },
  {
    id: 'duong-lam-village',
    name: 'Làng Cổ Đường Lâm & Ngoại Thành',
    nameEn: 'Duong Lam Ancient Village & Countryside',
    category: 'Làng quê Bắc Bộ & Nghỉ dưỡng cuối tuần',
    categoryEn: 'Living Heritage Village & Weekend Respite',
    bestTime: 'Cuối tuần Thứ Bảy & Chủ Nhật (Trọn ngày)',
    bestTimeEn: 'Weekends Saturday & Sunday (Full Day)',
    description: 'Ngôi làng đá ong cổ kính tiêu biểu của văn hóa lúa nước sông Hồng. Nơi thời gian như ngưng đọng với cây đa, bến nước, sân đình và những ngôi nhà 300 năm tuổi.',
    descriptionEn: 'A living open-air museum 45km from downtown, celebrated for red laterite masonry, quiet bamboo pathways, and slow-braised country recipes.',
    recommendTourId: 'hanoi-weekend-duong-lam-ancient-village',
    coordinates: '21.1444° N, 105.4744° E'
  }
];

export interface Testimonial {
  id: string;
  name: string;
  origin: string;
  avatarText: string;
  tourTaken: string;
  tourTakenEn: string;
  rating: number;
  date: string;
  comment: string;
  commentEn: string;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Trần Minh Đức & Thu Hà',
    origin: 'TP. Hồ Chí Minh',
    avatarText: 'ĐH',
    tourTaken: 'Hà Nội Đêm & Hương Vị Ẩm Thực Phố Cổ',
    tourTakenEn: 'Hanoi Night Walk & Street Gastronomy',
    rating: 5,
    date: 'Tháng 10, 2026',
    comment: 'Tour buổi tối tuyệt vời nhất mà mình từng trải nghiệm! Anh hướng dẫn viên dẫn vào những quán nhỏ trong ngõ mà nếu tự đi chắc chắn không bao giờ tìm thấy. Bún chả nướng thơm lừng, còn phở cuốn thì tươi rói. 10/10.',
    commentEn: 'The absolute best night tour we experienced! The local guide led us into tiny tucked-away spots we would have never spotted alone. The grilled bun cha aroma was divine!'
  },
  {
    id: 'rev-2',
    name: 'Elena & Marcus Vance',
    origin: 'Melbourne, Australia',
    avatarText: 'EV',
    tourTaken: 'Tinh Hoa Cà Phê Trứng & Ngõ Nhỏ Phố Cổ (2.5h)',
    tourTakenEn: 'Egg Coffee Masterclass (2.5h)',
    rating: 5,
    date: 'Tháng 9, 2026',
    comment: 'Chúng tôi chỉ có 4 tiếng quá cảnh ở Hà Nội và chọn tour 2.5 giờ này. Thực sự hoàn hảo! Tự tay đánh bông kem trứng trên căn gác cổ kính nhìn ra phố rợp bóng cây, cảm giác rất thơ và đậm chất Hà Nội.',
    commentEn: 'We only had a 4-hour layover and booked this 2.5-hour workshop. It was sheer magic! Whisking our own egg foam inside a colonial balcony was the highlight of our Vietnam trip.'
  },
  {
    id: 'rev-3',
    name: 'Nguyễn Bích Ngọc & Gia đình',
    origin: 'Đà Nẵng',
    avatarText: 'BN',
    tourTaken: 'Cuối Tuần Bình Yên: Làng Cổ Đường Lâm',
    tourTakenEn: 'Serene Weekend: Duong Lam Village',
    rating: 5,
    date: 'Tháng 10, 2026',
    comment: 'Cả nhà mình có cả người lớn tuổi và 2 bé nhỏ. Đi tour cuối tuần về Đường Lâm ai cũng thích mê vì không khí trong lành, đường đạp xe bằng phẳng rợp bóng tre và bữa trưa cơm quê ngon hơn mong đợi rất nhiều.',
    commentEn: 'Our multi-generation family with seniors and toddlers had an unforgettable weekend. The laterite village breeze, easy cycling under bamboo, and the authentic timber house lunch were exceptional.'
  }
];
