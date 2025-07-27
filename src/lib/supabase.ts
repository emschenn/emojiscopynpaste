import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface EmojiItem {
  id: string;
  emoji: string;
  description?: string;
  tags: string[];
  created_at?: string;
  updated_at?: string;
}

export class EmojiService {
  static async getAll(): Promise<EmojiItem[]> {
    const { data, error } = await supabase
      .from('emojis')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching emojis:', error);
      throw error;
    }

    return data || [];
  }

  static async create(emoji: string, description?: string, tags: string[] = []): Promise<EmojiItem> {
    const { data, error } = await supabase
      .from('emojis')
      .insert({
        emoji,
        description,
        tags,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating emoji:', error);
      throw error;
    }

    return data;
  }

  static async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('emojis')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting emoji:', error);
      throw error;
    }
  }

  static async update(id: string, updates: Partial<Pick<EmojiItem, 'emoji' | 'description' | 'tags'>>): Promise<EmojiItem> {
    const { data, error } = await supabase
      .from('emojis')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating emoji:', error);
      throw error;
    }

    return data;
  }

  static async search(query: string): Promise<EmojiItem[]> {
    const { data, error } = await supabase
      .from('emojis')
      .select('*')
      .or(`emoji.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error searching emojis:', error);
      throw error;
    }

    return data || [];
  }
}