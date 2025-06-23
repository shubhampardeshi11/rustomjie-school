import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Admission {
  id?: number;
  full_name: string;
  class_applied: string;
  city: string;
  state: string;
  email: string;
  phone: string;
}

const AdminDashboard = () => {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    axios.get('/api/admissions', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setAdmissions(res.data))
      .catch(err => {
        setError('Failed to fetch admissions.');
        if (err.response?.status === 401) {
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleExportPDF = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) return navigate('/admin/login');
    try {
      const res = await axios.get('/api/admissions/pdf', {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'admissions.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      setError('Failed to export PDF.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <section className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow mt-12" data-aos="fade-up">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-800">Admin Dashboard</h2>
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded shadow transition-all duration-200">Logout</button>
      </div>
      <div className="mb-4 flex justify-end">
        <button onClick={handleExportPDF} className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow transition-all duration-200" data-aos="zoom-in" data-aos-delay="200">
          Export to PDF
        </button>
      </div>
      {error && <div className="text-red-600 text-center mb-4">{error}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Full Name</th>
              <th className="px-4 py-2 border-b">Class</th>
              <th className="px-4 py-2 border-b">City</th>
              <th className="px-4 py-2 border-b">State</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Phone</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="text-center py-4">Loading...</td></tr>
            ) : admissions.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-4">No admissions yet.</td></tr>
            ) : (
              admissions.map((a, i) => (
                <tr key={i}>
                  <td className="px-4 py-2 border-b">{a.full_name}</td>
                  <td className="px-4 py-2 border-b">{a.class_applied}</td>
                  <td className="px-4 py-2 border-b">{a.city}</td>
                  <td className="px-4 py-2 border-b">{a.state}</td>
                  <td className="px-4 py-2 border-b">{a.email}</td>
                  <td className="px-4 py-2 border-b">{a.phone}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminDashboard; 