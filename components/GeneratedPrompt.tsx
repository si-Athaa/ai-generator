
import React, { useState, useCallback } from 'react';
import { ClipboardIcon, CheckIcon } from './Icons';

interface GeneratedPromptProps {
  prompt: string;
}

const GeneratedPrompt: React.FC<GeneratedPromptProps> = ({ prompt }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [prompt]);

  return (
    <div className="bg-base-200 rounded-2xl shadow-lg border border-base-300 relative">
      <div className="p-6 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-100 mb-4">Your Generated Prompt</h3>
        <p className="text-gray-300 whitespace-pre-wrap bg-base-300 p-4 rounded-lg leading-relaxed">{prompt}</p>
      </div>
       <button
        onClick={handleCopy}
        className="absolute top-4 right-4 p-2 rounded-lg bg-base-300 hover:bg-brand-primary text-gray-300 hover:text-white transition-colors duration-200"
        aria-label="Copy prompt to clipboard"
      >
        {copied ? <CheckIcon /> : <ClipboardIcon />}
      </button>
    </div>
  );
};

export default GeneratedPrompt;
