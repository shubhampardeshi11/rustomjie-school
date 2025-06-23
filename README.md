# Rustomjie School

A modern, full-stack school website built with the PERN stack (PostgreSQL, Express, React, Node.js) for Rustomjie School.

## Tech Stack
- **Frontend:** React + Vite + TypeScript + Tailwind CSS + AOS
- **Backend:** Express.js + Node.js + PostgreSQL + PDFKit
- **Authentication:** JWT + bcrypt (admin login)

## Features
- Responsive, modern education-themed UI
- Sticky navbar with Home, Admissions, Login
- Scroll animations (AOS)
- Admissions form (with validation)
- Admin login (JWT auth)
- Admin dashboard: view & export admissions to PDF

## Folder Structure
```
client/   # Frontend (React, Vite, TS, Tailwind, AOS)
server/   # Backend (Express, Node, PostgreSQL, PDFKit)
```

## Setup Instructions

### 1. Clone the repository
```bash
git clone <repo-url>
cd rustomjie-school
```

### 2. Environment Variables
- Copy `.env.example` to `server/.env` and fill in your values.

### 3. Install Dependencies
```bash
cd client
npm install
cd ../server
npm install
```

### 4. Database Setup
- Create a PostgreSQL database (e.g., `rustomjie_school`).
- Run the SQL in `server/db.sql` to create tables.

### 5. Run Development Servers
- In two terminals:
```bash
cd client
npm run dev
```
```bash
cd server
npm run dev
```

### 6. Build for Production
- Frontend: `npm run build` (in `client/`)
- Backend: `npm run start` (in `server/`)

### 7. Deploy
- Frontend: Vercel, Netlify, etc.
- Backend: Render, Railway, Heroku, etc.

## Scripts
- `client/`: `npm run dev`, `npm run build`
- `server/`: `npm run dev`, `npm run start`

## .env.example
See `server/.env.example` for required environment variables.

## License
MIT 