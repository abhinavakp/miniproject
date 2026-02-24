import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { syllabusAPI } from '../utils/api';
import { motion } from 'framer-motion';
import { Book, ChevronRight, Download, ArrowLeft, Loader2, Info } from 'lucide-react';
import Button from '../components/Button';

const Syllabus = () => {
    const { subjectId } = useParams();
    const navigate = useNavigate();
    const [syllabus, setSyllabus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSyllabus = async () => {
            try {
                const response = await syllabusAPI.getBySubject(subjectId);
                setSyllabus(response.data);
            } catch (err) {
                console.error('Error fetching syllabus:', err);
                setError('No detailed syllabus found for this subject yet. We are working on adding it!');
            } finally {
                setLoading(false);
            }
        };
        fetchSyllabus();
    }, [subjectId]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="animate-spin text-primary-600" size={48} />
        </div>
    );

    if (error) return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <div className="bg-amber-50 border border-amber-200 rounded-[30px] p-10 text-center">
                <Info className="mx-auto text-amber-500 mb-6" size={48} />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Syllabus Not Available</h2>
                <p className="text-gray-600 mb-8">{error}</p>
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 mx-auto text-primary-600 font-bold hover:gap-3 transition-all"
                >
                    <ArrowLeft size={20} /> Go Back to Subjects
                </button>
            </div>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto py-8 px-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors mb-6 font-medium"
                    >
                        <ArrowLeft size={18} /> Back to Subjects
                    </button>
                    <h1 className="text-4xl font-black text-gray-900 leading-tight">
                        Course <span className="text-primary-600 text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Syllabus</span>
                    </h1>
                    <p className="text-gray-500 mt-2 text-lg">
                        {syllabus?.subjectId?.subjectName} ({syllabus?.subjectId?.subjectCode})
                    </p>
                </div>
                {syllabus?.syllabusPdfUrl && (
                    <a href={syllabus.syllabusPdfUrl} target="_blank" rel="noopener noreferrer">
                        <Button className="rounded-2xl shadow-xl shadow-primary-100 flex items-center gap-2">
                            <Download size={18} /> Official PDF
                        </Button>
                    </a>
                )}
            </div>

            {/* Modules Grid */}
            <div className="grid gap-6">
                {syllabus?.modules.map((module, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                    >
                        <div className="flex items-start gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center font-black text-xl flex-shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                                {module.moduleNumber}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                                    {module.title}
                                </h3>
                                <div className="prose prose-sm text-gray-500 leading-relaxed">
                                    {module.content.split('\n').map((line, i) => (
                                        <p key={i} className="mb-2">{line}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Footer Note */}
            <div className="mt-12 p-8 bg-gray-50 rounded-[32px] border border-gray-100 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary-600 shadow-sm">
                    <Book size={20} />
                </div>
                <p className="text-sm text-gray-500 font-medium">
                    This syllabus is based on the latest KTU {syllabus?.subjectId?.scheme} Scheme. Topics are subject to change as per university regulations.
                </p>
            </div>
        </div>
    );
};

export default Syllabus;
