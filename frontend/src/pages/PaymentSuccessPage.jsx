import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const PaymentSuccessPage = () => {
    const location = useLocation();
    const orderId = location.state?.orderId;

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-green-100 text-green-600 text-4xl mb-4">✓</div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">Đặt hàng thành công!</h1>
            <p className="text-gray-600 mb-2">Cảm ơn bạn đã mua hàng tại SHOPNK.</p>
            {orderId && (
                <p className="text-gray-700 mb-6">Mã đơn hàng của bạn là: <span className="font-semibold">{orderId}</span></p>
            )}
            <Link to="/" className="px-6 py-3 rounded-lg bg-[#A25F4B] text-white font-semibold shadow-sm hover:bg-[#8B4A3A] transition">Tiếp tục mua sắm</Link>
        </div>
    );
};

export default PaymentSuccessPage;


