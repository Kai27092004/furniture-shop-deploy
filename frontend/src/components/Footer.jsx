import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { show } = useToast();

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        show('Vui lòng nhập địa chỉ email hợp lệ!', { type: 'error', duration: 3000 });
        return;
      }
      
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        show('Đăng ký nhận tin thành công! Cảm ơn bạn đã quan tâm đến SHOPNK.', { 
          type: 'success', 
          duration: 4000 
        });
        setEmail('');
        setIsLoading(false);
      }, 1500);
    }
  };

  // Icon components
  const HomeIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );

  const MailIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  const PhoneIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );

  const FaxIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v1H6V4a1 1 0 011-1m8 4v12a2 2 0 01-2 2H9a2 2 0 01-2-2V8h8zM9 8h6m-3 4h3m-3 4h3" />
    </svg>
  );

  // Social Media Icons
  const FacebookIcon = () => (
    <svg className="w-6 h-6" fill="#1877F2" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );

  const YouTubeIcon = () => (
    <svg className="w-6 h-6" fill="#FF0000" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );

  const TikTokIcon = () => (
    <svg className="w-6 h-6" fill="#000000" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  );

  const InstagramIcon = () => (
    <svg className="w-6 h-6" fill="#E4405F" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );

  const ZaloIcon = () => (
    <svg className="w-6 h-6" fill="#0180C7" viewBox="0 0 24 24">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16l-3.288 3.29c-.184.183-.184.48 0 .663.184.184.48.184.663 0l3.29-3.288c.362-.363.362-.95 0-1.312-.363-.363-.95-.363-1.312 0-.184.183-.353.463-.353.647zm-7.145 1.007c0-.265.215-.48.48-.48h4.8c.265 0 .48.215.48.48s-.215.48-.48.48h-4.8c-.265 0-.48-.215-.48-.48zm0 2.4c0-.265.215-.48.48-.48h4.8c.265 0 .48.215.48.48s-.215.48-.48.48h-4.8c-.265 0-.48-.215-.48-.48zm0 2.4c0-.265.215-.48.48-.48h2.88c.265 0 .48.215.48.48s-.215.48-.48.48h-2.88c-.265 0-.48-.215-.48-.48z"/>
    </svg>
  );

  const TwitterIcon = () => (
    <svg className="w-6 h-6" fill="#1DA1F2" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    </svg>
  );

  return (
    <footer style={{ backgroundColor: '#f7f6f3' }}>
      {/* Main Footer Content */}
      <div className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cột 1: Thông tin công ty */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 mb-6">
                SHOPNK - NỘI THẤT CAO CẤP
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <HomeIcon />
                  <span className="text-gray-600 text-sm leading-relaxed">
                    106/14 Trương Phước Phan, Phường Bình Trị Đông, Quận Bình Tân
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MailIcon />
                  <span className="text-gray-600 text-sm">
                    nghoangtanphat2709@gmail.com
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <PhoneIcon />
                  <span className="text-gray-600 text-sm">
                    +84 876 807 798
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaxIcon />
                  <span className="text-gray-600 text-sm">
                    (028) 1234 5678
                  </span>
                </div>
              </div>
            </div>

            {/* Cột 2: Hướng dẫn mua hàng */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 mb-6">
                HƯỚNG DẪN MUA HÀNG
              </h3>
              <div className="space-y-3">
                <Link to="/huong-dan-mua-hang" className="block text-gray-600 text-sm hover:text-gray-800 transition-colors duration-200">
                  Hướng dẫn mua hàng
                </Link>
                <Link to="/khu-vuc-giao-hang" className="block text-gray-600 text-sm hover:text-gray-800 transition-colors duration-200">
                  Khu vực giao hàng & lắp đặt
                </Link>
                <Link to="/phuong-thuc-thanh-toan" className="block text-gray-600 text-sm hover:text-gray-800 transition-colors duration-200">
                  Phương thức thanh toán
                </Link>
                <Link to="/chinh-sach-tra-hang" className="block text-gray-600 text-sm hover:text-gray-800 transition-colors duration-200">
                  Chính sách đổi trả & bảo hành
                </Link>
                <Link to="/chinh-sach-bao-mat" className="block text-gray-600 text-sm hover:text-gray-800 transition-colors duration-200">
                  Chính sách bảo mật thông tin
                </Link>
              </div>
            </div>

            {/* Cột 3: Đăng ký nhận tin */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 mb-6">
                ĐĂNG KÝ NHẬN TIN
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Nhận thông tin về sản phẩm mới, ưu đãi đặc biệt và xu hướng nội thất mới nhất
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    * Email của bạn
                  </label>
                  <form onSubmit={handleEmailSubmit} className="flex space-x-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Nhập email của bạn"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`px-4 py-2 text-white text-sm font-medium rounded-md transition-colors duration-200 flex items-center gap-2 ${
                        isLoading ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                      style={{ backgroundColor: '#c8a47e' }}
                      onMouseEnter={(e) => !isLoading && (e.target.style.backgroundColor = '#b8946e')}
                      onMouseLeave={(e) => !isLoading && (e.target.style.backgroundColor = '#c8a47e')}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Đang gửi...
                        </>
                      ) : (
                        'Gửi'
                      )}
                    </button>
                  </form>
                </div>

                {/* Social Media Icons */}
                <div className="pt-4">
                  <div className="flex space-x-3 flex-wrap">
                    <a href="#" className="hover:opacity-80 transition-opacity duration-200">
                      <FacebookIcon />
                    </a>
                    <a href="#" className="hover:opacity-80 transition-opacity duration-200">
                      <YouTubeIcon />
                    </a>
                    <a href="#" className="hover:opacity-80 transition-opacity duration-200">
                      <TikTokIcon />
                    </a>
                    <a href="#" className="hover:opacity-80 transition-opacity duration-200">
                      <InstagramIcon />
                    </a>
                    <a href="#" className="hover:opacity-80 transition-opacity duration-200">
                      <ZaloIcon />
                    </a>
                    <a href="#" className="hover:opacity-80 transition-opacity duration-200">
                      <TwitterIcon />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="w-full py-3" style={{ backgroundColor: '#efefef' }}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm" style={{ color: '#555' }}>
              © {new Date().getFullYear()} SHOPNK - Nội thất cao cấp. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;