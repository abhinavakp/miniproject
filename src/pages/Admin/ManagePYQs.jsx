import { Search, Edit2, Trash2, Filter, ChevronLeft, ChevronRight, Eye, Loader2 } from 'lucide-react';
import { pyqAPI } from '../../utils/api';

const ManagePYQs = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDept, setSelectedDept] = useState('All');
    const [pyqs, setPyqs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPYQs = async () => {
            try {
                const response = await pyqAPI.getAll();
                setPyqs(response.data);
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPYQs();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this paper?')) {
            try {
                await pyqAPI.delete(id);
                setPyqs(prev => prev.filter(p => p._id !== id));
            } catch (error) {
                alert('Delete failed');
            }
        }
    };

    const filteredPYQs = pyqs.filter(p =>
        (selectedDept === 'All' || p.dept === selectedDept) &&
        (p.subject.toLowerCase().includes(searchTerm.toLowerCase()) || p.code.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Manage Question Papers</h1>
                    <p className="text-gray-500 mt-1">Found {filteredPYQs.length} papers in the repository.</p>
                </div>

                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search papers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none shadow-sm transition-all"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                    <div className="flex gap-2">
                        {['All', 'CSE', 'ECE', 'ME', 'CE'].map(dept => (
                            <button
                                key={dept}
                                onClick={() => setSelectedDept(dept)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedDept === dept ? 'bg-primary-600 text-white' : 'text-gray-500 hover:bg-white'
                                    }`}
                            >
                                {dept}
                            </button>
                        ))}
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white text-gray-600 rounded-xl text-sm font-bold border border-gray-100 hover:bg-gray-50 transition-all">
                        <Filter size={16} />
                        More Filters
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-50 text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50/30">
                                <th className="py-4 pl-8">Subject Detail</th>
                                <th className="py-4">Scheme</th>
                                <th className="py-4">Year / Type</th>
                                <th className="py-4">Stats</th>
                                <th className="py-4 text-right pr-8">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center">
                                        <Loader2 className="animate-spin mx-auto text-primary-600 mb-2" size={32} />
                                        <p className="text-gray-500 font-medium">Loading question papers...</p>
                                    </td>
                                </tr>
                            ) : filteredPYQs.map((p) => (
                                <tr key={p._id} className="group hover:bg-gray-50 transition-colors">
                                    <td className="py-6 pl-8">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-900">{p.subjectName}</span>
                                            <span className="text-xs text-gray-400 font-mono mt-1">{p.subjectCode || 'N/A'} • {p.department}</span>
                                        </div>
                                    </td>
                                    <td className="py-6 text-sm">
                                        <span className="px-3 py-1 bg-gray-100 rounded-lg font-bold text-gray-600">{p.scheme}</span>
                                    </td>
                                    <td className="py-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-bold text-gray-900">{p.year}</span>
                                            <span className={`text-[10px] font-bold uppercase w-fit px-2 py-0.5 rounded ${p.examType === 'Regular' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                                                }`}>
                                                {p.examType}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-6">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Eye size={16} className="text-gray-300" />
                                            <span>{p.downloadCount || 0}</span>
                                        </div>
                                    </td>
                                    <td className="py-6 text-right pr-8">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-3 bg-white text-gray-400 hover:text-blue-600 border border-gray-100 rounded-2xl hover:shadow-md transition-all">
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(p._id)}
                                                className="p-3 bg-white text-gray-400 hover:text-red-600 border border-gray-100 rounded-2xl hover:shadow-md transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/30">
                    <p className="text-sm text-gray-500 font-medium">Showing 1 to 5 of 24 results</p>
                    <div className="flex gap-2">
                        <button className="p-2 border border-gray-100 rounded-xl bg-white text-gray-400 hover:text-primary-600 transition-colors">
                            <ChevronLeft size={20} />
                        </button>
                        <button className="p-2 border border-gray-100 rounded-xl bg-white text-gray-400 hover:text-primary-600 transition-colors">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagePYQs;
