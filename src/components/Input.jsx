import React from 'react';

const Input = ({ label, type = 'text', placeholder, value, onChange, icon: Icon, className = '' }) => {
    return (
        <div className={`w-full ${className}`}>
            {label && <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">{label}</label>}
            <div className="relative group">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
                        <Icon size={20} />
                    </div>
                )}
                <input
                    type={type}
                    className={`w-full bg-white/50 backdrop-blur-sm border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 block ${Icon ? 'pl-11' : 'pl-4'} p-3.5 transition-all duration-300 shadow-sm hover:bg-white/80`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

export default Input;
