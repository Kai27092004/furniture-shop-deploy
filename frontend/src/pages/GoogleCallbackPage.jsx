import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GoogleCallbackPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setUser } = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');
        const userId = searchParams.get('userId');
        const name = searchParams.get('name');
        const email = searchParams.get('email');
        const role = searchParams.get('role');
        const avatar = searchParams.get('avatar');
        const error = searchParams.get('error');

        if (error) {
            // Xử lý lỗi
            console.error('Google Auth Error:', error);
            navigate('/login', { 
                state: { 
                    error: 'Đăng nhập Google thất bại. Vui lòng thử lại.' 
                } 
            });
            return;
        }

        if (token && userId) {
            // Lưu thông tin user vào localStorage và context
            const userData = {
                id: parseInt(userId),
                fullName: decodeURIComponent(name || ''),
                name: decodeURIComponent(name || ''),
                email: decodeURIComponent(email || ''),
                role: role || 'customer',
                avatar: avatar ? decodeURIComponent(avatar) : null,
                accessToken: token
            };

            localStorage.setItem('user', JSON.stringify(userData));
            
            // Cập nhật context (nếu có hàm setUser)
            if (setUser) {
                setUser(userData);
            }

            // Chuyển về trang chủ
            setTimeout(() => {
                navigate('/', { replace: true });
            }, 500);
        } else {
            navigate('/login', { 
                state: { 
                    error: 'Thông tin đăng nhập không hợp lệ.' 
                } 
            });
        }
    }, [searchParams, navigate, setUser]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
                <div className="mb-4">
                    <div className="inline-block">
                        <svg className="animate-spin h-12 w-12 text-[#A25F4B]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Đang đăng nhập...</h2>
                <p className="text-gray-600">Vui lòng chờ trong giây lát</p>
            </div>
        </div>
    );
};

export default GoogleCallbackPage;
