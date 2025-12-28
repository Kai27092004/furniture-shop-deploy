import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const GuidePage = ({ title, children, breadcrumbs = [] }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Breadcrumbs */}
            {breadcrumbs.length > 0 && (
              <nav className="mb-4">
                <ol className="flex items-center space-x-2 text-sm text-gray-500">
                  <li>
                    <Link to="/" className="hover:text-amber-600 transition-colors">
                      Trang chủ
                    </Link>
                  </li>
                  {breadcrumbs.map((crumb, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mx-2">/</span>
                      {crumb.href ? (
                        <Link to={crumb.href} className="hover:text-amber-600 transition-colors">
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className="text-gray-800 font-medium">{crumb.label}</span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {title}
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"></div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <div className="prose prose-lg max-w-none">
            {children}
          </div>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
        aria-label="Lên đầu trang"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </div>
  );
};

export default GuidePage;
