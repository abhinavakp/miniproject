import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', onClick, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.2)" }}
            className={`glass-card p-6 rounded-2xl transition-all duration-300 ${onClick ? 'cursor-pointer' : ''} ${className}`}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
};

export default Card;
