import axios from 'axios';
import apiKeys from '../apiKeys';

export default axios.create({
  baseURL: `${apiKeys.supabaseUrl}/rest/v1/`,
  headers: {
    apiKey: apiKeys.supabaseAnonKey
  }
});
