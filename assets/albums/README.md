Đặt ảnh album riêng vào thư mục này (JPG, JPEG, PNG, WebP, AVIF hoặc GIF).
Đặt tên 01.jpg, 02.jpg… để chọn thứ tự hiển thị.

GitHub Actions tự tạo danh sách ảnh khi deploy. Khi xem local, chạy:

    node scripts/build-album.cjs

Sau khi thêm, xóa hoặc đổi tên ảnh, chạy lại lệnh và tải lại trang.
Không sửa manifest.js bằng tay. Album sẽ ẩn nếu thư mục chưa có ảnh.
