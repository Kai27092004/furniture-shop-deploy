import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// Hàm hỗ trợ: lấy giỏ hàng từ localStorage
const getInitialCart = () => {
    try {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
        console.error("Could not parse cart from localStorage", error);
        return [];
    }
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(getInitialCart);

    // Lưu giỏ hàng vào localStorage mỗi khi nó thay đổi
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        const safeQty = Math.max(1, Number(quantity) || 1);
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + safeQty } : item
                );
            }
            return [...prevItems, { ...product, quantity: safeQty }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        const newQuantity = Math.max(1, quantity); // Đảm bảo số lượng ít nhất là 1
        setCartItems(prevItems => prevItems.map(item =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
        ));
    };
    const clearCart = () => {
        setCartItems([]);
    };

    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartItemCount,
        cartTotal,
        clearCart 
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};