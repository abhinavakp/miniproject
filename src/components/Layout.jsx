import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />

            <main className="flex-1 px-6 py-8 md:px-12 md:py-16">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
