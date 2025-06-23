import React from 'react';

interface StaffMemberProps {
  name: string;
  role: string;
  image: string;
}

const StaffMember = ({ name, role, image }: StaffMemberProps) => (
  <div className="flex flex-col items-center" data-aos="fade-up">
    <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
      <img src={image} alt={name} className="w-full h-full object-cover" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
    <p className="text-sm text-blue-600">{role}</p>
  </div>
);

const About = () => (
  <div className="bg-white">
    {/* Hero Image */}
    <div className="relative h-[300px] mb-12">
      <img
        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80"
        alt="School Building"
        className="w-full h-full object-cover"
      />
    </div>

    <div className="container mx-auto px-6 py-12">
      {/* Our Mission */}
      <section className="mb-16" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          At Rustomjie International School, we are dedicated to fostering a nurturing and challenging educational environment that empowers students to achieve their full potential. We strive to cultivate intellectual curiosity, creativity, and a lifelong love of learning, preparing students to be responsible global citizens and leaders in their communities.
        </p>
      </section>

      {/* History */}
      <section className="mb-16" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-6">History</h2>
        <p className="text-gray-700 leading-relaxed">
          Founded in 1995, Rustomjie International School began as a small community school with a vision to provide personalized education. Over the years, we have grown into a renowned institution known for academic excellence and innovative programs. Our commitment to our founding principles remains steadfast as we continue to evolve and meet the needs of our diverse student body.
        </p>
      </section>

      {/* Philosophy */}
      <section className="mb-16" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-6">Philosophy</h2>
        <p className="text-gray-700 leading-relaxed">
          Our educational philosophy is centered on holistic development. We believe in nurturing not only academic skills but also character, emotional intelligence, and social responsibility. Our curriculum is designed to encourage critical thinking, collaboration, and creativity, ensuring students are well-prepared for the challenges of the future.
        </p>
      </section>

      {/* Core Values */}
      <section className="mb-16" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-6">Core Values</h2>
        <ul className="space-y-4 text-gray-700">
          <li><strong>Integrity:</strong> We uphold the highest ethical standards in all our endeavors.</li>
          <li><strong>Excellence:</strong> We strive for excellence in teaching, learning, and all aspects of school life.</li>
          <li><strong>Community:</strong> We foster a supportive and inclusive community where every individual is valued.</li>
          <li><strong>Innovation:</strong> We embrace innovation and continuous improvement to enhance the educational experience.</li>
          <li><strong>Respect:</strong> We promote respect for self, others, and the environment.</li>
        </ul>
      </section>

      {/* Achievements & Programs */}
      <section className="mb-16" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-6">Achievements & Programs</h2>
        <p className="text-gray-700 leading-relaxed">
          Rustomjie International School has been recognized for its outstanding achievements in academics, arts, and athletics. Our unique programs, such as the Leadership Institute and the Global Studies Initiative, provide students with exceptional opportunities for growth and development. We are proud recipients of the National School of Excellence Award and consistently rank among the top schools in the region.
        </p>
      </section>

      {/* Faculty & Staff */}
      <section className="mb-16" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-6">Faculty & Staff</h2>
        <p className="text-gray-700 mb-8">
          Our dedicated faculty and staff are the heart of Rustomjie International School. Comprised of experienced educators and professionals, they are committed to providing a supportive and enriching environment for our students. Meet some of our team members below:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <StaffMember
            name="Dr. Amelia Harper"
            role="Head of School"
            image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
          />
          <StaffMember
            name="Mr. Ethan Carter"
            role="Director of Academics"
            image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80"
          />
          <StaffMember
            name="Ms. Olivia Bennett"
            role="Dean of Students"
            image="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80"
          />
          <StaffMember
            name="Mr. Noah Thompson"
            role="Athletic Director"
            image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
          />
        </div>
      </section>

      {/* Contact Information */}
      <section className="mb-16" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <div className="text-gray-700 space-y-2">
          <p>For inquiries, please contact us at:</p>
          <p>Email: info@rustomjieschool.edu</p>
          <p>Phone: (555) 123-4567</p>
          <p>Address: 123 Oak Street, Anytown, USA</p>
        </div>
      </section>
    </div>
  </div>
);

export default About; 