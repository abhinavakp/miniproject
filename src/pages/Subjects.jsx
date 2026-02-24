import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Search, ArrowRight, Loader2, BookMarked, GraduationCap } from 'lucide-react';
import { subjectAPI } from '../utils/api';
import { motion } from 'framer-motion';

const Subjects = () => {
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const selectedScheme = localStorage.getItem('selectedScheme');
    const selectedDept = localStorage.getItem('selectedDept');
    const selectedSem = localStorage.getItem('selectedSem');

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await subjectAPI.getAll({
                    scheme: selectedScheme,
                    department: selectedDept,
                    semester: selectedSem
                });
                setSubjects(response.data);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSubjects();
    }, [selectedScheme, selectedDept, selectedSem]);

    const filteredSubjects = subjects.filter(subject =>
        subject.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.subjectCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (subject) => {
        localStorage.setItem('selectedSubject', JSON.stringify(subject));
        navigate('/pyqs');
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto space-y-10 py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Available <span className="text-primary-600">Subjects</span></h1>
                    <p className="text-gray-500 mt-2 text-lg">Select a subject to view and download previous year question papers.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-gray-100 rounded-full text-xs font-bold text-gray-600 uppercase tracking-widest">{selectedScheme} Scheme</span>
                    <span className="px-4 py-2 bg-blue-50 rounded-full text-xs font-bold text-blue-600 uppercase tracking-widest">{selectedDept}</span>
                    <span className="px-4 py-2 bg-indigo-50 rounded-full text-xs font-bold text-indigo-600 uppercase tracking-widest">{selectedSem}</span>
                </div>
            </div>

            <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                <input
                    type="text"
                    placeholder="Search by subject name or code (e.g. CST302)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-16 pr-6 py-5 bg-white border border-gray-100 rounded-[30px] shadow-sm focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all text-lg"
                />
            </div>

            {filteredSubjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredSubjects.map((subject, index) => (
                        <motion.div
                            key={subject._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleSelect(subject)}
                            className="group bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:border-primary-100 transition-all cursor-pointer flex flex-col h-full"
                        >
                            <div className="flex items-start justify-between mb-8">
                                <div className="p-4 bg-primary-50 text-primary-600 rounded-3xl group-hover:bg-primary-600 group-hover:text-white transition-all duration-500 group-hover:rotate-6">
                                    <BookOpen size={28} />
                                </div>
                                <div className="p-2 bg-gray-50 text-gray-400 rounded-full group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                    <ArrowRight size={20} />
                                </div>
                            </div>

                            <div className="flex-1">
                                <span className="text-xs font-bold text-primary-500 uppercase tracking-[0.2em] mb-2 block">{subject.subjectCode}</span>
                                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors leading-tight">
                                    {subject.subjectName}
                                </h3>
                            </div>

                            <div className="mt-8 flex items-center justify-between text-sm">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/subjects/${subject._id}/syllabus`);
                                    }}
                                    className="flex items-center gap-1.5 font-bold text-gray-500 hover:text-indigo-600 transition-colors"
                                >
                                    <BookMarked size={16} />
                                    <span>Syllabus</span>
                                </button>
                                <div className="flex items-center gap-1 text-primary-600 font-bold opacity-100 group-hover:translate-x-1 transition-all">
                                    <span>Papers</span>
                                    <ArrowRight size={16} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-[40px] p-20 text-center border-2 border-dashed border-gray-100">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                        <BookMarked className="text-gray-300" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No subjects found</h3>
                    <p className="text-gray-500 text-lg">We couldn't find any subjects matching your current filters.</p>
                    <button
                        onClick={() => navigate('/semesters')}
                        className="mt-8 px-8 py-3 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
                    >
                        Try Another Semester
                    </button>
                </div>
            )}
        </div>
    );
};

export default Subjects;
