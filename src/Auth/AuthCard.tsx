"use client";

import { BookOpen } from 'lucide-react';
import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function AuthCard() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-4xl">
        {/* Desktop Layout */}
        <div className="hidden lg:flex bg-white rounded-lg shadow-md overflow-hidden min-h-[520px] border border-gray-200">
          {/* Form Side */}
          <div className="flex-1 flex items-center justify-center p-10">
            {isSignUp ? (
              <SignUp onToggleForm={() => setIsSignUp(false)} />
            ) : (
              <SignIn onToggleForm={() => setIsSignUp(true)} />
            )}
          </div>

          {/* Side Panel — Deep Brown, Professional */}
          <div className="flex-1 bg-[#3B1F12] flex items-center justify-center p-10">
            <div className="text-center text-white space-y-5">
              <div className="w-16 h-16 mx-auto bg-[#5D4037] rounded-lg flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-[#E8D5C4]" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  KUET CSE
                </h2>
                <p className="text-sm text-[#D6C4B2] mt-1">Automation Portal</p>
              </div>

              <p className="text-sm text-[#B5A393] max-w-xs mx-auto leading-relaxed">
                Department of Computer Science and Engineering — Khulna University of Engineering & Technology
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="bg-[#3B1F12] p-6 text-center text-white">
            <div className="w-14 h-14 mx-auto bg-[#5D4037] rounded-lg flex items-center justify-center mb-3">
              <BookOpen className="w-7 h-7 text-[#E8D5C4]" />
            </div>
            <h2 className="text-xl font-bold">KUET CSE Portal</h2>
            <p className="text-xs text-[#B5A393] mt-1">Admin & Teacher Access</p>
          </div>
          
          <div className="p-6">
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
