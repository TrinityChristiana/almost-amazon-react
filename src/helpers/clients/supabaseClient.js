import { createClient } from '@supabase/supabase-js';
import apiKeys from '../apiKeys';

export default createClient(apiKeys.supabaseUrl, apiKeys.supabaseAnonKey);
