import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import hình ảnh từ public
const phongKhach = '/phong-khach.jpg';
const phongLamViec = '/phong-lam-viec.jpg';
const phongLamViec1 = '/phong-lam-viec1.jpg';
const phongNgu = '/phong-ngu.jpg';
const keSach = '/ke-sach.jpg';
const tuRuu = '/tu-ruu.jpg';

const NewsPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const navigate = useNavigate();

    // Dữ liệu tin tức mẫu - 6 tin tức phù hợp với 6 hình ảnh
    const newsData = [
        {
            id: 1,
            title: "Thiết kế phòng khách hiện đại và sang trọng",
            description: "Phòng khách là trái tim của ngôi nhà, nơi gia đình quây quần và tiếp đón khách. Thiết kế phòng khách hiện đại với sofa êm ái, bàn trà tinh tế và ánh sáng ấm áp tạo nên không gian thư giãn hoàn hảo.",
            image: phongKhach,
            date: "16/05/2025"
        },
        {
            id: 2,
            title: "Phòng ngủ ấm cúng - Nơi nghỉ ngơi lý tưởng",
            description: "Phòng ngủ là nơi riêng tư nhất trong nhà, cần được thiết kế để mang lại sự thoải mái và thư giãn tối đa. Giường ngủ êm ái, tủ quần áo gọn gàng và ánh sáng dịu nhẹ tạo nên không gian nghỉ ngơi hoàn hảo.",
            image: phongNgu,
            date: "15/05/2025"
        },
        {
            id: 3,
            title: "Phòng làm việc tại nhà - Năng suất tối đa",
            description: "Với xu hướng làm việc từ xa, phòng làm việc tại nhà trở nên quan trọng hơn bao giờ hết. Bàn làm việc rộng rãi, ghế ergonomic và ánh sáng tự nhiên giúp tăng năng suất và sự tập trung trong công việc.",
            image: phongLamViec,
            date: "14/05/2025"
        },
        {
            id: 4,
            title: "Không gian làm việc sáng tạo và chuyên nghiệp",
            description: "Một không gian làm việc được thiết kế tốt không chỉ tăng năng suất mà còn truyền cảm hứng sáng tạo. Kết hợp giữa chức năng và thẩm mỹ, tạo nên môi trường làm việc lý tưởng cho mọi ngành nghề.",
            image: phongLamViec1,
            date: "13/05/2025"
        },
        {
            id: 5,
            title: "Tủ rượu sang trọng - Đẳng cấp trong từng chi tiết",
            description: "Tủ rượu không chỉ là nơi lưu trữ mà còn là tác phẩm nghệ thuật trang trí. Thiết kế tủ rượu sang trọng với chất liệu gỗ cao cấp và ánh sáng LED tạo nên không gian thưởng thức rượu đẳng cấp.",
            image: tuRuu,
            date: "12/05/2025"
        },
        {
            id: 6,
            title: "Kệ sách thông minh - Kết hợp lưu trữ và trang trí",
            description: "Kệ sách thông minh không chỉ là nơi lưu trữ sách mà còn là điểm nhấn trang trí quan trọng. Thiết kế đa dạng từ kệ treo tường đến kệ góc, phù hợp với mọi không gian và phong cách nội thất.",
            image: keSach,
            date: "11/05/2025"
        }
    ];

    // Chia tin tức thành các nhóm để hiển thị theo slide
    const itemsPerSlide = 3;
    const totalSlides = Math.ceil(newsData.length / itemsPerSlide);
    const currentNews = showAll ? newsData : newsData.slice(
        currentSlide * itemsPerSlide,
        (currentSlide + 1) * itemsPerSlide
    );

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const handleViewAll = () => {
        setShowAll(!showAll);
        if (!showAll) {
            // Scroll to top when showing all
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="container mx-auto py-10 px-4">
            {/* Tiêu đề */}
            <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
                    Tin tức và xu hướng nội thất!
            </h1>
            </div>

            {/* Danh sách tin tức */}
            <div className="relative mb-12">
                <div className={`grid gap-8 ${showAll ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                    {currentNews.map((news, index) => (
                        <div
                            key={news.id}
                            className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 group ${
                                isVisible ? 'animate-fadeInUp' : 'opacity-0'
                            }`}
                            style={{
                                animationDelay: `${index * 200}ms`,
                                animationFillMode: 'forwards'
                            }}
                        >
                            {/* Ảnh đại diện */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                
                            </div>

                            {/* Nội dung */}
                            <div className="p-6">
                                {/* Thông tin ngày */}
                                <div className="flex items-center mb-4 text-sm text-gray-600">
                                    <div className="flex items-center space-x-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>{news.date}</span>
                                    </div>
                                </div>

                                {/* Tiêu đề */}
                                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                                    {news.title}
                                </h3>

                                {/* Mô tả */}
                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                    {news.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dots indicator - chỉ hiển thị khi không phải chế độ xem tất cả */}
                {!showAll && (
                    <div className="flex justify-center mt-8 space-x-2">
                        {Array.from({ length: totalSlides }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                    index === currentSlide ? 'bg-[#c8a47e]' : 'bg-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Nút xem tất cả */}
            <div className="text-center">
                <button 
                    onClick={handleViewAll}
                    className="bg-[#c8a47e] hover:bg-[#b8956a] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto"
                >
                    <span>{showAll ? 'THU GỌN' : 'XEM TẤT CẢ'}</span>
                    <svg className={`w-5 h-5 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* CSS cho animation */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fadeInUp {
                    animation: fadeInUp 0.6s ease-out;
                }
                
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default NewsPage;