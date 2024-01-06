import { Database } from './database.types';

export type SelectOption = {
  id: string | null;
  label: string;
  value: string;
};

export type Tab = { name: string; element: React.FC };

export type AllTableNames = keyof Database['public']['Tables'];
