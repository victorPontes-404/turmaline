import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const navLinksRef = useRef([]);

  const handleKeyDown = (e, index) => {
    const links = navLinksRef.current;
    let nextIndex = index;

    // Tab - ir para próximo link
    if (e.key === 'Tab' && !e.shiftKey) {
      if (index === links.length - 1) {
        // Último link - deixar Tab funcionar normalmente
        return;
      }
      e.preventDefault();
      nextIndex = index + 1;
    }
    // Shift + Tab - ir para link anterior
    else if (e.key === 'Tab' && e.shiftKey) {
      if (index === 0) {
        // Primeiro link - deixar Shift+Tab funcionar normalmente
        return;
      }
      e.preventDefault();
      nextIndex = index - 1;
    }

    if (nextIndex !== index) {
      links[nextIndex]?.focus();
    }
  };

  return (
    <nav
      className="w-3/5 mx-auto py-5 px-0 bg-[#303030] rounded-[20px] mt-0"
      aria-label="Navegação Principal"
      role="navigation"
    >
      <div className="flex justify-between items-center px-6">
        <div className="flex items-center">
          <img
            src="assets/logo.webp"
            alt="Logo Turmaline"
            className="h-10"
          />
        </div>

        <ul className="flex gap-6 list-none m-0 p-0">
          <li>
            <Link
              ref={(el) => (navLinksRef.current[0] = el)}
              to="/login"
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, 0)}
              className="text-[#00e5ff] font-medium hover:text-[#0094ff] focus:text-[#0094ff] focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:ring-offset-2 focus:ring-offset-[#303030] rounded px-2 py-1 transition-colors"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              ref={(el) => (navLinksRef.current[1] = el)}
              to="/register"
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, 1)}
              className="text-[#00e5ff] font-medium hover:text-[#0094ff] focus:text-[#0094ff] focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:ring-offset-2 focus:ring-offset-[#303030] rounded px-2 py-1 transition-colors"
            >
              Cadastro
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}