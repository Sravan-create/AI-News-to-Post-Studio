import React, { useState, useEffect } from 'react';
import { TopicInput } from './components/TopicInput';
import { ArticleList } from './components/ArticleList';
import { GeneratorOutput } from './components/GeneratorOutput';
import { fetchNewsArticles } from './services/news';
import { generateSocialContent } from './services/ai';
import { saveSession, createSession } from './services/db';
import { TopicSession, AppState } from './types';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [session, setSession] = useState<TopicSession | null>(null);
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSearch = async (topic: string) => {
    setAppState(AppState.FETCHING_ARTICLES);
    setErrorMsg(null);
    
    // Create new session
    const newSession = createSession(topic);
    
    try {
      const articles = await fetchNewsArticles(topic);
      
      const updatedSession = { ...newSession, articles };
      setSession(updatedSession);
      saveSession(updatedSession); // Persist
      
      setAppState(AppState.SELECTING_ARTICLES);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to fetch articles. Please try another topic or check your internet connection.");
      setAppState(AppState.IDLE);
    }
  };

  const handleToggleSelect = (articleId: string) => {
    if (!session) return;
    
    const isSelected = session.selectedArticleIds.includes(articleId);
    let newSelectedIds: string[];

    if (isSelected) {
      newSelectedIds = session.selectedArticleIds.filter(id => id !== articleId);
    } else {
      if (session.selectedArticleIds.length >= 3) return; // Max 3
      newSelectedIds = [...session.selectedArticleIds, articleId];
    }

    const updatedSession = { ...session, selectedArticleIds: newSelectedIds };
    setSession(updatedSession);
    saveSession(updatedSession); // Persist
  };

  const handleGenerate = async () => {
    if (!session || session.selectedArticleIds.length === 0) return;

    setAppState(AppState.GENERATING);
    setErrorMsg(null);

    const selectedArticles = session.articles.filter(a => session.selectedArticleIds.includes(a.id));

    try {
      const generatedContent = await generateSocialContent(session.topic, selectedArticles);
      
      const updatedSession = { ...session, generatedContent };
      setSession(updatedSession);
      saveSession(updatedSession); // Persist
      
      setAppState(AppState.COMPLETED);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to generate content. The AI service might be busy.");
      setAppState(AppState.SELECTING_ARTICLES);
    }
  };

  const handleReset = () => {
    setSession(null);
    setAppState(AppState.IDLE);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 mb-10 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              AI
            </div>
            <span className="font-bold text-xl tracking-tight">Studio</span>
          </div>
          <div className="text-sm text-gray-500 font-medium">
            v1.0.0
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 max-w-6xl">
        {/* Error Banner */}
        {errorMsg && (
          <div className="max-w-2xl mx-auto mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 animate-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5" />
            <p>{errorMsg}</p>
          </div>
        )}

        {/* Step 1: Input */}
        {appState === AppState.IDLE || appState === AppState.FETCHING_ARTICLES ? (
          <div className="min-h-[60vh] flex flex-col justify-center">
            <TopicInput 
              onSearch={handleSearch} 
              isLoading={appState === AppState.FETCHING_ARTICLES} 
            />
          </div>
        ) : null}

        {/* Step 2: Selection */}
        {(appState === AppState.SELECTING_ARTICLES || appState === AppState.GENERATING) && session && (
          <ArticleList
            articles={session.articles}
            selectedIds={session.selectedArticleIds}
            onToggleSelect={handleToggleSelect}
            onGenerate={handleGenerate}
            isGenerating={appState === AppState.GENERATING}
          />
        )}

        {/* Step 3: Output */}
        {appState === AppState.COMPLETED && session?.generatedContent && (
          <GeneratorOutput 
            content={session.generatedContent} 
            onReset={handleReset} 
          />
        )}
      </main>
    </div>
  );
};

export default App;