import { Database } from './database.types';

export type SelectOptionType = {
  id: string;
  label: string;
  value: string;
  children?: SelectOptionChildType[];
};

export type SelectOptionChildType = {
  id: string;
  label: string;
  value: string;
};

export type Tab = { name: string; element: React.FC };

export type AllTableNames = keyof Database['public']['Tables'];
