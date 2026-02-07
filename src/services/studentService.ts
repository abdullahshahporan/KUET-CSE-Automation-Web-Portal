import { StudentWithAuth } from '@/lib/supabase';

// Re-export for components that import from here
export type { StudentWithAuth };

export interface AddStudentInput {
  full_name: string;
  email: string;
  phone: string;
  roll_no: string;
  term: string; // Format: '1-1', '1-2', '2-1', '2-2', '3-1', '3-2', '4-1', '4-2'
  session: string; // e.g., '2024', '2023'
}

export interface AddStudentResponse {
  success: boolean;
  data?: StudentWithAuth;
  initialPassword?: string; // The initial password (roll number) - only returned once!
  error?: string;
}

/**
 * Helper function to generate term string from year and term number
 */
export function formatTerm(year: number, termNumber: number): string {
  return `${year}-${termNumber}`;
}

/**
 * Helper function to generate session from batch year
 */
export function formatSession(batch: string): string {
  return `20${batch}`;
}

/**
 * Add a new student to the system using server-side API
 */
export async function addStudent(input: AddStudentInput): Promise<AddStudentResponse> {
  try {
    const response = await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error('Error adding student:', error);
    return {
      success: false,
      error: error.message || 'Failed to add student',
    };
  }
}

/**
 * Fetch all students with their auth info using server-side API
 */
export async function getAllStudents(): Promise<StudentWithAuth[]> {
  try {
    const response = await fetch('/api/students');
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error fetching students:', error);
    return [];
  }
}

/**
 * Update student information (TODO: Implement with API route)
 */
export async function updateStudent(
  userId: string,
  updates: Partial<AddStudentInput>
): Promise<AddStudentResponse> {
  console.warn('updateStudent not yet implemented with API');
  return {
    success: false,
    error: 'Update functionality not yet implemented',
  };
}

/**
 * Delete (deactivate) a student using server-side API
 */
export async function deleteStudent(userId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`/api/students?userId=${userId}`, {
      method: 'DELETE',
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error('Error deleting student:', error);
    return {
      success: false,
      error: error.message || 'Failed to delete student',
    };
  }
}

/**
 * Search students by name, roll, or session (TODO: Implement with API route)
 */
export async function searchStudents(query: string): Promise<StudentWithAuth[]> {
  console.warn('searchStudents not yet implemented with API');
  return [];
}

/**
 * Get students by session (batch) (TODO: Implement with API route)
 */
export async function getStudentsBySession(session: string): Promise<StudentWithAuth[]> {
  console.warn('getStudentsBySession not yet implemented with API');
  return [];
}

/**
 * Get students by term (TODO: Implement with API route)
 */
export async function getStudentsByTerm(term: string): Promise<StudentWithAuth[]> {
  console.warn('getStudentsByTerm not yet implemented with API');
  return [];
}
