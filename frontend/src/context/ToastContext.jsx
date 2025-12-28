import React, { createContext, useContext, useCallback, useState, useMemo } from 'react';

const ToastContext = createContext(null);

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const remove = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const show = useCallback((message, options = {}) => {
        const id = Math.random().toString(36).slice(2);
        const toast = {
            id,
            message,
            type: options.type || 'success',
            duration: options.duration ?? 3000,
        };
        setToasts(prev => [...prev, toast]);
        if (toast.duration > 0) {
            setTimeout(() => remove(id), toast.duration);
        }
        return id;
    }, [remove]);

    const value = useMemo(() => ({ show, remove }), [show, remove]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            {/* Overlay + centered toast(s) */}
            {toasts.length > 0 && (
                <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 pointer-events-none">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="relative flex flex-col items-center gap-3 max-w-md w-full">
                        {toasts.map((t, index) => (
                            <div
                                key={t.id}
                                className={`flex items-center gap-4 px-8 py-6 rounded-2xl shadow-2xl border text-base font-medium bg-white pointer-events-auto transform transition-all duration-300 ${
                                    t.type === 'success' 
                                        ? 'border-green-200 bg-green-50' 
                                        : 'border-red-200 bg-red-50'
                                }`}
                                style={{
                                    animation: 'fadeInScale 0.4s ease-out',
                                    transform: `translateY(${index * 15}px)`,
                                }}
                                role="status"
                            >
                                <span className={`inline-flex h-12 w-12 items-center justify-center rounded-full flex-shrink-0 ${
                                    t.type === 'success' 
                                        ? 'bg-green-100 text-green-600' 
                                        : 'bg-red-100 text-red-600'
                                } text-2xl`}>
                                    {t.type === 'success' ? '✓' : '⚠️'}
                                </span>
                                <span className="text-gray-800 flex-1">{t.message}</span>
                                <button
                                    onClick={() => remove(t.id)}
                                    className="ml-2 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                                    aria-label="Đóng thông báo"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    );
};


