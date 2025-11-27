import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { ExpenseCategory } from '../types';

interface ExpenseFormProps {
  onAddExpense: (expense: { description: string; amount: number; date: string; category: string }) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState<string>(ExpenseCategory.FOOD);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !date) return;

    onAddExpense({
      description,
      amount: parseFloat(amount),
      date,
      category,
    });

    setDescription('');
    setAmount('');
    // Keep date as today or user's last choice
    // Reset category to default
    setCategory(ExpenseCategory.FOOD);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <PlusCircle className="w-5 h-5 text-brand-600" />
        Add New Expense
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Lunch at Cafe"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-slate-700 mb-1">Amount ($)</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all bg-white"
          >
            {Object.values(ExpenseCategory).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
