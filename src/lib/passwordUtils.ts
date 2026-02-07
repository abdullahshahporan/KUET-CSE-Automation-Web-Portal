/**
 * Password Utilities for Authentication
 * Handles password hashing, generation, and validation
 */

import bcrypt from 'bcryptjs';

/**
 * Hash a plain text password using bcrypt
 * @param password - Plain text password
 * @returns Promise with bcrypt hash
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

/**
 * Compare a plain text password with a bcrypt hash
 * @param password - Plain text password
 * @param hash - Bcrypt hash to compare against
 * @returns Promise with boolean result
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

/**
 * Generate a random 6-digit password for teachers
 * @returns 6-digit numeric string (e.g., "123456")
 */
export function generateTeacherPassword(): string {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
}

/**
 * Get initial password for a student (their roll number)
 * @param rollNo - Student roll number
 * @returns Roll number as password
 */
export function getStudentInitialPassword(rollNo: string): string {
  return rollNo;
}

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns Object with isValid flag and error message if invalid
 */
export function validatePassword(password: string): { isValid: boolean; error?: string } {
  if (!password || password.length < 6) {
    return { isValid: false, error: 'Password must be at least 6 characters long' };
  }
  
  if (password.length > 100) {
    return { isValid: false, error: 'Password must be less than 100 characters' };
  }
  
  return { isValid: true };
}

/**
 * Generate a secure random password
 * @param length - Length of password (default: 12)
 * @returns Random password string
 */
export function generateSecurePassword(length: number = 12): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*';
  
  const allChars = uppercase + lowercase + numbers + symbols;
  let password = '';
  
  // Ensure at least one of each type
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];
  
  // Fill the rest randomly
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
}
