import pkg from 'pg';
const { Pool } = pkg;
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupDatabase() {
  // First, connect to the default 'postgres' database
  const postgresPool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: 'postgres',  // Connect to default database first
    password: process.env.DB_PASSWORD || 'admin',
    port: process.env.DB_PORT || 5432,
  });

  try {
    // Try to create the database
    await postgresPool.query('CREATE DATABASE rustomjie_school');
    console.log('Database created successfully');
  } catch (error) {
    if (error.code === '42P04') {
      console.log('Database already exists, continuing...');
    } else {
      console.error('Error creating database:', error);
      process.exit(1);
    }
  } finally {
    await postgresPool.end();
  }

  // Now connect to our new database and create tables
  const appPool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: 'rustomjie_school',
    password: process.env.DB_PASSWORD || 'admin',
    port: process.env.DB_PORT || 5432,
  });

  try {
    // Read and execute the schema file
    const schema = fs.readFileSync(path.join(__dirname, 'db.sql'), 'utf8');
    await appPool.query(schema);
    console.log('Tables created successfully!');
  } catch (error) {
    console.error('Error creating tables:', error);
    process.exit(1);
  } finally {
    await appPool.end();
  }
}

setupDatabase(); 