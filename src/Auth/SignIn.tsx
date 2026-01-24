"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SignInProps {
  onToggleForm: () => void;
}

export default function SignIn({ onToggleForm }: SignInProps) {
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState('123456@');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign in:', { email, password });
    router.push('/dashboard');
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Sign In
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Sign in with your KUET Official E-mail
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all font-medium"
            required
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all font-medium"
            required
          />
        </div>

        <div className="text-center">
          <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors font-medium">
            Forgot Your Password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 transform hover:scale-[1.02] transition-all duration-300 shadow-lg"
        >
          Sign In
        </button>
      </form>

      {/* Mobile Toggle */}
      <div className="text-center lg:hidden pt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{' '}
          <button
            onClick={onToggleForm}
            className="text-cyan-500 hover:text-cyan-600 font-semibold"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
