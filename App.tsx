import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Summary from './components/Summary';
import GeminiAnalysis from './components/GeminiAnalysis';
import { Expense } from './types';
import { Wallet } from 'lucide-react';

const App: React.FC = () => {
  // Initialize state from local storage if available
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('expenses');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Save to local storage whenever expenses change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (newExpenseData: { description: string; amount: number; date: string; category: string }) => {
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      ...newExpenseData,
    };
    setExpenses((prev) => [...prev, newExpense]);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <div className="flex items-center gap-3">
            <div className="bg-brand-600 p-2 rounded-lg text-white">
              <Wallet className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">SpendSmart</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Form and AI */}
          <div className="lg:col-span-1 space-y-6">
            <ExpenseForm onAddExpense={addExpense} />
            <GeminiAnalysis expenses={expenses} />
          </div>

          {/* Right Column: Stats and List */}
          <div className="lg:col-span-2 space-y-6">
            <Summary expenses={expenses} />
            
            <div>
              <h2 className="text-lg font-semibold text-slate-800 mb-4 ml-1">Recent Transactions</h2>
              <ExpenseList expenses={expenses} onDelete={deleteExpense} />
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default App;
