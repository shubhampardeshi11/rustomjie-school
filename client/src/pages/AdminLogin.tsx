/// <reference types="vite/client" />
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/login`, { email, password });
      if (res.data.token) {
        localStorage.setItem('adminToken', res.data.token);
        localStorage.setItem('adminData', JSON.stringify(res.data.admin));
        navigate('/admin/dashboard');
      } else {
        setError('Invalid response from server.');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#f7f9fb]">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow p-10 mx-4">
        <h2 className="text-3xl font-bold text-center mb-10">Admin Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-base font-medium mb-2">Username</label>
            <input
              id="email"
              name="email"
              type="text"
              autoComplete="username"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-[#f7f9fb] focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-base font-medium mb-2">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-[#f7f9fb] focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-base">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className="mr-2 w-5 h-5 rounded border border-gray-300 focus:ring-blue-400"
              />
              Remember Me
            </label>
            <a href="#" className="text-blue-500 text-sm hover:underline">Forgot Password?</a>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full text-base transition-all duration-200 disabled:opacity-60 mt-2"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <div className="text-red-600 text-center mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin; 