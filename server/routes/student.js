import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db.js';
const router = express.Router();

// POST /api/students/signup
router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, phone, dob, gender, studentId, address, city, state, zip, password } = req.body;
    
    // Validate required fields
    if (!fullName || !email || !phone || !dob || !gender || !address || !city || !state || !zip || !password) {
      return res.status(400).json({ message: 'All required fields must be filled.' });
    }

    // Check if email already exists
    const existingUser = await pool.query('SELECT id FROM students WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert new student
    const result = await pool.query(
      `INSERT INTO students (full_name, email, phone, dob, gender, student_id, address, city, state, zip, password_hash)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
       RETURNING id, full_name, email`,
      [fullName, email, phone, dob, gender, studentId, address, city, state, zip, hashedPassword]
    );
    
    console.log('Student registered successfully:', result.rows[0]);
    res.status(201).json({ 
      message: 'Student registered successfully', 
      student: result.rows[0] 
    });
  } catch (err) {
    console.error('Signup error:', err);
    if (err.code === '23505') {
      return res.status(409).json({ message: 'Email already registered.' });
    }
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/students/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required.' });
    }

    console.log('Login attempt for email:', email);
    
    // Find student by email
    const result = await pool.query('SELECT * FROM students WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      console.log('No student found with email:', email);
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const student = result.rows[0];
    console.log('Student found:', { id: student.id, email: student.email });
    
    // Compare password
    const match = await bcrypt.compare(password, student.password_hash);
    
    if (!match) {
      console.log('Password mismatch for student:', student.id);
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: student.id, 
        email: student.email, 
        fullName: student.full_name 
      }, 
      process.env.JWT_SECRET || 'devsecret', 
      { expiresIn: '1d' }
    );

    console.log('Login successful for student:', student.id);
    res.json({ 
      token, 
      student: { 
        id: student.id, 
        fullName: student.full_name, 
        email: student.email 
      } 
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router; 
