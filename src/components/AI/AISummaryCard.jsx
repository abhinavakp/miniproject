import React from 'react';
import { FileText, Copy, Quote } from 'lucide-react';

const AISummaryCard = ({ summary, onCopy }) => {
    if (!summary) return null;

    return (
        <div className="glass-card p-6 rounded-2xl border border-white/20 bg-gradient-to-br from-indigo-500/5 to-primary-500/5 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Quote size={80} />
            </div>

            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary-500/20 text-primary-400 rounded-lg">
                        <FileText size={20} />
                    </div>
                    <h3 className="font-bold text-white">Question Summary & Notes</h3>
                </div>
                {onCopy && (
                    <button
                        onClick={() => onCopy(summary)}
                        className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-all"
                        title="Copy to clipboard"
                    >
                        <Copy size={18} />
                    </button>
                )}
            </div>

            <div className="prose prose-invert prose-sm max-w-none">
                <div className="text-white/80 whitespace-pre-line leading-relaxed italic">
                    {summary}
                </div>
            </div>

            <div className="mt-6 flex gap-2">
                <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-white/40 uppercase tracking-widest border border-white/5">
                    AI Generated
                </span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-white/40 uppercase tracking-widest border border-white/5">
                    Revision Notes
                </span>
            </div>
        </div>
    );
};

export default AISummaryCard;
