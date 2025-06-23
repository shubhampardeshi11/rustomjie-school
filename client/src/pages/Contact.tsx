import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-4" data-aos="fade-up">Contact Us</h1>
        <p className="text-gray-600 mb-12" data-aos="fade-up">
          Please feel free to reach out with any questions or inquiries.
        </p>

        {/* General Inquiries */}
        <section className="mb-12" data-aos="fade-up">
          <h2 className="text-2xl font-bold mb-6">General Inquiries</h2>
          <p className="text-gray-700 mb-4">
            For general questions about Rustomjie School, our programs, or admissions, please use the contact information below:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Address:</h3>
              <p className="text-gray-700">123 Education Street, Springfield</p>
              <p className="text-gray-700">CA 90210</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Phone:</h3>
              <p className="text-gray-700">(555) 123-4567</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Email:</h3>
              <p className="text-gray-700">info@rustomjie.edu</p>
            </div>
          </div>
        </section>

        {/* Department Contacts */}
        <section className="mb-12" data-aos="fade-up">
          <h2 className="text-2xl font-bold mb-6">Department Contacts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Admissions Office</h3>
              <p className="text-gray-700">admissions@rustomjie.edu</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Academic Services</h3>
              <p className="text-gray-700">academics@rustomjie.edu</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Student Support</h3>
              <p className="text-gray-700">support@rustomjie.edu</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Technical Support</h3>
              <p className="text-gray-700">techsupport@rustomjie.edu</p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="mb-12" data-aos="fade-up">
          <h2 className="text-2xl font-bold mb-6">Contact Form</h2>
          <form onSubmit={handleSubmit} className="max-w-2xl">
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </form>
        </section>

        {/* Location */}
        <section className="mb-12" data-aos="fade-up">
          <h2 className="text-2xl font-bold mb-6">Location</h2>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.0807252101527!2d75.55949567525553!3d20.989400980650068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd90e4e1b2bf4ff%3A0x665fbbcacb5da97d!2sRustomjie%20International%20School%20Jr%20Wing!5e0!3m2!1sen!2sin!4v1750676149675!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

       
      </div>
    </div>
  );
};

export default Contact; 