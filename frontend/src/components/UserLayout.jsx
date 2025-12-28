import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const UserLayout = () => {
    return (
        <div>
            <Navbar />
            <main className="container mx-auto p-6">
                {/* Outlet là nơi các component con (HomePage, ProductListPage,...) sẽ được render */}
                <Outlet />
            </main>
        </div>
    );
};

export default UserLayout;