# Dự án Kế hoạch 90 ngày (MIK × Masterise)

Dự án này là trang web tĩnh hiển thị kế hoạch hành động 90 ngày dành cho thương hiệu cá nhân Bất động sản phía Đông Hà Nội (nhân vật Hiệp). 

## 📂 Danh mục tệp tin
* `index.html`: Chứa toàn bộ giao diện, CSS và logic JavaScript của kế hoạch 90 ngày (đã được tối ưu để hoạt động độc lập không cần server).

---

## 🚀 Hướng dẫn đưa lên GitHub (Không cần cài đặt Git)

Nếu máy tính của bạn chưa cài đặt Git, bạn có thể tải trực tiếp lên GitHub thông qua giao diện trang web theo các bước sau:

1. **Đăng nhập vào GitHub:** Truy cập [github.com](https://github.com/) và đăng nhập (hoặc đăng ký tài khoản mới nếu chưa có).
2. **Tạo Repository mới:**
   * Click vào nút **New** (hoặc biểu tượng dấu cộng `+` ở góc trên cùng bên phải -> chọn **New repository**).
   * Điền **Repository name** (ví dụ: `kehoach-90-ngay-hiep`).
   * Chọn chế độ **Public** (hoặc **Private** tùy nhu cầu, Render đều có thể kết nối được).
   * Không cần tick chọn bất cứ ô cấu hình nào khác (như Add a README file, .gitignore, v.v. vì chúng ta sẽ tự tải lên).
   * Nhấn nút **Create repository**.
3. **Tải file lên:**
   * Sau khi tạo xong, bạn sẽ thấy dòng chữ: *"Get started by creating a new file or uploading an existing file"*. Hãy nhấn vào link **uploading an existing file**.
   * Kéo và thả file `index.html` và file `README.md` này từ thư mục của bạn vào vùng tải lên.
   * Chờ file tải xong, kéo xuống dưới cùng và nhấn **Commit changes**.

---

## 🌐 Hướng dẫn Deploy lên Render (Miễn phí hoàn toàn)

Render cho phép bạn host website tĩnh hoàn toàn miễn phí từ kho lưu trữ GitHub của bạn.

1. **Đăng ký/Đăng nhập Render:** Truy cập [render.com](https://render.com/) và chọn **Sign in** (chọn đăng nhập bằng tài khoản **GitHub** để dễ dàng kết nối).
2. **Tạo dịch vụ mới:**
   * Ở giao diện Dashboard của Render, nhấn nút **New +** ở góc trên bên phải.
   * Chọn **Static Site** (đây là dịch vụ dành cho trang web tĩnh chỉ gồm HTML/CSS/JS).
3. **Kết nối kho lưu trữ GitHub:**
   * Tìm đến repository bạn vừa tạo ở trên (ví dụ: `kehoach-90-ngay-hiep`) trong mục **Connect a repository** và nhấn **Connect**.
   * *(Nếu không thấy, hãy nhấn vào liên kết cấu hình quyền truy cập GitHub của Render để cấp quyền xem repository mới).*
4. **Cấu hình Deploy:**
   * **Name**: Đặt tên cho project hiển thị trên Render (ví dụ: `kehoach-90-ngay-hiep`).
   * **Branch**: `main` (hoặc tên branch mặc định của bạn).
   * **Build Command**: Để trống (không cần điền vì đây là file HTML tĩnh có sẵn).
   * **Publish directory**: Để trống hoặc điền `.` (tức là thư mục gốc nơi chứa file `index.html`).
   * Nhấn **Create Static Site**.
5. **Hoàn tất:**
   * Render sẽ tự động build và deploy trang web của bạn trong vòng 1-2 phút.
   * Khi trạng thái đổi thành **Live**, bạn sẽ nhìn thấy liên kết trang web dạng `https://kehoach-90-ngay-hiep.onrender.com` nằm ở góc trên cùng bên trái. Bạn có thể truy cập và chia sẻ liên kết này!
