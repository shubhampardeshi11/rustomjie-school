import axios from 'axios';

const BASE_URL = 'http://localhost:5001';

async function testEndpoints() {
  console.log('🧪 Testing Student and Admin Login Endpoints...\n');

  // Test 1: Student Login
  console.log('1. Testing Student Login...');
  try {
    const studentLoginResponse = await axios.post(`${BASE_URL}/api/students/login`, {
      email: 'student@school.com',
      password: 'student123'
    });

    console.log('Status:', studentLoginResponse.status);
    console.log('Response:', JSON.stringify(studentLoginResponse.data, null, 2));
    console.log('✅ Student login successful!\n');
  } catch (error) {
    console.log('Status:', error.response?.status || 'Network Error');
    console.log('Response:', JSON.stringify(error.response?.data || error.message, null, 2));
    console.log('❌ Student login failed!\n');
  }

  // Test 2: Admin Login
  console.log('2. Testing Admin Login...');
  try {
    const adminLoginResponse = await axios.post(`${BASE_URL}/api/admin/login`, {
      email: 'admin@school.com',
      password: 'admin123'
    });

    console.log('Status:', adminLoginResponse.status);
    console.log('Response:', JSON.stringify(adminLoginResponse.data, null, 2));
    console.log('✅ Admin login successful!\n');
  } catch (error) {
    console.log('Status:', error.response?.status || 'Network Error');
    console.log('Response:', JSON.stringify(error.response?.data || error.message, null, 2));
    console.log('❌ Admin login failed!\n');
  }

  // Test 3: Student Signup
  console.log('3. Testing Student Signup...');
  try {
    const signupResponse = await axios.post(`${BASE_URL}/api/students/signup`, {
      fullName: 'Test User',
      email: 'testuser@example.com',
      phone: '9876543210',
      dob: '2000-01-01',
      gender: 'Male',
      studentId: 'TEST123',
      address: '123 Test Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      zip: '400001',
      password: 'testpass123'
    });

    console.log('Status:', signupResponse.status);
    console.log('Response:', JSON.stringify(signupResponse.data, null, 2));
    console.log('✅ Student signup successful!\n');
  } catch (error) {
    console.log('Status:', error.response?.status || 'Network Error');
    console.log('Response:', JSON.stringify(error.response?.data || error.message, null, 2));
    console.log('❌ Student signup failed!\n');
  }

  console.log('🏁 Testing complete!');
}

testEndpoints(); 