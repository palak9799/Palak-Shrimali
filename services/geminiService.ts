import { GoogleGenAI } from "@google/genai";
import { Expense } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFinancialInsights = async (expenses: Expense[]): Promise<string> => {
  if (expenses.length === 0) {
    return "No expenses recorded yet. Add some expenses to get insights!";
  }

  // Simplify data to send fewer tokens
  const expenseSummary = expenses.map(e => `${e.date}: $${e.amount} on ${e.category} (${e.description})`).join("\n");

  const prompt = `
    Analyze the following list of expenses and provide a brief financial health assessment.
    
    Expenses:
    ${expenseSummary}
    
    Please provide:
    1. A short summary of spending habits (1-2 sentences).
    2. A "Budget Alert" if any category seems disproportionately high.
    3. One actionable tip to save money based on these specific items.
    
    Keep the tone friendly, encouraging, and professional. Format with Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "Unable to generate insights at this time.";
  } catch (error) {
    console.error("Error generating insights:", error);
    return "Sorry, I couldn't generate insights right now. Please check your connection and try again.";
  }
};
