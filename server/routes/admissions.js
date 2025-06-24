import express from 'express';
import pool from '../db.js';
import { authenticateToken } from '../middleware/auth.js';
import PDFDocument from 'pdfkit';

const router = express.Router();

// Create admission application
router.post('/', async (req, res) => {
  try {
    const {
      full_name,
      father_name,
      mother_name,
      email,
      phone,
      class_applied,
      city,
      state,
      message
    } = req.body;

    // Validation
    if (!full_name || !father_name || !mother_name || !email || !phone || !class_applied || !city || !state) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    const result = await pool.query(
      `INSERT INTO admissions 
       (full_name, father_name, mother_name, email, phone, class_applied, city, state, message) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING *`,
      [full_name, father_name, mother_name, email, phone, class_applied, city, state, message]
    );

    res.status(201).json({
      message: 'Admission application submitted successfully',
      admission: result.rows[0]
    });
  } catch (error) {
    console.error('Create admission error:', error);
    res.status(500).json({ error: 'Internal server error' });
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
      query += ' WHERE full_name ILIKE $1 OR email ILIKE $1 OR class_applied ILIKE $1';
      countQuery += ' WHERE full_name ILIKE $1 OR email ILIKE $1 OR class_applied ILIKE $1';
      params.push(`%${search}%`);
    }

    query += ' ORDER BY id DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(limit, offset);

    const [admissionsResult, countResult] = await Promise.all([
      pool.query(query, params),
      pool.query(countQuery, search ? [search] : [])
    ]);

    res.json({
      admissions: admissionsResult.rows,
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
      doc.fontSize(14).text(`${index + 1}. ${admission.full_name}`, { underline: true });
      doc.fontSize(10);
      doc.text(`Father's Name: ${admission.father_name}`);
      doc.text(`Mother's Name: ${admission.mother_name}`);
      doc.text(`Email: ${admission.email}`);
      doc.text(`Phone: ${admission.phone}`);
      doc.text(`Class Applied: ${admission.class_applied}`);
      doc.text(`City: ${admission.city}, State: ${admission.state}`);
      if (admission.message) {
        doc.text(`Message: ${admission.message}`);
      }
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    console.error('PDF export error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 