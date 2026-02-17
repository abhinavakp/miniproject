import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ toggleSidebar }) => {
    const { currentUser } = useAuth();

    return (
        <div className="h-16 px-6 bg-white/50 backdrop-blur-xl border-b border-white/20 sticky top-0 z-40 flex items-center justify-between">
            <button className="md:hidden p-2 text-gray-500" onClick={toggleSidebar}>
                <Menu size={24} />
            </button>

            {/* Search Bar - Hidden on mobile for now or collapsed */}
            <div className="hidden md:flex items-center bg-gray-100/50 rounded-full px-4 py-2 w-96 border border-transparent focus-within:border-primary-300 focus-within:bg-white transition-all">
                <Search size={18} className="text-gray-400" />
                <input
                    type="text"
                    placeholder="Search subjects, questions..."
                    className="bg-transparent border-none outline-none ml-2 w-full text-sm text-gray-700 placeholder-gray-400"
                />
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 text-gray-400 hover:text-primary-500 transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-gray-700">{currentUser?.username || 'Guest'}</p>
                        <p className="text-xs text-gray-400 capitalize">{currentUser?.role || 'Student'}</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[2px]">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                            <span className="font-bold text-xs text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">
                                {currentUser?.username?.[0]?.toUpperCase() || 'U'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
