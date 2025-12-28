import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as loginService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        try {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) {
                setUser(storedUser);
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            // Nếu có lỗi, đảm bảo user là null
            setUser(null);
            localStorage.removeItem('user');
        } finally {
            // Dù thành công hay thất bại, cũng phải kết thúc loading
            setLoading(false); 
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await loginService({ email, password });
            const userData = response.data;
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return userData;
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const value = { user, setUser, login, logout, isAuthenticated: !!user, loading }; 

    return (
        <AuthContext.Provider value={value}>
            {/* Chỉ render các component con khi không còn loading */}
            {!loading && children} 
        </AuthContext.Provider>
    );
};