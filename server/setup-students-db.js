import pool from './db.js';

const setupStudentsTable = async () => {
  try {
    console.log('Setting up students table...');
    
    // Create students table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20) NOT NULL,
        dob DATE NOT NULL,
        gender VARCHAR(20) NOT NULL,
        student_id VARCHAR(100),
        address TEXT NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        zip VARCHAR(20) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log('Students table created successfully!');
    
    // Check if test student exists
    const existingStudent = await pool.query('SELECT id FROM students WHERE email = $1', ['test@student.com']);
    
    if (existingStudent.rows.length === 0) {
      // Insert a test student
      const bcrypt = await import('bcrypt');
      const hashedPassword = await bcrypt.hash('test123', 10);
      
      await pool.query(`
        INSERT INTO students (full_name, email, phone, dob, gender, student_id, address, city, state, zip, password_hash)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `, [
        'Test Student',
        'test@student.com',
        '1234567890',
        '2005-01-01',
        'Male',
        'TEST001',
        '123 Test Street',
        'Mumbai',
        'Maharashtra',
        '400001',
        hashedPassword
      ]);
      
      console.log('Test student created successfully!');
      console.log('Email: test@student.com');
      console.log('Password: test123');
    } else {
      console.log('Test student already exists');
    }
    
    // Show all students
    const students = await pool.query('SELECT id, full_name, email FROM students');
    console.log('Current students in database:', students.rows);
    
  } catch (error) {
    console.error('Error setting up students table:', error);
  } finally {
    await pool.end();
  }
};

setupStudentsTable(); 