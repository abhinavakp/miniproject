import React from 'react';
import { useNavigate } from 'react-router-dom';
import { schemes } from '../data/mockData';
import Card from '../components/Card';
import { Calendar, ChevronRight } from 'lucide-react';

const SchemeSelection = () => {
    const navigate = useNavigate();

    const handleSelect = (schemeId) => {
        // Navigate to department selection with scheme ID
        navigate(`/departments?scheme=${schemeId}`);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 mb-4">
                    Select Your Scheme
                </h1>
                <p className="text-xl text-gray-500">Choose your implementation year to continue</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {schemes.map((scheme, index) => (
                    <Card
                        key={scheme.id}
                        delay={index * 0.1}
                        onClick={() => handleSelect(scheme.id)}
                        className="group hover:ring-2 hover:ring-primary-500/50 transition-all"
                    >
                        <div className="flex items-start justify-between">
                            <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <Calendar size={32} />
                            </div>
                            <div className="p-2 rounded-full bg-gray-50 text-gray-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                                <ChevronRight size={24} />
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{scheme.name}</h3>
                        <p className="text-gray-500 mb-6">{scheme.description}</p>

                        <div className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-semibold rounded-full w-fit">
                            KTU Updated
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default SchemeSelection;
