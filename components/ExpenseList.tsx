import React from 'react';
import { Trash2, ShoppingBag, Coffee, Car, Home, Zap, Activity, HelpCircle, Film } from 'lucide-react';
import { Expense, ExpenseCategory } from '../types';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case ExpenseCategory.FOOD: return <Coffee className="w-4 h-4 text-orange-500" />;
    case ExpenseCategory.SHOPPING: return <ShoppingBag className="w-4 h-4 text-purple-500" />;
    case ExpenseCategory.TRANSPORT: return <Car className="w-4 h-4 text-blue-500" />;
    case ExpenseCategory.HOUSING: return <Home className="w-4 h-4 text-indigo-500" />;
    case ExpenseCategory.UTILITIES: return <Zap className="w-4 h-4 text-yellow-500" />;
    case ExpenseCategory.HEALTH: return <Activity className="w-4 h-4 text-red-500" />;
    case ExpenseCategory.ENTERTAINMENT: return <Film className="w-4 h-4 text-pink-500" />;
    default: return <HelpCircle className="w-4 h-4 text-slate-500" />;
  }
};

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete }) => {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
        <p className="text-slate-500">No expenses recorded yet. Start tracking!</p>
      </div>
    );
  }

  // Sort by date desc
  const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Amount</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedExpenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">
                  {new Date(expense.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td className="px-6 py-4 text-sm text-slate-700 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(expense.category)}
                    <span>{expense.category}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-700">
                  {expense.description}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-900 text-right">
                  ${expense.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => onDelete(expense.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50"
                    title="Delete expense"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
