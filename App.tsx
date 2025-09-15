
import React, { useState, useCallback } from 'react';
import { PromptCategory } from './types';
import { generatePrompt } from './services/geminiService';
import Header from './components/Header';
import CategorySelector from './components/CategorySelector';
import GeneratedPrompt from './components/GeneratedPrompt';
import Loader from './components/Loader';
import { SparklesIcon, ExclamationTriangleIcon } from './components/Icons';

const App: React.FC = () => {
  const [idea, setIdea] = useState<string>('');
  const [category, setCategory] = useState<PromptCategory>(PromptCategory.IMAGE);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!idea.trim()) {
      setError('Please enter a basic idea or keyword.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedPrompt('');

    try {
      const prompt = await generatePrompt(idea, category);
      setGeneratedPrompt(prompt);
    } catch (err) {
      setError('Failed to generate prompt. Please check your connection or API key and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [idea, category]);

  return (
    <div className="min-h-screen bg-base-100 text-content font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl mx-auto">
        <Header />
        
        <main className="mt-8 animate-fade-in">
          <div className="bg-base-200 p-6 sm:p-8 rounded-2xl shadow-lg border border-base-300">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-100 mb-4">1. What's your idea?</h2>
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g., A futuristic city at sunset, a magical forest creature, a logo for a coffee shop..."
              className="w-full h-28 p-4 bg-base-300 border border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200 resize-none text-gray-200 placeholder-gray-500"
            />
            
            <h2 className="text-xl sm:text-2xl font-bold text-gray-100 mt-6 mb-4">2. Choose a category</h2>
            <CategorySelector selectedCategory={category} onSelectCategory={setCategory} />
            
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full mt-8 py-3 px-6 bg-brand-primary hover:bg-brand-secondary text-white font-bold text-lg rounded-lg shadow-md transition-all duration-300 ease-in-out flex items-center justify-center gap-2 disabled:bg-base-300 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
            >
              {isLoading ? (
                <>
                  <Loader />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <SparklesIcon />
                  <span>Generate Prompt</span>
                </>
              )}
            </button>
          </div>
          
          {error && (
            <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg flex items-center gap-3 animate-slide-in">
              <ExclamationTriangleIcon />
              <span>{error}</span>
            </div>
          )}

          {generatedPrompt && (
            <div className="mt-8 animate-slide-in">
              <GeneratedPrompt prompt={generatedPrompt} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
