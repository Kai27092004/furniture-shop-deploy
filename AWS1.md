📘 TÀI LIỆU AWS PART 2: NGINX, SSL & DOMAIN CONFIGURATION
Dự án: Furniture Shop Mục tiêu: Cấu hình Reverse Proxy, gắn tên miền, cài chứng chỉ bảo mật SSL miễn phí.

I. GIỚI THIỆU KHÁI NIỆM (LÝ THUYẾT)
Trước khi thực hành, cần hiểu chúng ta đang xây dựng kiến trúc gì:

Nginx (Reverse Proxy):

Đóng vai trò là "Lễ tân" đứng ở cửa chính của Server (Cổng 80 và 443).

Nhiệm vụ: Tiếp nhận yêu cầu từ người dùng, kiểm tra bảo mật, sau đó chuyển tiếp (forward) yêu cầu đó vào cho Backend Node.js (đang chạy ẩn ở cổng 8080).

Tại sao cần? Để bảo vệ Backend, tăng tốc độ xử lý và quan trọng nhất là để cài SSL.

SSL (Secure Sockets Layer):

Là công nghệ mã hóa dữ liệu đường truyền (biểu hiện bằng Ổ khóa xanh trên trình duyệt).

Giúp web chạy được các tính năng bảo mật cao (như Thanh toán online) và không bị trình duyệt chặn "Mixed Content".

Certbot & Let's Encrypt:

Let's Encrypt: Tổ chức cấp chứng chỉ SSL miễn phí toàn cầu.

Certbot: Công cụ tự động giúp xin chứng chỉ từ Let's Encrypt và cài vào Nginx cho bạn.

II. QUY TRÌNH THỰC HIỆN (STEP-BY-STEP)
BƯỚC 1: Chuẩn bị Backend (Chuyển cổng Docker)
Hiện tại Docker đang chiếm dụng cổng 80 (cổng chính). Chúng ta cần nhường cổng này cho Nginx và chuyển Docker vào "phòng trong" (cổng 8080).

SSH vào EC2.

Xóa container cũ:

Bash

sudo docker rm -f my-backend
Chạy lại Docker ở cổng nội bộ (8080): Lệnh này map cổng 8080 của máy chủ vào cổng 8080 của container.

Bash

sudo docker run -d -p 8080:8080 --env-file .env --name my-backend furniture-backend
(Lúc này nếu truy cập IP trực tiếp sẽ không vào được, điều này là bình thường).

BƯỚC 2: Cài đặt Nginx và Certbot
Cài đặt "người bảo vệ" và "bộ công cụ tạo khóa".

Cập nhật kho ứng dụng:

Bash

sudo apt-get update
Cài đặt:

Bash

sudo apt-get install nginx certbot python3-certbot-nginx -y
BƯỚC 3: Cấu hình Nginx (Kết nối Tên miền -> Docker)
Tạo file cấu hình để Nginx biết phải làm gì khi có người gọi tên miền api.phatdev.id.vn.

Tạo file cấu hình:

Bash

sudo nano /etc/nginx/conf.d/furniture-api.conf
Dán nội dung sau vào: (Chuột phải để Paste. Bấm Ctrl+O -> Enter để lưu, Ctrl+X để thoát)

Nginx

server {
    # Lắng nghe tên miền này
    server_name api.phatdev.id.vn;

    location / {
        # Chuyển tiếp yêu cầu vào Docker đang chạy ở cổng 8080
        proxy_pass http://localhost:8080;

        # Các cấu hình header để Backend nhận diện đúng client
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
Khởi động lại Nginx để áp dụng:

Bash

sudo systemctl restart nginx
BƯỚC 4: Cài đặt SSL (Kích hoạt Ổ khóa xanh)
Đây là bước "biến hình" từ HTTP sang HTTPS.

Chạy Certbot:

Bash

sudo certbot --nginx -d api.phatdev.id.vn
Trả lời câu hỏi của Robot:

Enter email address: Nhập email của bạn.

Agree to Terms of Service? Y (Yes).

Share your email? N (No).

Chờ thông báo "Congratulations!" xuất hiện.

=> Kết quả: Bây giờ Backend của bạn đã chạy tại: https://api.phatdev.id.vn.

BƯỚC 5: Cập nhật Frontend (AWS Amplify)
Vì Backend đã lên đời HTTPS, Frontend cũng phải cập nhật địa chỉ gọi API.

Truy cập AWS Amplify Console.

Vào mục Hosting -> Environment variables.

Sửa (hoặc thêm mới) biến môi trường:

Key: VITE_API_URL

Value: https://api.phatdev.id.vn (Chú ý: Phải là https, không phải http).

Lưu lại (Save).

Quan trọng: Quay lại trang chủ Hosting, bấm Redeploy this version để build lại web với cấu hình mới.

III. CÁC LỆNH BẢO TRÌ & SỬA LỖI (MAINTENANCE)
Lưu lại các lệnh này để dùng khi hệ thống gặp sự cố:

1. Kiểm tra trạng thái Nginx: Xem Nginx có đang chạy hay bị lỗi cấu hình.

Bash

sudo systemctl status nginx
2. Kiểm tra Logs của Nginx (Nếu web bị lỗi 502 Bad Gateway):

Bash

sudo tail -f /var/log/nginx/error.log
3. Kiểm tra Logs của Backend Docker:

Bash

sudo docker logs my-backend --tail 50
4. Gia hạn chứng chỉ SSL (Certbot tự động làm, nhưng có thể kiểm tra):

Bash

sudo certbot renew --dry-run
5. Cập nhật Code Backend mới nhất (Quy trình chuẩn): Khi bạn push code mới lên GitHub, hãy chạy chuỗi lệnh này trên EC2:

Bash

cd furniture-shop-deploy/backend
git pull
# Xây lại Docker image
sudo docker build -t furniture-backend .
# Tắt container cũ
sudo docker rm -f my-backend
# Chạy container mới (Cổng 8080)
sudo docker run -d -p 8080:8080 --env-file .env --name my-backend furniture-backend
(Không cần đụng vào Nginx nữa, Nginx sẽ tự động dẫn vào container mới).