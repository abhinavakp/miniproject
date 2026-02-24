import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        const success = await login(email, password);
        if (success) {
            navigate('/schemes');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
            <div className="w-full max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50"
                >
                    <div className="p-8 md:p-10">
                        <div className="text-center mb-10">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-primary-500/30">
                                <span className="text-white text-3xl font-bold">K</span>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                            <p className="text-gray-500">Sign in to access KTU resources</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            {error && (
                                <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg text-center border border-red-100">
                                    {error}
                                </div>
                            )}

                            <Input
                                label="Email Address"
                                placeholder="Enter your email"
                                icon={Mail}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Input
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                icon={Lock}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <div className="flex justify-end">
                                <a href="#" className="text-sm text-primary-600 hover:text-primary-700 font-medium">Forgot password?</a>
                            </div>

                            <Button type="submit" className="w-full group">
                                Sign In
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </form>
                    </div>

                    <div className="px-8 py-6 bg-gray-50/50 text-center border-t border-gray-100">
                        <p className="text-gray-500 text-sm">
                            Don't have an account? <Link to="/register" className="text-primary-600 font-bold hover:underline">Sign up</Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
