import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu xác nhận không khớp.');
            return;
        }

        setIsLoading(true);
        try {
            await register({
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password
            });
            setSuccess('Đăng ký thành công! Đang chuyển đến trang đăng nhập...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.';
            setError(errorMessage);
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
                        <h1 className="text-3xl font-bold text-white">Đăng ký miễn phí</h1>
                    </div>

                    {/* Form Content */}
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && <p className="bg-red-100 text-red-700 p-3 rounded-xl text-center text-sm">{error}</p>}
                            {success && <p className="bg-green-100 text-green-700 p-3 rounded-xl text-center text-sm">{success}</p>}

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
                                <div className="relative">
                                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Nguyễn Văn A" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:border-[#A25F4B] focus:ring-2 focus:ring-[#A25F4B]/20 outline-none transition-all duration-200 placeholder-gray-400" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <div className="relative">
                                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@shopnk.com" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:border-[#A25F4B] focus:ring-2 focus:ring-[#A25F4B]/20 outline-none transition-all duration-200 placeholder-gray-400" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="Tối thiểu 8 ký tự" className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:border-[#A25F4B] focus:ring-2 focus:ring-[#A25F4B]/20 outline-none transition-all duration-200 placeholder-gray-400" required minLength="8" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#A25F4B] transition-colors duration-200">
                                        {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Nhập lại mật khẩu" className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:border-[#A25F4B] focus:ring-2 focus:ring-[#A25F4B]/20 outline-none transition-all duration-200 placeholder-gray-400" required />
                                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#A25F4B] transition-colors duration-200">
                                        {showConfirmPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" disabled={isLoading || !!success} className="w-full bg-gradient-to-r from-[#A25F4B] to-[#8B4A3A] text-white font-semibold py-3 px-4 rounded-xl hover:from-[#8B4A3A] hover:to-[#7A3F2F] focus:outline-none focus:ring-2 focus:ring-[#A25F4B]/50 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none">
                                {isLoading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Đang tạo tài khoản...</span>
                                    </div>
                                ) : (
                                    'Tạo tài khoản'
                                )}
                            </button>

                            <div className="text-center">
                                <span className="text-gray-600">Đã có tài khoản? </span>
                                <Link to="/login" className="text-[#A25F4B] hover:text-[#8B4A3A] font-semibold hover:underline transition-colors duration-200">
                                    Đăng nhập ngay
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;