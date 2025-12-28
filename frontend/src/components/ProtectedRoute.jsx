import React from 'react';
import { Navigate, useLocation } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth(); 
    const location = useLocation(); 

    // Nếu đang kiểm tra auth, không render gì cả (hoặc hiện spinner)
    if (loading) {
        return null; 
    }

    if (!isAuthenticated) {
        // Lưu lại trang người dùng định truy cập để chuyển hướng lại sau khi đăng nhập
        return <Navigate to="/login" state={{ from: location }} replace />; 
    }

    return children;
};

export default ProtectedRoute;