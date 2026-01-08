import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from '../context/ToastContext';
import { TypeAnimation } from 'react-type-animation';

const HomePage = () => {
    // Detect mobile device (disable animation on mobile only)
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Dữ liệu tĩnh cho carousel banners
    const banners = [
        {
            image: '/banner-1.jpg',
			title: 'Nội thất hiện đại',
            description: 'Kiến tạo không gian sống đẳng cấp và tinh tế'
        },
        {
            image: '/banner-2.jpg',
			title: 'Thiết kế tối giản',
            description: 'Vẻ đẹp đến từ sự đơn giản và tiện dụng'
        },
        {
            image: '/banner-3.jpg',
			title: 'Ấm cúng & Sang trọng',
            description: 'Mang lại cảm giác bình yên cho tổ ấm của bạn'
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
			<section
				className="relative h-screen flex items-center justify-center overflow-hidden"
			>
				{/* Carousel Images */}
				<div
					className="absolute inset-0 bg-cover bg-center bg-no-repeat"
					style={{ backgroundImage: `url('${banners[currentSlide].image}')` }}
				></div>
				
				<div className="absolute inset-0 bg-black bg-opacity-50"></div>

				{/* Content */}
				<div className="relative z-10 text-center text-white px-4">
					{/* <AnimatePresence mode="wait">
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
					</AnimatePresence> */}
					<AnimatePresence mode="wait">
						<motion.div
							key={currentSlide} /* Quan trọng: Để reset hiệu ứng khi đổi slide */
							initial={isMobile ? false : { opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={isMobile ? false : { opacity: 0, y: -20 }}
							transition={isMobile ? { duration: 0 } : { duration: 0.5 }}
						>
							{/* Hiệu ứng gõ chữ cho Title */}
							<div className="mb-6 min-h-[80px]"> 
								<TypeAnimation
									// Lấy title từ dữ liệu banners (bạn nhớ làm Bước 1 là thêm title vào mảng banners nhé)
									sequence={[
										banners[currentSlide].title || 'Nội thất ShopNK', // Fallback nếu chưa có title
										1000
									]}
									wrapper="h1"
									speed={50}
									className="text-5xl md:text-7xl font-bold"
									repeat={1} 
									cursor={false}
								/>
							</div>

							<p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
								{banners[currentSlide].description || 'Khám phá không gian sống tuyệt vời'}
							</p>
							
							<Link to="/products">
								<motion.button
									className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									Xem sản phẩm
								</motion.button>
							</Link>
						</motion.div>
					</AnimatePresence>
				</div>

				{/* Previous Button */}
				<button
					onClick={prevSlide}
					className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
					aria-label="Previous slide"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
					</svg>
				</button>

				{/* Next Button */}
				<button
					onClick={nextSlide}
					className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
					aria-label="Next slide"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
			</section>

			{/* 2. Giới thiệu */}
			<section className="py-20 bg-white">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
						{[
							{ title: "Tinh tế", img: '/ban-trang-diem-q1.jpg', categoryId: 3 },
							{ title: "Trẻ trung", img: '/sofa-ket-noi.jpg', categoryId: 4 },
							{ title: "Thanh thoát", img: '/giuong-diep-moc.jpg', categoryId: 1 },
							{ title: "Ấm cúng", img: '/tu-ao-diep-moc.jpg', categoryId: 2 }
						].map((item, index) => (
							<Link to={`/category/${item.categoryId}`} key={index} className="group">
								<div className="overflow-hidden rounded-lg shadow-sm group-hover:shadow-lg transition-all duration-300 bg-white cursor-pointer">
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
							</Link>
						))}
					</div>

					<div className="grid md:grid-cols-2 gap-16 items-center">
						<div>
							<h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
								Sự tươi mới qua từng góc nhìn
							</h2>
							<p className="text-gray-600 leading-relaxed text-lg">
								Chúng tôi tin rằng mỗi món đồ nội thất không chỉ là một vật dụng, mà còn là một tác phẩm nghệ thuật, mang lại nguồn cảm hứng và sự tươi mới cho không gian sống của bạn mỗi ngày.
							</p>
						</div>
						<div className="grid grid-cols-2 gap-6">
							<Link to="/category/1" className="group">
								<div className="overflow-hidden rounded-lg shadow-sm group-hover:shadow-lg transition-all duration-300 bg-white cursor-pointer">
									<img 
										src="/giuong-da.jpg" 
										alt="Giường Da cao cấp" 
										className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300" 
										loading="lazy"
									/>
								</div>
							</Link>
							<Link to="/category/4" className="group">
								<div className="overflow-hidden rounded-lg shadow-sm group-hover:shadow-lg transition-all duration-300 bg-white mt-8 cursor-pointer">
									<img 
										src="/sofa-bed.jpg" 
										alt="Sofa Bed đa năng" 
										className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300" 
										loading="lazy"
									/>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* 3. Sản phẩm bán chạy (Sử dụng dữ liệu categories từ API) */}
			<section className="py-20 bg-gray-50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
						Danh Mục Bán Chạy
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
						{categories.map((category) => (
							// CHÚ THÍCH: Link đã được cập nhật để trỏ đến trang danh mục
							<Link to={`/category/${category.id}`} key={category.id}>
							<div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
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
								</div>
							</Link>
						))}
					</div>

					<div className="text-center">
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
					</div>
				</div>
			</section>

			{/* 4. Tại sao chọn chúng tôi */}
			<section className="py-20" style={{ backgroundColor: '#d19a66' }}>
				<div className="container mx-auto px-4">
					<h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
						Tại sao nên chọn chúng tôi
					</h2>
					<div className="grid md:grid-cols-3 gap-8">
						{[
							{ title: "Mẫu mã đa dạng, độc đáo", description: "Luôn cập nhật xu hướng mới nhất, mang đến những thiết kế nội thất tinh tế và khác biệt." },
							{ title: "Chất lượng vượt trội", description: "Sử dụng vật liệu cao cấp, quy trình sản xuất nghiêm ngặt đảm bảo độ bền cho từng sản phẩm." },
							{ title: "Chăm sóc khách hàng tận tâm", description: "Đội ngũ tư vấn viên chuyên nghiệp, sẵn sàng hỗ trợ bạn kiến tạo không gian sống hoàn hảo." }
						].map((item) => (
						<div key={item.title} className="text-center text-white">
							<h3 className="text-xl font-bold mb-4">{item.title}</h3>
							<p className="leading-relaxed opacity-90">{item.description}</p>
						</div>
						))}
					</div>
				</div>
			</section>

			{/* 5. Chia sẻ không gian sống */}
			<section className="py-20 bg-white">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
							#ChiaSẻKhôngGianSống
						</h2>
						<p className="text-gray-600 text-lg">
							Khám phá những không gian sống đầy cảm hứng từ khách hàng của chúng tôi
						</p>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
						{livingSpaceImages.map((img, index) => (
						<div
							key={index}
							className="group overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-all duration-300"
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
							</div>
						))}
					</div>
					<div className="text-center">
						{/* CHÚ THÍCH: Link đã được cập nhật */}
						<Link to="/contact">
							<motion.button
								className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
								whileHover={isMobile ? undefined : { scale: 1.05 }}
								whileTap={isMobile ? undefined : { scale: 0.95 }}
							>
								Liên hệ với chúng tôi
							</motion.button>
						</Link>
					</div>
				</div>
			</section>

			{/* 6. Đăng ký */}
			<section
				className="relative py-20 bg-cover bg-center bg-no-repeat"
				style={{ backgroundImage: "url('/sofa-om-diu.jpg')" }}
			>
				<div className="absolute inset-0 bg-black bg-opacity-60"></div>
				<div className="relative z-10 container mx-auto px-4">
					<div className="max-w-2xl mx-auto text-center text-white">
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
									whileHover={isMobile ? undefined : { scale: 1.05 }}
									whileTap={isMobile ? undefined : { scale: 0.95 }}
								>
									Gửi
								</motion.button>
							</div>
						</form>
					</div>
				</div>
			</section>
			{/* --- SECTION 7: BEFORE & AFTER VIDEO (LIGHT THEME) --- */}
			<section className="py-24 bg-white overflow-hidden">
				<div className="container mx-auto px-4">
					{/* Tiêu đề Section */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
							Hành Trình <span className="text-amber-600">Lột Xác</span>
						</h2>
						<p className="text-gray-600 text-lg max-w-2xl mx-auto font-light">
							Trăm nghe không bằng một thấy. Chiêm ngưỡng sự thay đổi ngoạn mục từ hiện trạng thô sơ đến không gian sống hoàn mỹ.
						</p>
					</motion.div>

					{/* Grid Video Comparison */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative">
						
						{/* Icon VS ở giữa (Chỉ hiện trên Desktop) */}
						<div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full items-center justify-center z-20 shadow-[0_0_30px_rgba(0,0,0,0.1)] border-4 border-amber-50">
							<span className="font-black text-2xl italic text-amber-600">VS</span>
						</div>

						{/* VIDEO 1: BEFORE (Hiện trạng cũ) */}
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className="relative group"
						>
							{/* Label */}
							<div className="absolute top-6 left-6 z-10 bg-gray-800 text-white px-5 py-2 rounded-full text-xs font-bold tracking-widest shadow-lg">
								TRƯỚC
							</div>
							
							{/* Khung Video */}
							<div className="aspect-video bg-gray-100 rounded-3xl overflow-hidden shadow-xl border border-gray-200 group-hover:shadow-2xl transition-all duration-500">
								<video 
									className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0"
									muted
									controls
									playsInline
									loop
								>
									<source src="/videos/video-before.mp4" type="video/mp4" />
									Trình duyệt của bạn không hỗ trợ thẻ video.
								</video>
							</div>
							
							{/* Mô tả dưới video */}
							<div className="mt-6 pl-4 border-l-4 border-gray-300">
								<h3 className="text-2xl font-bold text-gray-700">Hiện trạng ban đầu</h3>
								<p className="text-gray-500 mt-2">Không gian cũ kỹ, thiếu ánh sáng và chưa tối ưu công năng sử dụng.</p>
							</div>
						</motion.div>

						{/* VIDEO 2: AFTER (Hoàn thiện) */}
						<motion.div
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className="relative group"
						>
							{/* Label */}
							<div className="absolute top-6 left-6 z-10 bg-amber-600 text-white px-5 py-2 rounded-full text-xs font-bold tracking-widest shadow-lg animate-pulse">
								SAU
							</div>
							
							{/* Khung Video */}
							<div className="aspect-video bg-white rounded-3xl overflow-hidden shadow-2xl shadow-amber-100 border-2 border-amber-100 group-hover:border-amber-400 transition-all duration-500">
								<video 
									className="w-full h-full object-cover"
									muted
									autoPlay
									loop
									controls
									playsInline
								>
									<source src="/videos/video-after.mp4" type="video/mp4" />
									Trình duyệt của bạn không hỗ trợ thẻ video.
								</video>
							</div>
							
							{/* Mô tả dưới video */}
							<div className="mt-6 pl-4 border-l-4 border-amber-500">
								<h3 className="text-2xl font-bold text-amber-700">Hoàn thiện đẳng cấp</h3>
								<p className="text-gray-600 mt-2">Diện mạo mới sang trọng, tinh tế với trọn bộ nội thất cao cấp từ ShopNK.</p>
							</div>
						</motion.div>
					</div>
					
					{/* Nút Call to Action */}
					<motion.div 
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="mt-20 text-center"
					>
						<Link to="/contact" className="group inline-flex items-center space-x-3 bg-amber-600 hover:bg-amber-700 text-white px-10 py-5 rounded-full font-bold text-lg transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-amber-600/40">
							<span>Đặt Lịch Khảo Sát Miễn Phí</span>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</Link>
					</motion.div>
				</div>
			</section>
		</div>
	);
};

export default HomePage;