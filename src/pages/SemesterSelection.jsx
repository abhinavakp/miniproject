import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { semesters } from '../data/mockData';
import Card from '../components/Card';
import { BookOpen } from 'lucide-react';

const SemesterSelection = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const schemeId = searchParams.get('scheme');
    const deptId = searchParams.get('dept');

    const handleSelect = (semId) => {
        navigate(`/subjects?scheme=${schemeId}&dept=${deptId}&sem=${semId}`);
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Semester</h1>
                <p className="text-gray-500">Choose your current semester</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {semesters.map((sem, index) => (
                    <Card
                        key={sem.id}
                        delay={index * 0.05}
                        onClick={() => handleSelect(sem.id)}
                        className="text-center group hover:bg-gradient-to-br hover:from-primary-500 hover:to-indigo-600 hover:text-white transition-all"
                    >
                        <div className="mb-4 inline-block p-4 rounded-full bg-gray-100 text-gray-500 group-hover:bg-white/20 group-hover:text-white transition-colors">
                            <BookOpen size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-1">{sem.name}</h3>
                        <p className="text-sm text-gray-400 group-hover:text-white/80">View Subjects</p>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default SemesterSelection;
