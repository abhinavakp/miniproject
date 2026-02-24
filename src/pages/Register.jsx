import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import { User, Mail, Lock, ArrowRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const success = await register(formData.name, formData.username, formData.password);
            if (success) {
                navigate('/schemes');
            } else {
                setError('Registration failed. Please try again.');
            }
        } catch (err) {
            setError('An error occurred during registration.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
            <div className="w-full max-w-md">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50"
                >
                    <div className="p-8 md:p-10">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-primary-500 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/30">
                                <Shield className="text-white" size={32} />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                            <p className="text-gray-500">Join Smart KTU PYQ Organizer</p>
                        </div>

                        <form onSubmit={handleRegister} className="space-y-4">
                            {error && (
                                <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg text-center border border-red-100 italic">
                                    {error}
                                </div>
                            )}

                            <Input
                                label="Full Name"
                                name="name"
                                placeholder="Enter Full Name"
                                icon={User}
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />

                            <Input
                                label="Username"
                                name="username"
                                type="text"
                                placeholder="Choose a username"
                                icon={Mail}
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                            />

                            <Input
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                icon={Lock}
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />

                            <Input
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                icon={Shield}
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                            />

                            <Button type="submit" className="w-full group mt-6" disabled={loading}>
                                {loading ? 'Creating Account...' : 'Sign Up'}
                                {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                            </Button>
                        </form>
                    </div>

                    <div className="px-8 py-6 bg-gray-50/50 text-center border-t border-gray-100">
                        <p className="text-gray-500 text-sm">
                            Already have an account? <Link to="/login" className="text-primary-600 font-bold hover:underline">Log in</Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
