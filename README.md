# Mình cưới nhé — Thiệp cưới online

Website tĩnh tiếng Việt, nền kem và đỏ trầm, chạy trên GitHub Pages. HTML/CSS/JavaScript thuần; không cần cài thư viện hoặc build. Bản hiện tại dùng **nội dung và ảnh minh họa**, không nhận chuyển khoản.

## Xem trên máy

Tại thư mục dự án, chạy:

```sh
python3 -m http.server 8000
```

Mở http://localhost:8000. Dừng bằng Ctrl+C. Kiểm tra tự động: `node --test tests/site.test.cjs` (Node 18 trở lên).

## Thay nội dung

Sửa `content.js`:

- `bride`, `groom`: tên, họ tên, tên bố mẹ.
- `weddingDate`: thời điểm đếm ngược, luôn có `+07:00`, ví dụ `2027-02-14T11:00:00+07:00`.
- `events`: hai lịch tiệc; `datetime` có múi giờ, `mapsUrl` lấy từ Google Maps đúng địa điểm (có thể dùng link chia sẻ). Kiểm tra pin bản đồ trước khi gửi khách.
- `hero`, `album`: thay ảnh trong `assets/photos/`, sửa đường dẫn, mô tả `alt` và chú thích. Nên dùng JPEG/WebP, ảnh đầu 1200–1600px, ảnh album 800–1200px, mỗi ảnh dưới 500KB nếu có thể.
- `gifts`: lưu ảnh QR xuất từ ứng dụng ngân hàng vào `assets/`, điền đường dẫn `qr`, tên chủ tài khoản, ngân hàng và số tài khoản dạng chuỗi để giữ số 0 đầu. Website không tạo QR chuyển khoản. Chỉ dùng QR do bạn xác nhận đúng người nhận.
- `invitation`, `invitationClosing`, `thanks`: lời mời và cảm ơn.
- Khi đã thay hết nội dung thật, đặt `demo: false` để bật sao chép số tài khoản. Không tắt chế độ mẫu khi chưa thay QR.

## Tiêu đề và ảnh khi chia sẻ qua Zalo/Facebook

Sửa `site` trong `content.js`. Vì trình thu thập ảnh chia sẻ có thể không chạy JavaScript, **đồng thời sửa trực tiếp** `<title>`, description và các thẻ `og:*` trong phần `<head>` của `index.html`:

```html
<meta property="og:url" content="https://USERNAME.github.io/OurWedding/">
<meta property="og:image" content="https://USERNAME.github.io/OurWedding/assets/photos/hero.jpg">
<link rel="canonical" href="https://USERNAME.github.io/OurWedding/">
```

Đặt `site.url` cùng URL chính thức, có dấu `/` ở cuối. Ảnh chia sẻ nên là JPEG 1200×630, dùng URL tuyệt đối. Thay `og:image` bằng đường dẫn ảnh đó; dịch vụ chia sẻ có thể lưu cache ảnh cũ. Các ảnh và tài nguyên hiển thị trên trang vẫn dùng đường dẫn tương đối.

## Đưa lên GitHub Pages

1. Tạo repository `OurWedding` trên tài khoản GitHub của bạn, đưa toàn bộ mã nguồn lên nhánh `main`. Không đưa thông tin riêng ngoài nội dung dự định công khai.
2. Trong repository, chọn **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Chạy workflow **Deploy wedding invitation to GitHub Pages** tại tab **Actions**, hoặc push thay đổi lên `main`.
4. Khi workflow hoàn tất, mở URL tại environment `github-pages`, thường là `https://USERNAME.github.io/OurWedding/`.
5. Cập nhật URL chia sẻ như phần trên, push lại và gửi thử link trên điện thoại.

Workflow chỉ xuất bản HTML, CSS, JavaScript và `assets/`, không xuất bản README hoặc tests. Nếu nhánh mặc định khác `main`, sửa `branches` trong workflow. Không cần dịch vụ Sites hoặc backend.

## Kiểm tra trước khi gửi thiệp

- Đã thay tên, bố mẹ, ngày giờ cả hai bên, ảnh cưới và địa chỉ thật.
- Mở từng nút Google Maps trên điện thoại và xác nhận đúng địa điểm.
- Quét từng QR bằng ứng dụng ngân hàng, đối chiếu tên và số tài khoản; không cần thực hiện giao dịch.
- Kiểm tra sao chép số tài khoản trên HTTPS, album, phím mũi tên, Escape và Tab.
- Xem ở chiều rộng 360px và desktop; thử chế độ giảm chuyển động.
- Kiểm tra URL dưới đường dẫn repository; dùng link HTTP server khi chạy local, không mở trực tiếp file HTML.

## Nguồn ảnh mẫu

Ảnh tải từ Unsplash để minh họa giao diện, cần thay bằng ảnh của hai bạn:

- https://images.unsplash.com/photo-1519741497674-611481863552
- https://images.unsplash.com/photo-1511285560929-80b456fea0bc
- https://images.unsplash.com/photo-1523438885200-e635ba2c371e

Không sử dụng RSVP, sổ lời chúc, analytics hoặc lưu dữ liệu khách. Nội dung được phục vụ công khai khi bật GitHub Pages.

## Nhạc nền và kiểu chữ

- Nhạc nền là bài “Váy cưới”, dùng file người dùng cung cấp tại `assets/audio/vay-cuoi.mp3`. Tự phát lặp lại ở âm lượng nhỏ (0.12) khi khách chạm **Mở thiệp**, có nút tắt/bật. Trình duyệt cần lần chạm này để cho phép âm thanh; một số thiết bị vẫn có thể cần bấm nút nhạc.
- Để thay bài, lưu file MP3/WAV của bạn trong `assets/audio/` và sửa `music.src` trong `content.js`. Đặt `music.volume` từ 0 đến 1; `music.enabled: false` để ẩn nút nhạc. Dùng bản nhạc bạn có quyền sử dụng.
- Cormorant Garamond dành cho tên/tiêu đề, Be Vietnam Pro dành cho nội dung. Font lưu cục bộ trong `assets/fonts/`, kèm giấy phép SIL Open Font License. Không gọi dịch vụ font bên ngoài.

## Ảnh bìa và lịch

`cover.src` trong `content.js` là ảnh bìa độc lập với ảnh chính `hero`. Đổi sang đường dẫn ảnh trong `assets/photos/`; ảnh dọc tỉ lệ khoảng 2:3 phù hợp nhất. `cover.position` điều chỉnh vùng cắt, ví dụ `center` hoặc `50% 30%`. Ảnh mặc định lấy từ hình tham khảo người dùng cung cấp, thay bằng ảnh hai bạn trước khi gửi khách.

Khách chạm ảnh hoặc nhấn Enter/Space tại nút mở thiệp để xem nội dung. Lịch được tạo tự động từ ngày tiệc của `events`, đánh dấu từng ngày và ghi chú nhà trai/nhà gái. Nếu hai tiệc khác tháng, trang hiển thị lịch cho từng tháng.

## Ảnh xen kẽ và album cuối thiệp

`interludes` trong `content.js` điều khiển ba ảnh chuyển đoạn: sau lời mời, sau thông tin tiệc/lịch và trước album. Thay `src`, `alt`, `caption`, `eyebrow` và `position` (vùng cắt ảnh); giữ nguyên `slot` để đặt đúng vị trí. Xóa một mục khỏi danh sách để ẩn ảnh chuyển đoạn đó.

Album chỉ lấy ảnh riêng từ `assets/albums/`, không dùng lại ảnh trong `assets/photos/`. Bấm ảnh album để phóng lớn và chuyển ảnh. Ảnh xen kẽ chỉ dùng để trình bày, không mở hộp thoại.

## Thông tin gia đình

Phần “Thông tin lễ cưới” dùng `groom` và `bride` trong `content.js`: `father`, `mother`, `familyAddress` (địa chỉ gia đình), `fullName` và `birthOrder` (Út nam/Thứ nữ). Địa chỉ gia đình độc lập với địa điểm tổ chức tiệc trong `events`.

## Album ảnh riêng

Đặt ảnh JPG/JPEG/PNG/WebP/AVIF/GIF vào `assets/albums/`. Đặt tên `01.jpg`, `02.jpg`… để sắp xếp thứ tự. Khi xem local, chạy `node scripts/build-album.cjs` sau mỗi lần thêm/xóa/đổi tên ảnh rồi tải lại trang. GitHub Actions tự chạy bước này khi deploy. Không sửa `manifest.js` bằng tay. Album ẩn khi chưa có ảnh. Ảnh dọc tỉ lệ khoảng 2:3 phù hợp nhất.

Ảnh giữa lớn, hai bên nghiêng; tự chuyển mỗi 4 giây khi album xuất hiện trên màn hình. Có vuốt trái/phải, nút trước/sau, phím mũi tên khi focus album và nút bật/tạm dừng tự chuyển. Chạm ảnh giữa mở phóng lớn. Tự chuyển tạm dừng khi đang chạm/vuốt, mở hộp thoại hoặc ẩn tab; tiếp tục khi xem ảnh lớn rồi đóng lại, kể cả khi con trỏ hoặc focus còn trong album. Cài đặt giảm chuyển động tắt tự chuyển mặc định.

## Khung thiệp dọc

Toàn bộ thiệp dùng một cột, rộng tối đa 480px, căn giữa trên máy tính và vừa chiều rộng điện thoại. Lịch tiệc, ảnh xen kẽ và QR đều xếp dọc. Riêng thông tin gia đình hiển thị hai cột cùng hàng (nhà trai trái, nhà gái phải), có đường kẻ dọc ở giữa. Album vẫn giữ hiệu ứng ảnh giữa lớn và hai ảnh nghiêng. Chỉnh `--invitation-width` trong `styles.css` nếu cần thay độ rộng tối đa.

## Nội dung đã tinh gọn

Thiệp không hiển thị nhãn mẫu, nhãn tiếng Anh lặp tiêu đề hoặc chữ trang trí đè ảnh. Mục mừng cưới chỉ hiển thị tài khoản có đầy đủ tên, ngân hàng, số tài khoản và ảnh QR khác ảnh placeholder; nếu chưa có, hiển thị một thông báo chờ cập nhật. `demo` vẫn khóa nút sao chép đến khi thông tin thật được xác nhận.

## Ảnh mở đầu đứng yên khi cuộn

`opening` trong `content.js` cấu hình ảnh mở đầu sau khi khách chạm mở thiệp: `src`, `position`, `alt`. Ảnh chiếm chiều cao màn hình và đứng yên phía sau khi nội dung chính cuộn lên che dần. Bìa chạm mở dùng `cover` riêng. Hiệu ứng dùng CSS sticky, không bắt sự kiện cuộn; chế độ giảm chuyển động dùng ảnh cuộn thông thường.
