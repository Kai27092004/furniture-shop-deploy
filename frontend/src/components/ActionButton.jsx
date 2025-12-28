import React from 'react';
import { MessageCircle, Phone, Facebook } from 'lucide-react';

const ActionButton = ({ 
  icon, 
  label, 
  onClick, 
  ariaLabel, 
  delay = 0,
  isVisible = false,
  position = { x: 0, y: 0 }
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'chatbot':
        return <MessageCircle size={20} />;
      case 'phone':
        return <Phone size={20} />;
      case 'facebook':
        return <Facebook size={20} />;
      default:
        return null;
    }
  };

  const getColor = () => {
    switch (icon) {
      case 'chatbot':
        return 'bg-orange-500 hover:bg-orange-600';
      case 'phone':
        return 'bg-green-500 hover:bg-green-600';
      case 'facebook':
        return 'bg-blue-600 hover:bg-blue-700';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        absolute w-11 h-11 rounded-full text-white shadow-lg
        transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
        transform-gpu group overflow-hidden
        ${getColor()}
        ${isVisible 
          ? 'opacity-100 scale-100 translate-x-0 translate-y-0' 
          : 'opacity-0 scale-50 translate-y-8'
        }
        hover:scale-110 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
        z-30
      `}
      style={{
        transform: isVisible 
          ? `translate(${position.x}px, ${position.y}px) scale(1)` 
          : `translate(${position.x}px, ${position.y + 20}px) scale(0.5)`,
        transitionDelay: `${delay}ms`,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 group-hover:animate-shine"></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <div className="transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-12">
          {getIcon()}
        </div>
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
      
      {/* Tooltip */}
      <div className={`
        absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
        px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg
        whitespace-nowrap opacity-0 group-hover:opacity-100
        transition-all duration-500 ease-out pointer-events-none
        shadow-lg backdrop-blur-sm
        ${isVisible ? 'group-hover:opacity-100' : 'opacity-0'}
      `}>
        {label}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
      </div>
    </button>
  );
};

export default ActionButton;
