import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, MessageCircle, FileSearch, BarChart3, ChevronRight } from 'lucide-react';
import AIChat from './AI/AIChat';
import AIPdfUploader from './AI/AIPdfUploader';
import AIResultPanel from './AI/AIResultPanel';
import AIModuleChart from './AI/AIModuleChart';

const AIAssistant = ({ subjectName, subjectId, onClose }) => {
    const [activeTab, setActiveTab] = useState('chat'); // chat, analyze, prediction
    const [analysisData, setAnalysisData] = useState(null);

    const tabs = [
        { id: 'chat', label: 'AI Chat', icon: MessageCircle },
        { id: 'analyze', label: 'PDF Analyzer', icon: FileSearch },
        { id: 'prediction', label: 'Predictions', icon: BarChart3 },
    ];

    const containerVariants = {
        hidden: { opacity: 0, x: 100, scale: 0.9 },
        visible: { opacity: 1, x: 0, scale: 1, transition: { type: 'spring', damping: 25, stiffness: 200 } },
        exit: { opacity: 0, x: 100, scale: 0.9, transition: { duration: 0.2 } }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 w-full md:w-[500px] h-full bg-slate-900/95 backdrop-blur-xl z-[100] shadow-2xl border-l border-white/10 flex flex-col"
        >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-primary-600/20 to-indigo-600/20">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-500 rounded-xl">
                        <Sparkles size={20} className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Smart AI Assistant</h2>
                        <p className="text-xs text-white/50">{subjectName}</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-all"
                >
                    <X size={24} />
                </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex p-2 bg-white/5 mx-6 mt-6 rounded-2xl border border-white/5">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id
                            ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                            : 'text-white/40 hover:text-white/60'
                            }`}
                    >
                        <tab.icon size={18} />
                        <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
                <AnimatePresence mode="wait">
                    {activeTab === 'chat' && (
                        <motion.div
                            key="chat"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <AIChat subjectId={subjectId} />
                        </motion.div>
                    )}

                    {activeTab === 'analyze' && (
                        <motion.div
                            key="analyze"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            {!analysisData ? (
                                <AIPdfUploader
                                    subjectId={subjectId}
                                    onAnalysisComplete={(data) => {
                                        setAnalysisData(data);
                                        setActiveTab('analyze');
                                    }}
                                />
                            ) : (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-bold text-white">Analysis Results</h3>
                                        <button
                                            onClick={() => setAnalysisData(null)}
                                            className="text-xs text-primary-400 hover:underline"
                                        >
                                            Upload New PDF
                                        </button>
                                    </div>
                                    <AIResultPanel data={analysisData} />
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'prediction' && (
                        <motion.div
                            key="prediction"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            {analysisData ? (
                                <>
                                    <AIModuleChart data={analysisData.moduleWeightage} />
                                    <div className="glass-card p-6 rounded-2xl border border-white/10 bg-white/5">
                                        <h4 className="font-bold text-white mb-4">Exam Prediction Summary</h4>
                                        <p className="text-sm text-white/60 leading-relaxed">
                                            Based on historical data and current analysis, modules
                                            <span className="text-primary-400 font-bold mx-1">
                                                {analysisData.moduleWeightage?.sort((a, b) => b.weightage - a.weightage)[0]?.module}
                                            </span>
                                            and
                                            <span className="text-primary-400 font-bold mx-1">
                                                {analysisData.moduleWeightage?.sort((a, b) => b.weightage - a.weightage)[1]?.module}
                                            </span>
                                            have the highest probability of appearance.
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-20 px-10 glass-card rounded-3xl border border-white/5 bg-white/5">
                                    <BarChart3 size={48} className="mx-auto mb-4 text-white/20" />
                                    <h4 className="text-white font-bold mb-2">No Prediction Data</h4>
                                    <p className="text-white/40 text-sm">Please upload and analyze a PDF in the "PDF Analyzer" tab first to generate predictions.</p>
                                    <button
                                        onClick={() => setActiveTab('analyze')}
                                        className="mt-6 flex items-center md:mx-auto gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-xl text-sm transition-all"
                                    >
                                        Go to Analyzer <ChevronRight size={16} />
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-white/2 text-center">
                <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
                    Powered by KTU Smart AI Assistant • v1.0
                </p>
            </div>
        </motion.div>
    );
};

export default AIAssistant;
