import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Star } from 'lucide-react';
import { BACKEND_URL } from '../services/api'; 
import { useToast } from '../context/ToastContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { show } = useToast();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        if (isAuthenticated) {
            addToCart(product);
            show('Đã thêm vào giỏ hàng!', { type: 'success' });
        } else {
            show('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.', { type: 'error' });
            navigate('/login');
        }
    };
    
    const [isHovered, setIsHovered] = useState(false);

    // Animation variants cho hiệu ứng cuộn xuống
    const cardVariants = {
        hidden: { 
            opacity: 0, 
            y: 50,
            scale: 0.9
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: { 
                duration: 0.6, 
                ease: "easeOut",
                delay: 0.1
            } 
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const discountPercent = product.originalPrice ? 
        Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    return (
        <motion.div 
            className="bg-white rounded-lg shadow-sm hover:shadow-2xl transition-all duration-300 group relative overflow-hidden border"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            // whileHover={{ 
            //     y: -8, 
            //     scale: 1.02,
            //     transition: { 
            //         duration: 0.3, 
            //         ease: "easeOut" 
            //     } 
            // }}
            // whileTap={{ 
            //     scale: 0.98,
            //     transition: { 
            //         duration: 0.1 
            //     } 
            // }}
        >
            {/* Product Image */}
            <div className="relative overflow-hidden">
                <Link to={`/products/${product.id}`}>
                    <img 
                        src={`${BACKEND_URL}${product.imageUrl}`} // <-- CHỈNH SỬA DÒNG NÀY
                        alt={product.name}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </Link>
                
                {product.isHot && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                        HOT
                    </span>
                )}

                {discountPercent > 0 && (
                    <span className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 text-xs font-bold rounded">
                        -{discountPercent}%
                    </span>
                )}

            </div>

            {/* Product Info */}
            <div className="p-4">
                <p className="text-gray-500 text-sm mb-1">{product.category?.name || 'Chưa phân loại'}</p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 h-14 line-clamp-2">
                     <Link to={`/products/${product.id}`} className="hover:text-blue-600 transition-colors duration-200">
                        {product.name}
                     </Link>
                </h3>

                <div className="flex items-center mb-3">
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => {
                            const rating = product.rating || 4.5; // Mặc định 4.5 sao
                            const isHalfStar = star === Math.ceil(rating) && rating % 1 !== 0;
                            const isFilled = star < rating;
                            
                            return (
                                <Star
                                    key={star}
                                    className={`h-4 w-4 ${
                                        isFilled
                                            ? 'text-amber-600 fill-amber-600'
                                            : isHalfStar
                                            ? 'text-amber-600 fill-amber-600 opacity-50'
                                            : 'text-gray-300'
                                    }`}
                                />
                            );
                        })}
                    </div>
                    <span className="text-xs text-gray-500 ml-2">(4.5/5)</span>
                </div>

                <div className="flex items-baseline space-x-2">
                    <span className="text-xl font-bold text-amber-800">
                        {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                            {formatPrice(product.originalPrice)}
                        </span>
                    )}
                </div>
            </div>

            {/* Quick Add to Cart - Hiện khi hover */}
            <div className={`absolute bottom-0 left-0 right-0 bg-gray-800 text-white text-center font-semibold transition-all duration-300 text-sm ${
                isHovered ? 'transform translate-y-0' : 'transform translate-y-full'
            }`}>
                <button onClick={handleAddToCart} className="w-full p-3 hover:bg-black transition-colors duration-200">
                    Thêm vào giỏ hàng
                </button>
            </div>
        </motion.div>
    );
};

export default ProductCard;