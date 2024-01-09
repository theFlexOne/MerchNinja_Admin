import { createClient } from '@supabase/supabase-js';
import { Database } from '../../types/database.types';

const env = import.meta.env.VITE_NODE_ENV as string;
const devEnv = import.meta.env.VITE_DATABASE_URL as string;
const devKey = import.meta.env.VITE_DATABASE_KEY as string;
const prodEnv = import.meta.env.VITE_SUPABASE_URL as string;
const prodKey = import.meta.env.VITE_SUPABASE_KEY as string;

const databaseUrl = env === 'development' ? devEnv : prodEnv;
const databaseKey = env === 'development' ? devKey : prodKey;

const supabase = createClient<Database>(databaseUrl, databaseKey);

export default supabase;
