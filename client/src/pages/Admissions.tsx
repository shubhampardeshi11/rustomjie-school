import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const initialForm = {
  application_no: '',
  udise_no: '',
  date_of_application: '',
  sports: '',
  club: '',
  admission_class: '',
  student_first_name: '',
  student_middle_name: '',
  student_surname: '',
  sex: '',
  aadhar_no: '',
  birth_date: '',
  birth_date_words: '',
  residential_address: '',
  place_of_birth_city: '',
  place_of_birth_state: '',
  place_of_birth_country: '',
  caste: '',
  emergency_contact_name: '',
  emergency_contact_mobile: '',
  last_school_attended: '',
  father_surname: '',
  father_first_name: '',
  father_qualification: '',
  father_profession: '',
  father_office_address: '',
  father_office_tel: '',
  father_email: '',
  father_mobile: '',
  mother_surname: '',
  mother_first_name: '',
  mother_qualification: '',
  mother_profession: '',
  mother_office_address: '',
  mother_office_tel: '',
  mother_email: '',
  mother_mobile: '',
  siblings: '',
  health_info: '',
  doctor_name_mobile: '',
  bus_facility: '',
  bus_stop: '',
  agreement_accepted: false,
  mother_signature: '',
  father_signature: '',
};

const initialErrors = Object.fromEntries(Object.keys(initialForm).map(k => [k, '']));

const Admissions = () => {
  const [form, setForm] = useState(initialForm);
  const [formErrors, setFormErrors] = useState(initialErrors);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [admissions, setAdmissions] = useState([]);
  const navigate = useNavigate();

  // Validation helpers
  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'student_first_name':
      case 'student_surname':
      case 'admission_class':
      case 'sex':
      case 'birth_date':
      case 'emergency_contact_name':
      case 'emergency_contact_mobile':
        if (!value) return 'Required';
        break;
      case 'aadhar_no':
        if (value && !/^\d{12}$/.test(value)) return 'Aadhar must be 12 digits';
        break;
      case 'father_email':
      case 'mother_email':
        if (value && !/^\S+@\S+\.\S+$/.test(value)) return 'Invalid email';
        break;
      case 'father_mobile':
      case 'mother_mobile':
      case 'emergency_contact_mobile':
        if (value && !/^\d{10}$/.test(value)) return 'Mobile must be 10 digits';
        if (!value && (name === 'emergency_contact_mobile')) return 'Required';
        break;
      case 'birth_date':
        if (!value) return 'Required';
        break;
      case 'caste':
        if (["SC", "OBC", "ST", "NT"].includes(form.caste.trim().toUpperCase()) && !value)
          return 'Caste required for reserved category';
        break;
      case 'health_info':
        if (!value) return 'Required';
        break;
      case 'doctor_name_mobile':
        if (!value) return 'Required';
        break;
      case 'bus_facility':
        if (!value) return 'Required';
        break;
      case 'bus_stop':
        if (form.bus_facility === 'Yes' && !value) return 'Required if bus facility is Yes';
        break;
      case 'agreement_accepted':
        if (!form.agreement_accepted) return 'You must accept the agreement';
        break;
      case 'mother_signature':
        if (!value) return 'Required';
        break;
      case 'father_signature':
        if (!value) return 'Required';
        break;
      default:
        break;
    }
    return '';
  };

  const validateForm = () => {
    const errors: any = {};
    Object.keys(form).forEach((key) => {
      errors[key] = validateField(key, (form as any)[key]);
    });
    setFormErrors(errors);
    // Only allow submit if all errors are empty
    return Object.values(errors).every((v) => !v);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm({ ...form, [name]: type === 'radio' ? value : value });
    setFormErrors({ ...formErrors, [name]: validateField(name, value) });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormErrors({ ...formErrors, [name]: validateField(name, value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    if (!validateForm()) {
      setError('Please fix the errors in the form.');
      return;
    }
    setLoading(true);
    try {
      await axios.post('http://localhost:5001/api/admissions', form);
      setSuccess('Application submitted successfully!');
      setForm(initialForm);
      setFormErrors(initialErrors);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <section className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow mt-12" data-aos="fade-up">
      <h2 className="text-2xl font-bold mb-6 text-blue-800 text-center">Admissions Form</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Top fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input name="application_no" value={form.application_no} onChange={handleChange} onBlur={handleBlur} placeholder="Application No." className="input input-bordered w-full" />
            {formErrors.application_no && <div className="text-red-500 text-xs">{formErrors.application_no}</div>}
          </div>
          <div>
            <input name="udise_no" value={form.udise_no} onChange={handleChange} onBlur={handleBlur} placeholder="UDISE No." className="input input-bordered w-full" />
            {formErrors.udise_no && <div className="text-red-500 text-xs">{formErrors.udise_no}</div>}
          </div>
          <div>
            <input name="date_of_application" type="date" value={form.date_of_application} onChange={handleChange} onBlur={handleBlur} placeholder="Date of Application" className="input input-bordered w-full" />
            {formErrors.date_of_application && <div className="text-red-500 text-xs">{formErrors.date_of_application}</div>}
          </div>
          <div>
            <input name="sports" value={form.sports} onChange={handleChange} onBlur={handleBlur} placeholder="Sports" className="input input-bordered w-full" />
            {formErrors.sports && <div className="text-red-500 text-xs">{formErrors.sports}</div>}
          </div>
          <div>
            <input name="club" value={form.club} onChange={handleChange} onBlur={handleBlur} placeholder="Club" className="input input-bordered w-full" />
            {formErrors.club && <div className="text-red-500 text-xs">{formErrors.club}</div>}
          </div>
          <div>
            <input name="admission_class" value={form.admission_class} onChange={handleChange} onBlur={handleBlur} placeholder="Admission sought in class" className="input input-bordered w-full" required />
            {formErrors.admission_class && <div className="text-red-500 text-xs">{formErrors.admission_class}</div>}
          </div>
        </div>
        {/* A. Student Details */}
        <div className="border-t pt-4">
          <h3 className="font-semibold text-lg mb-2">A. Student's Details</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <input name="student_first_name" value={form.student_first_name} onChange={handleChange} onBlur={handleBlur} placeholder="First Name" className="input input-bordered w-full" required />
              {formErrors.student_first_name && <div className="text-red-500 text-xs">{formErrors.student_first_name}</div>}
            </div>
            <div>
              <input name="student_middle_name" value={form.student_middle_name} onChange={handleChange} onBlur={handleBlur} placeholder="Middle Name" className="input input-bordered w-full" />
              {formErrors.student_middle_name && <div className="text-red-500 text-xs">{formErrors.student_middle_name}</div>}
            </div>
            <div>
              <input name="student_surname" value={form.student_surname} onChange={handleChange} onBlur={handleBlur} placeholder="Surname" className="input input-bordered w-full" required />
              {formErrors.student_surname && <div className="text-red-500 text-xs">{formErrors.student_surname}</div>}
            </div>
          </div>
          <div className="flex gap-4 mt-2 items-center">
            <label className="font-medium">Sex:</label>
            <label className="flex items-center gap-1"><input type="radio" name="sex" value="Male" checked={form.sex === 'Male'} onChange={handleChange} /> Male</label>
            <label className="flex items-center gap-1"><input type="radio" name="sex" value="Female" checked={form.sex === 'Female'} onChange={handleChange} /> Female</label>
            {formErrors.sex && <div className="text-red-500 text-xs ml-2">{formErrors.sex}</div>}
            <input name="aadhar_no" value={form.aadhar_no} onChange={handleChange} onBlur={handleBlur} placeholder="Aadhar Card No" className="input input-bordered w-full ml-4" />
            {formErrors.aadhar_no && <div className="text-red-500 text-xs ml-2">{formErrors.aadhar_no}</div>}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <input name="birth_date" type="date" value={form.birth_date} onChange={handleChange} onBlur={handleBlur} placeholder="Birth Date" className="input input-bordered w-full" />
              {formErrors.birth_date && <div className="text-red-500 text-xs">{formErrors.birth_date}</div>}
            </div>
            <div>
              <input name="birth_date_words" value={form.birth_date_words} onChange={handleChange} onBlur={handleBlur} placeholder="Birth Date (in words)" className="input input-bordered w-full" />
              {formErrors.birth_date_words && <div className="text-red-500 text-xs">{formErrors.birth_date_words}</div>}
            </div>
          </div>
          <div>
            <textarea name="residential_address" value={form.residential_address} onChange={handleChange} onBlur={handleBlur} placeholder="Residential Address" className="input input-bordered w-full mt-2" />
            {formErrors.residential_address && <div className="text-red-500 text-xs">{formErrors.residential_address}</div>}
          </div>
          <div className="grid grid-cols-3 gap-4 mt-2">
            <div>
              <input name="place_of_birth_city" value={form.place_of_birth_city} onChange={handleChange} onBlur={handleBlur} placeholder="Place of Birth (City)" className="input input-bordered w-full" />
              {formErrors.place_of_birth_city && <div className="text-red-500 text-xs">{formErrors.place_of_birth_city}</div>}
            </div>
            <div>
              <input name="place_of_birth_state" value={form.place_of_birth_state} onChange={handleChange} onBlur={handleBlur} placeholder="State" className="input input-bordered w-full" />
              {formErrors.place_of_birth_state && <div className="text-red-500 text-xs">{formErrors.place_of_birth_state}</div>}
            </div>
            <div>
              <input name="place_of_birth_country" value={form.place_of_birth_country} onChange={handleChange} onBlur={handleBlur} placeholder="Country" className="input input-bordered w-full" />
              {formErrors.place_of_birth_country && <div className="text-red-500 text-xs">{formErrors.place_of_birth_country}</div>}
            </div>
          </div>
          <div>
            <input name="caste" value={form.caste} onChange={handleChange} onBlur={handleBlur} placeholder="Caste (if SC/OBC/ST/NT...)" className="input input-bordered w-full mt-2" />
            {formErrors.caste && <div className="text-red-500 text-xs">{formErrors.caste}</div>}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <input name="emergency_contact_name" value={form.emergency_contact_name} onChange={handleChange} onBlur={handleBlur} placeholder="Emergency Contact Name" className="input input-bordered w-full" />
              {formErrors.emergency_contact_name && <div className="text-red-500 text-xs">{formErrors.emergency_contact_name}</div>}
            </div>
            <div>
              <input name="emergency_contact_mobile" value={form.emergency_contact_mobile} onChange={handleChange} onBlur={handleBlur} placeholder="Emergency Contact Mobile" className="input input-bordered w-full" />
              {formErrors.emergency_contact_mobile && <div className="text-red-500 text-xs">{formErrors.emergency_contact_mobile}</div>}
            </div>
          </div>
          <div>
            <input name="last_school_attended" value={form.last_school_attended} onChange={handleChange} onBlur={handleBlur} placeholder="Last School Attended" className="input input-bordered w-full mt-2" />
            {formErrors.last_school_attended && <div className="text-red-500 text-xs">{formErrors.last_school_attended}</div>}
          </div>
        </div>
        {/* B. Family Information */}
        <div className="border-t pt-4">
          <h3 className="font-semibold text-lg mb-2">B. Family Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Father's Name</label>
              <div className="flex gap-2 mb-2">
                <input name="father_surname" value={form.father_surname} onChange={handleChange} onBlur={handleBlur} placeholder="Surname" className="input input-bordered w-full" />
                <input name="father_first_name" value={form.father_first_name} onChange={handleChange} onBlur={handleBlur} placeholder="First Name" className="input input-bordered w-full" />
              </div>
              <input name="father_qualification" value={form.father_qualification} onChange={handleChange} onBlur={handleBlur} placeholder="Educational Qualification" className="input input-bordered w-full mb-2" />
              <input name="father_profession" value={form.father_profession} onChange={handleChange} onBlur={handleBlur} placeholder="Profession" className="input input-bordered w-full mb-2" />
              <input name="father_office_address" value={form.father_office_address} onChange={handleChange} onBlur={handleBlur} placeholder="Office Address" className="input input-bordered w-full mb-2" />
              <input name="father_office_tel" value={form.father_office_tel} onChange={handleChange} onBlur={handleBlur} placeholder="Office Tel. No." className="input input-bordered w-full mb-2" />
              <input name="father_email" value={form.father_email} onChange={handleChange} onBlur={handleBlur} placeholder="E-mail" className="input input-bordered w-full mb-2" />
              {formErrors.father_email && <div className="text-red-500 text-xs">{formErrors.father_email}</div>}
              <input name="father_mobile" value={form.father_mobile} onChange={handleChange} onBlur={handleBlur} placeholder="Mobile" className="input input-bordered w-full" />
              {formErrors.father_mobile && <div className="text-red-500 text-xs">{formErrors.father_mobile}</div>}
            </div>
            <div>
              <label className="block font-medium mb-1">Mother's Name</label>
              <div className="flex gap-2 mb-2">
                <input name="mother_surname" value={form.mother_surname} onChange={handleChange} onBlur={handleBlur} placeholder="Surname" className="input input-bordered w-full" />
                <input name="mother_first_name" value={form.mother_first_name} onChange={handleChange} onBlur={handleBlur} placeholder="First Name" className="input input-bordered w-full" />
              </div>
              <input name="mother_qualification" value={form.mother_qualification} onChange={handleChange} onBlur={handleBlur} placeholder="Educational Qualification" className="input input-bordered w-full mb-2" />
              <input name="mother_profession" value={form.mother_profession} onChange={handleChange} onBlur={handleBlur} placeholder="Profession" className="input input-bordered w-full mb-2" />
              <input name="mother_office_address" value={form.mother_office_address} onChange={handleChange} onBlur={handleBlur} placeholder="Office Address" className="input input-bordered w-full mb-2" />
              <input name="mother_office_tel" value={form.mother_office_tel} onChange={handleChange} onBlur={handleBlur} placeholder="Office Tel. No." className="input input-bordered w-full mb-2" />
              <input name="mother_email" value={form.mother_email} onChange={handleChange} onBlur={handleBlur} placeholder="E-mail" className="input input-bordered w-full mb-2" />
              {formErrors.mother_email && <div className="text-red-500 text-xs">{formErrors.mother_email}</div>}
              <input name="mother_mobile" value={form.mother_mobile} onChange={handleChange} onBlur={handleBlur} placeholder="Mobile" className="input input-bordered w-full" />
              {formErrors.mother_mobile && <div className="text-red-500 text-xs">{formErrors.mother_mobile}</div>}
            </div>
          </div>
        </div>
        {/* C. Siblings */}
        <div className="border-t pt-4">
          <h3 className="font-semibold text-lg mb-2">C. Siblings</h3>
          <input name="siblings" value={form.siblings} onChange={handleChange} onBlur={handleBlur} placeholder="Siblings (if any studying in Rustomjie International)" className="input input-bordered w-full" />
          {formErrors.siblings && <div className="text-red-500 text-xs">{formErrors.siblings}</div>}
        </div>
        {/* D. Health Information (Annexure B) */}
        <div className="border-t pt-4">
          <h3 className="font-semibold text-lg mb-2">D. Health Information (Annexure B)</h3>
          <textarea name="health_info" value={form.health_info} onChange={handleChange} onBlur={handleBlur} placeholder="Please provide any information concerning the child's health, which the school should know." className="input input-bordered w-full" />
          {formErrors.health_info && <div className="text-red-500 text-xs">{formErrors.health_info}</div>}
          <input name="doctor_name_mobile" value={form.doctor_name_mobile} onChange={handleChange} onBlur={handleBlur} placeholder="Name & mobile no. of doctor/family doctor for emergency" className="input input-bordered w-full mt-2" />
          {formErrors.doctor_name_mobile && <div className="text-red-500 text-xs">{formErrors.doctor_name_mobile}</div>}
        </div>
        {/* E. Bus Facility (Annexure B) */}
        <div className="border-t pt-4">
          <h3 className="font-semibold text-lg mb-2">E. Bus Facility (Annexure B)</h3>
          <div className="flex gap-4 items-center">
            <label className="font-medium">Would your child be using bus facility?</label>
            <label className="flex items-center gap-1"><input type="radio" name="bus_facility" value="Yes" checked={form.bus_facility === 'Yes'} onChange={handleChange} /> Yes</label>
            <label className="flex items-center gap-1"><input type="radio" name="bus_facility" value="No" checked={form.bus_facility === 'No'} onChange={handleChange} /> No</label>
          </div>
          {formErrors.bus_facility && <div className="text-red-500 text-xs">{formErrors.bus_facility}</div>}
          {form.bus_facility === 'Yes' && (
            <input name="bus_stop" value={form.bus_stop} onChange={handleChange} onBlur={handleBlur} placeholder="If Yes, name of stop / locality" className="input input-bordered w-full mt-2" />
          )}
          {formErrors.bus_stop && <div className="text-red-500 text-xs">{formErrors.bus_stop}</div>}
        </div>
        {/* Agreement (Annexure B) */}
        <div className="border-t pt-4">
          <h3 className="font-semibold text-lg mb-2">Agreement (Annexure B)</h3>
          <div className="max-h-40 overflow-y-auto bg-gray-50 p-3 rounded border text-xs mb-2">
            <ul className="list-disc pl-5">
              <li>I agree to abide by the school rules and policies, and ensure my child does the same.</li>
              <li>I understand the school is not responsible for accidents or unforeseen incidents.</li>
              <li>I will pay all fees and charges as required by the school.</li>
              <li>I authorize the school to take necessary action in case of emergency.</li>
              <li>I grant permission for my child's photos or work to be used for school purposes.</li>
              <li>I agree to the school's terms for bus facility and other services.</li>
              <li>I confirm the information provided is true and correct to the best of my knowledge.</li>
            </ul>
          </div>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="agreement_accepted" checked={form.agreement_accepted} onChange={e => setForm({ ...form, agreement_accepted: e.target.checked })} />
            I have read and agree to the above terms and conditions.
          </label>
          {formErrors.agreement_accepted && <div className="text-red-500 text-xs">{formErrors.agreement_accepted}</div>}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <input name="mother_signature" value={form.mother_signature} onChange={handleChange} onBlur={handleBlur} placeholder="Mother's Signature (type name)" className="input input-bordered w-full" />
              {formErrors.mother_signature && <div className="text-red-500 text-xs">{formErrors.mother_signature}</div>}
            </div>
            <div>
              <input name="father_signature" value={form.father_signature} onChange={handleChange} onBlur={handleBlur} placeholder="Father's Signature (type name)" className="input input-bordered w-full" />
              {formErrors.father_signature && <div className="text-red-500 text-xs">{formErrors.father_signature}</div>}
            </div>
          </div>
        </div>
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