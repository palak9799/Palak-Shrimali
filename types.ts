export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string; // ISO date string YYYY-MM-DD
  category: string;
}

export enum ExpenseCategory {
  FOOD = 'Food & Dining',
  TRANSPORT = 'Transportation',
  UTILITIES = 'Utilities',
  ENTERTAINMENT = 'Entertainment',
  SHOPPING = 'Shopping',
  HEALTH = 'Health & Wellness',
  HOUSING = 'Housing',
  OTHER = 'Other',
}

export interface ExpenseSummary {
  total: number;
  byCategory: { name: string; value: number }[];
  recentHigh: Expense | null;
}
