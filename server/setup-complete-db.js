import pool from './db.js';
import bcrypt from 'bcrypt';

const setupCompleteDatabase = async () => {
  try {
    console.log('Setting up complete database...');
    
    // Create admins table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL
      );
    `);
    console.log('Admins table created successfully!');
    
    // Create admissions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admissions (
        id SERIAL PRIMARY KEY,
        application_no VARCHAR(50),
        udise_no VARCHAR(50),
        date_of_application DATE,
        sports VARCHAR(100),
        club VARCHAR(100),
        admission_class VARCHAR(50),
        student_first_name VARCHAR(100) NOT NULL,
        student_middle_name VARCHAR(100),
        student_surname VARCHAR(100) NOT NULL,
        sex VARCHAR(10) NOT NULL,
        aadhar_no VARCHAR(20),
        birth_date DATE NOT NULL,
        birth_date_words VARCHAR(100),
        residential_address TEXT,
        place_of_birth_city VARCHAR(100),
        place_of_birth_state VARCHAR(100),
        place_of_birth_country VARCHAR(100),
        caste VARCHAR(50),
        emergency_contact_name VARCHAR(100) NOT NULL,
        emergency_contact_mobile VARCHAR(20) NOT NULL,
        last_school_attended VARCHAR(255),
        father_surname VARCHAR(100),
        father_first_name VARCHAR(100),
        father_qualification VARCHAR(100),
        father_profession VARCHAR(100),
        father_office_address TEXT,
        father_office_tel VARCHAR(20),
        father_email VARCHAR(255),
        father_mobile VARCHAR(20),
        mother_surname VARCHAR(100),
        mother_first_name VARCHAR(100),
        mother_qualification VARCHAR(100),
        mother_profession VARCHAR(100),
        mother_office_address TEXT,
        mother_office_tel VARCHAR(20),
        mother_email VARCHAR(255),
        mother_mobile VARCHAR(20),
        siblings TEXT,
        health_info TEXT,
        doctor_name_mobile VARCHAR(100),
        bus_facility VARCHAR(10),
        bus_stop VARCHAR(100),
        agreement_accepted BOOLEAN,
        mother_signature VARCHAR(100),
        father_signature VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Admissions table created successfully!');
    
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
    
    // Create test admin if not exists
    const existingAdmin = await pool.query('SELECT id FROM admins WHERE email = $1', ['admin@school.com']);
    if (existingAdmin.rows.length === 0) {
      const adminPasswordHash = await bcrypt.hash('admin123', 10);
      await pool.query(
        'INSERT INTO admins (email, password_hash) VALUES ($1, $2)',
        ['admin@school.com', adminPasswordHash]
      );
      console.log('Test admin created successfully!');
      console.log('Admin Email: admin@school.com');
      console.log('Admin Password: admin123');
    } else {
      console.log('Test admin already exists');
    }
    
    // Create test student if not exists
    const existingStudent = await pool.query('SELECT id FROM students WHERE email = $1', ['student@school.com']);
    if (existingStudent.rows.length === 0) {
      const studentPasswordHash = await bcrypt.hash('student123', 10);
      await pool.query(`
        INSERT INTO students (full_name, email, phone, dob, gender, student_id, address, city, state, zip, password_hash)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `, [
        'Test Student',
        'student@school.com',
        '9876543210',
        '2005-06-15',
        'Male',
        'STU001',
        '456 Student Avenue',
        'Mumbai',
        'Maharashtra',
        '400002',
        studentPasswordHash
      ]);
      console.log('Test student created successfully!');
      console.log('Student Email: student@school.com');
      console.log('Student Password: student123');
    } else {
      console.log('Test student already exists');
    }
    
    // Show summary
    console.log('\n=== DATABASE SETUP COMPLETE ===');
    console.log('Tables created: admins, admissions, students');
    console.log('\nTest Credentials:');
    console.log('Admin - Email: admin@school.com, Password: admin123');
    console.log('Student - Email: student@school.com, Password: student123');
    
    // Show current data
    const admins = await pool.query('SELECT id, email FROM admins');
    const students = await pool.query('SELECT id, full_name, email FROM students');
    const admissions = await pool.query('SELECT COUNT(*) as count FROM admissions');
    
    console.log('\nCurrent data:');
    console.log(`Admins: ${admins.rows.length}`);
    console.log(`Students: ${students.rows.length}`);
    console.log(`Admissions: ${admissions.rows[0].count}`);
    
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    await pool.end();
  }
};

setupCompleteDatabase(); 