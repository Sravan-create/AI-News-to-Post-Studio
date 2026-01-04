import React from 'react';
import { GeneratedContent } from '../types';
import { Copy, ImageIcon, Type, Sparkles, RefreshCw } from 'lucide-react';

interface GeneratorOutputProps {
  content: GeneratedContent;
  onReset: () => void;
}

export const GeneratorOutput: React.FC<GeneratorOutputProps> = ({ content, onReset }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add toast notification here
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 animate-in zoom-in-95 duration-500">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="text-yellow-500" /> Generated Content
        </h2>
        <button
          onClick={onReset}
          className="text-gray-500 hover:text-gray-900 flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Start Over
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hooks Section */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Type className="w-5 h-5 text-purple-500" />
            <h3 className="font-semibold text-gray-900">Scroll-Stopping Hooks</h3>
          </div>
          <div className="space-y-3">
            {content.hooks.map((hook, idx) => (
              <div key={idx} className="group relative bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-purple-200 transition-colors">
                <p className="text-gray-800 pr-8 font-medium">"{hook}"</p>
                <button
                  onClick={() => copyToClipboard(hook)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white rounded-md text-gray-500 hover:text-purple-600"
                  title="Copy"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Caption Section */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">📱</span>
              <h3 className="font-semibold text-gray-900">Instagram Caption</h3>
            </div>
            <button
              onClick={() => copyToClipboard(content.caption)}
              className="text-gray-400 hover:text-gray-900 transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 h-full">
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{content.caption}</p>
          </div>
        </div>

        {/* Image Prompt Section */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-pink-500" />
              <h3 className="font-semibold text-gray-900">Image Prompt</h3>
            </div>
            <button
              onClick={() => copyToClipboard(content.imagePrompt)}
              className="text-gray-400 hover:text-gray-900 transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-pink-50/50 p-4 rounded-lg border border-gray-100 h-full">
            <p className="text-gray-700 italic font-mono text-sm leading-relaxed">{content.imagePrompt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};