import { Github, Mail } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full bg-white border-t border-gray-200 py-6 px-4 mt-auto"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm text-gray-500">
          © {new Date().getFullYear()} FlashWords — Учи английский легко.
        </span>

        <div className="flex items-center gap-4">
          <a
            href="mailto:support@flashwords.app"
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition"
          >
            <Mail size={16} />
            support@flashwords.app
          </a>

          <a
            href="https://github.com/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </motion.footer>
  );
};
