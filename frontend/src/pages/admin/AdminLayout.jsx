import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  TagIcon,
  UserGroupIcon,
  EnvelopeIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from '../../context/AuthContext'; // Sửa lại đường dẫn và hook cho đúng

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default to open on desktop
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navLinkClass = (isActive) =>
    `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
      isActive
        ? "bg-indigo-100 text-indigo-900"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    }`;

  const navigation = [
    { name: "Trang Quản Trị", href: "/admin/dashboard", icon: HomeIcon },
    { name: "Quản lý Đơn hàng", href: "/admin/orders", icon: ClipboardDocumentListIcon },
    { name: "Quản lý Sản phẩm", href: "/admin/products", icon: ShoppingBagIcon },
    { name: "Quản lý Danh mục", href: "/admin/categories", icon: TagIcon },
    { name: "Quản lý Người dùng", href: "/admin/users", icon: UserGroupIcon },
    { name: "Quản lý Email", href: "/admin/email", icon: EnvelopeIcon },
  ];

  const SidebarContent = () => (
    <>
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
        <button
          type="button"
          className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
          onClick={() => setSidebarOpen(false)}
          title="Đóng Admin Panel"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      <nav className="mt-5 px-2 flex-1">
        <div className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === '/admin/dashboard'}
              className={({ isActive }) => navLinkClass(isActive)}
              onClick={() => {
                if (window.innerWidth < 768) { // Đóng sidebar trên mobile khi click
                  setSidebarOpen(false);
                }
              }}
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive ? "text-indigo-500" : "text-gray-400"
                    }`}
                  />
                  {item.name}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );

  return (
    <div className="relative min-h-screen md:flex bg-gray-50">
      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black opacity-30 z-20 md:hidden" onClick={() => setSidebarOpen(false)}></div>}

      {/* Sidebar */}
      <aside className={`bg-white shadow-xl w-64 fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:transform-none transition-transform duration-200 ease-in-out z-30 flex flex-col ${!sidebarOpen ? 'md:hidden' : ''}`}>
        <SidebarContent />
      </aside>

      {/* Main content */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ${sidebarOpen ? 'md:ml-0' : 'md:ml-0'}`}>
        {/* Header */}
        <header className="flex h-16 items-center justify-between bg-white px-4 shadow-sm border-b border-gray-200">
          <div className="flex items-center">
            <button
              type="button"
              className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 mr-4"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              title={sidebarOpen ? "Đóng Admin Panel" : "Mở Admin Panel"}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          </div>

          <div className="flex items-center space-x-4">
            <button className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
              <BellIcon className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-4">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-gray-900">{user?.fullName || 'Admin'}</p>
                <p className="text-xs text-gray-500">{user?.email || 'admin@email.com'}</p>
              </div>
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Admin"
              />
              <button
                onClick={handleLogout}
                className="rounded-full p-2 text-gray-400 hover:bg-red-100 hover:text-red-500"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-[#E7D2F9] py-3 sm:py-4">
          <div className="container mx-auto px-4 text-center text-gray-600 text-xs sm:text-sm">
            © 2025 SHOPNK. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;