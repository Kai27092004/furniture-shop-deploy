import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from '../context/ToastContext';

const HomePage = () => {
    // Dữ liệu tĩnh cho carousel banners
    const banners = [
        {
            image: '/banner-4.jpg',
        },
        {
            image: '/banner-1.jpg',
        },
        {
            image: '/banner2.jpg',
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-play carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % banners.length);
        }, 5000); // Chuyển slide mỗi 5 giây

        return () => clearInterval(timer);
    }, [banners.length]);

    // Hàm chuyển slide
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    // Dữ liệu tĩnh cho categories
    const categories = [
        {
            id: 1,
            name: 'Giường',
            description: 'Khám phá các mẫu giường mới nhất của chúng tôi.',
            image: '/giuong-da.jpg'
        },
        {
            id: 2,
            name: 'Tủ quần áo',
            description: 'Khám phá các mẫu tủ quần áo mới nhất của chúng tôi.',
            image: '/tu-ao-diep-moc.jpg'
        },
        {
            id: 3,
            name: 'Bàn trang điểm',
            description: 'Khám phá các mẫu bàn trang điểm mới nhất của chúng tôi.',
            image: '/ban-trang-diem-q1.jpg'
        },
        {
            id: 4,
            name: 'Sofa',
            description: 'Khám phá các mẫu sofa mới nhất của chúng tôi.',
            image: '/sofa-ngoc-nga.jpg'
        }
    ];

    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });
    const [errors, setErrors] = useState({});
    const { show } = useToast();

    // --- CHÚ THÍCH: Các biến variants cho animation, được giữ lại từ file gốc ---
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.2, duration: 0.5 } },
	};
	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
	};

    // --- CHÚ THÍCH: Dữ liệu mẫu cho các section mới từ Homepage.js ---
    const galleryImages = [
        '/ban-trang-diem-q2.jpg',
        '/ban-trang-diem-q3.jpg', 
        '/ban-trang-diem-q4.jpg',
        '/giuong-mdf.jpg',
        '/giuong-nhung.jpg',
        '/tu-ao-diep-nhien.jpg'
    ];

    // Hình ảnh cho khối "#ChiaSẻKhôngGianSống" sử dụng public
    const livingSpaceImages = [
        '/phong-khach.jpg',
        '/phong-ngu.jpg',
        '/phong-lam-viec.jpg',
        '/ke-sach.jpg',
        '/tu-ruu.jpg',
        '/phong-lam-viec1.jpg',
    ];



    // Hàm xử lý thay đổi input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Xóa lỗi khi user bắt đầu nhập
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Hàm validation
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Vui lòng nhập họ và tên';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Vui lòng nhập email';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                newErrors.email = 'Vui lòng nhập địa chỉ email hợp lệ';
            }
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Kiểm tra từng trường và hiển thị lỗi cụ thể
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Vui lòng nhập họ và tên';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Vui lòng nhập email';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                newErrors.email = 'Vui lòng nhập địa chỉ email hợp lệ';
            }
        }
        
        setErrors(newErrors);
        
        // Nếu có lỗi, hiển thị thông báo lỗi cụ thể
        if (Object.keys(newErrors).length > 0) {
            if (newErrors.name && newErrors.email) {
                show('Vui lòng nhập đầy đủ họ tên và email!', { 
                    type: 'error', 
                    duration: 3000 
                });
            } else if (newErrors.name) {
                show('Vui lòng nhập họ và tên!', { 
                    type: 'error', 
                    duration: 3000 
                });
            } else if (newErrors.email) {
                show('Vui lòng nhập email hợp lệ!', { 
                    type: 'error', 
                    duration: 3000 
                });
            }
            return;
        }
        
        // Nếu không có lỗi, gửi thành công
        show('Đăng ký thành công! Cảm ơn bạn đã quan tâm đến SHOPNK.', { 
            type: 'success', 
            duration: 4000 
        });
        // Reset form sau khi gửi thành công
        setFormData({ name: '', email: '' });
        setErrors({});
    };

	return (
		<div className="min-h-screen">
			{/* 1. Hero Section with Carousel */}
			<motion.section
				className="relative h-screen flex items-center justify-center overflow-hidden"
				initial="hidden"
				animate="visible"
				variants={containerVariants}
			>
				{/* Carousel Images */}
				<AnimatePresence mode="wait">
					<motion.div
						key={currentSlide}
						className="absolute inset-0 bg-cover bg-center bg-no-repeat"
						style={{ backgroundImage: `url('${banners[currentSlide].image}')` }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}
					></motion.div>
				</AnimatePresence>
				
				<div className="absolute inset-0 bg-black bg-opacity-50"></div>

				{/* Content */}
				<div className="relative z-10 text-center text-white px-4">
					<AnimatePresence mode="wait">
						<motion.div
							key={currentSlide}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.5 }}
						>
							<h1 className="text-5xl md:text-7xl font-bold mb-6">
								{banners[currentSlide].title}
							</h1>
							<p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
								{banners[currentSlide].description}
							</p>
						</motion.div>
					</AnimatePresence>
				</div>

				{/* Navigation Buttons */}
				<button
					onClick={prevSlide}
					className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
					aria-label="Previous slide"
				>
					<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
					</svg>
				</button>

				<button
					onClick={nextSlide}
					className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
					aria-label="Next slide"
				>
					<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
					</svg>
				</button>

				{/* Indicators */}
				<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
					{banners.map((_, index) => (
						<button
							key={index}
							onClick={() => goToSlide(index)}
							className={`w-3 h-3 rounded-full transition-all duration-300 ${
								index === currentSlide
									? 'bg-white w-8'
									: 'bg-white/50 hover:bg-white/75'
							}`}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>
			</motion.section>

			{/* 2. Giới thiệu */}
			<motion.section
				className="py-20 bg-white"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.2 }}
				variants={containerVariants}
			>
				<div className="container mx-auto px-4">
					<motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20" variants={itemVariants}>
						{[
							{ title: "Tinh tế", img: '/ban-trang-diem-q1.jpg' },
							{ title: "Trẻ trung", img: '/sofa-ket-noi.jpg' },
							{ title: "Thanh thoát", img: '/giuong-diep-moc.jpg' },
							{ title: "Ấm cúng", img: '/tu-ao-diep-moc.jpg' }
						].map((item, index) => (
							<div key={index} className="group">
								<div className="overflow-hidden rounded-lg shadow-sm group-hover:shadow-lg transition-all duration-300 bg-white">
									<img 
										src={item.img} 
										alt={item.title} 
										className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300" 
										loading="lazy"
									/>
								</div>
								<div className="mt-4 text-center">
									<h3 className="text-lg font-semibold text-gray-800 group-hover:text-amber-600 transition-colors duration-300">{item.title}</h3>
								</div>
							</div>
						))}
					</motion.div>

					<div className="grid md:grid-cols-2 gap-16 items-center">
						<motion.div variants={itemVariants}>
							<h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
								Sự tươi mới qua từng góc nhìn
							</h2>
							<p className="text-gray-600 leading-relaxed text-lg">
								Chúng tôi tin rằng mỗi món đồ nội thất không chỉ là một vật dụng, mà còn là một tác phẩm nghệ thuật, mang lại nguồn cảm hứng và sự tươi mới cho không gian sống của bạn mỗi ngày.
							</p>
						</motion.div>
						<motion.div className="grid grid-cols-2 gap-6" variants={itemVariants}>
							<div className="group">
								<div className="overflow-hidden rounded-lg shadow-sm group-hover:shadow-lg transition-all duration-300 bg-white">
									<img 
										src="/giuong-da.jpg" 
										alt="Giường Da cao cấp" 
										className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300" 
										loading="lazy"
									/>
								</div>
							</div>
							<div className="group">
								<div className="overflow-hidden rounded-lg shadow-sm group-hover:shadow-lg transition-all duration-300 bg-white mt-8">
									<img 
										src="/sofa-bed.jpg" 
										alt="Sofa Bed đa năng" 
										className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300" 
										loading="lazy"
									/>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</motion.section>

			{/* 3. Sản phẩm bán chạy (Sử dụng dữ liệu categories từ API) */}
			<motion.section
				className="py-20 bg-gray-50"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.2 }}
				variants={containerVariants}
			>
				<div className="container mx-auto px-4">
					<motion.h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12" variants={itemVariants}>
						Danh Mục Bán Chạy
					</motion.h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
						{categories.map((category) => (
							// CHÚ THÍCH: Link đã được cập nhật để trỏ đến trang danh mục
							<Link to={`/category/${category.id}`} key={category.id}>
								<motion.div
									className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col"
									variants={itemVariants}
									whileHover={{ y: -5 }}
								>
									<div className="relative overflow-hidden bg-white">
										<img
											src={category.image}
											alt={category.name}
											className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
											loading="lazy"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
										<span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
											Hot
										</span>
									</div>
									<div className="p-4 flex-grow flex flex-col">
										<h3 className="font-semibold text-gray-800 mb-2 text-lg">{category.name}</h3>
										<p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
											{category.description}
										</p>
										<p className="text-amber-600 font-bold text-right mt-auto">Xem chi tiết &rarr;</p>
									</div>
								</motion.div>
							</Link>
						))}
					</div>

					<motion.div className="text-center" variants={itemVariants}>
						{/* CHÚ THÍCH: Link đã được cập nhật */}
						<Link to="/products">
							<motion.button
								className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								Xem tất cả
							</motion.button>
						</Link>
					</motion.div>
				</div>
			</motion.section>

			{/* 4. Tại sao chọn chúng tôi */}
			<motion.section
				className="py-20" style={{ backgroundColor: '#d19a66' }}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
				variants={containerVariants}
			>
				<div className="container mx-auto px-4">
					<motion.h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12" variants={itemVariants}>
						Tại sao nên chọn chúng tôi
					</motion.h2>
					<div className="grid md:grid-cols-3 gap-8">
						{[
							{ title: "Mẫu mã đa dạng, độc đáo", description: "Luôn cập nhật xu hướng mới nhất, mang đến những thiết kế nội thất tinh tế và khác biệt." },
							{ title: "Chất lượng vượt trội", description: "Sử dụng vật liệu cao cấp, quy trình sản xuất nghiêm ngặt đảm bảo độ bền cho từng sản phẩm." },
							{ title: "Chăm sóc khách hàng tận tâm", description: "Đội ngũ tư vấn viên chuyên nghiệp, sẵn sàng hỗ trợ bạn kiến tạo không gian sống hoàn hảo." }
						].map((item) => (
							<motion.div key={item.title} className="text-center text-white" variants={itemVariants}>
								<h3 className="text-xl font-bold mb-4">{item.title}</h3>
								<p className="leading-relaxed opacity-90">{item.description}</p>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

			{/* 5. Chia sẻ không gian sống */}
			<motion.section
				className="py-20 bg-white"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.2 }}
				variants={containerVariants}
			>
				<div className="container mx-auto px-4">
					<motion.div className="text-center mb-12" variants={itemVariants}>
						<h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
							#ChiaSẻKhôngGianSống
						</h2>
						<p className="text-gray-600 text-lg">
							Khám phá những không gian sống đầy cảm hứng từ khách hàng của chúng tôi
						</p>
					</motion.div>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
						{livingSpaceImages.map((img, index) => (
							<motion.div
								key={index}
								className="group overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-all duration-300"
								variants={itemVariants}
								whileHover={{ scale: 1.03 }}
							>
								<div className="relative overflow-hidden bg-white">
									<img 
										src={img} 
										alt={`Không gian sống ${index + 1}`} 
										className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300" 
										loading="lazy"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
									<div className="absolute bottom-3 left-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
										<span className="text-sm font-medium">Khám phá thêm</span>
									</div>
								</div>
							</motion.div>
						))}
					</div>
					<motion.div className="text-center" variants={itemVariants}>
						{/* CHÚ THÍCH: Link đã được cập nhật */}
						<Link to="/contact">
							<motion.button
								className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								Liên hệ với chúng tôi
							</motion.button>
						</Link>
					</motion.div>
				</div>
			</motion.section>

			{/* 6. Đăng ký */}
			<motion.section
				className="relative py-20 bg-cover bg-center bg-no-repeat"
				style={{ backgroundImage: "url('/sofa-om-diu.jpg')" }}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
				variants={containerVariants}
			>
				<div className="absolute inset-0 bg-black bg-opacity-60"></div>
				<div className="relative z-10 container mx-auto px-4">
					<motion.div className="max-w-2xl mx-auto text-center text-white" variants={itemVariants}>
						<h2 className="text-3xl md:text-4xl font-bold mb-4">Đăng ký ngay</h2>
						<p className="text-lg mb-8 opacity-90">
							Đăng ký để nhận thông tin về những sản phẩm mới nhất và ưu đãi đặc biệt
						</p>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<input 
									type="text" 
									name="name"
									value={formData.name}
									onChange={handleInputChange}
									placeholder="Họ và tên" 
									className={`w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 transition-all duration-300 ${
										errors.name 
											? 'border-2 border-red-500 focus:ring-red-500' 
											: 'border-2 border-transparent focus:ring-amber-500'
									}`}
								/>
								{errors.name && (
									<p className="text-red-300 text-sm mt-2 text-left ml-2">
										{errors.name}
									</p>
								)}
							</div>
							<div>
								<input 
									type="email" 
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									placeholder="Email" 
									className={`w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 transition-all duration-300 ${
										errors.email 
											? 'border-2 border-red-500 focus:ring-red-500' 
											: 'border-2 border-transparent focus:ring-amber-500'
									}`}
								/>
								{errors.email && (
									<p className="text-red-300 text-sm mt-2 text-left ml-2">
										{errors.email}
									</p>
								)}
							</div>
							<div className="flex justify-center">
								<motion.button
									type="submit"
									className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									Gửi
								</motion.button>
							</div>
						</form>
					</motion.div>
				</div>
			</motion.section>
		</div>
	);
};

export default HomePage;