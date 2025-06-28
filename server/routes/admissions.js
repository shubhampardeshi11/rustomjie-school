import express from 'express';
import pool from '../db.js';
import { authenticateToken } from '../middleware/auth.js';
import PDFDocument from 'pdfkit';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Utility to convert empty strings to null
function emptyToNull(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, v === '' ? null : v])
  );
}

// Create admission application
router.post('/', async (req, res) => {
  const client = await pool.connect();
  try {
    // Convert all empty strings to null
    const cleanedBody = emptyToNull(req.body);
    const {
      application_no,
      udise_no,
      date_of_application,
      sports,
      club,
      admission_class,
      student_first_name,
      student_middle_name,
      student_surname,
      sex,
      aadhar_no,
      birth_date,
      birth_date_words,
      residential_address,
      place_of_birth_city,
      place_of_birth_state,
      place_of_birth_country,
      caste,
      emergency_contact_name,
      emergency_contact_mobile,
      last_school_attended,
      father_surname,
      father_first_name,
      father_qualification,
      father_profession,
      father_office_address,
      father_office_tel,
      father_email,
      father_mobile,
      mother_surname,
      mother_first_name,
      mother_qualification,
      mother_profession,
      mother_office_address,
      mother_office_tel,
      mother_email,
      mother_mobile,
      siblings
    } = cleanedBody;

    console.log('Received admission application:', cleanedBody);

    // Validation (add more as needed)
    if (!student_first_name || !student_surname || !admission_class || !sex || !birth_date || !emergency_contact_name || !emergency_contact_mobile) {
      console.log('Validation failed:', { student_first_name, student_surname, admission_class, sex, birth_date, emergency_contact_name, emergency_contact_mobile });
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    await client.query('BEGIN');

    const result = await client.query(
      `INSERT INTO admissions (
        application_no, udise_no, date_of_application, sports, club, admission_class,
        student_first_name, student_middle_name, student_surname, sex, aadhar_no, birth_date, birth_date_words,
        residential_address, place_of_birth_city, place_of_birth_state, place_of_birth_country, caste, emergency_contact_name, emergency_contact_mobile, last_school_attended,
        father_surname, father_first_name, father_qualification, father_profession, father_office_address, father_office_tel, father_email, father_mobile,
        mother_surname, mother_first_name, mother_qualification, mother_profession, mother_office_address, mother_office_tel, mother_email, mother_mobile,
        siblings
      ) VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9, $10, $11, $12, $13,
        $14, $15, $16, $17, $18, $19, $20, $21,
        $22, $23, $24, $25, $26, $27, $28, $29,
        $30, $31, $32, $33, $34, $35, $36, $37,
        $38
      ) RETURNING *`,
      [
        application_no, udise_no, date_of_application, sports, club, admission_class,
        student_first_name, student_middle_name, student_surname, sex, aadhar_no, birth_date, birth_date_words,
        residential_address, place_of_birth_city, place_of_birth_state, place_of_birth_country, caste, emergency_contact_name, emergency_contact_mobile, last_school_attended,
        father_surname, father_first_name, father_qualification, father_profession, father_office_address, father_office_tel, father_email, father_mobile,
        mother_surname, mother_first_name, mother_qualification, mother_profession, mother_office_address, mother_office_tel, mother_email, mother_mobile,
        siblings
      ]
    );

    await client.query('COMMIT');
    console.log('Admission created successfully:', result.rows[0]);

    res.status(201).json({
      message: 'Admission application submitted successfully',
      admission: result.rows[0]
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Create admission error details:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      detail: error.detail
    });
    
    if (error.code === '23505') {  // Unique violation
      res.status(400).json({ error: 'A record with this information already exists' });
    } else if (error.code === '23502') {  // Not null violation
      res.status(400).json({ error: 'Required fields are missing' });
    } else if (error.code === '42P01') {  // Undefined table
      res.status(500).json({ error: 'Database table not found. Please ensure the database is properly set up.' });
    } else {
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  } finally {
    client.release();
  }
});

// Get all admissions (protected)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM admissions';
    let countQuery = 'SELECT COUNT(*) FROM admissions';
    let params = [];

    if (search) {
      query += ' WHERE student_first_name ILIKE $1 OR student_surname ILIKE $1 OR admission_class ILIKE $1';
      countQuery += ' WHERE student_first_name ILIKE $1 OR student_surname ILIKE $1 OR admission_class ILIKE $1';
      params.push(`%${search}%`);
    }

    query += ' ORDER BY id DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(limit, offset);

    const [admissionsResult, countResult] = await Promise.all([
      pool.query(query, params),
      pool.query(countQuery, search ? [search] : [])
    ]);

    // Add computed full_name for each admission
    const admissions = admissionsResult.rows.map(adm => ({
      ...adm,
      full_name: [adm.student_first_name, adm.student_middle_name, adm.student_surname].filter(Boolean).join(' ')
    }));

    res.json({
      admissions,
      total: parseInt(countResult.rows[0].count),
      page: parseInt(page),
      totalPages: Math.ceil(parseInt(countResult.rows[0].count) / limit)
    });
  } catch (error) {
    console.error('Get admissions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single admission (protected)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM admissions WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Admission not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get admission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update admission status (protected)
router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const result = await pool.query(
      'UPDATE admissions SET status = $1, notes = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
      [status, notes, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Admission not found' });
    }

    res.json({
      message: 'Admission updated successfully',
      admission: result.rows[0]
    });
  } catch (error) {
    console.error('Update admission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete admission (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM admissions WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Admission not found' });
    }

    res.json({ message: 'Admission deleted successfully' });
  } catch (error) {
    console.error('Delete admission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export admissions to PDF (protected)
router.get('/export/pdf', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM admissions ORDER BY id DESC');
    const admissions = result.rows;

    const doc = new PDFDocument();
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=admissions.pdf');
    
    doc.pipe(res);

    // Add title
    doc.fontSize(20).text('Rustomjie School - Admissions Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Generated on: ${new Date().toLocaleDateString()}`, { align: 'center' });
    doc.moveDown(2);

    // Add admissions data
    admissions.forEach((admission, index) => {
      const fullName = [admission.student_first_name, admission.student_middle_name, admission.student_surname].filter(Boolean).join(' ');
      doc.fontSize(14).text(`${index + 1}. ${fullName}`, { underline: true });
      doc.fontSize(10);
      doc.text(`Class: ${admission.admission_class}`);
      doc.text(`City: ${admission.place_of_birth_city || ''}`);
      doc.text(`State: ${admission.place_of_birth_state || ''}`);
      doc.text(`Email: ${admission.father_email || ''}`);
      doc.text(`Phone: ${admission.father_mobile || ''}`);
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    console.error('PDF export error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Student login endpoint
router.post('/student/login', async (req, res) => {
  const { student_id, password } = req.body;
  if (!student_id || !password) {
    return res.status(400).json({ error: 'Student ID and password are required' });
  }
  try {
    const result = await pool.query('SELECT * FROM admissions WHERE application_no = $1', [student_id]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const student = result.rows[0];
    // For now, password is birth_date in YYYY-MM-DD
    if (student.birth_date && student.birth_date.toISOString().slice(0, 10) === password) {
      const token = jwt.sign(
        { id: student.id, application_no: student.application_no },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );
      return res.json({
        message: 'Login successful',
        token,
        student: {
          id: student.id,
          application_no: student.application_no,
          full_name: [student.student_first_name, student.student_middle_name, student.student_surname].filter(Boolean).join(' '),
          admission_class: student.admission_class
        }
      });
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Student login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 