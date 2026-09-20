HÀNH KIỂM - FIREBASE DÙNG CHUNG CSDL

Phiên bản này dùng Firebase Realtime Database trực tiếp từ website.
GitHub Pages chỉ cần phục vụ các file tĩnh; server.js không còn cần cho việc lưu dữ liệu.

Đã cấu hình Firebase project:
- Project: quanlyhanhkiem
- Realtime Database: https://quanlyhanhkiem-default-rtdb.asia-southeast1.firebasedatabase.app

Cách đưa lên GitHub Pages:
1. Upload/replace các file trong thư mục này vào repository GitHub.
2. GitHub Pages -> Deploy from branch -> chọn branch đang dùng và thư mục /root.
3. Mở website GitHub Pages trên máy tính và điện thoại bằng cùng một URL.

Lưu ý bảo mật:
- firebase-config.js có thể nằm trên GitHub; các giá trị cấu hình Web App không phải secret key quản trị.
- Hiện Realtime Database của project đang ở Test mode. Chế độ này cho phép đọc/ghi rộng và KHÔNG nên dùng lâu dài cho dữ liệu học sinh thật.
- Cần thiết lập Authentication + Rules trước khi đưa vào sử dụng chính thức trên Internet.
