-- Admins table
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL
);

-- Admissions table
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

-- Students table
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