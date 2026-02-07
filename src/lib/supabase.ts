import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

const isConfigured = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co' &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'placeholder-anon-key'
);

if (!isConfigured && typeof window !== 'undefined') {
  console.error('⚠️ SUPABASE CONFIGURATION MISSING!');
  console.error('Please create .env.local file with:');
  console.error('NEXT_PUBLIC_SUPABASE_URL=your_supabase_url');
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key');
  console.error('Get these from: https://app.supabase.com/project/YOUR_PROJECT_ID/settings/api');
}

// Create Supabase client (with placeholder values if not configured)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to check if Supabase is configured
export const isSupabaseConfigured = () => isConfigured;

// Database types based on schema
export type TeacherDesignation = 'PROFESSOR' | 'ASSOCIATE_PROFESSOR' | 'ASSISTANT_PROFESSOR' | 'LECTURER';
export type UserRole = 'ADMIN' | 'TEACHER' | 'STUDENT';

// Profile = auth only (email + password + role)
export interface Profile {
  user_id: string;
  role: UserRole;
  email: string;
  is_active: boolean;
  last_login: string | null;
  created_at: string;
  updated_at: string;
}

// Teacher = all faculty data (self-contained, no profile join needed for display)
export interface Teacher {
  user_id: string;
  teacher_uid: string;
  full_name: string;
  phone: string;
  designation: TeacherDesignation;
  department: string;
  office_room: string | null;
  created_at: string;
  updated_at: string;
}

// Teacher with auth info (only when you need email/is_active)
export interface TeacherWithAuth extends Teacher {
  profile: Profile;
}

// Student = all student data (self-contained)
export interface Student {
  user_id: string;
  roll_no: string;
  full_name: string;
  phone: string;
  term: string;
  session: string;
  batch: string | null;
  section: string | null;
  cgpa: number;
  created_at: string;
  updated_at: string;
}

// Student with auth info (only when you need email/is_active)
export interface StudentWithAuth extends Student {
  profile: Profile;
}
