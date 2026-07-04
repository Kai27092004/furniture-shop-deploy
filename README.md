# Furniture Shop Deploy

Repository full-stack website ban noi that, bao gom:
- Frontend: React + Vite
- Backend: Node.js + Express + Sequelize
- Database: MySQL
- Deployment: Docker, AWS (RDS, EC2, Amplify), va tuyen chon AWS Lambda qua Serverless

## 1) Tong quan kien truc

- frontend/:
  - SPA React cho giao dien khach hang va admin
  - Goi API qua bien VITE_API_URL (fallback dang tro den domain production)
- backend/:
  - REST API Express
  - Xac thuc JWT, dang nhap Google OAuth
  - Quan ly san pham, danh muc, don hang, nguoi dung, dashboard, email marketing
  - Webhook SePay cap nhat trang thai thanh toan
- Database:
  - MySQL voi schema users, categories, products, orders, orderItems, emailTemplates, emailLogs

Luong tong quat:
1. User thao tac tren frontend.
2. Frontend goi backend (/api/*).
3. Backend doc/ghi MySQL.
4. Don chuyen khoan SePay goi webhook de cap nhat trang thai don.

## 2) Cau truc thu muc chinh

- backend/: API va business logic
- frontend/: UI React
- furniture_db.sql: SQL khoi tao schema + seed
- khachhang_db.sql: SQL dump du lieu lon hon
- docker-compose.yml: Chay full stack local bang Docker
- AWS.md: Huong dan deploy AWS (RDS + EC2 + Amplify)
- AWS1.md: Huong dan Nginx + SSL + domain cho backend

## 2.1) Cau truc thu muc day du

```text
furniture-shop-deploy/
|-- .dockerignore
|-- .gitignore
|-- AWS.md
|-- AWS1.md
|-- docker-compose.yml
|-- furniture_db.sql
|-- khachhang_db.sql
|-- README.md
|-- backend/
|   |-- Dockerfile
|   |-- lambda.js
|   |-- package.json
|   |-- server.js
|   |-- serverless.yml
|   |-- config/
|   |   |-- database.js
|   |   `-- passport.js
|   |-- controllers/
|   |   |-- auth.controller.js
|   |   |-- category.controller.js
|   |   |-- chatbot.controller.js
|   |   |-- dashboard.controller.js
|   |   |-- email.controller.js
|   |   |-- order.controller.js
|   |   |-- product.controller.js
|   |   |-- user.controller.js
|   |   `-- webhook.controller.js
|   |-- middleware/
|   |   `-- auth.middleware.js
|   |-- models/
|   |   |-- category.model.js
|   |   |-- emailLog.model.js
|   |   |-- emailTemplate.model.js
|   |   |-- index.js
|   |   |-- order.model.js
|   |   |-- orderItem.model.js
|   |   |-- product.model.js
|   |   `-- user.model.js
|   |-- public/
|   |   `-- upload/
|   `-- routes/
|       |-- auth.routes.js
|       |-- category.routes.js
|       |-- chatbot.routes.js
|       |-- dashboard.routes.js
|       |-- email.routes.js
|       |-- order.routes.js
|       |-- payment.routes.js
|       |-- product.routes.js
|       `-- user.routes.js
`-- frontend/
  |-- Dockerfile
  |-- eslint.config.js
  |-- index.html
  |-- nginx.conf
  |-- package.json
  |-- postcss.config.js
  |-- README.md
  |-- tailwind.config.js
  |-- vercel.json
  |-- vite.config.js
  |-- public/
  |   `-- videos/
  `-- src/
    |-- App.css
    |-- App.jsx
    |-- index.css
    |-- main.jsx
    |-- assets/
    |-- components/
    |   |-- ActionButton.jsx
    |   |-- AdminRoute.jsx
    |   |-- Chatbot.jsx
    |   |-- FloatingShopnkButton.jsx
    |   |-- Footer.jsx
    |   |-- MainLayout.jsx
    |   |-- Navbar.jsx
    |   |-- ProductCard.jsx
    |   |-- ProductCarousel.jsx
    |   |-- ProtectedRoute.jsx
    |   |-- ScrollToTop.jsx
    |   |-- UserLayout.jsx
    |   |-- admin/
    |   |   `-- ProductForm.jsx
    |   `-- common/
    |       `-- Modal.jsx
    |-- context/
    |   |-- AuthContext.jsx
    |   |-- CartContext.jsx
    |   `-- ToastContext.jsx
    |-- pages/
    |   |-- AdminDashboardPage.jsx
    |   |-- CartPage.jsx
    |   |-- CollectionPage.jsx
    |   |-- ContactPage.jsx
    |   |-- GoogleCallbackPage.jsx
    |   |-- HomePage.jsx
    |   |-- LoginPage.jsx
    |   |-- NewsPage.jsx
    |   |-- PaymentPage.jsx
    |   |-- PaymentSuccessPage.jsx
    |   |-- ProductDetailPage.jsx
    |   |-- ProductListPage.jsx
    |   |-- ProductsByCategoryPage.jsx
    |   |-- ProfilePage.jsx
    |   |-- RegisterPage.jsx
    |   |-- admin/
    |   |   |-- AdminLayout.jsx
    |   |   |-- AdminLoginPage.jsx
    |   |   |-- CategoryManagementPage.jsx
    |   |   |-- EmailManagementPage.jsx
    |   |   |-- OrderManagementPage.jsx
    |   |   |-- ProductForm.jsx
    |   |   |-- ProductManagementPage.jsx
    |   |   `-- UserManagementPage.jsx
    |   `-- guides/
    `-- services/
      `-- api.js
```

## 3) Yeu cau moi truong

Khuyen nghi:
- Node.js: 20+ (repo dang dung image Node 22 trong Docker)
- npm: 10+
- MySQL: 8.0
- Docker Desktop (neu chay bang Docker)

Kiem tra nhanh:

```bash
node -v
npm -v
docker -v
```

## 4) Huong dan chay local (khong Docker)

### 4.1 Database

Tao database va import SQL (chon 1 trong 2 file):

- Option A (gon, de bat dau): furniture_db.sql
- Option B (du lieu dump nhieu hon): khachhang_db.sql

Vi du voi MySQL CLI:

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS furniture_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -u root -p furniture_db < furniture_db.sql
```

### 4.2 Backend

1. Cai dependency:

```bash
cd backend
npm install
```

2. Tao file backend/.env:

```env
PORT=8080
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_NAME=furniture_db
DB_USER=root
DB_PASSWORD=your_mysql_password

JWT_SECRET=replace_with_strong_secret
SESSION_SECRET=replace_with_strong_session_secret
FRONTEND_URL=http://localhost:5173

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8080/api/auth/google/callback

OPENAI_API_KEY=your_openai_api_key

SEPAY_API_KEY=your_sepay_api_key

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email_user
EMAIL_PASSWORD=your_email_password
EMAIL_FROM_NAME=Furniture Shop
EMAIL_FROM_ADDRESS=no-reply@yourdomain.com
```

3. Chay backend:

```bash
npm run dev
```

Backend mac dinh: http://localhost:8080

### 4.3 Frontend

1. Cai dependency:

```bash
cd frontend
npm install
```

2. Tao file frontend/.env:

```env
VITE_API_URL=http://localhost:8080
```

3. Chay frontend:

```bash
npm run dev
```

Frontend mac dinh: http://localhost:5173

## 5) Chay bang Docker Compose (full stack)

Repository da co docker-compose.yml cho 3 service:
- db (MySQL 8) -> map port 3307
- backend (Node/Express) -> 8080
- frontend (Nginx static) -> 80

Lenh chay:

```bash
docker compose up -d --build
```

Lenh xem log:

```bash
docker compose logs -f backend
docker compose logs -f db
docker compose logs -f frontend
```

URL sau khi chay:
- Frontend: http://localhost
- Backend: http://localhost:8080
- MySQL host machine: localhost:3307

Luu y:
- docker-compose dang mount furniture_db.sql vao /docker-entrypoint-initdb.d, chi auto-import khi volume db_data moi.
- Neu muon import lai tu dau, can xoa volume:

```bash
docker compose down -v
docker compose up -d --build
```

## 6) API backend chinh

Base URL: /api

### Auth
- POST /auth/register
- POST /auth/login
- GET /auth/google
- GET /auth/google/callback

### Products
- GET /products
- GET /products/:id
- POST /products (admin)
- PUT /products/:id (admin)
- DELETE /products/:id (admin)

### Categories
- GET /categories
- POST /categories (admin)
- PUT /categories/:id (admin)
- DELETE /categories/:id (admin)

### Orders
- POST /orders
- POST /orders/:orderId/cancel
- PUT /orders/:orderId/status
- GET /orders/:orderId/status
- GET /orders/admin/all (admin)
- GET /orders/admin/:orderId (admin)
- PUT /orders/admin/:orderId/status (admin)
- DELETE /orders/admin/:orderId (admin)
- POST /payment/sepay-webhook (public webhook)

### Users
- GET /users/profile
- GET /users/my-orders
- GET /users/admin/stats (admin)
- GET /users/admin/all (admin)
- POST /users/admin/create (admin)
- PUT /users/admin/:id (admin)
- DELETE /users/admin/:id (admin)

### Dashboard (admin)
- GET /dashboard/stats
- GET /dashboard/revenue-chart?year=YYYY
- GET /dashboard/order-chart?year=YYYY

### Email (admin)
- GET /email/templates
- GET /email/templates/:id
- POST /email/templates
- PUT /email/templates/:id
- DELETE /email/templates/:id
- POST /email/send
- POST /email/send-to-all-customers
- GET /email/logs
- GET /email/stats

### Chatbot
- POST /chatbot/chat
- GET /chatbot/history/:sessionId

## 7) Frontend routes chinh

Public:
- /
- /products
- /products/:id
- /category/:categoryId
- /collections
- /news
- /contact
- /login
- /register
- /auth/google/callback
- /cart
- /huong-dan-mua-hang
- /khu-vuc-giao-hang
- /phuong-thuc-thanh-toan
- /chinh-sach-tra-hang
- /chinh-sach-bao-mat

Protected user:
- /profile
- /payment/:orderId
- /order-success

Admin:
- /admin/login
- /admin/dashboard
- /admin/products
- /admin/orders
- /admin/categories
- /admin/users
- /admin/email

## 8) Data model (tom tat)

- users: thong tin tai khoan, role customer/admin, googleId, avatar
- categories: danh muc san pham
- products: thong tin san pham + categoryId
- orders: don hang (pending/processing/shipped/delivered/cancelled)
- orderItems: chi tiet tung san pham trong don
- emailTemplates: mau email
- emailLogs: lich su gui email

Quan he chinh:
- User 1-N Orders
- Category 1-N Products
- Order 1-N OrderItems
- Product 1-N OrderItems

## 9) Deploy AWS

Repo hien co 2 huong deploy chinh:

### Huong A: AWS EC2 + RDS + Amplify (khuyen nghi)

1. RDS MySQL:
- Tao DB MySQL (free tier)
- Bat Public access neu can import truc tiep
- Import SQL vao DB

2. Backend tren EC2 bang Docker:

```bash
sudo apt-get update
sudo apt-get install docker.io -y
sudo apt-get install git -y

git clone <your_repo_url>
cd furniture-shop-deploy/backend

# tao .env voi DB_HOST tro den RDS endpoint
sudo docker build -t furniture-backend .
sudo docker run -d -p 8080:8080 --env-file .env --name my-backend furniture-backend
```

3. Frontend tren Amplify:
- Connect repo GitHub
- Chon branch
- Set env var VITE_API_URL=https://api.yourdomain.com hoac http://<EC2_IP>:8080
- Deploy

### Huong B: Them Nginx + SSL + Domain cho backend (theo AWS1.md)

Khi da co domain API (vi du api.example.com):

1. Chay backend Docker o cong noi bo 8080:

```bash
sudo docker rm -f my-backend
sudo docker run -d -p 8080:8080 --env-file .env --name my-backend furniture-backend
```

2. Cai Nginx + Certbot:

```bash
sudo apt-get update
sudo apt-get install nginx certbot python3-certbot-nginx -y
```

3. Tao reverse proxy Nginx tro ve localhost:8080, sau do cap SSL:

```bash
sudo certbot --nginx -d api.yourdomain.com
```

4. Cap nhat frontend env:
- VITE_API_URL=https://api.yourdomain.com

## 10) Deploy serverless (AWS Lambda) - tuy chon

Backend da co:
- lambda.js (wrap Express app bang serverless-http)
- serverless.yml

Quy trinh co ban:

```bash
cd backend
npm install
npx serverless deploy
```

Quan trong:
- Khong hardcode secret trong serverless.yml.
- Chuyen toan bo DB/JWT/API keys sang AWS Systems Manager Parameter Store hoac Secrets Manager.
- Dam bao RDS networking phu hop (VPC/subnet/security group) neu Lambda can truy cap private DB.

## 11) Bao mat va van hanh

Can lam truoc khi dua production:
- Doi tat ca secret da lo/da commit trong source (DB password, JWT secret, API keys).
- Khong commit .env len git.
- Han che CORS origin theo domain that su su dung.
- Bat HTTPS cho backend API.
- Dat mat khau DB manh, gioi han IP truy cap RDS.
- Thiet lap backup cho RDS.

## 12) Troubleshooting nhanh

Backend khong len:
- Kiem tra log backend: docker logs my-backend --tail 100
- Kiem tra ket noi DB (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT)

Loi CORS:
- Xac nhan frontend domain nam trong allowlist CORS backend
- Dam bao frontend goi dung URL API

OAuth Google khong redirect:
- Kiem tra GOOGLE_CALLBACK_URL
- Kiem tra Authorized redirect URIs ben Google Cloud
- Kiem tra FRONTEND_URL dung domain thuc te

SePay webhook khong update don:
- Kiem tra header Authorization va SEPAY_API_KEY
- Kiem tra noi dung chuyen khoan co ma don (VD: DH123)
- Kiem tra log backend

## 13) Lenh dev nhanh

Backend:

```bash
cd backend
npm run dev
npm start
```

Frontend:

```bash
cd frontend
npm run dev
npm run build
npm run preview
```

Docker:

```bash
docker compose up -d --build
docker compose down
docker compose down -v
```

## 14) Ghi chu

- Backend su dung sequelize.sync() khi khoi dong, phu hop cho moi truong dev.
- Moi truong production nen quan ly schema bang migration de an toan hon.
- frontend/src/services/api.js dang fallback sang domain production neu khong set VITE_API_URL. Nen set ro trong tung moi truong de tranh goi nham API.

