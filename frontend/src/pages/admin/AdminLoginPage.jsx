import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 


const AdminLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Thêm state cho trạng thái loading
    const { login, logout } = useAuth(); 
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/admin";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true); // Bắt đầu loading
        try {
            const userData = await login(email, password);
            if (userData.role !== 'admin') {
                setError('Tài khoản của bạn không có quyền quản trị.');
                logout(); 
                return;
            }
            navigate(from, { replace: true });
        } catch (err) {
            setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
        } finally {
            setIsLoading(false); // Kết thúc loading
        }
    };
    
    return (
        <div className="bg-sky-100 flex justify-center items-center h-screen">
            <div className="w-1/2 h-screen hidden lg:block">
                <img src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826" alt="Login Admin" className="object-cover w-full h-full" />
            </div>
            <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <h1 className="text-2xl font-semibold mb-4">Đăng Nhập Quản Trị</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 bg-sky-100">
                        <label htmlFor="email" className="block text-gray-600">Email</label>
                        <input 
                            type="email"
                            id="email"
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-800">Password</label>
                        <input 
                            type="password"
                            id="password"
                            required
                            minLength="6"
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
                    
                    {/* THAY THẾ: Sử dụng button thường với đầy đủ style và logic loading */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-[#A25F4B] to-[#8B4A3A] text-white font-semibold py-3 px-4 rounded-md hover:from-[#8B4A3A] hover:to-[#7A3F2F] focus:outline-none focus:ring-2 focus:ring-[#A25F4B]/50 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Đang xử lý...</span>
                            </div>
                        ) : (
                            'Đăng Nhập'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginPage;