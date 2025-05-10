import React from 'react';
import { motion } from 'framer-motion';
import { Heart, PawPrint, Users, Mail, Phone, Clock, MapPin, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const team = [
    {
      name: 'Vidwan',
      role: 'Founder & Director',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      bio: 'Sarah has been passionate about animal welfare for over 15 years. She founded PetPal to ensure every pet finds their perfect forever home.',
    },
    {
      name: 'Shankar',
      role: 'Veterinarian',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      bio: 'Dr. Chen ensures all our pets receive the highest standard of care before and during adoption. He specializes in small animal medicine.',
    },
    {
      name: 'CHARITESH',
      role: 'Adoption Coordinator',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      bio: 'Maria helps match pets with their perfect families. She has helped facilitate over 500 successful adoptions over the past 5 years.',
    },
  ];
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 bg-primary-900 opacity-90 z-0" />
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
            opacity: 0.3
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Our Mission
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl leading-relaxed"
            >
              At PetPal, we believe every pet deserves a loving home. Our mission is to connect animals in need with caring individuals and families, creating lifelong bonds and endless joy.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.pexels.com/photos/6643877/pexels-photo-6643877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Someone holding a dog"
                className="rounded-lg shadow-md w-full h-auto"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Story</h2>
              <div className="h-1 w-20 bg-primary-500 mb-6"></div>
              <p className="text-gray-700 mb-4">
                PetPal was founded in 2020 with a simple goal: to reduce the number of homeless pets and increase successful adoptions. What started as a small local initiative has grown into a community of animal lovers dedicated to making a difference.
              </p>
              <p className="text-gray-700 mb-6">
                We partner with shelters, rescue organizations, and veterinarians to ensure every pet in our care receives medical attention, socialization, and love before finding their forever home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center">
                  <div className="bg-primary-100 p-3 rounded-full mr-4">
                    <Heart className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">500+</h3>
                    <p className="text-gray-600">Adoptions</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-secondary-100 p-3 rounded-full mr-4">
                    <PawPrint className="h-6 w-6 text-secondary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">50+</h3>
                    <p className="text-gray-600">Partner Shelters</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Values</h2>
            <div className="h-1 w-20 bg-primary-500 mx-auto mb-6"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Our core values guide everything we do at PetPal, from how we care for our animals to how we interact with adopters and volunteers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="h-10 w-10 text-primary-500" />,
                title: 'Compassion',
                description: 'We treat every animal with kindness and respect, providing them with the care they deserve.',
                color: 'bg-primary-50',
                border: 'border-primary-100'
              },
              {
                icon: <Users className="h-10 w-10 text-secondary-500" />,
                title: 'Community',
                description: 'We foster a supportive network of pet lovers, adopters, and volunteers who share our mission.',
                color: 'bg-secondary-50',
                border: 'border-secondary-100'
              },
              {
                icon: <Smile className="h-10 w-10 text-accent-500" />,
                title: 'Commitment',
                description: 'We are dedicated to finding the perfect match between pets and adopters to ensure lifelong happiness.',
                color: 'bg-accent-50',
                border: 'border-accent-100'
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${value.color} ${value.border} border rounded-lg p-6 text-center`}
              >
                <div className="inline-block mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Meet Our Team</h2>
            <div className="h-1 w-20 bg-primary-500 mx-auto mb-6"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Our dedicated team works tirelessly to ensure the health and happiness of our animals and to facilitate successful adoptions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-700">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Info Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Visit Our Adoption Center</h2>
              <div className="h-1 w-20 bg-primary-500 mb-6"></div>
              <p className="text-gray-300 mb-8">
                We'd love to meet you in person! Come visit our adoption center to meet our pets and speak with our adoption counselors.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-primary-400 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-gray-300">123 Adoption Street, Pet City, PC 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-primary-400 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-300">(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-primary-400 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-300">info@petpal.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-primary-400 mt-1 mr-3" />
                  <div>
                    <h3 className="font-semibold">Hours</h3>
                    <p className="text-gray-300">Monday - Saturday: 10am - 6pm</p>
                    <p className="text-gray-300">Sunday: 12pm - 4pm</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/contact" className="btn btn-primary">
                  Contact Us
                </Link>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-lg">
              {/* Embed a map or use an image as placeholder */}
              <img 
                src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Our location"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Change a Life?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Browse our available pets and start your adoption journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pets" className="btn bg-white text-primary-800 hover:bg-gray-100">
              Find a Pet
            </Link>
            <Link to="/contact" className="btn bg-primary-700 text-white hover:bg-primary-800">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;