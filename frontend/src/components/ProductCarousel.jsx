import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BACKEND_URL } from '../services/api'; 

const ProductCarousel = ({ products, navigateTo }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [isHovered, setIsHovered] = useState(false);

  // Danh sách ảnh theo danh mục với nhiều sản phẩm
  const carouselImages = [
    {
      id: 'category-1',
      name: 'Phòng Khách',
      imageUrl: '/phong-khach.jpg',
      productCount: 12,
      category: 'Phòng Khách'
    },
    {
      id: 'category-2',
      name: 'Phòng Ngủ',
      imageUrl: '/phong-ngu.jpg',
      productCount: 15,
      category: 'Phòng Ngủ'
    },
    {
      id: 'category-3',
      name: 'Phòng Làm Việc',
      imageUrl: '/phong-lam-viec.jpg',
      productCount: 8,
      category: 'Phòng Làm Việc'
    },
    {
      id: 'category-4',
      name: 'Tủ Rượu',
      imageUrl: '/tu-ruu.jpg',
      productCount: 6,
      category: 'Tủ'
    },
    {
      id: 'category-5',
      name: 'Kệ Sách',
      imageUrl: '/ke-sach.jpg',
      productCount: 10,
      category: 'Kệ'
    }
  ];

  // Xử lý responsive để thay đổi số lượng item trên mỗi view
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerView(1); // Mobile
      } else if (width < 768) {
        setItemsPerView(2); // Small tablet
      } else if (width < 1024) {
        setItemsPerView(3); // Tablet
      } else {
        setItemsPerView(4); // Desktop - 4 items như trong ảnh
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Logic tự động trượt slide
  useEffect(() => {
    if (carouselImages.length > itemsPerView) {
      const timer = setInterval(() => {
        nextSlide();
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [currentIndex, itemsPerView, carouselImages.length]);

  const nextSlide = () => {
    const maxIndex = carouselImages.length - itemsPerView;
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
  };

  const prevSlide = () => {
    const maxIndex = carouselImages.length - itemsPerView;
    setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1);
  };

  // Kiểm tra xem có thể trượt tới hoặc lùi không
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < carouselImages.length - itemsPerView;

  return (
    <div 
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Container chính của Carousel */}
      <div className="relative">
        {/* Track chứa các slide */}
        <div 
          className="flex transition-transform duration-500 ease-in-out gap-3"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
          }}
        >
          {carouselImages.map((item) => (
            <div 
              key={item.id}
              className="flex-shrink-0 relative group cursor-pointer"
              style={{ width: `calc(${100 / itemsPerView}% - ${(3 * (itemsPerView - 1)) / itemsPerView}px)` }}
              onClick={() => navigateTo && navigateTo('category', item.category)}
            >
              {/* Container hình ảnh */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDQwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjRTVFN0VCIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4=';
                  }}
                />
                
                {/* Lớp phủ tối - chỉ hiện khi hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300" />
                
                {/* Text hiển thị ở giữa - chỉ hiện khi hover */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-bold text-xl md:text-2xl lg:text-3xl mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm md:text-base text-gray-200">
                    {item.productCount} Products
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nút điều hướng - chỉ hiện khi hover */}
        {canGoPrev && (
          <button
            onClick={prevSlide}
            className={`absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-3 shadow-xl transition-all duration-300 z-10 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
            }`}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-gray-800" />
          </button>
        )}

        {canGoNext && (
          <button
            onClick={nextSlide}
            className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-3 shadow-xl transition-all duration-300 z-10 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
            }`}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-gray-800" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCarousel;