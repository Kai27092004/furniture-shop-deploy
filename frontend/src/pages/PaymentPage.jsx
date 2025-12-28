import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMyOrders, getOrderStatus } from '../services/api';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const PaymentPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { clearCart } = useCart();
    const { show: showToast } = useToast();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    // no manual confirm button: webhook will update status

    useEffect(() => {
        let pollingHandle = null;

        const fetchOrderDetails = async () => {
            if (!orderId) {
                setError('Không tìm thấy mã đơn hàng.');
                setLoading(false);
                return;
            }
            try {
                const response = await fetchMyOrders();
                const currentOrder = response.data.find(o => String(o.id) === String(orderId));

                if (currentOrder) {
                    // If order already processed, navigate or show message accordingly
                    if (currentOrder.status === 'processing') {
                        // Already paid
                        clearCart();
                        navigate('/order-success', { state: { orderId } });
                        return;
                    }
                    if (currentOrder.status === 'cancelled') {
                        setError('Đơn hàng đã bị hủy hoặc thanh toán thất bại.');
                        setOrder(currentOrder);
                        setLoading(false);
                        return;
                    }
                    // else pending -> start polling
                    setOrder(currentOrder);
                } else {
                    setError('Không tìm thấy đơn hàng hợp lệ.');
                    setLoading(false);
                    return;
                }

                // Start polling status endpoint for webhook updates
                pollingHandle = setInterval(async () => {
                    try {
                        const res = await getOrderStatus(orderId);
                        const updatedOrder = res.data.order;
                        if (!updatedOrder) return;
                        // Always update local order snapshot
                        setOrder(updatedOrder);
                        if (updatedOrder.status === 'processing') {
                            clearInterval(pollingHandle);
                            clearCart();
                            navigate('/order-success', { state: { orderId } });
                        } else if (updatedOrder.status === 'cancelled') {
                            clearInterval(pollingHandle);
                            setError('Thanh toán thất bại hoặc bị hủy. Vui lòng thử lại.');
                            showToast('Thanh toán thất bại hoặc bị hủy.', { type: 'error' });
                        }
                    } catch (err) {
                        // ignore intermittent polling errors
                    }
                }, 3000); // poll every 3s

            } catch (err) {
                setError('Không thể tải thông tin đơn hàng.');
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();

        return () => {
            if (pollingHandle) clearInterval(pollingHandle);
        };
    }, [orderId]);

    // no manual confirm handler — webhook controls final status

    if (loading) {
        return <div className="text-center p-10 min-h-screen bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300 flex items-start justify-center pt-20">Đang tải thông tin thanh toán...</div>;
    }

    if (error) {
        return <div className="text-center p-10 min-h-screen bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300 flex items-start justify-center pt-20 text-red-500">{error}</div>;
    }

    if (!order) {
        return <div className="text-center p-10 min-h-screen bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300 flex items-start justify-center pt-20">Không có thông tin đơn hàng.</div>;
    }
    
    const formattedAmount = new Intl.NumberFormat('vi-VN', { 
        style: 'currency', 
        currency: 'VND' 
    }).format(order.totalAmount);

    return (
        <div className="flex items-start justify-center min-h-screen bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300 p-4 pb-20">
            <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-xl shadow-md text-center border">
                <h1 className="text-3xl font-bold text-gray-800">Xác nhận Thanh toán</h1>
                <p className="text-gray-600">
                    Mã đơn hàng: <span className="font-bold text-blue-600">#{order.id}</span>
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-700">Tổng tiền cần thanh toán:</p>
                    <p className="text-4xl font-bold text-[#A25F4B] my-2">
                        {formattedAmount}
                    </p>
                </div>

                <p className="text-gray-600">
                    Vui lòng quét mã QR bên dưới để hoàn tất.
                </p>

                <div className="flex justify-center my-4">
                    <img 
                        src={`https://qr.sepay.vn/img?acc=VQRQAEEDX8389&bank=MBBank&amount=${order.totalAmount}&des=${order.id}`} 
                        alt="Mã QR thanh toán"
                        className="rounded-lg border p-1"
                        width="220"
                        height="220"
                    />
                </div>
                
                
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <p className="text-sm text-gray-500">Hệ thống sẽ tự động cập nhật khi thanh toán hoàn tất.</p>
            </div>
        </div>
    );
};

export default PaymentPage;