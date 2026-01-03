📘 TÀI LIỆU HƯỚNG DẪN DEPLOY FULL-STACK TRÊN AWS
Dự án: Website Nội thất (Furniture Shop) Tech Stack: React (Vite) - Node.js (Express) - MySQL - Docker

PHẦN 1: DATABASE (CƠ SỞ DỮ LIỆU) - AWS RDS
Đây là nơi chứa dữ liệu, cần làm trước để Backend có chỗ kết nối.

Tạo Database:

Vào AWS Console, tìm dịch vụ RDS.

Chọn Create database -> Standard create -> MySQL.

Templates: Chọn Free tier (Quan trọng để không mất tiền).

Settings:

DB Instance identifier: Đặt tên tùy ý (vd: furniture-db).

Master username: admin (hoặc tên bạn muốn).

Master password: Đặt mật khẩu.

Connectivity:

Public access: Chọn Yes (Để từ máy tính bạn có thể kết nối vào nạp dữ liệu).

VPC Security Group: Chọn Create new.

Bấm Create database và chờ khoảng 5-10 phút.

Lấy Endpoint (Địa chỉ nhà):

Khi trạng thái là Available, bấm vào tên Database.

Copy dòng Endpoint (ví dụ: furniture-db.cx...rds.amazonaws.com).

Nạp dữ liệu (Import SQL):

Dùng phần mềm như MySQL Workbench hoặc DBeaver trên máy tính.

Kết nối với Host là Endpoint vừa copy, User/Pass vừa tạo.

Chạy file script .sql của bạn để tạo bảng và dữ liệu mẫu.

PHẦN 2: BACKEND (MÁY CHỦ API) - AWS EC2 + DOCKER
Đây là "bộ não" xử lý logic, chạy trên môi trường Docker.

Bước 1: Thuê máy chủ (Launch Instance)
Vào dịch vụ EC2 -> Launch Instances.

Name: Đặt tên (vd: furniture-backend).

OS Image: Chọn Ubuntu.

Instance Type: Chọn t2.micro (Free tier).

Key pair: Tạo mới, đặt tên và tải về file .pem (Giữ kỹ file này, mất là không vào được máy).

Network settings (Quan trọng):

Tick chọn: Allow HTTP traffic from the internet.

Tick chọn: Allow HTTPS traffic from the internet.

Bấm Launch instance.

Bước 2: Cài đặt môi trường (Trên Terminal AWS)
Kết nối vào EC2 (Bấm nút Connect trên giao diện Web).

Chạy lần lượt các lệnh sau để cài Docker và Git:

Bash

sudo apt-get update
sudo apt-get install docker.io -y
sudo apt-get install git -y
Bước 3: Lấy Code và Cấu hình
Clone code:

Bash

git clone [LINK_GITHUB_CUA_BAN]
cd furniture-shop-deploy/backend
Tạo file biến môi trường (.env):

Gõ lệnh: nano .env

Copy nội dung bên dưới, chuột phải để Paste và sửa thông tin của bạn:

Đoạn mã

PORT=8080
DB_HOST=[Dán Endpoint RDS ở Phần 1 vào đây]
DB_USER=admin
DB_PASSWORD=[Mật khẩu RDS của bạn]
DB_NAME=furniture_db
DB_PORT=3306

# Cấu hình thanh toán SePay
SEPAY_API_KEY=...

# Các key khác (JWT, Google...)
JWT_SECRET=bi_mat...
Lưu: Ctrl+O -> Enter -> Ctrl+X.

Bước 4: Chạy Server (Thần chú Docker)
Chạy 2 lệnh này để đóng gói và khởi chạy:

Bash

sudo docker build -t furniture-backend .
sudo docker run -d -p 80:8080 --env-file .env --name my-backend furniture-backend
Lúc này Backend đã chạy tại IP: http://[IP_PUBLIC_CUA_EC2].

PHẦN 3: FRONTEND (GIAO DIỆN) - AWS AMPLIFY
Đây là nơi hiển thị trang web cho người dùng.

Vào dịch vụ AWS Amplify.

Chọn Host web app -> GitHub.

Đăng nhập GitHub và chọn Repository dự án của bạn.

Chọn nhánh (Branch) muốn deploy (thường là main).

Build settings: Để mặc định (Amplify tự nhận diện React/Vite).

Environment variables (Nếu cần):

Nếu code Frontend bạn dùng biến môi trường, hãy thêm vào đây (Key: VITE_BACKEND_URL, Value: http://[IP_EC2_CUA_BAN]).

Bấm Save and Deploy.

Chờ 3 dấu tick xanh -> Bạn sẽ có đường dẫn web (ví dụ: https://main...amplifyapp.com).

PHẦN 4: KẾT NỐI & TÍCH HỢP (QUAN TRỌNG)
Sau khi cả 3 phần đã lên sóng, bạn cần thực hiện các bước "gắn keo" này để chúng chạy trơn tru:

Cấu hình CORS (Tại Backend):

Sửa file server.js: Thêm link Amplify vào danh sách allowedOrigins.

Đẩy code lên GitHub -> Vào EC2 git pull -> Build lại Docker.

Sửa lỗi ảnh Mixed Content (Tại Frontend):

Sửa các thẻ <img> dùng Proxy: src={https://wsrv.nl/?url=${API_URL}...}.

Đẩy code lên GitHub -> Amplify tự động cập nhật.

Cấu hình Thanh toán (SePay):

Vào SePay -> Webhooks.

URL: http://[IP_EC2]/api/payment/sepay-webhook

Auth: API Key (trùng với file .env).

Cấu hình Google Login:

Vào Google Cloud Console.

Thêm link Amplify vào Authorized JavaScript origins.

Thêm link Amplify vào Authorized redirect URIs.

PHẦN 5: QUY TRÌNH CẬP NHẬT CODE (MAINTENANCE)
Khi bạn sửa code trên máy tính và muốn cập nhật lên Server:

Đối với Frontend:
Sửa code trên máy tính.

git push lên GitHub.

Xong! AWS Amplify sẽ tự động phát hiện và cập nhật web mới sau 2-3 phút.

Đối với Backend:
Sửa code trên máy tính -> git push lên GitHub.

Mở Terminal AWS EC2.

Chạy bộ lệnh "huyền thoại":

Bash

cd furniture-shop-deploy/backend
git pull
sudo docker rm -f my-backend
sudo docker build -t furniture-backend .
sudo docker run -d -p 80:8080 --env-file .env --name my-backend furniture-backend
CÁC LỆNH KIỂM TRA LỖI (DEBUG)
Nếu web bị lỗi, hãy bình tĩnh vào Terminal AWS và gõ:

Xem logs server: sudo docker logs my-backend --tail 50

Xem server có đang chạy không: sudo docker ps

Kiểm tra file cấu hình: cat .env

Chúc bạn bảo vệ đồ án thành công rực rỡ! 🎉