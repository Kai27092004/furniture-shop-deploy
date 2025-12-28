import React, { useState, useEffect } from 'react';
import { 
    ComposedChart, 
    Bar, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer,
    Area,
    AreaChart
} from 'recharts';
import { 
    CurrencyDollarIcon, 
    UsersIcon, 
    ShoppingBagIcon, 
    DocumentTextIcon,
    ArrowPathIcon,
    ExclamationTriangleIcon,
    SunIcon,
    MoonIcon,
    ChevronDownIcon
} from '@heroicons/react/24/outline';
import api from '../services/api';

const AdminDashboardPage = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0
    });
    const [revenueData, setRevenueData] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(2025);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [showYearDropdown, setShowYearDropdown] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [chartLoading, setChartLoading] = useState(false);

    // Fetch initial data
    useEffect(() => {
        fetchDashboardData();
    }, []);

    // Fetch chart data when year changes
    useEffect(() => {
        if (selectedYear) {
            fetchChartData();
        }
    }, [selectedYear]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showYearDropdown && !event.target.closest('.year-dropdown')) {
                setShowYearDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showYearDropdown]);

    const fetchDashboardData = async (isRefresh = false) => {
        try {
            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }
            setError(null);
            
            const [statsRes, revenueRes, orderRes] = await Promise.all([
                api.get('/dashboard/stats'),
                api.get(`/dashboard/revenue-chart?year=${selectedYear}`),
                api.get(`/dashboard/order-chart?year=${selectedYear}`)
            ]);

            if (statsRes.data.success) {
                setStats(statsRes.data.data);
            }
            if (revenueRes.data.success) {
                setRevenueData(revenueRes.data.data);
            }
            if (orderRes.data.success) {
                setOrderData(orderRes.data.data);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setError('Không thể tải dữ liệu dashboard. Vui lòng thử lại.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const fetchChartData = async () => {
        try {
            setChartLoading(true);
            setError(null);
            
            const [revenueRes, orderRes] = await Promise.all([
                api.get(`/dashboard/revenue-chart?year=${selectedYear}`),
                api.get(`/dashboard/order-chart?year=${selectedYear}`)
            ]);

            if (revenueRes.data.success) {
                setRevenueData(revenueRes.data.data);
            }
            if (orderRes.data.success) {
                setOrderData(orderRes.data.data);
            }
        } catch (error) {
            console.error('Error fetching chart data:', error);
            setError('Không thể tải dữ liệu biểu đồ. Vui lòng thử lại.');
        } finally {
            setChartLoading(false);
        }
    };

    const handleRefresh = () => {
        fetchDashboardData(true);
    };

    const handleYearChange = (year) => {
        setSelectedYear(year);
        setShowYearDropdown(false);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const statsCards = [
        {
            title: 'Doanh Thu',
            value: formatCurrency(stats.totalRevenue),
            icon: CurrencyDollarIcon,
            color: 'bg-purple-100',
            iconColor: 'bg-purple-500',
            textColor: 'text-purple-700',
            isRevenue: true
        },
        {
            title: 'Tổng Người Dùng',
            value: stats.totalUsers.toString(),
            icon: UsersIcon,
            color: 'bg-green-100',
            iconColor: 'bg-green-500',
            textColor: 'text-green-700'
        },
        {
            title: 'Tổng Sản Phẩm',
            value: stats.totalProducts.toString(),
            icon: ShoppingBagIcon,
            color: 'bg-blue-100',
            iconColor: 'bg-blue-500',
            textColor: 'text-blue-700'
        },
        {
            title: 'Tổng Đơn Hàng',
            value: stats.totalOrders.toString(),
            icon: DocumentTextIcon,
            color: 'bg-yellow-100',
            iconColor: 'bg-yellow-500',
            textColor: 'text-yellow-700'
        }
    ];

    if (loading) {
        return (
            <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                        Đang tải dữ liệu...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
            {/* Top notification bar */}
            <div className={`${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'} text-sm py-2 px-4 transition-colors duration-300`}>
                <div className="flex items-center justify-between">
                    <span>Chào mừng Admin! Đây là ghi chú về quản trị trang web.</span>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handleRefresh}
                            disabled={refreshing}
                            className={`p-2 rounded-full ${refreshing ? 'animate-spin' : ''}`}
                        >
                            <ArrowPathIcon className="h-4 w-4" />
                        </button>
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full"
                        >
                            {darkMode ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-4 sm:p-6 space-y-6">
                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3 animate-fadeIn">
                        <ExclamationTriangleIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
                        <div>
                            <p className="text-red-800 font-medium">Lỗi tải dữ liệu</p>
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                        <button
                            onClick={handleRefresh}
                            className="ml-auto text-red-600 hover:text-red-800 font-medium"
                        >
                            Thử lại
                        </button>
                    </div>
                )}

                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 sm:p-8 text-white">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2 animate-fadeInUp">
                        Chào mừng trở lại, Admin!
                    </h1>
                    <p className="text-lg sm:text-xl opacity-90 animate-fadeInUp animation-delay-200">
                        Đây là tổng quan hệ thống của bạn.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {statsCards.map((card, index) => (
                        <div 
                            key={index} 
                            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-md p-4 sm:p-6 animate-fadeInUp ${card.isRevenue ? 'min-h-[120px]' : ''}`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex items-start">
                                <div className={`${card.iconColor} rounded-full p-3 mr-4 flex-shrink-0`}>
                                    <card.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-xs sm:text-sm font-medium ${card.textColor} mb-1`}>
                                        {card.title}
                                    </p>
                                    <p className={`${card.isRevenue ? 'text-xs sm:text-sm lg:text-base xl:text-lg' : 'text-sm sm:text-lg lg:text-xl xl:text-2xl'} font-bold ${darkMode ? 'text-white' : 'text-gray-900'} leading-tight break-words`}>
                                        {card.value}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Year Selection */}
                <div className={`${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'} rounded-xl border shadow-sm p-4`}>
                    <div className="flex items-center justify-center space-x-3">
                        <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-xs sm:text-sm font-medium`}>
                            Xem thống kê theo năm:
                        </span>
                        <div className="relative year-dropdown">
                            <button
                                onClick={() => setShowYearDropdown(!showYearDropdown)}
                                className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-500 shadow-sm flex items-center space-x-1.5 min-w-[60px]`}
                            >
                                <span className="text-sm font-bold">{selectedYear}</span>
                                <ChevronDownIcon className={`h-3 w-3 transition-transform duration-200 ${showYearDropdown ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {showYearDropdown && (
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10 animate-fadeIn">
                                    {[2023, 2024, 2025, 2026].map((year) => (
                                        <button
                                            key={year}
                                            onClick={() => handleYearChange(year)}
                                            className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200 ${
                                                selectedYear === year 
                                                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' 
                                                    : 'text-gray-700 dark:text-gray-300'
                                            }`}
                                        >
                                            {year}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                    {/* Revenue Analysis Chart */}
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-md p-4 sm:p-6 animate-fadeInUp`}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                Phân tích doanh thu
                            </h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                    <div className="w-3 h-3 bg-purple-500 rounded"></div>
                                    <span>Doanh thu</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span>Tăng trưởng</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-64 sm:h-80">
                            {chartLoading ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-2"></div>
                                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            Đang tải dữ liệu...
                                        </p>
                                    </div>
                                </div>
                            ) : revenueData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={revenueData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                                        <XAxis 
                                            dataKey="month" 
                                            tick={{ fill: darkMode ? '#d1d5db' : '#6b7280', fontSize: 12 }}
                                            axisLine={{ stroke: darkMode ? '#374151' : '#e5e7eb' }}
                                        />
                                        <YAxis 
                                            yAxisId="revenue" 
                                            orientation="left" 
                                            tick={{ fill: darkMode ? '#d1d5db' : '#6b7280', fontSize: 12 }}
                                            axisLine={{ stroke: darkMode ? '#374151' : '#e5e7eb' }}
                                        />
                                        <YAxis 
                                            yAxisId="growth" 
                                            orientation="right" 
                                            tick={{ fill: darkMode ? '#d1d5db' : '#6b7280', fontSize: 12 }}
                                            axisLine={{ stroke: darkMode ? '#374151' : '#e5e7eb' }}
                                        />
                                        <Tooltip 
                                            contentStyle={{
                                                backgroundColor: darkMode ? '#374151' : '#ffffff',
                                                border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
                                                borderRadius: '8px',
                                                color: darkMode ? '#ffffff' : '#000000'
                                            }}
                                            formatter={(value, name) => [
                                                name === 'revenue' ? formatCurrency(value) : `${value}%`,
                                                name === 'revenue' ? 'Doanh thu' : 'Tăng trưởng'
                                            ]}
                                        />
                                        <Bar 
                                            yAxisId="revenue" 
                                            dataKey="revenue" 
                                            fill="#7C3AED" 
                                            name="Doanh thu"
                                            radius={[4, 4, 0, 0]}
                                        />
                                        <Line 
                                            yAxisId="growth" 
                                            type="monotone" 
                                            dataKey="growth" 
                                            stroke="#10B981" 
                                            strokeWidth={3}
                                            name="Tăng trưởng"
                                            dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                                            activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
                                        />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-center">
                                        <div className="animate-pulse-slow w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
                                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            Đang tải dữ liệu biểu đồ...
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Statistics Chart */}
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-md p-4 sm:p-6 animate-fadeInUp`}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                Thống kê đơn hàng
                            </h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                    <div className="w-3 h-3 bg-orange-500 rounded"></div>
                                    <span>Số đơn hàng</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-64 sm:h-80">
                            {chartLoading ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
                                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            Đang tải dữ liệu...
                                        </p>
                                    </div>
                                </div>
                            ) : orderData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={orderData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                                        <XAxis 
                                            dataKey="month" 
                                            tick={{ fill: darkMode ? '#d1d5db' : '#6b7280', fontSize: 12 }}
                                            axisLine={{ stroke: darkMode ? '#374151' : '#e5e7eb' }}
                                        />
                                        <YAxis 
                                            tick={{ fill: darkMode ? '#d1d5db' : '#6b7280', fontSize: 12 }}
                                            axisLine={{ stroke: darkMode ? '#374151' : '#e5e7eb' }}
                                        />
                                        <Tooltip 
                                            contentStyle={{
                                                backgroundColor: darkMode ? '#374151' : '#ffffff',
                                                border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
                                                borderRadius: '8px',
                                                color: darkMode ? '#ffffff' : '#000000'
                                            }}
                                            formatter={(value) => [value, 'Số đơn hàng']}
                                        />
                                        <Area 
                                            type="monotone" 
                                            dataKey="orders" 
                                            stroke="#FB923C" 
                                            fill="#FB923C" 
                                            fillOpacity={0.3}
                                            name="Số đơn hàng"
                                            strokeWidth={3}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-center">
                                        <div className="animate-pulse-slow w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
                                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            Đang tải dữ liệu biểu đồ...
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;