import React from 'react';
import { Search, Bell, Menu, BookOpen, LayoutDashboard, Settings, LogOut, User, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Button from './Button';

const Navbar = () => {
    const { currentUser, logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Schemes', path: '/schemes' },
        { name: 'Departments', path: '/departments' },
    ];

    return (
        <nav className="h-20 px-6 md:px-12 bg-white/80 backdrop-blur-2xl border-b border-gray-100 sticky top-0 z-50 flex items-center justify-between">
            {/* Logo & Brand */}
            <div className="flex items-center gap-8">
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary-200">
                        S
                    </div>
                    <span className="font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600 hidden sm:block">
                        Smart PYQ
                    </span>
                </Link>

                {/* Primary Nav Links */}
                <div className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) => `
                                px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300
                                ${isActive ? 'text-primary-600 bg-primary-50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}
                            `}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                    {isAdmin && (
                        <NavLink
                            to="/admin"
                            className={({ isActive }) => `
                                px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300
                                ${isActive ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 hover:text-indigo-600 hover:bg-indigo-50'}
                            `}
                        >
                            Admin
                        </NavLink>
                    )}
                </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
                {/* Search Bar - Hidden on small screens */}
                <div className="hidden md:flex items-center bg-gray-100/50 rounded-2xl px-4 py-2.5 w-64 border border-transparent focus-within:border-primary-200 focus-within:bg-white transition-all">
                    <Search size={16} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none ml-2 w-full text-xs text-gray-700 placeholder-gray-400 font-medium"
                    />
                </div>

                {currentUser ? (
                    <div className="flex items-center gap-4 pl-4 border-l border-gray-100">
                        <button className="p-2 text-gray-400 hover:text-primary-500 transition-colors relative hidden sm:block">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        <div className="flex items-center gap-3 group cursor-pointer relative py-2">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary-500 to-indigo-500 p-[2px]">
                                <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                                    <span className="font-bold text-sm text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-indigo-500">
                                        {currentUser?.name?.[0]?.toUpperCase() || 'U'}
                                    </span>
                                </div>
                            </div>

                            {/* Dropdown Menu (Simplified for now) */}
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-3xl shadow-2xl shadow-gray-200 border border-gray-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 rounded-2xl font-medium">
                                    <User size={16} /> Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 rounded-2xl font-medium"
                                >
                                    <LogOut size={16} /> Logout
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link to="/login" className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900">
                            Log in
                        </Link>
                        <Link to="/register">
                            <Button size="sm" className="rounded-xl px-6">Sign Up</Button>
                        </Link>
                    </div>
                )}

                <button className="lg:hidden p-2 text-gray-500 bg-gray-50 rounded-xl">
                    <Menu size={24} />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;

