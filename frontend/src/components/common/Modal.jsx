import React from 'react';

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }) => {
    if (!isOpen) {
        return null;
    }

    return (
        // Lớp phủ mờ toàn màn hình
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center"
            onClick={onClose} // Bấm ra ngoài để đóng modal
        >
            {/* Khung chứa nội dung modal */}
            <div 
                className={`bg-white rounded-lg shadow-xl w-full ${maxWidth} p-6 relative z-50`}
                onClick={e => e.stopPropagation()} // Ngăn việc bấm vào modal làm nó bị đóng
            >
                {/* Header của Modal */}
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-2xl font-semibold">{title}</h3>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
                    >
                        &times;
                    </button>
                </div>
                {/* Nội dung chính của Modal (chính là form của chúng ta) */}
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;