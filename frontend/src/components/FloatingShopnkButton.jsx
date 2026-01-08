import React, { useState } from 'react';
import { Phone, Facebook } from 'lucide-react';

const FloatingShopnkButton = ({ 
  phoneNumber = '+84 876 807 798',
  facebookUrl = 'https://www.facebook.com/nguyenthanhkai',
  zaloUrl = 'https://zalo.me/0876807798', // Đường dẫn Zalo để quét mã
  className = ''
}) => {

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleFacebookClick = () => {
    window.open(facebookUrl, '_blank', 'noopener,noreferrer');
  };

  const handleZaloClick = () => {
    window.open(zaloUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <style>{`
        @keyframes pulse-effect {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        .animate-pulse-effect {
          animation: pulse-effect 2s ease-in-out infinite;
        }
        
        .pulse-button {
          position: relative;
        }
        
        .pulse-button::before,
        .pulse-button::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          pointer-events: none;
        }
        
        .pulse-button::before {
          animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        
        .pulse-button::after {
          animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
          animation-delay: 1s;
        }
        
        .pulse-red::before,
        .pulse-red::after {
          border: 2px solid rgba(239, 68, 68, 0.8);
        }
        
        .pulse-blue::before,
        .pulse-blue::after {
          border: 2px solid rgba(59, 130, 246, 0.8);
        }
        
        .pulse-facebook::before,
        .pulse-facebook::after {
          border: 2px solid rgba(24, 119, 242, 0.8);
        }
        
        .pulse-orange::before,
        .pulse-orange::after {
          border: 2px solid rgba(249, 115, 22, 0.8);
        }
      `}</style>
      {/* Floating Action Buttons */}
      <div className={`fixed bottom-24 right-6 z-40 flex flex-col gap-3 ${className}`}>
        {/* Phone Button */}
        <button
          onClick={handlePhoneClick}
          aria-label={`Gọi điện thoại ${phoneNumber}`}
          className="
            pulse-button pulse-red
            relative w-12 h-12 bg-red-500 
            hover:bg-red-600 text-white rounded-full 
            shadow-lg hover:shadow-xl transition-all duration-300
            hover:scale-110 active:scale-95
            focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50
            group overflow-visible animate-pulse-effect
          "
          title={`Gọi ${phoneNumber}`}
        >
          {/* Icon */}
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <Phone size={20} className="transition-transform duration-300 group-hover:scale-110" />
          </div>
        </button>

        {/* Zalo Button */}
        <button
          onClick={handleZaloClick}
          aria-label="Mở Zalo để quét mã"
          className="
            pulse-button pulse-blue
            relative w-12 h-12 bg-white 
            hover:bg-gray-50 rounded-full 
            shadow-lg hover:shadow-xl transition-all duration-300
            hover:scale-110 active:scale-95
            focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50
            group overflow-visible animate-pulse-effect
          "
          title="Zalo - Quét mã QR"
          style={{ animationDelay: '0.3s' }}
        >
          {/* Icon - Zalo Logo */}
          <div className="relative z-10 flex items-center justify-center w-full h-full p-1">
            <img src="/zalo.jpg" alt="Zalo" className="w-full h-full rounded-full object-cover" />
          </div>
        </button>

        {/* Facebook Button */}
        <button
          onClick={handleFacebookClick}
          aria-label="Mở trang Facebook"
          className="
            pulse-button pulse-facebook
            relative w-12 h-12 bg-[#1877F2] 
            hover:bg-[#0C63D4] rounded-full 
            shadow-lg hover:shadow-xl transition-all duration-300
            hover:scale-110 active:scale-95
            focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50
            group overflow-visible animate-pulse-effect
          "
          title="Facebook"
          style={{ animationDelay: '0.6s' }}
        >
          {/* Icon - Facebook Logo SVG */}
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 3.667h-3.533v7.98H9.101z"/>
            </svg>
          </div>
        </button>
      </div>
    </>
  );
};

export default FloatingShopnkButton;
