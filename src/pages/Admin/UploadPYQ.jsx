import { Upload, FileText, ChevronRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { pyqAPI } from '../../utils/api';

const UploadPYQ = () => {
    const [formData, setFormData] = useState({
        scheme: '2019',
        department: '',
        semester: '',
        subject: '', // This will be the subject ID or name selected
        year: new Date().getFullYear().toString(),
        examType: 'Regular',
        tags: '',
    });

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const departments = ['CSE', 'ECE', 'ME', 'CE', 'EEE'];
    const semesters = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setError('');
        } else {
            setError('Please select a valid PDF file.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a PDF file to upload.');
            return;
        }

        setLoading(true);
        setError('');

        const data = new FormData();
        data.append('file', file);
        data.append('scheme', formData.scheme);
        data.append('department', formData.department);
        data.append('semester', formData.semester);
        data.append('subjectName', formData.subject);
        data.append('year', formData.year);
        data.append('examType', formData.examType);
        data.append('tags', formData.tags);

        try {
            await pyqAPI.upload(data);
            setSuccess(true);
            setFile(null);
            setFormData({
                scheme: '2019',
                department: '',
                semester: '',
                subject: '',
                year: '2024',
                examType: 'Regular',
                tags: '',
            });
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError(err.response?.data?.error || 'Upload failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Upload Question Paper</h1>
                <p className="text-gray-500 mt-1">Add new previous year question papers to the repository.</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Form Fields */}
                <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
                    {error && (
                        <div className="p-4 bg-red-50 rounded-2xl border border-red-100 flex items-center gap-3 text-red-600 font-bold mb-4">
                            <AlertCircle size={20} />
                            {error}
                        </div>
                    )}
                    <div className="space-y-4">
                        <label className="text-sm font-bold text-gray-700 uppercase tracking-widest block pl-1">Scheme</label>
                        <select
                            name="scheme"
                            value={formData.scheme}
                            onChange={handleInputChange}
                            className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium"
                        >
                            <option value="2019">2019 Scheme</option>
                            <option value="2024">2024 Scheme</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-700 uppercase tracking-widest block pl-1">Department</label>
                            <select
                                name="department"
                                required
                                value={formData.department}
                                onChange={handleInputChange}
                                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium"
                            >
                                <option value="">Select</option>
                                {departments.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-700 uppercase tracking-widest block pl-1">Semester</label>
                            <select
                                name="semester"
                                required
                                value={formData.semester}
                                onChange={handleInputChange}
                                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium"
                            >
                                <option value="">Select</option>
                                {semesters.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-sm font-bold text-gray-700 uppercase tracking-widest block pl-1">Subject Name / Code</label>
                        <input
                            name="subject"
                            required
                            placeholder="e.g. Compiler Design (CST302)"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-700 uppercase tracking-widest block pl-1">Year</label>
                            <input
                                type="number"
                                name="year"
                                value={formData.year}
                                onChange={handleInputChange}
                                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-700 uppercase tracking-widest block pl-1">Exam Type</label>
                            <select
                                name="examType"
                                value={formData.examType}
                                onChange={handleInputChange}
                                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium"
                            >
                                <option value="Regular">Regular</option>
                                <option value="Supply">Supply</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-sm font-bold text-gray-700 uppercase tracking-widest block pl-1">Tags (Comma separated)</label>
                        <input
                            name="tags"
                            placeholder="e.g. important, mid-term, repeated"
                            value={formData.tags}
                            onChange={handleInputChange}
                            className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium"
                        />
                    </div>
                </div>

                {/* File Upload Section */}
                <div className="space-y-6">
                    <div className={`h-full flex flex-col items-center justify-center border-4 border-dashed rounded-[40px] p-12 transition-all ${file ? 'border-primary-500 bg-primary-50/30' : 'border-gray-100 bg-gray-50/30 hover:border-primary-200'
                        }`}>
                        <div className="relative group cursor-pointer w-full text-center">
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100 inline-block mb-6 group-hover:scale-110 transition-transform">
                                <Upload size={40} className="text-primary-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {file ? 'Ready to upload' : 'Click to upload PDF'}
                            </h3>
                            <p className="text-gray-500 text-sm">
                                {file ? file.name : 'Maximum file size: 10MB'}
                            </p>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!file || loading}
                        className="w-full py-5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-[24px] font-bold text-lg shadow-xl shadow-primary-200 transition-all flex items-center justify-center gap-3 active:scale-95"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" size={24} />
                        ) : success ? (
                            <CheckCircle size={24} />
                        ) : (
                            <>Upload Questions <ChevronRight size={24} /></>
                        )}
                        {loading && 'Processing...'}
                        {success && 'Uploaded Successfully!'}
                    </button>

                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-green-50 rounded-2xl border border-green-100 flex items-center gap-3 text-green-700 font-bold"
                        >
                            <CheckCircle size={20} />
                            Files saved and database updated!
                        </motion.div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default UploadPYQ;
