import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductsByCategory } from '../services/api';
import ProductCard from '../components/ProductCard';

const ProductsByCategoryPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoryId } = useParams(); // Lấy categoryId từ URL

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true);
                const response = await fetchProductsByCategory(categoryId);
                setProducts(response.data);
            } catch (error) {
                console.error("Lỗi khi tải sản phẩm theo danh mục:", error);
            } finally {
                setLoading(false);
            }
        };
        getProducts();
    }, [categoryId]); // Chạy lại mỗi khi categoryId trên URL thay đổi

    if (loading) return <p className="text-center py-10">Đang tải sản phẩm...</p>;

    const categoryName = products.length > 0 ? products[0].category.name : '';

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 uppercase tracking-wider">
                    Danh Mục: {categoryName}
                </h1>
                <div className="mt-4 w-24 h-1 bg-gray-800 mx-auto"></div>
            </div>
            {products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">Không có sản phẩm nào trong danh mục này.</p>
            )}
        </div>
    );
};

export default ProductsByCategoryPage;