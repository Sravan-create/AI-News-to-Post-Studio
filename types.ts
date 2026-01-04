export interface Article {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  snippet: string;
}

export interface GeneratedContent {
  hooks: string[];
  caption: string;
  imagePrompt: string;
}

export interface TopicSession {
  id: string;
  topic: string;
  articles: Article[];
  selectedArticleIds: string[];
  generatedContent: GeneratedContent | null;
  createdAt: number;
}

export enum AppState {
  IDLE = 'IDLE',
  FETCHING_ARTICLES = 'FETCHING_ARTICLES',
  SELECTING_ARTICLES = 'SELECTING_ARTICLES',
  GENERATING = 'GENERATING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}