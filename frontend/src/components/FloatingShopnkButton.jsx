import React, { useState } from 'react';
import { MessageCircle, Phone, Facebook, X } from 'lucide-react';

// Lazy load Chatbot component
const Chatbot = React.lazy(() => import('./Chatbot'));

const FloatingShopnkButton = ({ 
  phoneNumber = '+84 876 807 798',
  facebookUrl = 'https://www.facebook.com/nguyenthanhkai',
  zaloQRImage = '/zalo-qr.jpg', // Đường dẫn đến ảnh QR Zalo tĩnh
  className = ''
}) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isZaloQROpen, setIsZaloQROpen] = useState(false);

  const handleChatbotClick = () => {
    setIsChatbotOpen(true);
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleFacebookClick = () => {
    window.open(facebookUrl, '_blank', 'noopener,noreferrer');
  };

  const handleZaloClick = () => {
    setIsZaloQROpen(true);
  };

  const handleChatbotClose = () => {
    setIsChatbotOpen(false);
  };

  const handleZaloQRClose = () => {
    setIsZaloQROpen(false);
  };

  return (
    <>
      {/* Floating Action Buttons */}
      <div className={`fixed bottom-24 right-6 z-40 flex flex-col gap-3 ${className}`}>
        {/* Phone Button */}
        <button
          onClick={handlePhoneClick}
          aria-label={`Gọi điện thoại ${phoneNumber}`}
          className="
            relative w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 
            hover:from-green-600 hover:to-green-700 text-white rounded-full 
            shadow-lg hover:shadow-2xl transition-all duration-300
            transform-gpu hover:scale-110 active:scale-95
            focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50
            group overflow-hidden animate-float
          "
          title={`Gọi ${phoneNumber}`}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-green-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-shine"></div>
          
          {/* Icon */}
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <Phone size={24} className="transition-transform duration-300 group-hover:scale-110" />
          </div>
        </button>

        {/* Zalo Button */}
        <button
          onClick={handleZaloClick}
          aria-label="Mở QR Zalo"
          className="
            relative w-14 h-14 bg-gradient-to-r from-blue-400 to-blue-500 
            hover:from-blue-500 hover:to-blue-600 text-white rounded-full 
            shadow-lg hover:shadow-2xl transition-all duration-300
            transform-gpu hover:scale-110 active:scale-95
            focus:outline-none focus:ring-4 focus:ring-blue-200 focus:ring-opacity-50
            group overflow-hidden animate-float
          "
          title="Zalo"
          style={{ animationDelay: '0.1s' }}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-shine"></div>
          
          {/* Icon - Zalo Logo */}
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <img src="/zalo.jpg" alt="Zalo" className="w-8 h-8 rounded-full object-cover" />
          </div>
        </button>

        {/* Facebook Button */}
        <button
          onClick={handleFacebookClick}
          aria-label="Mở trang Facebook"
          className="
            relative w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 
            hover:from-blue-700 hover:to-blue-800 text-white rounded-full 
            shadow-lg hover:shadow-2xl transition-all duration-300
            transform-gpu hover:scale-110 active:scale-95
            focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50
            group overflow-hidden animate-float
          "
          title="Facebook"
          style={{ animationDelay: '0.2s' }}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-shine"></div>
          
          {/* Icon */}
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <Facebook size={24} className="transition-transform duration-300 group-hover:scale-110" />
          </div>
        </button>

        {/* Chatbot Button */}
        <button
          onClick={handleChatbotClick}
          aria-label="Mở chatbot AI để được hỗ trợ"
          className="
            relative w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 
            hover:from-blue-600 hover:to-blue-700 text-white rounded-full 
            shadow-lg hover:shadow-2xl transition-all duration-300
            transform-gpu hover:scale-110 active:scale-95
            focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50
            group overflow-hidden animate-float
          "
          title="Chatbot AI"
          style={{ animationDelay: '0.3s' }}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-shine"></div>
          
          {/* Icon */}
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <MessageCircle size={24} className="transition-transform duration-300 group-hover:scale-110" />
          </div>
        </button>
      </div>

      {/* Zalo QR Modal */}
      {isZaloQROpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4"
          onClick={handleZaloQRClose}
        >
          <div 
            className="relative bg-white rounded-xl shadow-2xl p-4 max-w-xs w-full transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleZaloQRClose}
              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none"
              aria-label="Đóng"
            >
              <X size={18} />
            </button>

            {/* Title */}
            <h3 className="text-center text-lg font-bold text-gray-800 mb-3">Kết nối qua Zalo</h3>

            {/* QR Code Image */}
            <div className="bg-white p-2 rounded-lg">
              <img 
                src={zaloQRImage} 
                alt="Zalo QR Code" 
                className="w-full h-auto rounded-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect width="300" height="300" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" font-size="18" text-anchor="middle" dy=".3em" fill="%23999"%3EZalo QR%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>

            {/* Footer Note */}
            <p className="text-center text-xs text-gray-500 mt-3">
              Quét mã để chat với chúng tôi
            </p>
          </div>
        </div>
      )}

      {/* Chatbot Modal */}
      {isChatbotOpen && (
        <React.Suspense fallback={
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
          </div>
        }>
          <Chatbot isOpen={isChatbotOpen} onClose={handleChatbotClose} />
        </React.Suspense>
      )}
    </>
  );
};

export default FloatingShopnkButton;
