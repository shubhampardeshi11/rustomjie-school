/// <reference types="vite/client" />

import React, { useState } from 'react';
import axios from 'axios';

const StudentSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    studentId: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    password: '',
    confirmPassword: '',
    consent: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setForm(f => ({ ...f, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const validateForm = () => {
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (!form.consent) {
      setError('You must agree to the Terms & Conditions');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const signupData = {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        dob: form.dob,
        gender: form.gender,
        studentId: form.studentId,
        address: form.address,
        city: form.city,
        state: form.state,
        zip: form.zip,
        password: form.password
      };

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/students/signup`, signupData);
      
      setSuccess('Registration successful! You can now login with your email and password.');
      
      // Clear form after successful registration
      setForm({
        fullName: '',
        email: '',
        phone: '',
        dob: '',
        gender: '',
        studentId: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        password: '',
        confirmPassword: '',
        consent: false,
      });
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        window.location.href = '/student/login';
      }, 2000);
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-xl mx-auto mt-12 bg-white rounded-lg shadow p-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6 text-center">Student Sign Up</h2>
      <form className="w-full" onSubmit={handleSubmit}>
        {/* Student Details */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">🧍 Student Details</h3>
          <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" className="input input-bordered w-full mb-2" required />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email Address" type="email" className="input input-bordered w-full mb-2" required />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" type="tel" className="input input-bordered w-full mb-2" required />
          <input name="dob" value={form.dob} onChange={handleChange} placeholder="Date of Birth" type="date" className="input input-bordered w-full mb-2" required />
          <div className="flex items-center mb-2">
            <label className="mr-2">Gender:</label>
            <select name="gender" value={form.gender} onChange={handleChange} className="input input-bordered">
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <input name="studentId" value={form.studentId} onChange={handleChange} placeholder="Student ID (optional)" className="input input-bordered w-full" />
        </div>
        {/* Address Details */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">🏠 Address Details</h3>
          <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="input input-bordered w-full mb-2" required />
          <div className="flex gap-2 mb-2">
            <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="input input-bordered w-full" required />
            <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="input input-bordered w-full" required />
          </div>
          <input name="zip" value={form.zip} onChange={handleChange} placeholder="Zip/Postal Code" className="input input-bordered w-full" required />
        </div>
        {/* Account Security */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">🔐 Account Security</h3>
          <div className="relative mb-2">
            <input name="password" value={form.password} onChange={handleChange} placeholder="Create Password" type={showPassword ? 'text' : 'password'} className="input input-bordered w-full" required />
            <button type="button" className="absolute right-2 top-2 text-sm text-blue-600" onClick={() => setShowPassword(s => !s)}>{showPassword ? 'Hide' : 'Show'}</button>
          </div>
          <input name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" type={showPassword ? 'text' : 'password'} className="input input-bordered w-full" required />
        </div>
        {/* Consent & Submission */}
        <div className="mb-4 flex items-center">
          <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} className="mr-2" required />
          <label htmlFor="consent" className="text-sm">I agree to the Terms & Conditions</label>
        </div>
        
        {error && <div className="text-red-500 text-center mb-4 p-2 bg-red-50 rounded">{error}</div>}
        {success && <div className="text-green-600 text-center mb-4 p-2 bg-green-50 rounded">{success}</div>}
        
        <button 
          type="submit" 
          className="w-full py-2 rounded-full bg-blue-600 text-white font-semibold text-lg mb-2 hover:bg-blue-700 transition-all disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Submit / Register'}
        </button>
        <div className="text-center mt-2">
          <a href="/student/login" className="text-blue-500 text-sm hover:underline">Already have an account? Login here</a>
        </div>
      </form>
    </section>
  );
};

export default StudentSignup; 