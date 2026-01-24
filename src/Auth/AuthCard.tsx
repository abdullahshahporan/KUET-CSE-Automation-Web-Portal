"use client";

import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function AuthCard() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-6xl">
        <div className="hidden lg:flex bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden min-h-[700px] border-2 border-gray-200 dark:border-gray-800">
          <div className={`flex-1 flex items-center justify-center p-12 transition-all duration-700 ${isSignUp ? 'order-2' : 'order-1'}`}>
            {isSignUp ? (
              <SignUp onToggleForm={() => setIsSignUp(false)} />
            ) : (
              <SignIn onToggleForm={() => setIsSignUp(true)} />
            )}
          </div>

          <div className={`flex-1 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 flex items-center justify-center p-12 transition-all duration-700 ${isSignUp ? 'order-1' : 'order-2'} relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
            
            <div className="text-center text-white space-y-6 relative z-10">
              <div className="mb-4">
                <div className="w-20 h-20 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 border-4 border-white/30">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <h2 className="text-4xl font-bold drop-shadow-lg">
                {isSignUp ? 'Welcome Back!' : 'Welcome to KUET!'}
              </h2>
              <p className="text-lg opacity-95 max-w-md mx-auto leading-relaxed">
                {isSignUp 
                  ? 'To keep connected with the university portal, please login with your credentials'
                  : 'Register with your university credentials to access all portal features'
                }
              </p>
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="px-12 py-3 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:hidden bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-800">
          <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 p-8 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-indigo-500/20 rounded-full blur-2xl" />
            <div className="w-20 h-20 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 border-4 border-white/30 relative z-10">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-2 relative z-10 drop-shadow-lg">
              {isSignUp ? 'Create Account' : 'KUET Portal'}
            </h2>
            <p className="text-base opacity-95 relative z-10">
              {isSignUp 
                ? 'Sign up to get started'
                : 'Student Access Portal'
              }
            </p>
          </div>
          <div className="p-8">
            {isSignUp ? (
              <SignUp onToggleForm={() => setIsSignUp(false)} />
            ) : (
              <SignIn onToggleForm={() => setIsSignUp(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
