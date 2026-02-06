
export type MessageRole = 'user' | 'model';

export interface Message {
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export interface Shortcut {
  key: string;
  command: string;
  description: string;
}

export interface CommonError {
  title: string;
  solutions: string[];
}
