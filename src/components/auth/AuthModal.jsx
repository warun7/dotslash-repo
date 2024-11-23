import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export const AuthModal = ({ isOpen, onClose, initialView = 'login' }) => {
  const [view, setView] = useState(initialView);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <div className="relative w-full max-w-md">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {view === 'login' ? (
            <LoginForm onClose={onClose} />
          ) : (
            <RegisterForm onClose={onClose} />
          )}

          <div className="mt-4 text-center text-gray-400">
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
      </motion.div>
    </AnimatePresence>
  );
}; 