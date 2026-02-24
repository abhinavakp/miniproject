import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, FileText, Sparkles, Download, TrendingUp, Clock } from 'lucide-react';

const AdminDashboard = () => {
    // Mock data for analytics
    const stats = [
        { label: 'Total Users', value: '1,280', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'PYQs Uploaded', value: '450', icon: FileText, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'AI Requests', value: '8,420', icon: Sparkles, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Downloads', value: '12.5k', icon: Download, color: 'text-primary-600', bg: 'bg-primary-50' },
    ];

    const aiUsageData = [
        { name: 'Monday', requests: 400 },
        { name: 'Tuesday', requests: 700 },
        { name: 'Wednesday', requests: 600 },
        { name: 'Thursday', requests: 800 },
        { name: 'Friday', requests: 500 },
        { name: 'Saturday', requests: 300 },
        { name: 'Sunday', requests: 450 },
    ];

    const deptDistribution = [
        { name: 'CSE', value: 45 },
        { name: 'ECE', value: 20 },
        { name: 'CE', value: 15 },
        { name: 'ME', value: 20 },
    ];

    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-500">Overview of platform performance and AI analytics.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl shadow-sm">
                    <Clock size={18} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">Last updated: Just now</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-[30px] border border-gray-100 shadow-sm hover:shadow-md transition-all"
                    >
                        <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                            <stat.icon size={24} />
                        </div>
                        <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                        <div className="flex items-center gap-1 text-xs text-green-600 font-bold mt-2">
                            <TrendingUp size={12} />
                            <span>+12% from last week</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* AI Activity Chart */}
                <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                        <Sparkles size={20} className="text-purple-500" />
                        AI Usage Statistics
                    </h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={aiUsageData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                                <XAxis dataKey="name" fontSize={12} stroke="#94a3b8" />
                                <YAxis fontSize={12} stroke="#94a3b8" />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="requests" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Dept Distribution */}
                <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-8">Department Distribution</h3>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={deptDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {deptDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-3 mt-4">
                        {deptDistribution.map((dept, index) => (
                            <div key={dept.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                                    <span className="text-gray-600">{dept.name}</span>
                                </div>
                                <span className="font-bold text-gray-900">{dept.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Upload Activities</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-50 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                <th className="pb-4 pl-4">Subject</th>
                                <th className="pb-4">Scheme</th>
                                <th className="pb-4">Year</th>
                                <th className="pb-4">Type</th>
                                <th className="pb-4 text-right pr-4">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {[
                                { subject: 'Compiler Design', scheme: '2019', year: '2023', type: 'Regular', date: 'Oct 12, 2024' },
                                { subject: 'DBMS', scheme: '2019', year: '2022', type: 'Supply', date: 'Oct 10, 2024' },
                                { subject: 'Graph Theory', scheme: '2019', year: '2023', type: 'Regular', date: 'Oct 08, 2024' },
                                { subject: 'Microprocessors', scheme: '2019', year: '2021', type: 'Regular', date: 'Oct 05, 2024' },
                            ].map((row, i) => (
                                <tr key={i} className="group hover:bg-gray-50 transition-colors">
                                    <td className="py-4 pl-4 font-bold text-gray-900">{row.subject}</td>
                                    <td className="py-4 text-sm text-gray-600">{row.scheme}</td>
                                    <td className="py-4 text-sm text-gray-600">{row.year}</td>
                                    <td className="py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${row.type === 'Regular' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                                            }`}>
                                            {row.type}
                                        </span>
                                    </td>
                                    <td className="py-4 text-sm text-gray-400 text-right pr-4">{row.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
