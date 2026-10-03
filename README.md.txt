# 🧋 Quán trà sữa của Vân Khánh

Game quản lý quán trà sữa kể về Vân Khánh — cô gái 18 tuổi tự kiếm tiền học phí bằng một quán nhỏ ở phố cổ Hà Nội, rồi mở rộng sang Bắc Kinh và Thượng Hải.

## 🎮 Cách chơi

- Mỗi ngày dài **4 phút** (10:00 – 22:00)
- Chạm vào khách để xem món, pha trà theo đúng yêu cầu
- Đạt **Lv10** → sang Bắc Kinh, **Lv20** → sang Thượng Hải, **Lv30** → kết thúc
- Có 3 chương với bối cảnh, topping và thời tiết khác nhau

## ✨ Tính năng

- 🎨 Đồ họa "cửa sổ" bo góc nhẹ, viền rõ, đổ bóng cứng
- 🌦️ Thời tiết ảnh hưởng đến lượng khách (mưa vắng, nắng đông)
- 🧁 9 loại topping mở khóa dần theo level
- 👥 7 nhân viên với kỹ năng riêng
- 🎯 Nhiệm vụ hàng ngày + nâng cấp quán
- 💾 Tự động lưu tiến trình (localStorage)
- 📱 PWA: cài được lên màn hình chính

## ⚡ Tối ưu cho iOS/Safari

- Logic chạy **20fps**, UI **4fps** (thay vì 60fps)
- Không có animation `infinite` — thay bằng đổi màu nền
- Cache DOM element, không query mỗi frame
- Tự dừng khi tab ẩn, tạm dừng AudioContext
- Zero allocation trong game loop

Kết quả: chơi liên tục **không nóng máy**, pin tụt chậm.

## 📦 Cài đặt

### Cách 1: GitHub Pages
1. Fork / tạo repo mới
2. Upload toàn bộ file
3. Vào **Settings → Pages → Source: main / root**
4. Mở link `https://<user>.github.io/<repo>/`

### Cách 2: Chạy local
```bash
# Cần HTTPS hoặc localhost để service worker hoạt động
npx serve .
