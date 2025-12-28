import React, { useState, useEffect } from 'react';

const ProductForm = ({ initialProduct, categories, onSubmit, onClose }) => {
    // State để lưu trữ dữ liệu của form
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stockQuantity: '',
        imageUrl: '',
        sku: '',
        dimensions: '',
        material: '',
        categoryId: ''
    });

    // useEffect sẽ chạy khi 'initialProduct' thay đổi
    // Nó dùng để điền dữ liệu vào form khi ở chế độ "sửa"
    useEffect(() => {
        if (initialProduct) {
            setFormData({
                name: initialProduct.name || '',
                description: initialProduct.description || '',
                price: initialProduct.price || '',
                stockQuantity: initialProduct.stockQuantity || '',
                imageUrl: initialProduct.imageUrl || '',
                sku: initialProduct.sku || '',
                dimensions: initialProduct.dimensions || '',
                material: initialProduct.material || '',
                categoryId: initialProduct.categoryId || ''
            });
        } else {
            // Reset form khi thêm mới
            setFormData({ name: '', description: '', price: '', stockQuantity: '', imageUrl: '', sku: '', dimensions: '', material: '', categoryId: '' });
        }
    }, [initialProduct]);

    // Hàm xử lý khi người dùng nhập liệu
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Hàm xử lý khi submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); // Gọi hàm onSubmit từ component cha và truyền dữ liệu form
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Các trường nhập liệu */}
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Tên sản phẩm" className="w-full p-2 border rounded" required />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Mô tả sản phẩm" className="w-full p-2 border rounded" required />
            <div className="grid grid-cols-2 gap-4">
                <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Giá" className="w-full p-2 border rounded" required />
                <input name="stockQuantity" type="number" value={formData.stockQuantity} onChange={handleChange} placeholder="Số lượng kho" className="w-full p-2 border rounded" required />
            </div>
            <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="URL Hình ảnh" className="w-full p-2 border rounded" required />
            <select name="categoryId" value={formData.categoryId} onChange={handleChange} className="w-full p-2 border rounded" required>
                <option value="">-- Chọn Danh Mục --</option>
                {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
            </select>
            <div className="grid grid-cols-2 gap-4">
                <input name="sku" value={formData.sku} onChange={handleChange} placeholder="SKU (Mã sản phẩm)" className="w-full p-2 border rounded" />
                <input name="dimensions" value={formData.dimensions} onChange={handleChange} placeholder="Kích thước" className="w-full p-2 border rounded" />
            </div>
            <input name="material" value={formData.material} onChange={handleChange} placeholder="Chất liệu" className="w-full p-2 border rounded" />
            
            {/* Nút submit và hủy */}
            <div className="flex justify-end space-x-4 pt-4">
                <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                    Hủy
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Lưu Thay Đổi
                </button>
            </div>
        </form>
    );
};

export default ProductForm;