import { TopicSession } from '../types';

const STORAGE_KEY = 'news_to_post_sessions';

export const saveSession = (session: TopicSession): void => {
  try {
    const existingData = localStorage.getItem(STORAGE_KEY);
    const sessions: TopicSession[] = existingData ? JSON.parse(existingData) : [];
    
    const index = sessions.findIndex(s => s.id === session.id);
    if (index >= 0) {
      sessions[index] = session;
    } else {
      sessions.push(session);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch (error) {
    console.error('Failed to save session', error);
  }
};

export const getSessions = (): TopicSession[] => {
  try {
    const existingData = localStorage.getItem(STORAGE_KEY);
    return existingData ? JSON.parse(existingData) : [];
  } catch (error) {
    console.error('Failed to load sessions', error);
    return [];
  }
};

export const createSession = (topic: string): TopicSession => {
  return {
    id: crypto.randomUUID(),
    topic,
    articles: [],
    selectedArticleIds: [],
    generatedContent: null,
    createdAt: Date.now()
  };
};