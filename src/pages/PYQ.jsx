import React, { useState, useEffect } from 'react';
import { FileText, Download, Eye, Calendar, Tag, Shield, Search, Filter, MessageSquare, Sparkles } from 'lucide-react';
import { pyqAPI } from '../utils/api';
import AIAssistant from '../components/AIAssistant';

const PYQ = () => {
    const [pyqs, setPyqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [showAI, setShowAI] = useState(false);

    // Get subject from state/localStorage (assuming it's stored during navigation)
    const selectedSubject = JSON.parse(localStorage.getItem('selectedSubject') || '{}');

    useEffect(() => {
        const fetchPYQs = async () => {
            if (!selectedSubject._id) return;
            try {
                const response = await pyqAPI.getBySubject(selectedSubject._id);
                setPyqs(response.data);
            } catch (error) {
                console.error('Error fetching PYQs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPYQs();
    }, [selectedSubject._id]);

    const filteredPYQs = pyqs.filter(pyq => {
        const matchesSearch = pyq.year.includes(searchTerm) ||
            pyq.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesType = filterType === 'All' || pyq.examType === filterType;
        return matchesSearch && matchesType;
    });

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
    );

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{selectedSubject.subjectName || 'Question Papers'}</h1>
                    <p className="text-gray-500 mt-1">
                        {selectedSubject.subjectCode} • {selectedSubject.semester} • {selectedSubject.department}
                    </p>
                </div>
                <button
                    onClick={() => setShowAI(!showAI)}
                    className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-indigo-600 text-white px-6 py-3 rounded-2xl hover:shadow-xl hover:-translate-y-0.5 transition-all shadow-lg shadow-primary-200 group"
                >
                    <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                    <span>Ask AI Assistant</span>
                </button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by year or tags (e.g. important)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    {['All', 'Regular', 'Supply'].map(type => (
                        <button
                            key={type}
                            onClick={() => setFilterType(type)}
                            className={`px-6 py-3 rounded-2xl font-medium transition-all ${filterType === type
                                ? 'bg-primary-600 text-white shadow-md'
                                : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* PYQ Grid */}
            {filteredPYQs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPYQs.map((pyq) => (
                        <div key={pyq._id} className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:border-primary-100">
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-3 bg-primary-50 text-primary-600 rounded-2xl group-hover:scale-110 transition-transform">
                                    <FileText size={24} />
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold ${pyq.examType === 'Regular' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                                    }`}>
                                    {pyq.examType}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2">{pyq.year} Question Paper</h3>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {pyq.tags.map(tag => (
                                    <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-gray-50 text-gray-500 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                                        <Tag size={10} />
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-gray-50">
                                <a
                                    href={`http://localhost:5000${pyq.pdfUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-50 text-gray-700 font-bold rounded-xl hover:bg-gray-100 transition-colors"
                                >
                                    <Eye size={18} />
                                    <span>View</span>
                                </a>
                                <a
                                    href={`http://localhost:5000${pyq.pdfUrl}`}
                                    download
                                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 shadow-lg shadow-primary-100 transition-all active:scale-95"
                                >
                                    <Download size={18} />
                                    <span>Download</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search className="text-gray-300" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">No question papers found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
                </div>
            )}

            {/* AI Assistant Floating Chat */}
            <AnimatePresence>
                {showAI && (
                    <AIAssistant
                        subjectName={selectedSubject.subjectName}
                        subjectId={selectedSubject.subjectCode || selectedSubject._id}
                        onClose={() => setShowAI(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default PYQ;
