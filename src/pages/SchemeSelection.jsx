import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const SchemeSelection = () => {
    const navigate = useNavigate();

    const schemes = [
        {
            id: '2019',
            name: '2019 Scheme',
            description: 'Legacy scheme with focus on fundamental engineering principles.',
            icon: Book,
            color: 'bg-blue-500',
            lightColor: 'bg-blue-50',
            textColor: 'text-blue-600',
        },
        {
            id: '2024',
            name: '2024 Scheme',
            description: 'Latest updated curriculum aligned with modern industry standards.',
            icon: GraduationCap,
            color: 'bg-indigo-600',
            lightColor: 'bg-indigo-50',
            textColor: 'text-indigo-600',
            isNew: true
        }
    ];

    const handleSelect = (schemeId) => {
        localStorage.setItem('selectedScheme', schemeId);
        navigate('/departments');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12 py-8">
            <div className="text-center space-y-4">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-primary-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-primary-600"
                >
                    <Book size={40} />
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                    Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Academic Scheme</span>
                </h1>
                <p className="text-gray-500 text-lg max-w-xl mx-auto">
                    Choose the syllabus scheme that applies to your batch to find relevant question papers.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {schemes.map((scheme, index) => (
                    <motion.div
                        key={scheme.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleSelect(scheme.id)}
                        className="group relative bg-white rounded-[40px] p-10 shadow-sm border border-gray-100 hover:shadow-2xl hover:border-primary-200 transition-all cursor-pointer overflow-hidden"
                    >
                        {scheme.isNew && (
                            <div className="absolute top-6 right-6 flex items-center gap-1.5 px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-xs font-bold uppercase tracking-widest">
                                <Sparkles size={12} />
                                New Scheme
                            </div>
                        )}

                        <div className={`w-16 h-16 ${scheme.lightColor} ${scheme.textColor} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                            <scheme.icon size={32} />
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{scheme.name}</h3>
                        <p className="text-gray-500 leading-relaxed mb-8">
                            {scheme.description}
                        </p>

                        <div className="flex items-center gap-2 font-bold text-primary-600 group-hover:gap-4 transition-all duration-300">
                            <span>Get Started</span>
                            <ArrowRight size={20} />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[40px] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 mt-12 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-2">Need help finding your papers?</h3>
                    <p className="text-gray-400">Ask our AI assistant for guidance on any subject or module.</p>
                </div>
                <button
                    onClick={() => navigate('/pyqs')}
                    className="relative z-10 px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold hover:bg-primary-50 transition-colors whitespace-nowrap"
                >
                    Learn More
                </button>
            </div>
        </div>
    );
};

export default SchemeSelection;
