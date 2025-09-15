
import React from 'react';
import { LogoIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="text-center animate-fade-in">
      <div className="flex justify-center items-center gap-4">
        <LogoIcon />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
          AI Prompt Generator
        </h1>
      </div>
      <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
        Craft the perfect prompt for any task. Turn your simple ideas into detailed, AI-ready instructions.
      </p>
    </header>
  );
};

export default Header;
