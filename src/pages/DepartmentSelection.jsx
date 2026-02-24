import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, Zap, Settings, Building2, FlaskConical, Globe, ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const DepartmentSelection = () => {
    const navigate = useNavigate();

    const depts = [
        { id: 'CSE', name: 'Computer Science', icon: Cpu, color: 'text-blue-600', bg: 'bg-blue-50' },
        { id: 'ECE', name: 'Electronics & Comm.', icon: Zap, color: 'text-purple-600', bg: 'bg-purple-50' },
        { id: 'ME', name: 'Mechanical Eng.', icon: Settings, color: 'text-orange-600', bg: 'bg-orange-50' },
        { id: 'CE', name: 'Civil Engineering', icon: Building2, color: 'text-green-600', bg: 'bg-green-50' },
        { id: 'EEE', name: 'Electrical & Electronics', icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50' },
        { id: 'IT', name: 'Information Tech.', icon: Globe, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    ];

    const handleSelect = (deptId) => {
        localStorage.setItem('selectedDept', deptId);
        navigate('/semesters');
    };

    return (
        <div className="max-w-5xl mx-auto space-y-12 py-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Select <span className="text-primary-600">Department</span></h1>
                    <p className="text-gray-500 mt-2 text-lg">Choose your engineering branch to narrow down subjects.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
                    Scheme: <span className="text-primary-600 font-bold">{localStorage.getItem('selectedScheme')}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {depts.map((dept, index) => (
                    <motion.div
                        key={dept.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSelect(dept.id)}
                        className="group bg-white p-8 rounded-[35px] border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary-100 transition-all cursor-pointer flex flex-col items-center text-center"
                    >
                        <div className={`w-20 h-20 ${dept.bg} ${dept.color} rounded-[28px] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                            <dept.icon size={36} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{dept.name}</h3>
                        <p className="text-gray-400 text-sm mb-6 uppercase tracking-widest font-bold">{dept.id}</p>

                        <div className="p-3 bg-gray-50 rounded-full text-gray-400 group-hover:bg-primary-600 group-hover:text-white transition-all transform group-hover:rotate-45">
                            <ArrowRight size={20} />
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                delay={0.5}
                className="flex justify-center pt-8"
            >
                <button
                    onClick={() => navigate('/schemes')}
                    className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors font-medium"
                >
                    <ChevronRight className="rotate-180" size={18} />
                    Change Scheme
                </button>
            </motion.div>
        </div>
    );
};

export default DepartmentSelection;
