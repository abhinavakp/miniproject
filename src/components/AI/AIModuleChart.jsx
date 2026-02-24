import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const AIModuleChart = ({ data }) => {
    // Expected data format: [{ module: 'M1', weightage: 25 }, ...]

    if (!data || data.length === 0) return null;

    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

    return (
        <div className="glass-card p-6 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md h-[400px]">
            <h3 className="text-lg font-bold text-white mb-6">Predicted Module Weightage</h3>
            <div className="h-full pb-8">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis
                            dataKey="module"
                            stroke="rgba(255,255,255,0.5)"
                            fontSize={12}
                        />
                        <YAxis
                            stroke="rgba(255,255,255,0.5)"
                            fontSize={12}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                color: '#fff'
                            }}
                        />
                        <Bar dataKey="weightage" radius={[4, 4, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AIModuleChart;
