import React from 'react';
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="border-t border-[#303030] py-10 px-0 mt-10">
      <div className="container mx-auto flex flex-col items-center gap-5 text-center">
        
        <div className="flex flex-col items-center gap-2">
          <img 
            src="assets/logo.png" 
            alt="Logo Turmaline" 
            className="h-7"
          />
          <p className="text-sm text-gray-500">
            Documentation and project management for dev teams.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a 
            href="mailto:contact@turmaline.dev" 
            className="text-sm text-gray-400 hover:text-[#00e5ff] transition-colors"
          >
            contact@turmaline.dev
          </a>
          <a
            href="https://github.com/victorPontes-404/turmaline"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-[#00e5ff] transition-colors flex items-center gap-1"
            aria-label="Turmaline on GitHub"
          >
            <FaGithub size={18} />
            GitHub
          </a>
        </div>

        <p className="text-sm text-gray-400">this has AA acessibility by WCAG</p>
        <p className="text-xs text-gray-600">&copy; 2026 Turmaline. All rights reserved.</p>

      </div>
    </footer>
  );
}
