import React from 'react';

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
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>

        <p className="text-sm text-gray-400">this has AA acessibility by WCAG</p>
        <p className="text-xs text-gray-600">&copy; 2026 Turmaline. All rights reserved.</p>

      </div>
    </footer>
  );
}
