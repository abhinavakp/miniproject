import React from 'react';
import { motion } from 'framer-motion';
import { Target, RefreshCcw, Layers, AlertTriangle, HelpCircle } from 'lucide-react';

const AIResultPanel = ({ data }) => {
    if (!data) return null;

    const sections = [
        { title: 'Important Topics', icon: Target, items: data.importantTopics, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { title: 'Repeated Questions', icon: RefreshCcw, items: data.repeatedQuestions, color: 'text-green-400', bg: 'bg-green-500/10' },
        { title: 'Frequent Modules', icon: Layers, items: data.frequentModules, color: 'text-purple-400', bg: 'bg-purple-500/10' },
        { title: 'Expected Questions', icon: HelpCircle, items: data.expectedQuestions, color: 'text-amber-400', bg: 'bg-amber-500/10' }
    ];

    return (
        <div className="space-y-6">
            {/* Difficulty Badge */}
            <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-white/60">Estimated Difficulty:</span>
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${data.difficulty === 'Hard' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        data.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                            'bg-green-500/10 text-green-400 border-green-500/20'
                    }`}>
                    {data.difficulty}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sections.map((section, idx) => (
                    <motion.div
                        key={section.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-card p-5 rounded-2xl border border-white/10 bg-white/5"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <div className={`p-2 rounded-lg ${section.bg} ${section.color}`}>
                                <section.icon size={18} />
                            </div>
                            <h4 className="font-bold text-white text-sm">{section.title}</h4>
                        </div>
                        <ul className="space-y-2">
                            {section.items?.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-white/70 leading-relaxed">
                                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${section.color.replace('text', 'bg')}`}></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AIResultPanel;
