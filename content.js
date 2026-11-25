// Chỉnh nội dung tại đây. Mọi đường dẫn ảnh đều tương đối với index.html.
window.WEDDING = {
  demo: true,
  rsvpEndpoint: 'https://script.google.com/macros/s/AKfycby4ZXg5hrQy2kkpHvs64HD20zkO0DraDaYKSP2OpkfFOo0SRtz1KNidBZe9v73ZexiBOA/exec',
  site: {
    title: 'Minh Hoài & Phương Dung — Mình cưới nhé',
    description: 'Trân trọng mời bạn đến chung vui trong ngày hạnh phúc của Minh Hoài và Phương Dung.',
    url: 'https://hoaitran95.github.io/OurWedding/',
    shareImage: 'assets/photos/hero.jpg?v=5ff271e40be7'
  },
  bride: { name: 'Phương Dung', fullName: 'Phạm Thị Phương Dung', father: 'Phạm Còn', mother: 'Nguyễn Thị Bảy', familyAddress: '188/13 Trần Hưng Đạo, Xã Hoài Đức, Tỉnh Lâm Đồng', birthOrder: 'Thứ nữ' },
  groom: { name: 'Minh Hoài', fullName: 'Trần Minh Hoài', father: 'Trần Thôn', mother: 'Trần Thị Ba', familyAddress: '139 Điện Biên Phủ, Xã Hoài Đức, Tỉnh Lâm Đồng', birthOrder: 'Út nam' },
  weddingDate: '2026-12-20T09:00:00+07:00',
  hero: 'assets/photos/hero.jpg',
  opening: { src: 'assets/photos/top.jpg', position: 'center', alt: 'Ảnh cưới mở đầu thiệp' },
  cover: { src: 'assets/photos/cover.jpg', position: 'center', alt: 'Ảnh bìa thiệp cưới' },
  music: { enabled: true, src: 'assets/audio/vay-cuoi.mp3', volume: 0.30 },
  invitation: 'Có những cuộc gặp gỡ trở thành một đời. Sau những ngày cùng nhau đi qua thương nhớ, chúng mình đã sẵn sàng viết tiếp câu chuyện ấy với một mái nhà.',
  invitationClosing: 'Sau những mùa thu dần qua,\nchúng mình tìm thấy bến bờ bình yên trong nhau.\n\nXin gửi lời mời chân thành nhất\nđến các bạn trong ngày vui của chúng mình.',
  thanks: 'Sự hiện diện của bạn là món quà quý giá nhất trong ngày hạnh phúc của chúng mình.',
  events: [
    { side: 'Nhà gái', title: 'Tiệc vu quy', datetime: '2026-12-19T11:00:00+07:00', venue: 'Nhà hàng Leyna Palace – Sảnh 3', address: '196 ĐT 766, Thôn Đức Hạnh, Xã Hoài Đức, Tỉnh Lâm Đồng', mapsUrl: 'https://maps.app.goo.gl/39xXMY6QAoUMy9Rq5', transport: { pickup: 'Xe đón lúc 8h30 tại BV Đa khoa Khu Vực Thủ Đức.', return: 'Dự kiến về lại Sài Gòn lúc 14h', duration: '(Thời gian di chuyển khoảng 2h/lượt)' } },
    { side: 'Nhà trai', title: 'Tiệc tân hôn', datetime: '2026-12-20T11:00:00+07:00', ceremonyDatetime: '2026-12-20T09:00:00+07:00', venue: 'Tư gia nhà trai', address: '139 Điện Biên Phủ, Hoài Đức, Lâm Đồng', mapsUrl: 'https://maps.app.goo.gl/gscFx4pofCw3k8Yu5', transport: { pickup: 'Xe đón lúc 8h30 tại Sài Gòn.', return: 'Dự kiến về lại Sài Gòn lúc 14h', duration: '(Thời gian di chuyển khoảng 2h/lượt)' } }
  ],
  // Ảnh xen kẽ độc lập với album cuối trang; thay src và position theo ảnh thật.
  interludes: [
  ],
  // Danh sách ảnh riêng được tạo từ assets/albums bởi scripts/build-album.cjs.
  album: [],
  gifts: [
    { role: 'Chú rể', name: 'TRẦN MINH HOÀI', bank: 'Ngân hàng minh họa', account: '', qr: 'assets/QR_groom.png' },
    { role: 'Cô dâu', name: 'PHẠM THỊ PHƯƠNG DUNG', bank: 'Ngân hàng minh họa', account: '', qr: 'assets/QR_bride.png' }
  ]
};
