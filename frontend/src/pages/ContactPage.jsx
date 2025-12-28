import React, { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';

const ContactPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const { show: showToast } = useToast();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation cơ bản
        if (!formData.name.trim() || !formData.email.trim()) {
            showToast('Vui lòng điền đầy đủ thông tin bắt buộc!', { type: 'error' });
            return;
        }

        // Xử lý submit form ở đây
        console.log('Form submitted:', formData);
        
        // Hiển thị toast thành công
        showToast('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.', { 
            type: 'success',
            duration: 3000 
        });
        
        // Reset form
        setFormData({ name: '', email: '', phone: '', message: '' });
    };

    return (
        <div className="min-h-screen">
            {/* Banner đầu trang */}
            <div className="relative h-96 bg-cover bg-center bg-no-repeat" 
                 style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")' }}>
                {/* Overlay tối mờ */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                
                {/* Tiêu đề Contact */}
                <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="flex items-center">
                        <div className="w-16 h-0.5 bg-white mr-6"></div>
                        <h1 className="text-6xl md:text-8xl font-bold text-white">
                            Contact
            </h1>
                    </div>
                </div>
            </div>

            {/* Phần nội dung chính */}
            <div className="container mx-auto py-16 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Cột trái - Thông tin liên hệ */}
                    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h2 className="text-2xl font-light text-gray-600 mb-8">
                            Cách thức —— liên hệ với chúng tôi
                        </h2>
                        
                        <div className="space-y-6">
                            {/* Email */}
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-[#d4a017] rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-lg font-medium text-black">Email</p>
                                    <p className="text-gray-600">nghoangtanphat2709@gmail.com</p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-[#d4a017] rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-lg font-medium text-black">Điện thoại</p>
                                    <p className="text-gray-600">+84 876 807 798</p>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-[#d4a017] rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-lg font-medium text-black">Địa chỉ</p>
                                    <p className="text-gray-600">106/14 Trương Phước Phan, Phường Bình Trị Đông, Quận Bình Tân</p>
                                </div>
                            </div>

                            {/* Giờ làm việc */}
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-[#d4a017] rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-lg font-medium text-black">Giờ làm việc</p>
                                    <p className="text-gray-600">Thứ 2 - Thứ 6: 8:00 - 18:00</p>
                                    <p className="text-gray-600">Thứ 7: 8:00 - 12:00</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cột phải - Form liên hệ */}
                    <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Họ và tên */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Họ và tên <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Nhập họ và tên của bạn"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Nhập địa chỉ email của bạn"
                                />
                            </div>

                            {/* Số điện thoại */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Số điện thoại
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Nhập số điện thoại của bạn"
                                />
                            </div>

                            {/* Tin nhắn */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Tin nhắn
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={5}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 resize-none"
                                    placeholder="Nhập tin nhắn của bạn..."
                                ></textarea>
                </div>

                            {/* Nút gửi */}
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-300 hover:text-black transition-all duration-300 transform hover:scale-105"
                                >
                                    Gửi tin nhắn
                                </button>
                </div>
                        </form>
                </div>
                </div>
            </div>

            {/* Google Maps */}
            <div className="w-full h-96">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.123456789!2d105.8341598!3d21.0285114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe788f964319b0!2sPeakview%20Tower%2C%20Hanoi!5e0!3m2!1sen!2s!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps - Peakview Tower, Hanoi"
                ></iframe>
            </div>
        </div>
    );
};

export default ContactPage;