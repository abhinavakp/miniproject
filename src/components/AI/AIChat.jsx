import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import axios from 'axios';

const AIChat = ({ subjectId }) => {
    const [messages, setMessages] = useState([
        { id: 1, role: 'bot', text: `Hi! I'm your AI Assistant for ${subjectId}. How can I help you today?` }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMsg = { id: Date.now(), role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const response = await axios.post('/api/ai/chat', {
                subjectId,
                userMessage: input
            });

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                role: 'bot',
                text: response.data.aiReply
            }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                role: 'bot',
                text: "Sorry, I'm having trouble connecting right now. Please try again later."
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[500px] glass-card rounded-2xl overflow-hidden border border-white/20 shadow-xl bg-white/10 backdrop-blur-md">
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400">
                    <Bot size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-white">Subject Assistant</h3>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-xs text-white/60">Online</span>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex gap-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-primary-600' : 'bg-gray-700'
                                }`}>
                                {msg.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
                            </div>
                            <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                    ? 'bg-primary-600 text-white rounded-tr-none'
                                    : 'bg-white/10 text-white rounded-tl-none border border-white/10'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    </motion.div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none border border-white/10 flex items-center gap-2">
                            <Loader2 size={16} className="animate-spin text-primary-400" />
                            <span className="text-xs text-primary-400">Thinking...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-white/5">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask me anything..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-white placeholder-white/40 focus:outline-none focus:border-primary-500/50 transition-all font-medium"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || loading}
                        className="absolute right-2 top-1.5 p-2 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:hover:bg-primary-600 text-white rounded-lg transition-all shadow-lg shadow-primary-500/30"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIChat;
