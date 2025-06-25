import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Admission {
  id?: number;
  application_no: string;
  udise_no: string;
  date_of_application: string;
  sports: string;
  club: string;
  admission_class: string;
  student_first_name: string;
  student_middle_name: string;
  student_surname: string;
  sex: string;
  aadhar_no: string;
  birth_date: string;
  birth_date_words: string;
  residential_address: string;
  place_of_birth_city: string;
  place_of_birth_state: string;
  place_of_birth_country: string;
  caste: string;
  emergency_contact_name: string;
  emergency_contact_mobile: string;
  last_school_attended: string;
  father_surname: string;
  father_first_name: string;
  father_qualification: string;
  father_profession: string;
  father_office_address: string;
  father_office_tel: string;
  father_email: string;
  father_mobile: string;
  mother_surname: string;
  mother_first_name: string;
  mother_qualification: string;
  mother_profession: string;
  mother_office_address: string;
  mother_office_tel: string;
  mother_email: string;
  mother_mobile: string;
  siblings: string;
  created_at: string;
  full_name: string;
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
    axios.get('http://localhost:5001/api/admissions', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setAdmissions(res.data.admissions))
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
      const res = await axios.get('http://localhost:5001/api/admissions/export/pdf', {
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
              <th className="px-4 py-2 border-b">Application No.</th>
              <th className="px-4 py-2 border-b">UDISE No.</th>
              <th className="px-4 py-2 border-b">Date of Application</th>
              <th className="px-4 py-2 border-b">Sports</th>
              <th className="px-4 py-2 border-b">Club</th>
              <th className="px-4 py-2 border-b">Class</th>
              <th className="px-4 py-2 border-b">First Name</th>
              <th className="px-4 py-2 border-b">Middle Name</th>
              <th className="px-4 py-2 border-b">Surname</th>
              <th className="px-4 py-2 border-b">Sex</th>
              <th className="px-4 py-2 border-b">Aadhar No.</th>
              <th className="px-4 py-2 border-b">Birth Date</th>
              <th className="px-4 py-2 border-b">Birth Date (Words)</th>
              <th className="px-4 py-2 border-b">Residential Address</th>
              <th className="px-4 py-2 border-b">Place of Birth (City)</th>
              <th className="px-4 py-2 border-b">State</th>
              <th className="px-4 py-2 border-b">Country</th>
              <th className="px-4 py-2 border-b">Caste</th>
              <th className="px-4 py-2 border-b">Emergency Contact Name</th>
              <th className="px-4 py-2 border-b">Emergency Contact Mobile</th>
              <th className="px-4 py-2 border-b">Last School Attended</th>
              <th className="px-4 py-2 border-b">Father Surname</th>
              <th className="px-4 py-2 border-b">Father First Name</th>
              <th className="px-4 py-2 border-b">Father Qualification</th>
              <th className="px-4 py-2 border-b">Father Profession</th>
              <th className="px-4 py-2 border-b">Father Office Address</th>
              <th className="px-4 py-2 border-b">Father Office Tel</th>
              <th className="px-4 py-2 border-b">Father Email</th>
              <th className="px-4 py-2 border-b">Father Mobile</th>
              <th className="px-4 py-2 border-b">Mother Surname</th>
              <th className="px-4 py-2 border-b">Mother First Name</th>
              <th className="px-4 py-2 border-b">Mother Qualification</th>
              <th className="px-4 py-2 border-b">Mother Profession</th>
              <th className="px-4 py-2 border-b">Mother Office Address</th>
              <th className="px-4 py-2 border-b">Mother Office Tel</th>
              <th className="px-4 py-2 border-b">Mother Email</th>
              <th className="px-4 py-2 border-b">Mother Mobile</th>
              <th className="px-4 py-2 border-b">Siblings</th>
              <th className="px-4 py-2 border-b">Created At</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={41} className="text-center py-4">Loading...</td></tr>
            ) : admissions.length === 0 ? (
              <tr><td colSpan={41} className="text-center py-4">No admissions yet.</td></tr>
            ) : (
              admissions.map((a, i) => (
                <tr key={i}>
                  <td className="px-4 py-2 border-b">{a.full_name}</td>
                  <td className="px-4 py-2 border-b">{a.application_no}</td>
                  <td className="px-4 py-2 border-b">{a.udise_no}</td>
                  <td className="px-4 py-2 border-b">{a.date_of_application}</td>
                  <td className="px-4 py-2 border-b">{a.sports}</td>
                  <td className="px-4 py-2 border-b">{a.club}</td>
                  <td className="px-4 py-2 border-b">{a.admission_class}</td>
                  <td className="px-4 py-2 border-b">{a.student_first_name}</td>
                  <td className="px-4 py-2 border-b">{a.student_middle_name}</td>
                  <td className="px-4 py-2 border-b">{a.student_surname}</td>
                  <td className="px-4 py-2 border-b">{a.sex}</td>
                  <td className="px-4 py-2 border-b">{a.aadhar_no}</td>
                  <td className="px-4 py-2 border-b">{a.birth_date}</td>
                  <td className="px-4 py-2 border-b">{a.birth_date_words}</td>
                  <td className="px-4 py-2 border-b">{a.residential_address}</td>
                  <td className="px-4 py-2 border-b">{a.place_of_birth_city}</td>
                  <td className="px-4 py-2 border-b">{a.place_of_birth_state}</td>
                  <td className="px-4 py-2 border-b">{a.place_of_birth_country}</td>
                  <td className="px-4 py-2 border-b">{a.caste}</td>
                  <td className="px-4 py-2 border-b">{a.emergency_contact_name}</td>
                  <td className="px-4 py-2 border-b">{a.emergency_contact_mobile}</td>
                  <td className="px-4 py-2 border-b">{a.last_school_attended}</td>
                  <td className="px-4 py-2 border-b">{a.father_surname}</td>
                  <td className="px-4 py-2 border-b">{a.father_first_name}</td>
                  <td className="px-4 py-2 border-b">{a.father_qualification}</td>
                  <td className="px-4 py-2 border-b">{a.father_profession}</td>
                  <td className="px-4 py-2 border-b">{a.father_office_address}</td>
                  <td className="px-4 py-2 border-b">{a.father_office_tel}</td>
                  <td className="px-4 py-2 border-b">{a.father_email}</td>
                  <td className="px-4 py-2 border-b">{a.father_mobile}</td>
                  <td className="px-4 py-2 border-b">{a.mother_surname}</td>
                  <td className="px-4 py-2 border-b">{a.mother_first_name}</td>
                  <td className="px-4 py-2 border-b">{a.mother_qualification}</td>
                  <td className="px-4 py-2 border-b">{a.mother_profession}</td>
                  <td className="px-4 py-2 border-b">{a.mother_office_address}</td>
                  <td className="px-4 py-2 border-b">{a.mother_office_tel}</td>
                  <td className="px-4 py-2 border-b">{a.mother_email}</td>
                  <td className="px-4 py-2 border-b">{a.mother_mobile}</td>
                  <td className="px-4 py-2 border-b">{a.siblings}</td>
                  <td className="px-4 py-2 border-b">{a.created_at}</td>
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