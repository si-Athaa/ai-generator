
import React from 'react';
import { PromptCategory } from '../types';
import { ImageIcon, BookOpenIcon, MegaphoneIcon, CodeBracketIcon, FeatherIcon } from './Icons';

interface CategorySelectorProps {
  selectedCategory: PromptCategory;
  onSelectCategory: (category: PromptCategory) => void;
}

const categoryOptions = [
  { value: PromptCategory.IMAGE, label: 'Image', icon: <ImageIcon /> },
  { value: PromptCategory.STORY, label: 'Story', icon: <BookOpenIcon /> },
  { value: PromptCategory.MARKETING, label: 'Marketing', icon: <MegaphoneIcon /> },
  { value: PromptCategory.CODE, label: 'Code', icon: <CodeBracketIcon /> },
  { value: PromptCategory.POEM, label: 'Poem', icon: <FeatherIcon /> },
];

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {categoryOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onSelectCategory(option.value)}
          className={`p-3 rounded-lg border-2 flex flex-col items-center justify-center gap-2 transition-all duration-200 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-200 focus:ring-brand-primary
            ${
              selectedCategory === option.value
                ? 'bg-brand-primary border-brand-primary text-white shadow-lg scale-105'
                : 'bg-base-300 border-gray-600 hover:bg-base-100 hover:border-gray-500'
            }`}
        >
          {option.icon}
          <span className="font-semibold text-sm">{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
