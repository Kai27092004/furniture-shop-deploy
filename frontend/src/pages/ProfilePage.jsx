import React, { useState, useEffect } from 'react';
// CHÚ THÍCH SỬA ĐỔI: Thêm `useNavigate` để điều hướng trang
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile, fetchMyOrders, cancelOrder, updateOrderStatus } from '../services/api';
import { useToast } from '../context/ToastContext';
import Modal from '../components/common/Modal';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [cancelReason, setCancelReason] = useState('');
    const { show: showToast } = useToast();

    
    // CHÚ THÍCH SỬA ĐỔI: Khởi tạo hook `useNavigate`
    const navigate = useNavigate();

    const getStatusText = (status) => {
        switch (status) {
            case 'pending': return 'Chờ thanh toán';
            case 'processing': return 'Đã thanh toán';
            case 'shipped': return 'Đang vận chuyển';
            case 'delivered': return 'Đã giao hàng';
            case 'cancelled': return 'Đã hủy đơn';
            default: return status;
        }
    };

    const loadData = async () => {
        try {
            setLoading(true); 
            const profileRes = await fetchUserProfile();
            const ordersRes = await fetchMyOrders();
            setProfile(profileRes.data);
            setOrders(ordersRes.data);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu trang cá nhân:", error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        loadData();
    }, []);
    
    // CHÚ THÍCH SỬA ĐỔI: Hàm này được viết lại để điều hướng đến trang PaymentPage
    const handleContinuePayment = (order) => {
        navigate(`/payment/${order.id}`);
    };


    const handleCancelOrder = async () => {
        if (!selectedOrder) return;
        
        try {
            const response = await cancelOrder(selectedOrder.id);
            showToast(response.data.message || 'Đơn hàng đã được hủy thành công!', { type: 'success' });
            setShowCancelModal(false);
            setSelectedOrder(null);
            setCancelReason('');
            loadData();
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Đã có lỗi xảy ra.";
            showToast(`Lỗi: ${errorMessage}`, { type: 'error' });
        }
    };

    const openCancelModal = (order) => {
        setSelectedOrder(order);
        setShowCancelModal(true);
    };

    const closeCancelModal = () => {
        setShowCancelModal(false);
        setSelectedOrder(null);
        setCancelReason('');
    };

    if (loading) {
        return <p className="text-center">Đang tải...</p>;
    }

    if (!profile) {
        return <p className="text-center text-red-500">Không thể tải thông tin cá nhân.</p>;
    }

    return (
        <>
            <div className="container mx-auto p-4 space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                    <div className="flex flex-col items-center md:items-center md:flex-row gap-4 w-full md:w-auto">
                        <img
                            src={profile.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName)}&background=random`}
                            alt="avatar"
                            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                        />
                        <div className="md:ml-4 flex flex-col items-center md:items-start">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{profile.fullName}</h2>
                        </div>
                    </div>
                    <div className="flex flex-col items-start w-full md:w-auto md:items-end text-base mt-4 md:mt-0">
                        <p className="mb-1"><span className="font-semibold">Email:</span> <span className="font-bold">{profile.email}</span></p>
                        <p className="mb-1"><span className="font-semibold">SĐT:</span> <span className="font-bold">{profile.phone || 'Chưa cập nhật'}</span></p>
                        <p><span className="font-semibold">Địa chỉ:</span> <span className="font-bold">{profile.address || 'Chưa cập nhật'}</span></p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Lịch Sử Đơn Hàng</h2>
                    {orders.length > 0 ? (
                        <div className="space-y-6">
                            {orders.map(order => {
                                const isPending = order.status === 'pending';
                                let statusColor = '';
                                if (order.status === 'processing' || order.status === 'delivered') {
                                    statusColor = 'bg-green-100 text-green-800';
                                } else if (order.status === 'cancelled') {
                                    statusColor = 'bg-red-100 text-red-800';
                                } else {
                                    statusColor = 'bg-yellow-100 text-yellow-800';
                                }
                                
                                return (
                                    <div key={order.id} className="border rounded-lg p-4">
                                        <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                                            <h3 className="text-lg font-bold">Đơn hàng #{order.id}</h3>
                                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusColor}`}>
                                                {getStatusText(order.status)}
                                            </span>
                                            <span className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString('vi-VN')}</span>
                                        </div>
                                        <div className="border-t pt-2 mt-2">
                                            {order.items.map(item => (
                                                <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                                                    <span>{item.product?.name || '[Sản phẩm không còn tồn tại]'} x {item.quantity}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between font-bold text-lg mt-2 border-t pt-2">
                                            {isPending ? (
                                                <div className="flex gap-2 mr-4">
                                                    <button
                                                        className="px-3 py-1 text-sm rounded-full font-semibold bg-blue-500 text-white shadow hover:bg-blue-600 transition-colors"
                                                        onClick={() => handleContinuePayment(order)}
                                                    >
                                                        Tiếp tục thanh toán
                                                    </button>
                                                    <button
                                                        className="px-3 py-1 text-sm rounded-full font-semibold bg-red-500 text-white shadow hover:bg-red-600 transition-colors"
                                                        onClick={() => openCancelModal(order)}
                                                    >
                                                        Hủy đơn hàng
                                                    </button>
                                                </div>
                                            ) : <div />}
                                            <span>Tổng cộng: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p>Bạn chưa có đơn hàng nào.</p>
                    )}
                </div>
            </div>

            {/* Modal Hủy Đơn Hàng */}
            <Modal 
                isOpen={showCancelModal} 
                onClose={closeCancelModal} 
                title=""
                maxWidth="max-w-md"
            >
                <div className="text-center">
                    {/* Icon cảnh báo */}
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                        <svg 
                            className="h-10 w-10 text-red-600" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>

                    {/* Tiêu đề */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Xác nhận hủy đơn hàng
                    </h3>

                    {/* Thông tin đơn hàng */}
                    {selectedOrder && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-4 text-left">
                            <p className="text-sm text-gray-600 mb-2">
                                <span className="font-semibold">Đơn hàng:</span> #{selectedOrder.id}
                            </p>
                            <p className="text-sm text-gray-600 mb-2">
                                <span className="font-semibold">Tổng tiền:</span>{' '}
                                <span className="text-red-600 font-bold">
                                    {new Intl.NumberFormat('vi-VN', { 
                                        style: 'currency', 
                                        currency: 'VND' 
                                    }).format(selectedOrder.totalAmount)}
                                </span>
                            </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">Ngày đặt:</span>{' '}
                                {new Date(selectedOrder.createdAt).toLocaleString('vi-VN')}
                            </p>
                        </div>
                    )}

                    {/* Thông báo */}
                    <p className="text-gray-600 mb-4">
                        Bạn có chắc chắn muốn hủy đơn hàng này không? 
                        <br />
                        <span className="text-sm text-gray-500">
                            Hành động này không thể hoàn tác.
                        </span>
                    </p>

                    {/* Lý do hủy (tùy chọn) */}
                    <div className="mb-6 text-left">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Lý do hủy đơn (không bắt buộc)
                        </label>
                        <textarea
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                            placeholder="Nhập lý do hủy đơn hàng..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                            rows="3"
                        />
                    </div>

                    {/* Nút hành động */}
                    <div className="flex gap-3">
                        <button
                            onClick={closeCancelModal}
                            className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200 shadow-sm hover:shadow"
                        >
                            Không, giữ đơn hàng
                        </button>
                        <button
                            onClick={handleCancelOrder}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                            Có, hủy đơn hàng
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ProfilePage;