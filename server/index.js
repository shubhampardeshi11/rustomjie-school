import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import adminRouter from './routes/admin.js';
import admissionsRouter from './routes/admissions.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRouter);
app.use('/api/admissions', admissionsRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 