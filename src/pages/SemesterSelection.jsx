import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronRight, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';

const SemesterSelection = () => {
    const navigate = useNavigate();
    const semesters = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'];

    const handleSelect = (sem) => {
        localStorage.setItem('selectedSem', sem);
        navigate('/subjects');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12 py-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Select <span className="text-indigo-600">Semester</span></h1>
                    <p className="text-gray-500 mt-2 text-lg">Pick your current semester to view specific subjects.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <div className="px-4 py-2 bg-blue-50 rounded-full text-xs font-bold text-blue-600 uppercase tracking-tighter">
                        Scheme: {localStorage.getItem('selectedScheme')}
                    </div>
                    <div className="px-4 py-2 bg-purple-50 rounded-full text-xs font-bold text-purple-600 uppercase tracking-tighter">
                        Dept: {localStorage.getItem('selectedDept')}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {semesters.map((sem, index) => (
                    <motion.div
                        key={sem}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSelect(sem)}
                        className="group bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 text-center"
                    >
                        <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-3xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-12 transition-all duration-500">
                            <Calendar size={32} />
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors">{sem}</h3>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Semester</span>
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-center pt-8">
                <button
                    onClick={() => navigate('/departments')}
                    className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors font-medium"
                >
                    <ChevronRight className="rotate-180" size={18} />
                    Back to Departments
                </button>
            </div>
        </div>
    );
};

export default SemesterSelection;
