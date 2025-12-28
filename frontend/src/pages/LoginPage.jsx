import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch (err) {
            setError('Đăng nhập thất bại. Vui lòng kiểm tra lại email hoặc mật khẩu.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300 flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 20% 50%, #A25F4B 1px, transparent 1px), radial-gradient(circle at 80% 50%, #8B4A3A 1px, transparent 1px)`,
                    backgroundSize: '100px 100px'
                }}></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* Main Form Container */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                    {/* Header with gradient */}
                    <div className="bg-gradient-to-r from-[#A25F4B] to-[#8B4A3A] px-8 py-8 text-center">
                        <h1 className="text-3xl font-bold text-white">Đăng nhập</h1>
                        {/* ĐÃ XÓA: Dấu gạch dưới */}
                    </div>

                    {/* Form Content */}
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && <p className="bg-red-100 text-red-700 p-3 rounded-xl mb-4 text-center text-sm">{error}</p>}

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Email của bạn</label>
                                <div className="relative">
                                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <input
                                        type="email"
                                        placeholder="example@shopnk.com"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:border-[#A25F4B] focus:ring-2 focus:ring-[#A25F4B]/20 outline-none transition-all duration-200 placeholder-gray-400"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Nhập mật khẩu của bạn"
                                        className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:border-[#A25F4B] focus:ring-2 focus:ring-[#A25F4B]/20 outline-none transition-all duration-200 placeholder-gray-400"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#A25F4B] transition-colors duration-200">
                                        {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-[#A25F4B] to-[#8B4A3A] text-white font-semibold py-3 px-4 rounded-xl hover:from-[#8B4A3A] hover:to-[#7A3F2F] focus:outline-none focus:ring-2 focus:ring-[#A25F4B]/50 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none">
                                {isLoading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Đang đăng nhập...</span>
                                    </div>
                                ) : (
                                    'Đăng nhập ngay'
                                )}
                            </button>

                            {/* Divider */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Hoặc đăng nhập với</span>
                                </div>
                            </div>

                            {/* Google Login Button */}
                            <button
                                type="button"
                                onClick={() => {
                                    window.location.href = 'http://localhost:8080/api/auth/google';
                                }}
                                className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400/50 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                <span>Đăng nhập với Google</span>
                            </button>

                            <div className="text-center">
                                <span className="text-gray-600">Chưa có tài khoản? </span>
                                <Link to="/register" className="text-[#A25F4B] hover:text-[#8B4A3A] font-semibold hover:underline transition-colors duration-200">
                                    Đăng ký miễn phí
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;