import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de autenticação
    console.log('Login com:', { email, password });
    // Redirecionar após login bem-sucedido
    // navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center">
      
      <div className="bg-[#303030] rounded-lg p-7 w-full max-w-[380px] flex flex-col items-stretch gap-[14px]">
        
        {/* Logo */}
        <div className="w-full flex justify-center mb-1">
          <img 
            src="assets/logo.webp" 
            alt="Logo Turmaline"
            className="h-[38px]"
          />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-[#00e5ff] w-full text-center mb-1">
          Login
        </h1>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-[14px]">
          
          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-white">
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="exemple@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#1a1a1a] border border-gray-600 rounded py-2.5 px-2.5 text-white font-sans text-sm outline-none focus:border-[#00e5ff] focus:ring-2 focus:ring-[rgba(0,229,255,0.15)] transition-all"
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm text-white">
              Password:
            </label>
            <input
              type="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#1a1a1a] border border-gray-600 rounded py-2.5 px-2.5 text-white font-sans text-sm outline-none focus:border-[#00e5ff] focus:ring-2 focus:ring-[rgba(0,229,255,0.15)] transition-all"
              required
            />
          </div>

          {/* Forgot Password */}
          <a 
            href="#" 
            className="text-xs text-[#00e5ff] hover:text-[#0094ff] -mt-2 ml-0.5 transition-colors"
          >
            forgot password?
          </a>

          {/* Login Button */}
          <button
            type="submit"
            className="w-3/5 mx-auto block py-2.5 px-0 bg-[#00e5ff] text-[#050505] font-bold text-sm rounded hover:bg-[#0094ff] hover:text-white transition-all duration-200 mt-1.5"
          >
            Login
          </button>

        </form>

        {/* Register Link */}
        <p className="text-sm text-gray-400 w-full text-center mt-1">
          Don't have an account? <a href="#" className="text-[#00e5ff] hover:text-[#0094ff] transition-colors">Register here</a>
        </p>

      </div>

    </div>
  );
}
