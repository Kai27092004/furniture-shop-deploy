import React, { useState, useRef, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import ActionButton from './ActionButton';

// Lazy load Chatbot component
const Chatbot = React.lazy(() => import('./Chatbot'));

const FloatingShopnkButton = ({ 
  phoneNumber = '+84 876 807 798',
  facebookUrl = 'https://www.facebook.com/nguyenthanhkai',
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const containerRef = useRef(null);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isExpanded]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleChatbotClick = () => {
    setIsChatbotOpen(true);
    setIsExpanded(false);
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
    setIsExpanded(false);
  };

  const handleFacebookClick = () => {
    window.open(facebookUrl, '_blank', 'noopener,noreferrer');
    setIsExpanded(false);
  };

  const handleChatbotClose = () => {
    setIsChatbotOpen(false);
  };

  // Calculate positions for action buttons in column pattern above main button
  const getActionButtonPositions = () => {
    const buttonSpacing = 45; // Reduced spacing between buttons
    const baseX = 0; // Centered above main button
    const baseY = -50; // Start closer to main button
    
    return [
      {
        x: baseX,
        y: baseY - (buttonSpacing * 2), // Top button (Facebook)
        delay: 0
      },
      {
        x: baseX,
        y: baseY - buttonSpacing, // Middle button (Phone)
        delay: 50
      },
      {
        x: baseX,
        y: baseY, // Bottom button (Chatbot) - closest to main button
        delay: 100
      }
    ];
  };

  const actionButtons = [
    {
      icon: 'facebook',
      label: 'Facebook',
      onClick: handleFacebookClick,
      ariaLabel: 'Mở trang Facebook'
    },
    {
      icon: 'phone',
      label: 'Gọi điện thoại',
      onClick: handlePhoneClick,
      ariaLabel: `Gọi điện thoại ${phoneNumber}`
    },
    {
      icon: 'chatbot',
      label: 'Chatbot AI',
      onClick: handleChatbotClick,
      ariaLabel: 'Mở chatbot AI để được hỗ trợ'
    }
  ];

  const positions = getActionButtonPositions();

  return (
    <>
      <div 
        ref={containerRef}
        className={`fixed bottom-20 right-6 z-40 ${className}`}
      >
        {/* Action Buttons */}
        {actionButtons.map((button, index) => (
          <ActionButton
            key={button.icon}
            icon={button.icon}
            label={button.label}
            onClick={button.onClick}
            ariaLabel={button.ariaLabel}
            delay={positions[index].delay}
            isVisible={isExpanded}
            position={positions[index]}
          />
        ))}

        {/* Main Button */}
        <button
          onClick={toggleExpanded}
          aria-label={isExpanded ? 'Đóng menu' : 'Mở menu'}
          aria-expanded={isExpanded}
          className={`
            relative w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 
            hover:from-orange-600 hover:to-orange-700 text-white rounded-full 
            shadow-lg hover:shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
            transform-gpu hover:scale-110 active:scale-95
            focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-50
            ${isExpanded ? 'rotate-45' : 'rotate-0'}
            group overflow-hidden animate-float
          `}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-shine"></div>
          
          {/* Content */}
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            {isExpanded ? (
              <X size={24} className="transition-all duration-500 ease-out group-hover:rotate-90" />
            ) : (
              <div className="flex flex-col items-center justify-center transition-all duration-500 ease-out group-hover:scale-110">
                <div className="text-xs font-bold leading-none drop-shadow-sm">SHOP</div>
                <div className="text-xs font-bold leading-none drop-shadow-sm">NK</div>
              </div>
            )}
          </div>
          
          {/* Pulse effect when expanded */}
          {isExpanded && (
            <div className="absolute inset-0 rounded-full bg-orange-400 opacity-30 animate-ping"></div>
          )}
        </button>

        {/* Ripple effect on click */}
        {isExpanded && (
          <div className="absolute inset-0 rounded-full bg-orange-400 opacity-20 animate-ping"></div>
        )}
      </div>

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
