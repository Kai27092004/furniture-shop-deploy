import axios from 'axios';
// export const BACKEND_URL = 'http://localhost:8080';
// export const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
export const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const API = axios.create({
    baseURL: `${BACKEND_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Quan trọng: Interceptor để đính kèm token vào mỗi request
// Khi người dùng đăng nhập, ta lưu token vào localStorage
// Interceptor này sẽ tự động lấy token đó và gắn vào header Authorization
API.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.accessToken) {
            config.headers['Authorization'] = 'Bearer ' + user.accessToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Các hàm gọi API cụ thể
// --- Auth ---
export const login = (credentials) => API.post('/auth/login', credentials);
export const register = (userData) => API.post('/auth/register', userData);

// --- Products ---
export const fetchProducts = () => API.get('/products');
export const fetchProductById = (id) => API.get(`/products/${id}`);
export const createProduct = (productData) => API.post('/products', productData);
export const updateProduct = (id, productData) => API.put(`/products/${id}`, productData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const fetchProductsByCategory = (categoryId) => API.get(`/products?categoryId=${categoryId}`);

// --- Categories ---
export const fetchCategories = () => API.get('/categories');
export const createCategory = (categoryData) => API.post('/categories', categoryData);
export const updateCategory = (id, categoryData) => API.put(`/categories/${id}`, categoryData);
export const deleteCategory = (id) => API.delete(`/categories/${id}`);


// --- User Profile ---
// Hàm gọi API để lấy thông tin cá nhân của người dùng đang đăng nhập
export const fetchUserProfile = () => API.get('/users/profile');

// Hàm gọi API để lấy lịch sử đơn hàng của người dùng đang đăng nhập
export const fetchMyOrders = () => API.get('/users/my-orders');
export const createOrder = (orderData) => API.post('/orders', orderData);
// Hủy một đơn hàng
export const cancelOrder = (orderId) => API.post(`/orders/${orderId}/cancel`);
export const updateOrderStatus = (orderId, status) => API.put(`/orders/${orderId}/status`, { status });
// Poll order status (for payment webhook updates)
export const getOrderStatus = (orderId) => API.get(`/orders/${orderId}/status`);

// --- Admin: Orders ---
export const adminFetchAllOrders = () => API.get('/orders/admin/all');
export const adminFetchOrderDetails = (orderId) => API.get(`/orders/admin/${orderId}`);
export const adminUpdateOrderStatus = (orderId, status) => API.put(`/orders/admin/${orderId}/status`, { status });
export const adminDeleteOrder = (orderId) => API.delete(`/orders/admin/${orderId}`);

// --- Admin: Users ---
export const adminGetUserStats = () => API.get('/users/admin/stats');
export const adminGetAllUsers = (params = {}) => API.get('/users/admin/all', { params });
export const adminCreateUser = (userData) => API.post('/users/admin/create', userData);
export const adminUpdateUser = (id, userData) => API.put(`/users/admin/${id}`, userData);
export const adminDeleteUser = (id) => API.delete(`/users/admin/${id}`);

// --- Admin: Dashboard ---
export const getDashboardStats = () => API.get('/dashboard/stats');
export const getRevenueChartData = (year = 2025) => API.get(`/dashboard/revenue-chart?year=${year}`);
export const getOrderChartData = (year = 2025) => API.get(`/dashboard/order-chart?year=${year}`);

// --- Admin: Email Management ---
// Email Templates
export const getEmailTemplates = () => API.get('/email/templates');
export const getEmailTemplateById = (id) => API.get(`/email/templates/${id}`);
export const createEmailTemplate = (templateData) => API.post('/email/templates', templateData);
export const updateEmailTemplate = (id, templateData) => API.put(`/email/templates/${id}`, templateData);
export const deleteEmailTemplate = (id) => API.delete(`/email/templates/${id}`);

// Send Email
export const sendEmail = (emailData) => API.post('/email/send', emailData);
export const sendEmailToAllCustomers = (emailData) => API.post('/email/send-to-all-customers', emailData);

// Email Logs
export const getEmailLogs = (params) => API.get('/email/logs', { params });
export const getEmailStats = () => API.get('/email/stats');

export default API;