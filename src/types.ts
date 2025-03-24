export interface Book {
  id: string;
  title: string;
  author: string;
  progress: number;
  notes: string;
  cover?: string;
}

export interface SearchResult {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
}