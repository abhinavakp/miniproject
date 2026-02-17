import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { modules } from '../data/mockData';
import Card from '../components/Card';
import { Layers, ChevronRight, BookOpen } from 'lucide-react';

const Modules = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const subjectId = searchParams.get('subject');

    const handleSelect = (moduleId) => {
        navigate(`/pyqs?subject=${subjectId}&module=${moduleId}`);
    };

    const currentModules = modules[subjectId] || [];

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Module</h1>
                <p className="text-gray-500">Choose a module to practice questions</p>
            </div>

            <div className="space-y-4">
                {currentModules.map((module, index) => (
                    <Card
                        key={module.id}
                        delay={index * 0.1}
                        onClick={() => handleSelect(module.id)}
                        className="flex items-center justify-between group hover:border-primary-300 transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/30">
                                {module.id.replace('M', '')}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{module.name}</h3>
                                <p className="text-sm text-gray-500">{module.description}</p>
                            </div>
                        </div>

                        <div className="p-2 rounded-full bg-gray-50 text-gray-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                            <ChevronRight size={20} />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Modules;
