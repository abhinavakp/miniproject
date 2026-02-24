import React, { useState, useEffect } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { subjectAPI, pyqAPI } from '../utils/api';

const UploadPYQ = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [status, setStatus] = useState({ type: '', message: '' });

    const [formData, setFormData] = useState({
        subjectId: '',
        year: new Date().getFullYear().toString(),
        examType: 'Regular',
        tags: '',
        modules: '',
        pdf: null
    });

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await subjectAPI.getAll();
                setSubjects(response.data);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };
        fetchSubjects();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'pdf') {
            setFormData(prev => ({ ...prev, pdf: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.pdf || !formData.subjectId) {
            setStatus({ type: 'error', message: 'Please select a subject and upload a PDF.' });
            return;
        }

        setLoading(true);
        setStatus({ type: '', message: '' });

        const data = new FormData();
        data.append('subjectId', formData.subjectId);
        data.append('year', formData.year);
        data.append('examType', formData.examType);
        data.append('tags', JSON.stringify(formData.tags.split(',').map(t => t.trim()).filter(t => t)));
        data.append('modules', JSON.stringify(formData.modules.split(',').map(m => m.trim()).filter(m => m)));
        data.append('pdf', formData.pdf);

        try {
            await pyqAPI.upload(data);
            setStatus({ type: 'success', message: 'PYQ uploaded successfully!' });
            setTimeout(() => navigate('/admin'), 2000);
        } catch (error) {
            setStatus({ type: 'error', message: error.response?.data?.message || 'Error uploading PYQ.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <Link to="/admin" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors">
                <ArrowLeft size={18} />
                <span>Back to Dashboard</span>
            </Link>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-primary-50 text-primary-600 rounded-2xl">
                        <Upload size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Upload Question Paper</h1>
                        <p className="text-gray-500">Provide details and upload the PDF file.</p>
                    </div>
                </div>

                {status.message && (
                    <div className={`p-4 rounded-xl mb-6 flex items-center gap-3 ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                        }`}>
                        {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        <span className="font-medium">{status.message}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Select Subject</label>
                            <select
                                name="subjectId"
                                value={formData.subjectId}
                                onChange={handleChange}
                                className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none"
                                required
                            >
                                <option value="">Choose a subject...</option>
                                {subjects.map(sub => (
                                    <option key={sub._id} value={sub._id}>{sub.subjectName} ({sub.subjectCode})</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Exam Year</label>
                            <input
                                type="text"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                placeholder="e.g. 2023"
                                className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Exam Type</label>
                            <select
                                name="examType"
                                value={formData.examType}
                                onChange={handleChange}
                                className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none"
                            >
                                <option value="Regular">Regular</option>
                                <option value="Supply">Supply</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Tags (Comma separated)</label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="e.g. important, repeated, tough"
                            className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Modules (Comma separated)</label>
                        <input
                            type="text"
                            name="modules"
                            value={formData.modules}
                            onChange={handleChange}
                            placeholder="e.g. 1, 2, 4"
                            className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Question Paper PDF</label>
                        <div className="relative group">
                            <input
                                type="file"
                                name="pdf"
                                onChange={handleChange}
                                accept=".pdf"
                                className="hidden"
                                id="pdf-upload"
                                required
                            />
                            <label
                                htmlFor="pdf-upload"
                                className={`w-full h-32 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${formData.pdf ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50 group-hover:border-primary-300 group-hover:bg-primary-50'
                                    }`}
                            >
                                <div className={`p-3 rounded-full ${formData.pdf ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                    <FileText size={24} />
                                </div>
                                <span className="text-sm font-medium text-gray-600">
                                    {formData.pdf ? formData.pdf.name : 'Click to select PDF or drag and drop'}
                                </span>
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 disabled:opacity-50"
                    >
                        {loading ? <Loader2 size={20} className="animate-spin" /> : <Upload size={20} />}
                        <span>{loading ? 'Uploading...' : 'Publish Question Paper'}</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadPYQ;
