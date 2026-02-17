import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, Settings, LogOut, BookOpen, Layers } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { logout } = useAuth();

    const navItems = [
        { icon: Home, label: 'Dashboard', path: '/' },
        { icon: Layers, label: 'Schemes', path: '/schemes' },
        // { icon: BookOpen, label: 'My Subjects', path: '/subjects' }, // Future feature
        // { icon: User, label: 'Profile', path: '/profile' }, // Future feature
        // { icon: Settings, label: 'Settings', path: '/settings' }, // Future feature
    ];

    return (
        <div className="hidden md:flex flex-col w-64 h-screen bg-white/80 backdrop-blur-md border-r border-gray-200 fixed left-0 top-0 z-50">
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary-500/30">
                    K
                </div>
                <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600">
                    KTU PYQ
                </span>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
              ${isActive
                                ? 'bg-primary-50 text-primary-600 shadow-sm font-medium'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
            `}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-colors duration-300"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
