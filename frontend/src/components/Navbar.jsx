import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="w-3/5 mx-auto py-5 px-0 bg-[#303030] rounded-[20px] mt-0">
      <div className="flex justify-between items-center px-6">
        <div className="flex items-center">
          <img 
            src="assets/logo.png" 
            alt="Logo Turmaline" 
            className="h-10"
          />
        </div>
        <div className="flex gap-6">
          <Link 
            to="/login" 
            className="text-[#00e5ff] font-medium hover:text-[#0094ff] transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
