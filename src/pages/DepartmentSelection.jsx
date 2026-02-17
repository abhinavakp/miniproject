import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { departments } from '../data/mockData';
import Card from '../components/Card';
import { Monitor, Anchor, Cpu, Zap, Settings } from 'lucide-react';

const DepartmentSelection = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const schemeId = searchParams.get('scheme');

    const handleSelect = (deptId) => {
        navigate(`/semesters?scheme=${schemeId}&dept=${deptId}`);
    };

    const icons = {
        'CSE': Monitor,
        'CIVIL': Anchor,
        'MECH': Settings, // Gear icon
        'ECE': Cpu,
        'EEE': Zap
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Department</h1>
                <p className="text-gray-500">Choose your engineering branch</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments.map((dept, index) => {
                    const Icon = icons[dept.id] || Monitor;
                    return (
                        <Card
                            key={dept.id}
                            delay={index * 0.05}
                            onClick={() => handleSelect(dept.id)}
                            className="flex items-center gap-4 hover:bg-primary-50/50 transition-colors"
                        >
                            <div className={`p-4 rounded-2xl ${index % 2 === 0 ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                                }`}>
                                <Icon size={28} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{dept.name}</h3>
                                <p className="text-sm text-gray-500">Code: {dept.code}</p>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default DepartmentSelection;
