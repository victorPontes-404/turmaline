import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginUser({ email, password });
      login(data.access_token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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

        {/* Error Message */}
        {error && (
          <p className="text-sm text-red-400 text-center -mb-1 bg-red-400/10 border border-red-400/30 rounded px-3 py-2">
            {error}
          </p>
        )}

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
            disabled={loading}
            className="w-3/5 mx-auto block py-2.5 px-0 bg-[#00e5ff] text-[#050505] font-bold text-sm rounded hover:bg-[#0094ff] hover:text-white transition-all duration-200 mt-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Entrando...' : 'Login'}
          </button>

        </form>

        {/* Register Link */}
        <p className="text-sm text-gray-400 w-full text-center mt-1">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#00e5ff] hover:text-[#0094ff] transition-colors">
            Register here
          </Link>
        </p>

      </div>

    </div>
  );
}
