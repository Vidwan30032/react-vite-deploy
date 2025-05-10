import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, Users, PawPrint, Dog, Cat, Bird } from 'lucide-react';
import { motion } from 'framer-motion';
import { getAllPets, getPetsByType } from '../data/petsData';
import PetCard from '../components/pets/PetCard';

const HomePage: React.FC = () => {
  const recentPets = getAllPets().sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }).slice(0, 3);
  
  // Featured categories
  const categories = [
    { 
      name: 'Dogs', 
      count: getPetsByType('dog').length,
      icon: <Dog className="h-10 w-10 text-primary-500" />,
      link: '/pets?type=dog',
      bgColor: 'bg-primary-50',
      textColor: 'text-primary-800'
    },
    { 
      name: 'Cats', 
      count: getPetsByType('cat').length,
      icon: <Cat className="h-10 w-10 text-secondary-500" />,
      link: '/pets?type=cat',
      bgColor: 'bg-secondary-50',
      textColor: 'text-secondary-800'
    },
    { 
      name: 'Birds', 
      count: getPetsByType('bird').length,
      icon: <Bird className="h-10 w-10 text-accent-500" />,
      link: '/pets?type=bird',
      bgColor: 'bg-accent-50',
      textColor: 'text-accent-800'
    },
  ];
  
  // Stats
  const stats = [
    { label: 'Pets Adopted', value: '500+', icon: <Heart className="h-6 w-6 text-red-500" /> },
    { label: 'Available Pets', value: getAllPets().length, icon: <PawPrint className="h-6 w-6 text-primary-500" /> },
    { label: 'Happy Families', value: '450+', icon: <Users className="h-6 w-6 text-blue-500" /> },
  ];
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 z-0 bg-gray-900">
          <img 
            src="https://images.pexels.com/photos/1633522/pexels-photo-1633522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Happy dog with owner"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        
        <div className="container mx-auto px-4 z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl font-bold mb-4">Find Your Perfect Furry Friend</h1>
            <p className="text-xl mb-8">
              Adopt a pet today and bring joy into your life. Every pet deserves a loving home.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/pets" className="btn bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg text-lg">
                <Search className="mr-2 h-5 w-5" />
                Find a Pet
              </Link>
              <Link to="/about" className="btn bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-lg text-lg">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Pet Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Find by Pet Type</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We have a wide variety of pets looking for their forever homes. Find the perfect companion for your lifestyle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link to={category.link} className="block">
                  <div className={`rounded-xl ${category.bgColor} p-8 text-center hover:shadow-lg transition-shadow`}>
                    <div className="mx-auto mb-4">
                      {category.icon}
                    </div>
                    <h3 className={`text-xl font-bold ${category.textColor} mb-2`}>{category.name}</h3>
                    <p className="text-gray-600">{category.count} available</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Recent Pets */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Recently Added Pets</h2>
            <Link to="/pets" className="text-primary-600 hover:text-primary-800 font-medium flex items-center">
              View All Pets
              <span className="ml-1">→</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Adoption Process */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How to Adopt</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our adoption process is designed to be straightforward and ensure the best match between pets and their new families.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: 'Browse Available Pets',
                description: 'Search through our database of pets looking for their forever homes.',
                color: 'bg-primary-100 text-primary-800 border-primary-200',
              },
              {
                step: 2,
                title: 'Submit an Application',
                description: 'Fill out our adoption application to express your interest in a specific pet.',
                color: 'bg-secondary-100 text-secondary-800 border-secondary-200',
              },
              {
                step: 3,
                title: 'Meet Your New Friend',
                description: 'Schedule a meet-and-greet with your potential new pet and take them home!',
                color: 'bg-accent-100 text-accent-800 border-accent-200',
              },
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`${step.color} rounded-lg p-6 border`}
              >
                <div className="w-12 h-12 rounded-full bg-white text-lg font-bold flex items-center justify-center mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto mb-3">
                  {stat.icon}
                </div>
                <p className="text-4xl font-bold mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Match?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Browse our available pets and start your adoption journey today.
          </p>
          <Link to="/pets" className="btn bg-white text-primary-800 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg inline-flex items-center">
            <Search className="mr-2 h-5 w-5" />
            Find a Pet
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;