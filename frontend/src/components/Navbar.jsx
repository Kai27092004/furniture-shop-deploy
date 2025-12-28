import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { fetchCategories } from '../services/api';
import { FiShoppingCart, FiMenu, FiX, FiChevronDown, FiUser, FiLogIn } from 'react-icons/fi';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const { cartItemCount } = useCart();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileProductDropdownOpen, setIsMobileProductDropdownOpen] = useState(false);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const res = await fetchCategories();
                setCategories(res.data);
            } catch (error) {
                console.error("Lỗi khi tải danh mục:", error);
            }
        };
        loadCategories();
    }, []);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        navigate('/');
    };

    const handleMobileLinkClick = () => {
        setIsMenuOpen(false);
    };

    const navLinkClass = ({ isActive }) =>
        `flex items-center px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200 ${
            isActive
                ? 'text-[#A25F4B] bg-[#A25F4B]/10'
                : 'text-gray-700 hover:text-[#A25F4B] hover:bg-[#A25F4B]/5'
        }`;

    const mobileNavLinkClass = ({ isActive }) =>
        `w-full text-left px-3 py-3 rounded-md text-lg font-medium transition-colors duration-200 block ${
          isActive
            ? 'text-[#A25F4B] bg-[#A25F4B]/10'
            : 'text-gray-700 hover:text-[#A25F4B] hover:bg-[#A25F4B]/5'
        }`;

    const mainNavLinks = [
        { path: '/', name: 'Trang Chủ' },
        { path: '/products', name: 'Sản Phẩm', hasDropdown: true },
        { path: '/news', name: 'Tin tức' },
        { path: '/contact', name: 'Liên hệ' }
    ];

    return (
        <nav className="sticky top-0 z-50 bg-gradient-to-b from-[#f9f8f4] to-[#f5f4f0] shadow-lg border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0" onClick={handleMobileLinkClick}>
                        <div className="group">
                            <div className="uppercase text-3xl font-bold tracking-wide cursor-pointer px-4 py-2 rounded-xl border-2 border-transparent hover:border-[#A25F4B]/20 hover:bg-white/60 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 ease-out hover:scale-105">
                                <span className="text-black group-hover:text-[#A25F4B] transition-colors duration-300">SHOP</span>
                                <span className="text-[#A25F4B] transition-colors duration-300">NK</span>
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {mainNavLinks.map((item) => (
                                <div key={item.name} className="relative group">
                                    <NavLink to={item.path} className={navLinkClass} end={item.path === '/'}>
                                        {item.name}
                                        {item.hasDropdown && (
                                            <FiChevronDown className="ml-1 h-5 w-5 group-hover:rotate-180 transition-transform duration-200" />
                                        )}
                                    </NavLink>

                                    {item.hasDropdown && (
                                        <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                                            <div className="py-1">
                                                {categories.map(category => (
                                                    <Link
                                                        key={category.id}
                                                        to={`/category/${category.id}`}
                                                        className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100 hover:text-[#A25F4B] transition-colors duration-200"
                                                    >
                                                        {category.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Menu - Desktop */}
                    <div className="hidden lg:flex items-center space-x-3">
                        {isAuthenticated ? (
                            <>
                                <NavLink to="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-[#A25F4B] font-medium text-base transition-all duration-200 hover:bg-[#A25F4B]/5 px-3 py-2 rounded-lg group">
                                    <FiUser className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                                    <span className="max-w-24 truncate">{user?.name || 'Hồ Sơ'}</span>
                                </NavLink>
                                <button onClick={handleLogout} className="flex items-center space-x-2 bg-red-500 text-black font-bold text-base px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-200">
                                    <FiLogIn className="h-5 w-5" />
                                    <span>Đăng Xuất</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="flex items-center space-x-2 text-gray-700 hover:text-[#A25F4B] font-medium text-base transition-all duration-200 hover:bg-[#A25F4B]/5 px-3 py-2 rounded-lg group">
                                    <FiLogIn className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                                    <span>Đăng Nhập</span>
                                </Link>
                                <Link to="/register" className="bg-gradient-to-r from-[#A25F4B] to-[#8B4A3A] text-white hover:from-[#8B4A3A] hover:to-[#6B3A2A] font-semibold text-base px-5 py-2 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:-translate-y-0.5">
                                    <span>Đăng ký miễn phí</span>
                                </Link>
                            </>
                        )}

                        <div className="relative ml-2">
                            <Link to="/cart" className="block p-2.5 text-gray-700 hover:text-[#A25F4B] hover:bg-[#A25F4B]/10 rounded-full transition-all duration-200 group">
                                <FiShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg animate-bounce">
                                        {cartItemCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-700 hover:text-[#A25F4B] hover:bg-[#A25F4B]/10 rounded-md transition-colors duration-200">
                            {isMenuOpen ? <FiX className="h-7 w-7" /> : <FiMenu className="h-7 w-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-sm border-t border-gray-200">
                    {mainNavLinks.map((item) => (
                        <div key={item.name} className="block">
                            {!item.hasDropdown ? (
                                <NavLink to={item.path} className={mobileNavLinkClass} onClick={handleMobileLinkClick} end={item.path === '/'}>
                                    {item.name}
                                </NavLink>
                            ) : (
                                <div>
                                    <button onClick={() => setIsMobileProductDropdownOpen(!isMobileProductDropdownOpen)} className={`${mobileNavLinkClass({isActive: false})} w-full`}>
                                        <div className="flex items-center justify-between">
                                            {item.name}
                                            <FiChevronDown className={`h-5 w-5 transition-transform duration-200 ${isMobileProductDropdownOpen ? 'rotate-180' : ''}`} />
                                        </div>
                                    </button>
                                    {isMobileProductDropdownOpen && (
                                        <div className="ml-4 mt-1 space-y-1">
                                            {categories.map(category => (
                                                <Link key={category.id} to={`/category/${category.id}`} onClick={handleMobileLinkClick} className="block px-3 py-2 text-base text-gray-600 hover:text-[#A25F4B] hover:bg-[#A25F4B]/5 rounded">
                                                    {category.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}

                    <hr className="my-3 border-gray-300" />

                    {isAuthenticated ? (
                        <>
                            <NavLink to="/profile" onClick={handleMobileLinkClick} className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-[#A25F4B] hover:bg-[#A25F4B]/5 font-medium text-base transition-all duration-200 rounded-lg group">
                                <FiUser className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                                <span className="truncate">{user?.name || 'Hồ Sơ'}</span>
                            </NavLink>
                             <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 bg-red-500 text-black font-bold text-base rounded-md hover:bg-red-600 transition-all duration-200 group">
                                <FiLogIn className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                                <span>Đăng Xuất</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" onClick={handleMobileLinkClick} className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-[#A25F4B] hover:bg-[#A25F4B]/5 font-medium text-base transition-all duration-200 rounded-lg group">
                                <FiLogIn className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                                <span>Đăng Nhập</span>
                            </NavLink>
                            <Link to="/register" onClick={handleMobileLinkClick} className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-[#A25F4B] to-[#8B4A3A] text-white hover:from-[#8B4A3A] hover:to-[#6B3A2A] font-semibold text-base px-4 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                                <span>Đăng ký miễn phí</span>
                            </Link>
                        </>
                    )}

                    <NavLink to="/cart" onClick={handleMobileLinkClick} className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-[#A25F4B] hover:bg-[#A25F4B]/5 font-medium text-base transition-all duration-200 rounded-lg group">
                        <div className="relative">
                            <FiShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold shadow-lg animate-bounce">
                                    {cartItemCount}
                                </span>
                            )}
                        </div>
                        <span>Giỏ hàng</span>
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;