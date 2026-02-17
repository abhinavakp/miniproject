import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-gradient-to-r from-primary-500 to-indigo-600 text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50",
        secondary: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",
        outline: "border-2 border-primary-500 text-primary-600 hover:bg-primary-50",
        ghost: "text-gray-600 hover:bg-gray-100/50",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
