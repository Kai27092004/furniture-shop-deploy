import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, ShoppingCart, ExternalLink } from 'lucide-react';

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom when new message is added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Add welcome message when chat first opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: Date.now(),
        text: "Xin chào! Tôi là trợ lý AI của cửa hàng nội thất. Tôi có thể giúp bạn tìm hiểu về sản phẩm, tư vấn mua hàng hoặc trả lời các câu hỏi khác. Bạn cần hỗ trợ gì?",
        isBot: true,
        timestamp: new Date(),
        suggestions: [
          "Tôi muốn xem giường ngủ",
          "Có bàn trang điểm không?",
          "Khuyến mãi hôm nay là gì?",
          "Chính sách bảo hành như thế nào?"
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage.trim(),
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/chatbot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: currentMessage,
          sessionId: sessionStorage.getItem('chatbotSessionId') || Date.now().toString()
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Lưu session ID
        if (data.data.sessionId) {
          sessionStorage.setItem('chatbotSessionId', data.data.sessionId);
        }
        
        const botResponse = {
          id: Date.now() + 1,
          text: data.data.message,
          isBot: true,
          timestamp: new Date(),
          products: data.data.products || []
        };

        setMessages(prev => [...prev, botResponse]);
      } else {
        throw new Error(data.message || 'Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Xin lỗi, có lỗi xảy ra khi kết nối đến server. Vui lòng thử lại sau hoặc liên hệ trực tiếp với chúng tôi qua hotline.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleProductClick = (productId) => {
    // Mở sản phẩm trong tab mới
    window.open(`/products/${productId}`, '_blank');
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-25"
        onClick={onClose}
      />
      
      {/* Chat Window */}
      <div className="relative w-full max-w-sm sm:max-w-md h-96 sm:h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base">AI Assistant</h3>
              <p className="text-xs text-orange-100">Trực tuyến</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Đóng chat"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.isBot
                    ? 'bg-white text-gray-800 shadow-sm border'
                    : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.isBot && (
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot size={12} className="text-orange-600" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="text-sm leading-relaxed whitespace-pre-line">
                      {message.text}
                    </div>
                    
                    {/* Hiển thị sản phẩm nếu có */}
                    {message.products && message.products.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.products.slice(0, 3).map((product) => (
                          <div
                            key={product.id}
                            className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                            onClick={() => handleProductClick(product.id)}
                          >
                            <div className="flex items-center space-x-3">
                              {product.image && (
                                <img
                                  src={`http://localhost:8080${product.image}`}
                                  alt={product.name}
                                  className="w-12 h-12 object-cover rounded-lg"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                  }}
                                />
                              )}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm text-gray-900 truncate">
                                  {product.name}
                                </h4>
                                <p className="text-xs text-orange-600 font-semibold">
                                  {formatPrice(product.price)}
                                </p>
                                {product.category && (
                                  <p className="text-xs text-gray-500">
                                    {product.category}
                                  </p>
                                )}
                              </div>
                              <ExternalLink size={16} className="text-gray-400" />
                            </div>
                          </div>
                        ))}
                        {message.products.length > 3 && (
                          <p className="text-xs text-gray-500 text-center">
                            Và {message.products.length - 3} sản phẩm khác...
                          </p>
                        )}
                      </div>
                    )}

                    {/* Hiển thị gợi ý câu hỏi nếu có */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs text-gray-500 font-medium">Bạn có thể hỏi:</p>
                        <div className="flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs bg-orange-100 hover:bg-orange-200 text-orange-700 px-3 py-1 rounded-full transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <p className={`text-xs mt-1 ${
                      message.isBot ? 'text-gray-500' : 'text-orange-100'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                  {!message.isBot && (
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User size={12} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 rounded-2xl px-4 py-2 shadow-sm border">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                    <Bot size={12} className="text-orange-600" />
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-end space-x-2">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập tin nhắn của bạn..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                rows="1"
                style={{ minHeight: '48px', maxHeight: '120px' }}
                disabled={isLoading}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-300 disabled:to-gray-400 text-white p-3 rounded-2xl transition-all duration-200 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-300"
              aria-label="Gửi tin nhắn"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
