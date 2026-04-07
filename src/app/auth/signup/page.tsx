'use client';

import LightRays from '@/components/ui/LightRays';
import PillButton from '@/components/ui/PillButton';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowRight,
    Check,
    Eye,
    EyeOff,
    GraduationCap,
    Lock,
    Mail,
    Sparkles,
    User
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Contains number', met: /[0-9]/.test(password) },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For demo, redirect to sign in
    router.push('/auth/signin');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b090a] flex items-center justify-center relative overflow-hidden px-4 py-10">
      {/* Light Rays Background */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-right"
          raysColor="#818CF8"
          raysSpeed={0.5}
          lightSpread={0.8}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          pulsating={true}
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAF7F3]/80 dark:from-[#0b090a]/80 via-transparent to-[#FAF7F3]/80 dark:to-[#0b090a]/80 z-[1]" />

      {/* Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-8"
        >
          <Link href="/" className="inline-flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30"
            >
              <GraduationCap className="w-7 h-7 text-white dark:text-[#0b090a]" />
            </motion.div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-gray-700 dark:text-white">KUET CSE</h1>
              <p className="text-xs text-gray-400 dark:text-[#b1a7a6]">Automation Portal</p>
            </div>
          </Link>
        </motion.div>

        {/* Sign Up Card */}
        <motion.div variants={itemVariants}>
          <SpotlightCard className="p-8 bg-white dark:bg-transparent border border-gray-200 dark:border-transparent" spotlightColor="rgba(217, 162, 153, 0.3)">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-700 dark:text-white mb-2">Create Account</h2>
              <p className="text-gray-400 dark:text-[#b1a7a6] text-sm">Join the KUET CSE community</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-sm text-gray-700 dark:text-[#f5f3f4] font-medium">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-[#b1a7a6]/70" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-[#0b090a] border border-gray-200 dark:border-[#3d4951] rounded-xl text-gray-700 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:border-indigo-400 dark:focus:border-[#d3d3d3] focus:ring-1 focus:ring-indigo-300/50 dark:focus:ring-[#d3d3d3]/50 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm text-gray-700 dark:text-[#f5f3f4] font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-[#b1a7a6]/70" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-[#0b090a] border border-gray-200 dark:border-[#3d4951] rounded-xl text-gray-700 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:border-indigo-400 dark:focus:border-[#d3d3d3] focus:ring-1 focus:ring-indigo-300/50 dark:focus:ring-[#d3d3d3]/50 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm text-gray-700 dark:text-[#f5f3f4] font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-[#b1a7a6]/70" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50 dark:bg-[#0b090a] border border-gray-200 dark:border-[#3d4951] rounded-xl text-gray-700 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:border-indigo-400 dark:focus:border-[#d3d3d3] focus:ring-1 focus:ring-indigo-300/50 dark:focus:ring-[#d3d3d3]/50 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#b1a7a6]/70 hover:text-gray-700 dark:hover:text-white/60 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Password Requirements */}
                {password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="grid grid-cols-2 gap-2 mt-3"
                  >
                    {passwordRequirements.map((req, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-2 text-xs ${
                          req.met ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-[#b1a7a6]/70'
                        }`}
                      >
                        <Check className={`w-3.5 h-3.5 ${req.met ? '' : 'opacity-30'}`} />
                        {req.label}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <label className="text-sm text-gray-700 dark:text-[#f5f3f4] font-medium">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-[#b1a7a6]/70" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-[#0b090a] border rounded-xl text-gray-700 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:ring-1 transition-all ${
                      confirmPassword && confirmPassword !== password
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
                        : confirmPassword && confirmPassword === password
                        ? 'border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/50'
                        : 'border-gray-200 dark:border-[#3d4951] focus:border-indigo-400 dark:focus:border-[#d3d3d3] focus:ring-indigo-300/50 dark:focus:ring-[#d3d3d3]/50'
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Terms */}
              <p className="text-xs text-gray-400 dark:text-[#b1a7a6] text-center">
                By creating an account, you agree to our{' '}
                <a href="#" className="text-indigo-500 dark:text-[#d3d3d3] hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-indigo-500 dark:text-[#d3d3d3] hover:underline">Privacy Policy</a>
              </p>

              {/* Submit Button */}
              <PillButton
                type="submit"
                variant="secondary"
                size="lg"
                disabled={isLoading}
                className="w-full"
                icon={isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <ArrowRight className="w-5 h-5" />
                )}
                iconPosition="right"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </PillButton>
            </form>

            {/* Sign In Link */}
            <p className="text-center text-gray-400 dark:text-[#b1a7a6] text-sm mt-6">
              Already have an account?{' '}
              <Link 
                href="/auth/signin" 
                className="text-indigo-500 dark:text-[#d3d3d3] hover:text-[#c48b82] dark:hover:text-[#66efff] font-medium transition-colors"
              >
                Sign In
              </Link>
            </p>
          </SpotlightCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
