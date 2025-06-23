import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ image, title, description }: { image: string; title: string; description: string }) => (
  <div className="flex flex-col items-center" data-aos="fade-up">
    <img src={image} alt={title} className="w-full h-48 object-cover rounded-lg mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

const GalleryImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="rounded-lg overflow-hidden" data-aos="zoom-in">
    <img src={src} alt={alt} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" />
  </div>
);

const Home = () => (
  <div className="min-h-screen">
    {/* Hero Section */}
    <section className="relative h-[500px]">
      <img
        src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&q=80"
        alt="School Building"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent flex items-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" data-aos="fade-right">
            Rustomjie International School
          </h1>
          <p className="text-xl text-white/90 max-w-xl mb-8" data-aos="fade-right" data-aos-delay="200">
            Empowering students to achieve academic excellence and personal growth in a nurturing environment.
          </p>
          <Link
            to="/admissions"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow transition-all duration-200 text-lg"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </section>

    {/* Upcoming Events Section */}
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <EventCard
            image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
            title="Annual School Fair"
            description="Join us for a day of fun and games!"
          />
          <EventCard
            image="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80"
            title="Inter-School Sports Tournament"
            description="Cheer on our teams as they compete!"
          />
          <EventCard
            image="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80"
            title="Science and Innovation Expo"
            description="Explore the wonders of science and technology!"
          />
        </div>
      </div>
    </section>

    {/* Latest News Section */}
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">Latest News</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <span className="text-sm text-blue-600">School News</span>
          <h3 className="text-xl font-semibold mt-2">New Scholarship Program Announced</h3>
          <p className="text-gray-600 mt-2">
            We are excited to introduce a new scholarship program to support deserving students in their academic pursuits.
          </p>
        </div>
      </div>
    </section>

    {/* Gallery Section */}
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <GalleryImage 
            src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80" 
            alt="Students studying" 
          />
          <GalleryImage 
            src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80" 
            alt="Library" 
          />
          <GalleryImage 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80" 
            alt="School hallway" 
          />
          <GalleryImage 
            src="https://images.unsplash.com/photo-1613896527026-f195d5c818ed?auto=format&fit=crop&w=800&q=80" 
            alt="Campus" 
          />
          <GalleryImage 
            src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80" 
            alt="Students in class" 
          />
          <GalleryImage 
            src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80" 
            alt="Consultation" 
          />
        </div>
      </div>
    </section>

    {/* Call to Action Section */}
    <section className="py-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to Join Rustomjie International School?</h2>
      <p className="text-gray-600 mb-8">Start your journey with us today!</p>
      <Link
        to="/admissions"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow transition-all duration-200 text-lg"
      >
        Apply Now
      </Link>
    </section>
  </div>
);

export default Home; 