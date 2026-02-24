import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                                S
                            </div>
                            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600">
                                Smart PYQ
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Empowering KTU students with intelligent tools for exam preparation. Organize, analyze, and excel.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Linkedin, Github].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary-50 hover:text-primary-600 transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div>
                            <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Platform</h4>
                            <ul className="space-y-4 text-sm text-gray-500">
                                <li><Link to="/schemes" className="hover:text-primary-600 transition-colors">Schemes</Link></li>
                                <li><Link to="/departments" className="hover:text-primary-600 transition-colors">Departments</Link></li>
                                <li><Link to="/subjects" className="hover:text-primary-600 transition-colors">Subjects</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Resources</h4>
                            <ul className="space-y-4 text-sm text-gray-500">
                                <li><Link to="#" className="hover:text-primary-600 transition-colors">Exam Tips</Link></li>
                                <li><Link to="#" className="hover:text-primary-600 transition-colors">Syllabus</Link></li>
                                <li><Link to="#" className="hover:text-primary-600 transition-colors">AI Guide</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Company</h4>
                            <ul className="space-y-4 text-sm text-gray-500">
                                <li><Link to="#" className="hover:text-primary-600 transition-colors">About Us</Link></li>
                                <li><Link to="#" className="hover:text-primary-600 transition-colors">Contact</Link></li>
                                <li><Link to="/login" className="hover:text-primary-600 transition-colors">Admin Login</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Subscribe</h4>
                        <p className="text-gray-500 text-xs mb-4">Get the latest exam updates & predictions.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email"
                                className="flex-1 px-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary-500 transition-all"
                            />
                            <button className="p-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all">
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-100 flex flex-col md:row items-center justify-between gap-4">
                    <p className="text-xs text-gray-400">© 2024 Smart PYQ Organizer. All rights reserved.</p>
                    <div className="flex gap-6 text-xs text-gray-400">
                        <a href="#" className="hover:text-gray-900">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-900">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
