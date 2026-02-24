import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, FileText, Shield, Zap, ArrowRight, ChevronRight, BarChart3, Database } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const Home = () => {
    const features = [
        {
            icon: Sparkles,
            title: "Smart AI Assistant",
            desc: "Analyze your PDFs to find repeated questions, important topics, and module-wise weightage instantly.",
            color: "text-purple-600",
            bg: "bg-purple-50"
        },
        {
            icon: Database,
            title: "Universal Repository",
            desc: "Access question papers from 2019 and 2024 schemes across all engineering departments.",
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            icon: Zap,
            title: "Exam Predictions",
            desc: "Our AI model predicts the most probable questions for upcoming exams based on historical trends.",
            color: "text-amber-600",
            bg: "bg-amber-50"
        }
    ];

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-sm font-bold tracking-widest uppercase mb-6 border border-primary-100">
                                Powered by KTU API & OpenAI
                            </span>
                            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-8">
                                Master Your Exams with <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-indigo-600 to-purple-600">Smart PYQ</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
                                The ultimate organizer and AI analysis tool for KTU previous year question papers. Stay ahead with data-driven preparation.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link to="/schemes">
                                    <Button size="lg" className="px-10 py-4 text-lg rounded-2xl shadow-2xl shadow-primary-200 group">
                                        Get Started Free
                                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                                <a href="#features">
                                    <button className="px-10 py-4 text-lg font-bold text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2">
                                        Explore Features
                                        <ChevronRight size={20} />
                                    </button>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 opacity-20 pointer-events-none">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-primary-300 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-300 rounded-full blur-[120px]"></div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Excel</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">Designed for students, powered by intelligence. Our platform simplifies KTU preparation like never before.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((f, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-8 rounded-[40px] bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-2xl hover:shadow-gray-200 transition-all group"
                            >
                                <div className={`w-16 h-16 rounded-3xl ${f.bg} ${f.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <f.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{f.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AI Highlight Section */}
            <section className="py-24 bg-gray-900 relative overflow-hidden text-center md:text-left">
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-primary-400 font-bold tracking-widest uppercase text-sm mb-4 block">New AI Tools</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                            Stop Guessing, <br />
                            <span className="text-primary-400">Start Predicting.</span>
                        </h2>
                        <div className="space-y-6">
                            {[
                                "PDF Question Extraction",
                                "Repeated Topic Detection",
                                "Module-wise Mark Distribution",
                                "Exam-Ready Summary Generation"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 text-gray-300">
                                    <div className="w-6 h-6 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center flex-shrink-0">
                                        <ChevronRight size={14} />
                                    </div>
                                    <span className="text-lg font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                        <Link to="/schemes" className="inline-block mt-12">
                            <button className="bg-primary-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary-700 transition-all flex items-center gap-3">
                                Try AI Assistant <Sparkles size={18} />
                            </button>
                        </Link>
                    </div>
                    <div className="relative">
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 p-8 rounded-[40px] shadow-3xl text-left">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-4 w-3/4 bg-gray-700 rounded-full animate-pulse"></div>
                                <div className="h-4 w-1/2 bg-gray-700 rounded-full animate-pulse"></div>
                                <div className="h-20 w-full bg-primary-500/10 border border-primary-500/20 rounded-2xl flex items-center justify-center text-primary-400 text-sm font-bold">
                                    AI ANALYSIS IN PROGRESS...
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-24 bg-gray-800 border border-gray-700 rounded-2xl p-4">
                                        <p className="text-[10px] text-gray-500 uppercase mb-2">Repeated Qs</p>
                                        <p className="text-xl font-bold text-white">85% Match</p>
                                    </div>
                                    <div className="h-24 bg-gray-800 border border-gray-700 rounded-2xl p-4">
                                        <p className="text-[10px] text-gray-500 uppercase mb-2">Difficulty</p>
                                        <p className="text-xl font-bold text-amber-500">Medium</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Background glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary-600/20 blur-[100px] -z-10"></div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
