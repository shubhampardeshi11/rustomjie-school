import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Admin login
app.post('/api/admin/login', (req, res) => {
  res.json({ message: 'Login endpoint (to be implemented)' });
});

// Create admission
app.post('/api/admissions', (req, res) => {
  res.json({ message: 'Create admission endpoint (to be implemented)' });
});

// List all admissions (protected)
app.get('/api/admissions', (req, res) => {
  res.json({ message: 'List admissions endpoint (to be implemented)' });
});

// Export admissions to PDF (protected)
app.get('/api/admissions/pdf', (req, res) => {
  res.json({ message: 'Export PDF endpoint (to be implemented)' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 