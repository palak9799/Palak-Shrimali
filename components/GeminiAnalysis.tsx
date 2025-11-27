import React, { useState } from 'react';
import { Sparkles, Loader2, MessageSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Expense } from '../types';
import { getFinancialInsights } from '../services/geminiService';

interface GeminiAnalysisProps {
  expenses: Expense[];
}

const GeminiAnalysis: React.FC<GeminiAnalysisProps> = ({ expenses }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setAnalysis(null);
    try {
      const result = await getFinancialInsights(expenses);
      setAnalysis(result);
    } catch (e) {
      setAnalysis("An error occurred while communicating with the AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl shadow-sm border border-indigo-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-indigo-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          AI Financial Assistant
        </h2>
        <button
          onClick={handleAnalyze}
          disabled={loading || expenses.length === 0}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <MessageSquare className="w-4 h-4" />
              Get Insights
            </>
          )}
        </button>
      </div>

      {expenses.length === 0 && !analysis && (
        <p className="text-indigo-400 text-sm">Add some expenses to unlock AI insights.</p>
      )}

      {analysis && (
        <div className="bg-white p-5 rounded-lg border border-indigo-100 text-slate-700 text-sm leading-relaxed animate-fade-in shadow-sm">
          <div className="prose prose-sm max-w-none prose-indigo">
             <ReactMarkdown>{analysis}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiAnalysis;
