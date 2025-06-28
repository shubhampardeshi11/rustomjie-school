import React, { useState } from 'react';
import axios from 'axios';

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      const res = await axios.post('http://localhost:5001/api/students/login', {
        email,
        password
      });
      
      // Store token and user data
      localStorage.setItem('studentToken', res.data.token);
      localStorage.setItem('studentData', JSON.stringify(res.data.student));
      
      setSuccess(`Welcome, ${res.data.student.fullName}!`);
      
      // Redirect to dashboard or home page after successful login
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-xl mx-auto mt-12 bg-white rounded-lg shadow p-8 flex flex-col items-center">
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
        alt="School Building"
        className="w-full h-48 object-cover rounded-lg mb-6"
      />
      <h2 className="text-2xl font-bold mb-6 text-center">Student Login</h2>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email address"
            className="input input-bordered w-full bg-blue-50"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full bg-blue-50"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="remember"
            className="mr-2"
            checked={remember}
            onChange={e => setRemember(e.target.checked)}
          />
          <label htmlFor="remember" className="text-sm">Remember Me</label>
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded-full bg-blue-600 text-white font-semibold text-lg mb-2 hover:bg-blue-700 transition-all disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="text-center mt-2">
          <a href="#" className="text-blue-500 text-sm hover:underline">Forgot Password or Need Help Logging In?</a>
        </div>
        {error && <div className="text-red-500 text-center mt-4 p-2 bg-red-50 rounded">{error}</div>}
        {success && <div className="text-green-600 text-center mt-4 p-2 bg-green-50 rounded">{success}</div>}
      </form>
      <div className="w-full text-center mt-4">
        <a href="/student/signup" className="inline-block px-6 py-2 rounded-full border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition-all">Sign Up</a>
      </div>
    </section>
  );
};

export default StudentLogin;
