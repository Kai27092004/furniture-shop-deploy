import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchProductById, BACKEND_URL } from '../services/api'; 
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Minus, Plus, Heart, Maximize2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const ProductDetailPage = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const { id } = useParams();
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const { show } = useToast();

    useEffect(() => {
        const getProductData = async () => {
            try {
                setLoading(true);
                const productResponse = await fetchProductById(id);
                setProduct(productResponse.data);
                setSelectedImage(0);
                setQuantity(1);
            } catch (error) {
                console.error("Lỗi khi tải chi tiết sản phẩm:", error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };
        getProductData();
    }, [id]);

    const handleQuantityChange = (change) => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity + change));
    };

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            show('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.', { type: 'error' });
            navigate('/login');
            return;
        }
        addToCart(product, quantity);
        show(`Đã thêm ${quantity} "${product.name}" vào giỏ hàng!`, { type: 'success' });
    };

    const handleWishlist = () => {
        setIsWishlisted(!isWishlisted);
    };
    
    const handleImageFullscreen = () => {
        if (product && product.imageUrl) {
             // <-- CHỈNH SỬA DÒNG NÀY
             window.open(`${BACKEND_URL}${product.imageUrl}`, '_blank');
        }
    };


    if (loading) {
        return <p className="text-center text-gray-500 mt-10">Đang tải...</p>;
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Sản phẩm không tồn tại</h2>
                    <Link to="/products" className="text-hot-orange hover:text-orange-600 font-medium">
                        Quay lại danh sách sản phẩm
                    </Link>
                </div>
            </div>
        );
    }
    
    const images = product.images && product.images.length > 0 ? product.images : [product.imageUrl];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="text-sm">
                        <Link to="/" className="text-gray-500 hover:text-gray-700 transition-colors">
                            Trang chủ
                        </Link>
                        <span className="mx-2 text-gray-400">/</span>
                        <Link to="/products" className="text-gray-500 hover:text-gray-700 transition-colors">
                            Sản phẩm
                        </Link>
                        <span className="mx-2 text-gray-400">/</span>
                        <span className="font-semibold text-gray-900">{product.name}</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                        {/* Left Side - Images */}
                        <div className="space-y-4">
                             <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                 <img
                                     // <-- CHỈNH SỬA DÒNG NÀY
                                     src={`${BACKEND_URL}${images[selectedImage]}` || '/img/placeholder.jpg'}
                                     alt={product.name}
                                     className="w-full h-full object-cover"
                                 />
                                 {product.hot && (
                                     <span className="absolute top-4 left-4 bg-hot-orange text-white text-sm font-bold px-3 py-1 rounded">
                                         HOT
                                     </span>
                                 )}
                                 <button
                                     onClick={handleImageFullscreen}
                                     className="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all"
                                     title="Fullscreen"
                                 >
                                     <Maximize2 className="h-5 w-5 text-gray-700" />
                                 </button>
                             </div>
                            {images.length > 1 && (
                                <div className="flex space-x-2 overflow-x-auto">
                                    {images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                                                selectedImage === index 
                                                ? 'border-hot-orange' 
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <img
                                                 // <-- CHỈNH SỬA DÒNG NÀY
                                                src={`${BACKEND_URL}${image}` || '/img/placeholder.jpg'}
                                                alt={`${product.name} ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right Side - Product Info */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                                <div className="flex items-center space-x-4 mb-4">
                                    <span className="text-3xl font-bold text-amber-800">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                    </span>
                                    {product.hot && (
                                         <span className="bg-hot-orange text-white text-sm font-bold px-2 py-1 rounded">
                                             HOT
                                         </span>
                                    )}
                                </div>
                            </div>

                            <div className="prose text-gray-600">
                                <p>{product.description}</p>
                            </div>
                            
                            {/* --- PHẦN THAY ĐỔI --- */}
                            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                                {/* Quantity Selector */}
                                <div className="flex items-center">
                                     <span className="text-sm font-medium text-gray-700 mr-4">Số lượng:</span>
                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                        <button
                                            onClick={() => handleQuantityChange(-1)}
                                            disabled={quantity <= 1}
                                            className="p-2.5 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="px-4 py-2 font-medium">{quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(1)}
                                            className="p-2.5 hover:bg-gray-50"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Action Buttons */}
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                                >
                                    Thêm vào giỏ hàng
                                </button>
                                <button
                                    onClick={handleWishlist}
                                    className={`px-4 py-3 rounded-lg border transition-colors ${
                                        isWishlisted
                                        ? 'bg-red-50 border-red-200 text-red-600'
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                                </button>
                            </div>
                             {/* --- KẾT THÚC PHẦN THAY ĐỔI --- */}


                            <div className="border-t border-gray-200 pt-6 space-y-4">
                               <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium text-gray-700">SKU:</span>
                                        <span className="ml-2 text-gray-600">{product.sku || 'N/A'}</span>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-700">Chất liệu:</span>
                                        <span className="ml-2 text-gray-600">{product.material || 'Đang cập nhật'}</span>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-700">Trạng thái:</span>
                                        <span className="ml-2 text-green-600">Còn hàng</span>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-700">Danh mục:</span>
                                        <span className="ml-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                           {product.category?.name || 'Chưa phân loại'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="border-t border-gray-200 pt-6">
                                <span className="font-medium text-gray-700 block mb-3">Chia sẻ:</span>
                                <div className="flex space-x-3">
                                    <a href="#" className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"><Facebook className="h-5 w-5" /></a>
                                    <a href="#" className="bg-blue-400 text-white p-2 rounded-lg hover:bg-blue-500 transition-colors"><Twitter className="h-5 w-5" /></a>
                                    <a href="#" className="bg-blue-800 text-white p-2 rounded-lg hover:bg-blue-900 transition-colors"><Linkedin className="h-5 w-5" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;