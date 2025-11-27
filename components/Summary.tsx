import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { Expense } from '../types';

interface SummaryProps {
  expenses: Expense[];
}

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#6366f1', '#64748b'];

const Summary: React.FC<SummaryProps> = ({ expenses }) => {
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  
  // Calculate category totals
  const categoryData = Object.values(expenses.reduce((acc, curr) => {
    if (!acc[curr.category]) {
      acc[curr.category] = { name: curr.category, value: 0 };
    }
    acc[curr.category].value += curr.amount;
    return acc;
  }, {} as Record<string, { name: string; value: number }>));

  // Find max expense
  const maxExpense = expenses.length > 0 
    ? expenses.reduce((prev, current) => (prev.amount > current.amount) ? prev : current)
    : null;

  return (
    <div className="grid grid-cols-1 gap-6 mb-6">
      {/* Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-brand-100 text-brand-600 rounded-full">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Spent</p>
            <h3 className="text-2xl font-bold text-slate-800">${total.toFixed(2)}</h3>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Top Category</p>
            <h3 className="text-lg font-bold text-slate-800 truncate">
              {categoryData.length > 0 ? categoryData.sort((a,b) => b.value - a.value)[0].name : 'N/A'}
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Entries</p>
            <h3 className="text-2xl font-bold text-slate-800">{expenses.length}</h3>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      {expenses.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center">
          <h3 className="text-slate-700 font-semibold mb-4 w-full text-left">Spending by Category</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
