import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Upload, FileText, Users, Download, Activity, BarChart3, PieChart as PieChartIcon, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { subjectAPI, pyqAPI } from '../utils/api';

const AdminPortal = () => {
    const [stats, setStats] = useState({
        totalPYQs: 0,
        totalSubjects: 0,
        mostDownloaded: 'N/A',
        aiUsage: 0
    });

    useEffect(() => {
        // Fetch stats (mocked for now, in real app call statistics API)
        setStats({
            totalPYQs: 45,
            totalSubjects: 120,
            mostDownloaded: 'Compiler Design',
            aiUsage: 128
        });
    }, []);

    const cards = [
        { label: 'Total PYQs', value: stats.totalPYQs, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Total Subjects', value: stats.totalSubjects, icon: LayoutDashboard, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Most Downloaded', value: stats.mostDownloaded, icon: Download, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'AI Commands', value: stats.aiUsage, icon: Activity, color: 'text-orange-600', bg: 'bg-orange-50' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-500 mt-1">Manage question papers and view platform analytics.</p>
                </div>
                <Link
                    to="/admin/upload"
                    className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
                >
                    <Upload size={18} />
                    <span>Upload New PYQ</span>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${card.bg} ${card.color}`}>
                                <card.icon size={24} />
                            </div>
                            <TrendingUp className="text-green-500" size={16} />
                        </div>
                        <p className="text-gray-500 text-sm font-medium">{card.label}</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">{card.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Analytics Placeholder */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Download Trends</h3>
                        <BarChart3 className="text-gray-400" size={20} />
                    </div>
                    <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200">
                        <p className="text-gray-400 italic text-sm">Chart Visualization: Coming Soon (Chart.js Integration)</p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Active Departments</h3>
                        <PieChartIcon className="text-gray-400" size={20} />
                    </div>
                    <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200">
                        <p className="text-gray-400 italic text-sm">Chart Visualization: Coming Soon (Chart.js Integration)</p>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Management Quick Links</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <Link to="/admin/subjects" className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                            <LayoutDashboard size={18} />
                        </div>
                        <span className="font-medium text-gray-700">Manage Subjects</span>
                    </Link>
                    <Link to="/admin/pyqs" className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <FileText size={18} />
                        </div>
                        <span className="font-medium text-gray-700">Manage PYQs</span>
                    </Link>
                    <Link to="/admin/users" className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-3">
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                            <Users size={18} />
                        </div>
                        <span className="font-medium text-gray-700">Manage Users</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminPortal;
