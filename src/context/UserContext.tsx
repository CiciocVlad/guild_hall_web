import { Dispatch, SetStateAction, createContext } from 'react';

interface TimeOff {
  start_date: string;
  end_date: string;
  number_of_days: number;
}

export interface Attribute {
  name: string;
  category: string;
}

export interface Project {
  id?: string | null;
  title?: string | null;
  category?: string | null;
  description?: string | null;
  user_impact?: string | null;
  attributes?: Attribute[] | null;
}

interface Events {
  days_for_current_year: number;
  days_extra: number;
  taken_days: number;
  remaining_days: number;
  all_taken_days: Array<TimeOff>;
}

export enum Type {
  Article = 'Article',
  Quote = 'Best of Quotes',
}

export interface Article {
  inserted_at: string;
  link: string;
  type: Type;
}

export interface Quote {
  inserted_at: string;
  quote: string;
  type: Type;
}

export type User = {
  id: string;
  name: string;
  preferred_name: string;
  email: string;
  avatar: string;
  bio?: string;
  hobbies?: Array<string>;
  phone?: string;
  job_title?: string;
  social_media: { [key: string]: string };
  joined_date?: Date;
  left_date?: Date;
  time_off: TimeOff;
  calendar_events: Events;
  projects: Array<Project>;
  articles: Array<Article>;
  quotes: Array<Quote>;
  is_admin: boolean;
};

interface UserContext {
  user?: User;
  setUser?: Dispatch<SetStateAction<any>>;
}

export const UserContext = createContext<UserContext>({});
