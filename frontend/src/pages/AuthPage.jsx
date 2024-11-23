import { useState } from 'react';
import { motion } from 'framer-motion';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';

const AuthPage = () => {
  const [view, setView] = useState('login');

  return (
    <div className="min-h-screen pt-24 bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            {view === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-slate-400">
            {view === 'login' 
              ? 'Enter your credentials to access your account' 
              : 'Sign up to get started with our services'}
          </p>
        </div>

        {view === 'login' ? (
          <LoginForm onClose={() => {}} />
        ) : (
          <RegisterForm onClose={() => {}} />
        )}

        <div className="mt-6 text-center text-gray-400">
          {view === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => setView('register')}
                className="text-cyan-500 hover:text-cyan-400"
              >
                Register
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => setView('login')}
                className="text-cyan-500 hover:text-cyan-400"
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 