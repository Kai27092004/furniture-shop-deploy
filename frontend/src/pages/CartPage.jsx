import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { createOrder, BACKEND_URL } from '../services/api';
import { FaTrash } from "react-icons/fa";


const CartPage = () => {
    const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
    const { isAuthenticated } = useAuth();
    const { show: showToast } = useToast();
    const navigate = useNavigate();
    const [error, setError] = useState('');   
    useEffect(() => {
        // scroll to top to avoid landing in the middle/bottom of the page
        window.scrollTo({ top: 0, left: 0 });
    }, []);

    const handleProceedToCheckout = async (e) => {
        e.preventDefault();
        setError('');
        if (!isAuthenticated) {
            showToast('Vui lòng đăng nhập để có thể đặt hàng.', { type: 'error' });
            navigate('/login', { state: { from: '/cart' } });
            return;
        }        try {
            const orderData = {
                cartItems: cartItems,
                shippingAddress: 'Tại quầy',
            };
            
            const response = await createOrder(orderData);
            const newOrder = response.data;

            if (newOrder && newOrder.orderId) {
                navigate(`/payment/${newOrder.orderId}`);
            } else {
                throw new Error('Không nhận được ID đơn hàng sau khi tạo.');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Đã có lỗi xảy ra khi tạo đơn hàng.';
            setError(errorMessage);
            showToast(`Lỗi: ${errorMessage}`, { type: 'error' });
        }
    };    const formatVND = (n) => {
        return n.toLocaleString("vi-VN") + "₫";
    };

    if (cartItems.length === 0) {
        return (
            <div className="text-center p-10 min-h-[60vh] flex flex-col justify-center items-center bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300">
                <h1 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-800">Giỏ hàng của bạn đang trống</h1>
                <p className="text-gray-600 mb-6">Hãy khám phá và thêm những sản phẩm nội thất tinh tế vào giỏ hàng nhé!</p>
                <Link to="/products" className="bg-[#A25F4B] text-white py-3 px-8 rounded-lg hover:bg-[#8B4A3A] transition-colors font-semibold shadow-sm">
                    Tiếp tục mua sắm
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleProceedToCheckout} className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300 py-6 sm:py-10">
            <div className="max-w-6xl mx-auto px-2 sm:px-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3A3A3A] mb-6 sm:mb-8 text-center">
                    Giỏ hàng của bạn
                </h1>
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Cột trái: Danh sách sản phẩm */}
                    <div className="flex-1 bg-white rounded-xl shadow-sm p-3 sm:p-6 border border-gray-200">
                        <div className="overflow-x-auto">
                             <table className="min-w-[600px] w-full text-sm hidden md:table">
                                <thead>
                                    <tr className="text-left text-gray-500 border-b border-gray-200">
                                        <th className="py-3 font-medium">Sản phẩm</th>
                                        <th className="py-3 font-medium">Đơn giá</th>
                                        <th className="py-3 font-medium">Số lượng</th>
                                        <th className="py-3 font-medium">Tổng</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item.id} className="border-b border-gray-200 last:border-b-0">
                                            <td className="py-4 flex items-center gap-4">
                                                {/* CHÚ THÍCH SỬA ĐỔI: Thêm BACKEND_URL */}
                                                <img src={`${BACKEND_URL}${item.imageUrl}`} alt={item.name} className="w-20 h-20 rounded-lg object-cover border border-gray-200" />
                                                <span className="font-bold text-gray-800">{item.name}</span>
                                            </td>
                                            <td className="py-4 text-gray-800 font-bold">{formatVND(item.price)}</td>
                                            <td className="py-4">
                                                <div className="flex items-center gap-2">
                                                    <button type="button" className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 rounded hover:bg-gray-200 border border-gray-300" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>–</button>
                                                    <input type="number" value={item.quantity} readOnly className="w-14 h-8 px-2 border border-gray-300 rounded text-center text-gray-800 font-bold" />
                                                    <button type="button" className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 rounded hover:bg-gray-200 border border-gray-300" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                                </div>
                                            </td>
                                            <td className="py-4 font-bold text-[#A25F4B]">{formatVND(item.price * item.quantity)}</td>
                                            <td className="py-4">
                                                <button type="button" className="text-gray-400 hover:text-red-500 p-2 rounded-full transition" onClick={() => removeFromCart(item.id)}><FaTrash /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="md:hidden space-y-4">
                                {cartItems.map(item => (
                                    <div key={item.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                                        <div className="flex items-center gap-3 mb-3">
                                            {/* CHÚ THÍCH SỬA ĐỔI: Thêm BACKEND_URL */}
                                            <img src={`${BACKEND_URL}${item.imageUrl}`} alt={item.name} className="w-16 h-16 rounded-lg object-cover border border-gray-200" />
                                            <div>
                                                <p className="font-bold text-gray-800">{item.name}</p>
                                                <p className="text-sm text-gray-800 font-bold">{formatVND(item.price)}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <button type="button" className="w-7 h-7 flex items-center justify-center bg-gray-100 text-gray-600 rounded hover:bg-gray-200 border border-gray-300" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>–</button>
                                                <input type="number" value={item.quantity} readOnly className="w-12 h-7 px-1 border border-gray-300 rounded text-center text-gray-800 font-bold text-sm" />
                                                <button type="button" className="w-7 h-7 flex items-center justify-center bg-gray-100 text-gray-600 rounded hover:bg-gray-200 border border-gray-300" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                            </div>
                                            <div className="font-bold text-sm text-[#A25F4B]">{formatVND(item.price * item.quantity)}</div>
                                            <button type="button" className="text-gray-400 hover:text-red-500 p-2" onClick={() => removeFromCart(item.id)}><FaTrash /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Cột phải: Đơn hàng của bạn */}
                    <div className="w-full lg:w-[350px] flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 sticky top-8 border border-gray-200">
                            <h2 className="font-bold text-gray-800 mb-4 text-lg">Đơn hàng của bạn</h2>
                            <div className="border-b border-gray-200 pb-2 mb-2">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center text-sm mb-1">
                                        <span className="text-gray-600 truncate pr-2 font-bold">{item.name} <span className="text-gray-400 font-medium">× {item.quantity}</span></span>
                                        <span className="font-medium text-gray-700">{formatVND(item.price * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between font-bold text-lg mt-4 mb-4">
                                <span className="text-gray-800">Tổng cộng</span>
                                <span className="text-[#A25F4B]">{formatVND(cartTotal)}</span>
                            </div>
                            {error && <p className="text-sm text-red-600 my-2 text-center">{error}</p>}
                            <button type="submit" className="w-full px-6 py-3 rounded-lg bg-[#A25F4B] text-white font-semibold shadow-sm hover:bg-[#8B4A3A] transition text-base">
                                Tiến hành Đặt hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CartPage;