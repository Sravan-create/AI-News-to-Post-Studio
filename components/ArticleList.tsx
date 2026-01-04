import React from 'react';
import { Article } from '../types';
import { ExternalLink, CheckCircle2, Circle } from 'lucide-react';

interface ArticleListProps {
  articles: Article[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  selectedIds,
  onToggleSelect,
  onGenerate,
  isGenerating
}) => {
  const isMaxSelected = selectedIds.length >= 3;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Select Articles</h2>
          <p className="text-sm text-gray-500">Choose up to 3 articles to base your content on.</p>
        </div>
        <div className="flex items-center gap-4">
          <span className={`text-sm font-medium ${selectedIds.length === 3 ? 'text-green-600' : 'text-gray-500'}`}>
            {selectedIds.length}/3 selected
          </span>
          <button
            onClick={onGenerate}
            disabled={selectedIds.length === 0 || isGenerating}
            className="bg-gray-900 hover:bg-black text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isGenerating ? 'Generating...' : 'Generate Ideas'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((article) => {
          const isSelected = selectedIds.includes(article.id);
          const isDisabled = !isSelected && isMaxSelected;

          return (
            <div
              key={article.id}
              onClick={() => !isDisabled && onToggleSelect(article.id)}
              className={`
                relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-200
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50/50 shadow-md transform scale-[1.01]' 
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'}
                ${isDisabled ? 'opacity-50 cursor-not-allowed grayscale' : ''}
              `}
            >
              <div className="absolute top-5 right-5">
                {isSelected ? (
                  <CheckCircle2 className="w-6 h-6 text-blue-500 fill-blue-50" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-300" />
                )}
              </div>

              <div className="pr-8">
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md mb-2 font-medium">
                  {article.source}
                </span>
                <h3 className="font-semibold text-gray-900 leading-tight mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {article.snippet}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center text-xs text-blue-600 hover:underline gap-1"
                >
                  Read full story <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};