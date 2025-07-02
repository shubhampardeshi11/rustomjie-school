import React, { useState } from 'react';
import axios from 'axios';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NewsEvents = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/newsletter/subscribe`, { email });
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to subscribe. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-8 pb-16">
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex flex-col items-center mt-12 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Stay Informed</h1>
          <p className="text-gray-700 text-center max-w-2xl mb-8">
            Subscribe to our newsletter for the latest updates, news, and events from Academy Central. We send out newsletters once a month.
          </p>
        </div>
        {submitted ? (
          <div className="text-green-600 text-lg font-semibold text-center">Thank you for subscribing!</div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
            <input
              type="email"
              className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 mb-4"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              pattern={emailRegex.source}
              disabled={submitted}
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-full shadow mb-4 disabled:opacity-60"
              disabled={submitted}
            >
              Subscribe
            </button>
            {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
          </form>
        )}
        <div className="flex flex-col items-center mt-2">
          <a
            href="#"
            className="text-xs text-blue-700 underline hover:text-blue-900 text-center"
          >
            We respect your privacy. Read our Privacy Policy.
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsEvents; 