import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="w-3/5 mx-auto py-5 px-0 bg-[#303030] rounded-[20px] mt-0" aria-label="Navegação Principal">
      <div className="flex justify-between items-center px-6">
        <div className="flex items-center">
          <img
            src="assets/logo.webp"
            alt="Logo Turmaline"
            className="h-10"
          />
        </div>

        <ul className="flex gap-6 list-none">
          <li>
            <Link
              to="/login"
              className="text-[#00e5ff] font-medium hover:text-[#0094ff] transition-colors"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="text-[#00e5ff] font-medium hover:text-[#0094ff] transition-colors"
            >
              Cadastro
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
