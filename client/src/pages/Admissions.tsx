import React, { useState } from 'react';
import axios from 'axios';

const Admissions = () => {
  const [form, setForm] = useState({
    full_name: '',
    father_name: '',
    mother_name: '',
    email: '',
    phone: '',
    class_applied: '',
    city: '',
    state: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      await axios.post('http://localhost:5000/api/admissions', form);
      setSuccess('Application submitted successfully!');
      setForm({
        full_name: '', father_name: '', mother_name: '', email: '', phone: '', class_applied: '', city: '', state: '', message: ''
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow mt-12" data-aos="fade-up">
      <h2 className="text-2xl font-bold mb-6 text-blue-800 text-center">Admissions Form</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <input name="full_name" value={form.full_name} onChange={handleChange} placeholder="Full Name" className="input input-bordered w-full" required data-aos="fade-right" />
          <input name="class_applied" value={form.class_applied} onChange={handleChange} placeholder="Class Applied" className="input input-bordered w-full" required data-aos="fade-left" />
        </div>
        <div className="flex gap-4">
          <input name="father_name" value={form.father_name} onChange={handleChange} placeholder="Father's Name" className="input input-bordered w-full" required data-aos="fade-right" />
          <input name="mother_name" value={form.mother_name} onChange={handleChange} placeholder="Mother's Name" className="input input-bordered w-full" required data-aos="fade-left" />
        </div>
        <div className="flex gap-4">
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="input input-bordered w-full" required data-aos="fade-right" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="input input-bordered w-full" required data-aos="fade-left" />
        </div>
        <div className="flex gap-4">
          <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="input input-bordered w-full" required data-aos="fade-right" />
          <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="input input-bordered w-full" required data-aos="fade-left" />
        </div>
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" className="input input-bordered w-full min-h-[80px]" data-aos="fade-up" />
        <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow transition-all duration-200 disabled:opacity-60" data-aos="zoom-in" data-aos-delay="200">
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
        {success && <div className="text-green-600 text-center mt-2">{success}</div>}
        {error && <div className="text-red-600 text-center mt-2">{error}</div>}
      </form>
    </section>
  );
};

export default Admissions; 