import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

const AIPdfUploader = ({ subjectId, onAnalysisComplete }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [status, setStatus] = useState('idle'); // idle, uploading, complete, error

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setStatus('idle');
        } else {
            alert('Please select a valid PDF file.');
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setStatus('uploading');

        const formData = new FormData();
        formData.append('pdf', file);
        formData.append('subjectId', subjectId);

        try {
            const response = await axios.post('/api/ai/analyze-pdf', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setStatus('complete');
            onAnalysisComplete(response.data);
        } catch (error) {
            setStatus('error');
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="glass-card p-6 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="text-primary-400" />
                Smart PYQ Analyzer
            </h3>

            <div className={`relative border-2 border-dashed rounded-xl p-8 transition-all ${status === 'complete' ? 'border-green-500/50 bg-green-500/5' :
                    status === 'error' ? 'border-red-500/50 bg-red-500/5' :
                        'border-white/10 hover:border-primary-500/30 bg-white/5'
                }`}>
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <div className="flex flex-col items-center text-center">
                    {status === 'complete' ? (
                        <div className="flex flex-col items-center">
                            <CheckCircle size={48} className="text-green-500 mb-2" />
                            <p className="text-white font-medium">Analysis Complete!</p>
                            <p className="text-white/60 text-sm">{file.name}</p>
                        </div>
                    ) : status === 'uploading' ? (
                        <div className="flex flex-col items-center">
                            <Loader2 size={48} className="text-primary-400 animate-spin mb-2" />
                            <p className="text-white font-medium">Analyzing Questions...</p>
                            <p className="text-white/60 text-sm">This may take a minute</p>
                        </div>
                    ) : (
                        <>
                            <div className="w-16 h-16 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-400 mb-4">
                                <Upload size={32} />
                            </div>
                            <p className="text-white font-medium mb-1">
                                {file ? file.name : 'Drop your PYQ PDF here'}
                            </p>
                            <p className="text-white/40 text-sm">or click to browse cables (Max 5MB)</p>
                        </>
                    )}
                </div>
            </div>

            {file && status === 'idle' && (
                <button
                    onClick={handleUpload}
                    className="w-full mt-4 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-500/30 flex items-center justify-center gap-2"
                >
                    Start AI Analysis
                </button>
            )}

            {status === 'error' && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle size={16} />
                    Failed to analyze PDF. Please check your connection.
                </div>
            )}
        </div>
    );
};

export default AIPdfUploader;
