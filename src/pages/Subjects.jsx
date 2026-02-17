import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { subjects } from '../data/mockData';
import Card from '../components/Card';
import { Book, ChevronRight, Clock, Star } from 'lucide-react';

const Subjects = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const schemeId = searchParams.get('scheme');
    const deptId = searchParams.get('dept');
    const semId = searchParams.get('sem');

    // Fallback if data doesn't exist for specific combination (mock data limitation)
    const currentSubjects = subjects[deptId]?.[semId] || [
        { id: 'MOCK1', name: 'Mock Subject 1', code: 'MCK101' },
        { id: 'MOCK2', name: 'Mock Subject 2', code: 'MCK102' },
        { id: 'MOCK3', name: 'Mock Subject 3', code: 'MCK103' },
    ];

    const handleSelect = (subjectId) => {
        navigate(`/modules?subject=${subjectId}`);
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Subjects</h1>
                    <p className="text-gray-500">Select a subject to view modules and questions</p>
                </div>
                <div className="text-right">
                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                        {deptId} - {semId}
                    </span>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentSubjects.map((sub, index) => (
                    <Card
                        key={sub.id}
                        delay={index * 0.1}
                        onClick={() => handleSelect(sub.id)}
                        className="flex flex-col h-full hover:border-primary-200 transition-colors"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-500 font-mono">{sub.code}</span>
                            <button className="text-gray-300 hover:text-yellow-400 transition-colors">
                                <Star size={18} />
                            </button>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2 flex-1">{sub.name}</h3>

                        <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-4">
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <Clock size={14} />
                                <span>4 Credits</span>
                            </div>
                            <div className="p-2 bg-primary-50 rounded-full text-primary-600">
                                <ChevronRight size={16} />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Subjects;
