import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import ScrollToTop from './components/ScrollToTop';
import MainLayout from './components/MainLayout';
import AdminLayout from './pages/admin/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import FloatingShopnkButton from './components/FloatingShopnkButton';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductsByCategoryPage from './pages/ProductsByCategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CollectionPage from './pages/CollectionPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GoogleCallbackPage from './pages/GoogleCallbackPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import HowToBuyPage from './pages/guides/HowToBuyPage';
import DeliveryAreaPage from './pages/guides/DeliveryAreaPage';
import PaymentMethodPage from './pages/guides/PaymentMethodPage';
import ReturnPolicyPage from './pages/guides/ReturnPolicyPage';
import PrivacyPolicyPage from './pages/guides/PrivacyPolicyPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProductManagementPage from './pages/admin/ProductManagementPage';
import OrderManagementPage from './pages/admin/OrderManagementPage';
import CategoryManagementPage from './pages/admin/CategoryManagementPage';
import UserManagementPage from './pages/admin/UserManagementPage';
import EmailManagementPage from './pages/admin/EmailManagementPage';


function App() {
  return (
    <ToastProvider>
      <ScrollToTop />
      <FloatingShopnkButton 
        phoneNumber="+84 876 807 798"
        facebookUrl="https://www.facebook.com/nguyenthanhkai"
      />
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />

        <Route 
          path="/admin" 
          element={<AdminRoute><AdminLayout /></AdminRoute>}
        >
          <Route index element={<Navigate to="dashboard" replace />} /> 
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="products" element={<ProductManagementPage />} />
          <Route path="orders" element={<OrderManagementPage />} />
          <Route path="categories" element={<CategoryManagementPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="email" element={<EmailManagementPage />} />
        </Route>

        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductListPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="category/:categoryId" element={<ProductsByCategoryPage />} />
          <Route path="collections" element={<CollectionPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="auth/google/callback" element={<GoogleCallbackPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route 
            path="payment/:orderId" 
            element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} 
          />
          <Route path="order-success" element={<ProtectedRoute><PaymentSuccessPage /></ProtectedRoute>} />
          <Route path="huong-dan-mua-hang" element={<HowToBuyPage />} />
          <Route path="khu-vuc-giao-hang" element={<DeliveryAreaPage />} />
          <Route path="phuong-thuc-thanh-toan" element={<PaymentMethodPage />} />
          <Route path="chinh-sach-tra-hang" element={<ReturnPolicyPage />} />
          <Route path="chinh-sach-bao-mat" element={<PrivacyPolicyPage />} />
        </Route>
      </Routes>
    </ToastProvider>
  );
}

export default App;