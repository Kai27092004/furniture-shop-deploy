import React, { useState, useEffect } from 'react';
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { fetchProducts, deleteProduct, createProduct, updateProduct, fetchCategories, BACKEND_URL } from '../../services/api';
import Modal from '../../components/common/Modal';
import ProductForm from '../../components/admin/ProductForm';
import { useToast } from '../../context/ToastContext';

const ProductManagementPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // State cho tìm kiếm và lọc
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    
    // State cho Modal và Form
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null); // null: thêm mới, object: sửa
    
    // State cho Modal xác nhận xóa
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    
    // State cho Modal chi tiết sản phẩm
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    
    // State cho pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);
    
    // Toast hook
    const { show } = useToast();

    useEffect(() => {
        loadInitialData();
    }, []);

    // Effect để lọc sản phẩm khi searchTerm hoặc selectedCategory thay đổi
    useEffect(() => {
        filterProducts();
        setCurrentPage(1); // Reset về trang đầu khi lọc
    }, [products, searchTerm, selectedCategory]);

    const loadInitialData = async () => {
        try {
            setLoading(true);
            const [productsRes, categoriesRes] = await Promise.all([
                fetchProducts(),
                fetchCategories()
            ]);
            setProducts(productsRes.data);
            setCategories(categoriesRes.data);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
        } finally {
            setLoading(false);
        }
    };

    // Hàm lọc sản phẩm theo tên và danh mục
    const filterProducts = () => {
        let filtered = [...products];

        // Lọc theo tên sản phẩm
        if (searchTerm.trim()) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Lọc theo danh mục
        if (selectedCategory) {
            filtered = filtered.filter(product =>
                product.categoryId === parseInt(selectedCategory)
            );
        }

        setFilteredProducts(filtered);
    };

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Hàm xử lý thay đổi tìm kiếm
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Hàm xử lý thay đổi danh mục
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };
    
    const handleOpenModalForCreate = () => {
        setEditingProduct(null); // Đảm bảo form trống để thêm mới
        setIsModalOpen(true);
    };

    const handleOpenModalForEdit = (product) => {
        setEditingProduct(product); // Đặt sản phẩm cần sửa
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };
    
    const openDeleteConfirm = (product) => {
        setProductToDelete(product);
        setConfirmDeleteOpen(true);
    };

    const closeDeleteConfirm = () => {
        setConfirmDeleteOpen(false);
        setProductToDelete(null);
    };

    const handleConfirmDelete = async () => {
        if (!productToDelete) return;
        
        try {
            await deleteProduct(productToDelete.id);
            show('Xóa sản phẩm thành công!', { type: 'success' });
            loadInitialData();
            closeDeleteConfirm();
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
            show('Xóa sản phẩm thất bại.', { type: 'error' });
        }
    };
    
    const handleFormSubmit = async (formData) => {
        try {
            if (editingProduct) {
                // Chế độ sửa
                await updateProduct(editingProduct.id, formData);
                show('Cập nhật sản phẩm thành công!', { type: 'success' });
            } else {
                // Chế độ thêm mới
                await createProduct(formData);
                show('Thêm sản phẩm mới thành công!', { type: 'success' });
            }
            handleCloseModal();
            loadInitialData(); // Tải lại dữ liệu
        } catch (error) {
            console.error('Lỗi khi lưu sản phẩm:', error);
            show('Lưu sản phẩm thất bại.', { type: 'error' });
        }
    };

    const openProductDetail = (product) => {
        setSelectedProduct(product);
        setDetailModalOpen(true);
    };

    const closeProductDetail = () => {
        setDetailModalOpen(false);
        setSelectedProduct(null);
    };

    if (loading) return <p>Đang tải...</p>;

    return (
        <div className="container mx-auto">
            {/* Header */}
            <div className="bg-white p-4 rounded-lg shadow border mb-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Quản Lý Sản phẩm</h1>
                        <p className="text-sm text-gray-500">Thêm, sửa, xóa và quản lý các sản phẩm</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center">
                            <span className="mr-2">Hiển thị:</span>
                            <span className="text-blue-600 font-medium">{filteredProducts.length}</span>
                            <span className="mx-1">/</span>
                            <span className="text-gray-500">{products.length}</span>
                        </div>
                        <button 
                            onClick={handleOpenModalForCreate} 
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            + Thêm sản phẩm
                        </button>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white p-4 rounded-lg shadow border mb-6">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tìm kiếm
                        </label>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Tìm theo tên sản phẩm..."
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="lg:w-48">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Danh mục
                        </label>
                        <select
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <option value="">Tất cả danh mục</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden border">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Hình Ảnh
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tên Sản Phẩm
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Giá
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Số Lượng
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentProducts.length > 0 ? (
                                currentProducts.map(product => (
                                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {product.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img 
                                                src={`${BACKEND_URL}${product.imageUrl}`} 
                                                alt={product.name} 
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {product.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <span className="font-semibold">
                                                {new Intl.NumberFormat('vi-VN').format(product.price)} đ
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {product.stockQuantity}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                                            <div className="flex items-center gap-3 justify-center">
                                                <button
                                                    onClick={() => openProductDetail(product)}
                                                    title="Xem chi tiết"
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    <EyeIcon className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleOpenModalForEdit(product)}
                                                    title="Chỉnh sửa"
                                                    className="text-green-600 hover:text-green-800"
                                                >
                                                    <PencilSquareIcon className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => openDeleteConfirm(product)}
                                                    title="Xóa"
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                        {filteredProducts.length === 0 ? 'Không có sản phẩm nào' : 'Không tìm thấy sản phẩm phù hợp'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="bg-white px-4 py-3 flex items-center justify-center border-t border-gray-200 sm:px-6">
                        <div className="flex-1 flex justify-center sm:hidden">
                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Trước
                            </button>
                            <button
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Sau
                            </button>
                        </div>
                        <div className="hidden sm:flex w-full sm:items-center sm:justify-center">
                            <div>
                                <nav className="flex items-center gap-2">
                                    <button
                                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                        disabled={currentPage === 1}
                                        className="w-8 h-8 rounded-full border flex items-center justify-center text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        ‹
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`w-8 h-8 rounded-full border text-sm ${page === currentPage ? 'bg-indigo-600 border-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                        disabled={currentPage === totalPages}
                                        className="w-8 h-8 rounded-full border flex items-center justify-center text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        ›
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Modal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                title={editingProduct ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
            >
                <ProductForm 
                    initialProduct={editingProduct}
                    categories={categories}
                    onSubmit={handleFormSubmit}
                    onClose={handleCloseModal}
                />
            </Modal>

            {/* Modal xác nhận xóa sản phẩm */}
            <Modal 
                isOpen={confirmDeleteOpen} 
                onClose={closeDeleteConfirm} 
                title="Xác nhận xóa sản phẩm"
                maxWidth="max-w-md"
            >
                <div className="space-y-4">
                    <p className="text-gray-900">
                        Bạn có chắc chắn muốn xóa sản phẩm <span className="font-semibold">"{productToDelete?.name}"</span>?
                    </p>
                    <p className="text-sm text-gray-600">Hành động này không thể hoàn tác.</p>
                    <div className="flex items-center justify-end gap-3">
                        <button 
                            onClick={closeDeleteConfirm} 
                            className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            HỦY
                        </button>
                        <button 
                            onClick={handleConfirmDelete} 
                            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors"
                        >
                            XÁC NHẬN
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Modal chi tiết sản phẩm */}
            <Modal 
                isOpen={detailModalOpen} 
                onClose={closeProductDetail} 
                title="Chi tiết sản phẩm"
                maxWidth="max-w-4xl"
            >
                {selectedProduct && (
                    <div className="flex gap-6">
                        {/* Phần bên trái - Hình ảnh sản phẩm */}
                        <div className="flex-1 bg-gray-100 rounded-lg p-4">
                            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                                <img 
                                    src={`${BACKEND_URL}${selectedProduct.imageUrl}`} 
                                    alt={selectedProduct.name}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                        
                        {/* Phần bên phải - Thông tin sản phẩm */}
                        <div className="flex-1 space-y-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    {selectedProduct.name}
                                </h2>
                                <p className="text-sm text-blue-600 font-medium">
                                    ID: {selectedProduct.id}
                                </p>
                            </div>
                            
                            <div className="space-y-3">
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Danh mục:</span>
                                    <p className="text-lg font-bold text-gray-900">
                                        {categories.find(cat => cat.id === selectedProduct.categoryId)?.name || 'Chưa phân loại'}
                                    </p>
                                </div>
                                
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Mô tả:</span>
                                    <p className="text-lg font-bold text-gray-900">
                                        {selectedProduct.description || 'Chưa có mô tả'}
                                    </p>
                                </div>
                                
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Giá bán:</span>
                                    <p className="text-2xl font-bold text-blue-600">
                                        {new Intl.NumberFormat('vi-VN').format(selectedProduct.price)} đ
                                    </p>
                                </div>
                                
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Số lượng tồn kho:</span>
                                    <p className="text-lg font-bold text-gray-900">
                                        {selectedProduct.stockQuantity} sản phẩm
                                    </p>
                                </div>
                                
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Ngày tạo:</span>
                                    <p className="text-sm text-gray-600">
                                        {new Date(selectedProduct.createdAt).toLocaleDateString('vi-VN')}
                                    </p>
                                </div>
                                
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Cập nhật lần cuối:</span>
                                    <p className="text-sm text-gray-600">
                                        {new Date(selectedProduct.updatedAt).toLocaleDateString('vi-VN')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ProductManagementPage;