import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function POST(request) {
  try {
    const { apiKey } = await request.json();

    // Query Supabase to check if the API key exists
    const { data, error } = await supabase
      .from('api_keys')
      .select('id')
      .eq('key', apiKey)
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ valid: !!data });
  } catch (error) {
    console.error('Error validating API key:', error);
    return NextResponse.json({ valid: false });
  }
} 