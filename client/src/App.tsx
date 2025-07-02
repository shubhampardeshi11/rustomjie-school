import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Admissions from './pages/Admissions';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Academics from './pages/Academics';
import Contact from './pages/Contact';
import StudentLogin from './pages/StudentLogin';
import StudentSignup from './pages/StudentSignup';
import NewsEvents from './pages/NewsEvents';

const App = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow mt-10">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/signup" element={<StudentSignup />} />
        <Route path="/news-events" element={<NewsEvents />} />
      </Routes>
    </main>
    <Footer />
  </div>
);

export default App; 