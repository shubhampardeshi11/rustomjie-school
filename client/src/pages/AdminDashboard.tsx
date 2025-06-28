import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdmissionViewModal from '../components/AdmissionViewModal';

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
  const [selectedAdmission, setSelectedAdmission] = useState<Admission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleViewAdmission = (admission: Admission) => {
    setSelectedAdmission(admission);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAdmission(null);
  };

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

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  return (
    <>
      <section className="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow mt-12" data-aos="fade-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-800">Admin Dashboard</h2>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded shadow transition-all duration-200">Logout</button>
        </div>
        
        <div className="mb-6 flex justify-between items-center">
          <div className="text-lg font-semibold text-gray-700">
            Total Admissions: {admissions.length}
          </div>
          <button onClick={handleExportPDF} className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow transition-all duration-200" data-aos="zoom-in" data-aos-delay="200">
            Export to PDF
          </button>
        </div>
        
        {error && <div className="text-red-600 text-center mb-4 p-3 bg-red-50 rounded">{error}</div>}
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700">Full Name</th>
                <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700">Application No.</th>
                <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700">Class</th>
                <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700">Date Applied</th>
                <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700">Contact</th>
                <th className="px-4 py-3 border-b text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <span className="ml-2">Loading admissions...</span>
                    </div>
                  </td>
                </tr>
              ) : admissions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No admissions found.
                  </td>
                </tr>
              ) : (
                admissions.map((admission, index) => (
                  <tr key={admission.id || index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 border-b">
                      <div className="font-medium text-gray-900">{admission.full_name}</div>
                      <div className="text-sm text-gray-500">{admission.sex}</div>
                    </td>
                    <td className="px-4 py-3 border-b">
                      <div className="font-medium">{admission.application_no || 'N/A'}</div>
                      <div className="text-sm text-gray-500">UDISE: {admission.udise_no || 'N/A'}</div>
                    </td>
                    <td className="px-4 py-3 border-b">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {admission.admission_class}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-b text-sm text-gray-600">
                      {formatDate(admission.date_of_application)}
                    </td>
                    <td className="px-4 py-3 border-b">
                      <div className="text-sm">
                        <div className="font-medium">{admission.emergency_contact_name}</div>
                        <div className="text-gray-500">{admission.emergency_contact_mobile}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 border-b">
                      <button
                        onClick={() => handleViewAdmission(admission)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Admission View Modal */}
      <AdmissionViewModal
        admission={selectedAdmission}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default AdminDashboard; 