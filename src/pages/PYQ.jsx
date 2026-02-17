import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { pyqs } from '../data/mockData';
import Card from '../components/Card';
import Button from '../components/Button';
import { Filter, Bookmark, CheckCircle, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PYQ = () => {
    const [searchParams] = useSearchParams();
    const subjectId = searchParams.get('subject');
    const moduleId = searchParams.get('module');

    // Filter state
    const [activeFilter, setActiveFilter] = useState('all'); // all, 2, 5, 10
    const [expandedAnswers, setExpandedAnswers] = useState({});

    // Filter by subject and module
    const filteredQuestions = pyqs.filter(q => {
        const matchesSubject = q.subjectId === subjectId;
        const matchesModule = q.moduleId === moduleId;
        const matchesMarks = activeFilter === 'all' || q.marks === parseInt(activeFilter);

        // Fallback: If no dedicated questions for this module/subject, show mock questions for demo info
        // But since we want real behavior now, we try to be strict.
        // If strictly no matches, we might want to return empty or a "No questions found" state.
        return matchesSubject && matchesModule && matchesMarks;
    });

    const toggleAnswer = (id) => {
        setExpandedAnswers(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Previous Year Questions</h1>
                    <p className="text-gray-500">Practice important questions for {moduleId}</p>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                    {['all', '2', '5', '10'].map(mark => (
                        <button
                            key={mark}
                            onClick={() => setActiveFilter(mark)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeFilter === mark
                                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                                : 'bg-white text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {mark === 'all' ? 'All Questions' : `${mark} Marks`}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                {filteredQuestions.map((q, index) => (
                    <Card key={q.id} delay={index * 0.1}>
                        <div className="flex justify-between items-start gap-4 mb-3">
                            <div className="flex gap-2">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${q.marks >= 10 ? 'bg-red-100 text-red-600' :
                                    q.marks >= 5 ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                                    }`}>
                                    {q.marks} Marks
                                </span>
                                <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-500 font-mono">
                                    {q.year}
                                </span>
                                {q.repeated && (
                                    <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-bold">
                                        <AlertCircle size={12} /> Repeated
                                    </span>
                                )}
                            </div>
                            <button className="text-gray-400 hover:text-primary-500 transition-colors">
                                <Bookmark size={20} />
                            </button>
                        </div>

                        <h3 className="text-lg font-medium text-gray-900 mb-4 leading-relaxed">
                            {q.question}
                        </h3>

                        <div>
                            <button
                                onClick={() => toggleAnswer(q.id)}
                                className="flex items-center gap-2 text-primary-600 text-sm font-medium hover:text-primary-700 transition-colors"
                            >
                                {expandedAnswers[q.id] ? (
                                    <>Hide Answer <ChevronUp size={16} /></>
                                ) : (
                                    <>Show Answer <ChevronDown size={16} /></>
                                )}
                            </button>

                            <AnimatePresence>
                                {expandedAnswers[q.id] && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="mt-4 p-4 bg-green-50/50 rounded-xl border border-green-100 text-gray-700 text-sm leading-relaxed">
                                            <div className="flex items-start gap-2 mb-2 text-green-700 font-semibold">
                                                <CheckCircle size={16} className="mt-0.5" />
                                                <span>Correct Answer:</span>
                                            </div>
                                            {q.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </Card>
                ))}

                {filteredQuestions.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                        <Filter size={48} className="mx-auto mb-4 opacity-20" />
                        <p>No questions found for this filter.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PYQ;
