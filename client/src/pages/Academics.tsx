import React from 'react';

const AcademicLevel = ({ 
  title, 
  description, 
  image 
}: { 
  title: string; 
  description: string; 
  image: string;
}) => (
  <div className="mb-12" data-aos="fade-up">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <p className="text-gray-700 mb-6">{description}</p>
    <div className="rounded-lg overflow-hidden shadow-lg">
      <img src={image} alt={title} className="w-full h-[300px] object-cover" />
    </div>
  </div>
);

const Academics = () => (
  <div className="bg-white">
    <div className="container mx-auto px-6 py-12">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-4" data-aos="fade-up">Academics</h1>
      <p className="text-gray-600 mb-12" data-aos="fade-up">
        Excellence in comprehensive education programs designed to foster intellectual curiosity and academic excellence.
      </p>

      {/* Curriculum Overview */}
      <section className="mb-16" data-aos="fade-up">
        <h2 className="text-2xl font-bold mb-6">Curriculum Overview</h2>
        <p className="text-gray-700">
          Our curriculum is designed to provide a balanced and rigorous education, preparing students for success in higher education 
          and beyond. Key subjects include Mathematics, Science, English Language Arts, Social Studies, and World Languages. We 
          also offer specialized programs in Arts, Technology, and Physical Education.
        </p>
      </section>

      {/* Academic Levels */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Academic Levels</h2>
        
        <AcademicLevel
          title="Elementary School (Grades K-5)"
          description="Our elementary program provides a strong foundation with a balanced blend of core academic learning, 
          experiential learning, and creative thinking. Students develop essential skills in reading, writing, mathematics, 
          science, social studies, and basic technology. Our curriculum includes reading, writing, mathematics, science, 
          social studies, art, music, and physical education."
          image="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=1200&q=80"
        />

        <AcademicLevel
          title="Middle School (Grades 6-8)"
          description="The middle school curriculum builds on the elementary foundation, introducing more complex concepts and encouraging 
          independent learning. Students explore a wider range of subjects, including advanced mathematics, scientific research, 
          history, and foreign languages. The fine arts, technology, and physical education are also core parts."
          image="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80"
        />

        <AcademicLevel
          title="High School (Grades 9-12)"
          description="Our high school program offers comprehensive college preparatory curriculum with a wide selection of courses, including 
          AP and honors level opportunities. Students can tailor their academic path to their interests and goals, with 
          opportunities for in-depth study in various disciplines and university guidance and resources for college applications."
          image="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80"
        />
      </section>

      {/* Academic Policies */}
      <section className="mb-16" data-aos="fade-up">
        <h2 className="text-2xl font-bold mb-6">Academic Policies</h2>
        <p className="text-gray-700 mb-4">
          Our Academy upholds rigorous fair and supportive learning environment for all students. These policies cover attendance, 
          grading scales, academic integrity, and student conduct. Detailed information about our policies can be found in our student handbook.
        </p>
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">Key Policies Include:</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Attendance and punctuality requirements</li>
            <li>Grading system and academic standards</li>
            <li>Homework and assignment guidelines</li>
            <li>Academic integrity and plagiarism policy</li>
            <li>Student code of conduct</li>
          </ul>
        </div>
      </section>

      {/* Student Support Services */}
      <section className="mb-16" data-aos="fade-up">
        <h2 className="text-2xl font-bold mb-6">Student Support Services</h2>
        <p className="text-gray-700 mb-6">
          We offer comprehensive support services to help students succeed academically, including tutoring, mentoring, and learning 
          resources. Our dedicated staff is committed to providing personalized assistance to meet the diverse needs of our students.
        </p>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-semibold mb-4">Available Services:</h3>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <h4 className="font-medium mb-2">Academic Support</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>One-on-one tutoring</li>
                <li>Study groups</li>
                <li>Academic counseling</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Additional Resources</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Learning resource center</li>
                <li>Technology assistance</li>
                <li>College preparation support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-gray-50 p-6 rounded-lg" data-aos="fade-up">
        <h2 className="text-xl font-bold mb-4">Contact Information</h2>
        <p className="text-gray-700">For inquiries about academic programs, please contact the relevant department:</p>
        <p className="text-blue-600 mt-2">Phone: (555) 123-4567</p>
      </section>
    </div>
  </div>
);

export default Academics; 