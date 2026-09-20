# Website Quản lý điểm hạnh kiểm — dùng chung CSDL

## Chạy trên máy tính
Yêu cầu Node.js 18 trở lên.

```bash
npm start
```

Mở: `http://localhost:3000`

## Dữ liệu dùng chung điện thoại và máy tính
- Dữ liệu được lưu tại `data.json` trên máy chủ.
- Điện thoại và máy tính phải truy cập cùng địa chỉ web của máy chủ, không mở trực tiếp file `index.html`.
- Khi triển khai lên hosting/VPS, chạy `node server.js` và dùng domain/IP của máy chủ.
- Có thể đặt thư mục dữ liệu riêng bằng biến môi trường `DATA_DIR`.

## Tài khoản mặc định
- Admin: `admin` / `admin123`

## Lưu ý bảo mật khi đưa lên Internet
Phiên bản hiện tại giữ cơ chế đăng nhập cũ của dự án và API dữ liệu nội bộ. Trước khi dùng thực tế trên Internet, nên bổ sung xác thực máy chủ, mã hóa mật khẩu, phân quyền API và HTTPS.
