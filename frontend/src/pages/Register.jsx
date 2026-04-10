import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/auth';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      
      // Auto-login: usa o token retornado pelo cadastro
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
          Create Account
        </h1>

        {/* Error Message */}
        {error && (
          <p className="text-sm text-red-400 text-center -mb-1">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleRegister} className="flex flex-col gap-[14px]">

          {/* Name Field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm text-white">
              Full Name:
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              className="bg-[#1a1a1a] border border-gray-600 rounded py-2.5 px-2.5 text-white font-sans text-sm outline-none focus:border-[#00e5ff] focus:ring-2 focus:ring-[rgba(0,229,255,0.15)] transition-all"
              required
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-white">
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="exemple@email.com"
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
              className="bg-[#1a1a1a] border border-gray-600 rounded py-2.5 px-2.5 text-white font-sans text-sm outline-none focus:border-[#00e5ff] focus:ring-2 focus:ring-[rgba(0,229,255,0.15)] transition-all"
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword" className="text-sm text-white">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="bg-[#1a1a1a] border border-gray-600 rounded py-2.5 px-2.5 text-white font-sans text-sm outline-none focus:border-[#00e5ff] focus:ring-2 focus:ring-[rgba(0,229,255,0.15)] transition-all"
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-3/5 mx-auto block py-2.5 px-0 bg-[#00e5ff] text-[#050505] font-bold text-sm rounded hover:bg-[#0094ff] hover:text-white transition-all duration-200 mt-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Criando conta...' : 'Register'}
          </button>

        </form>

        {/* Login Link */}
        <p className="text-sm text-gray-400 w-full text-center mt-1">
          Already have an account?{' '}
          <Link to="/login" className="text-[#00e5ff] hover:text-[#0094ff] transition-colors">
            Login here
          </Link>
        </p>

      </div>

    </div>
  );
}
