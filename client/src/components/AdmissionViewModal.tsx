import React from 'react';

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
  health_info: string;
  doctor_name_mobile: string;
  bus_facility: string;
  bus_stop: string;
  agreement_accepted: boolean;
  mother_signature: string;
  father_signature: string;
}

interface AdmissionViewModalProps {
  admission: Admission | null;
  isOpen: boolean;
  onClose: () => void;
}

const AdmissionViewModal: React.FC<AdmissionViewModalProps> = ({ admission, isOpen, onClose }) => {
  if (!isOpen || !admission) return null;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-800">
            Admission Details - {admission.full_name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Top fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Application No.</label>
              <div className="p-3 bg-gray-50 border rounded-lg">{admission.application_no || 'N/A'}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">UDISE No.</label>
              <div className="p-3 bg-gray-50 border rounded-lg">{admission.udise_no || 'N/A'}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Application</label>
              <div className="p-3 bg-gray-50 border rounded-lg">{formatDate(admission.date_of_application) || 'N/A'}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sports</label>
              <div className="p-3 bg-gray-50 border rounded-lg">{admission.sports || 'N/A'}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Club</label>
              <div className="p-3 bg-gray-50 border rounded-lg">{admission.club || 'N/A'}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Admission Class</label>
              <div className="p-3 bg-gray-50 border rounded-lg">{admission.admission_class || 'N/A'}</div>
            </div>
          </div>

          {/* A. Student Details */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-lg mb-4 text-blue-600">A. Student's Details</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.student_first_name || 'N/A'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.student_middle_name || 'N/A'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Surname</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.student_surname || 'N/A'}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.sex || 'N/A'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar No.</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.aadhar_no || 'N/A'}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Birth Date</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{formatDate(admission.birth_date) || 'N/A'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Birth Date (Words)</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.birth_date_words || 'N/A'}</div>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Residential Address</label>
              <div className="p-3 bg-gray-50 border rounded-lg">{admission.residential_address || 'N/A'}</div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Place of Birth (City)</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.place_of_birth_city || 'N/A'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.place_of_birth_state || 'N/A'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.place_of_birth_country || 'N/A'}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Caste</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.caste || 'N/A'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last School Attended</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.last_school_attended || 'N/A'}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact Name</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.emergency_contact_name || 'N/A'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact Mobile</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.emergency_contact_mobile || 'N/A'}</div>
              </div>
            </div>
          </div>

          {/* B. Father's Details */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-lg mb-4 text-blue-600">B. Father's Details</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Surname</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.father_surname || 'N/A'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.father_first_name || 'N/A'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.father_qualification || 'N/A'}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.father_profession || 'N/A'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Office Tel</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.father_office_tel || 'N/A'}</div>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Office Address</label>
              <div className="p-3 bg-gray-50 border rounded-lg">{admission.father_office_address || 'N/A'}</div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.father_email || 'N/A'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.father_mobile || 'N/A'}</div>
              </div>
            </div>
          </div>

          {/* C. Mother's Details */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-lg mb-4 text-blue-600">C. Mother's Details</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Surname</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.mother_surname || 'N/A'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.mother_first_name || 'N/A'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.mother_qualification || 'N/A'}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.mother_profession || 'N/A'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Office Tel</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.mother_office_tel || 'N/A'}</div>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Office Address</label>
              <div className="p-3 bg-gray-50 border rounded-lg">{admission.mother_office_address || 'N/A'}</div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.mother_email || 'N/A'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.mother_mobile || 'N/A'}</div>
              </div>
            </div>
          </div>

          {/* D. Siblings */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-lg mb-4 text-blue-600">D. Siblings</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Siblings Details</label>
              <div className="p-3 bg-gray-50 border rounded-lg">{admission.siblings || 'N/A'}</div>
            </div>
          </div>

          {/* Annexure B */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-lg mb-4 text-blue-600">Annexure B</h3>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Health Information</label>
              <div className="p-3 bg-gray-50 border rounded-lg">{admission.health_info || 'N/A'}</div>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor/Family Doctor Name & Mobile</label>
              <div className="p-3 bg-gray-50 border rounded-lg">{admission.doctor_name_mobile || 'N/A'}</div>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Bus Facility</label>
              <div className="p-3 bg-gray-50 border rounded-lg">{admission.bus_facility || 'N/A'}</div>
            </div>
            {admission.bus_facility === 'Yes' && (
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Bus Stop / Locality</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.bus_stop || 'N/A'}</div>
              </div>
            )}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Agreement Accepted</label>
              <div className="p-3 bg-gray-50 border rounded-lg">{admission.agreement_accepted ? 'Yes' : 'No'}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Signature</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.mother_signature || 'N/A'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Father's Signature</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.father_signature || 'N/A'}</div>
              </div>
            </div>
          </div>

          {/* Application Info */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-lg mb-4 text-blue-600">Application Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Application ID</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{admission.id || 'N/A'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Submitted On</label>
                <div className="p-3 bg-gray-50 border rounded-lg">{formatDate(admission.created_at) || 'N/A'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdmissionViewModal; 