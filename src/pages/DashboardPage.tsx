import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Pet, getPetById } from '../data/petsData';
import { Heart, CalendarClock, User, MapPin, Mail, Clock, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

type Adoption = {
  petId: string;
  petName: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
};

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'favorites' | 'applications'>('profile');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoritePets, setFavoritePets] = useState<Pet[]>([]);
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  
  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      const favoriteIds = JSON.parse(storedFavorites);
      setFavorites(favoriteIds);
      
      // Get pet details for each favorite
      const pets = favoriteIds.map((id: string) => getPetById(id)).filter(Boolean) as Pet[];
      setFavoritePets(pets);
    }
    
    // Load adoptions from localStorage
    const storedAdoptions = localStorage.getItem('adoptions');
    if (storedAdoptions) {
      setAdoptions(JSON.parse(storedAdoptions));
    }
  }, []);
  
  const handleRemoveFavorite = (id: string) => {
    const newFavorites = favorites.filter(petId => petId !== id);
    setFavorites(newFavorites);
    setFavoritePets(prevPets => prevPets.filter(pet => pet.id !== id));
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };
  
  const getStatusColor = (status: Adoption['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };
  
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col items-center text-center mb-6">
                <img 
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random&size=128`} 
                  alt={user?.name || 'User'} 
                  className="w-24 h-24 rounded-full mb-3 border-4 border-primary-100"
                />
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-gray-500">{user?.email}</p>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left p-3 rounded-md flex items-center ${
                    activeTab === 'profile'
                      ? 'bg-primary-50 text-primary-700'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <User className="h-5 w-5 mr-3" />
                  My Profile
                </button>
                
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`w-full text-left p-3 rounded-md flex items-center ${
                    activeTab === 'favorites'
                      ? 'bg-primary-50 text-primary-700'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <Heart className="h-5 w-5 mr-3" />
                  Favorite Pets
                  {favorites.length > 0 && (
                    <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-primary-100 text-primary-800">
                      {favorites.length}
                    </span>
                  )}
                </button>
                
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`w-full text-left p-3 rounded-md flex items-center ${
                    activeTab === 'applications'
                      ? 'bg-primary-50 text-primary-700'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <CalendarClock className="h-5 w-5 mr-3" />
                  Applications
                  {adoptions.length > 0 && (
                    <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-primary-100 text-primary-800">
                      {adoptions.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
            
            <div className="bg-primary-50 rounded-lg p-4 border border-primary-100">
              <h3 className="font-semibold text-primary-800 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                If you have any questions about your adoption application or need assistance, our team is here to help.
              </p>
              <Link to="/contact" className="btn btn-primary block w-full text-center">
                Contact Support
              </Link>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-grow">
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                exit={{ opacity: 0 }}
              >
                <div className="bg-white rounded-lg shadow-md">
                  <div className="border-b border-gray-200 p-6">
                    <h1 className="text-2xl font-bold">My Profile</h1>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-8">
                      <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="label">Full Name</label>
                          <input
                            type="text"
                            value={user?.name || ''}
                            className="input bg-gray-50"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="label">Email Address</label>
                          <input
                            type="email"
                            value={user?.email || ''}
                            className="input bg-gray-50"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="phone" className="label">Phone Number</label>
                          <input
                            id="phone"
                            type="tel"
                            placeholder="Add your phone number"
                            className="input"
                          />
                        </div>
                        <div>
                          <label htmlFor="address" className="label">Address</label>
                          <input
                            id="address"
                            type="text"
                            placeholder="Add your address"
                            className="input"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <button className="btn btn-primary">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'favorites' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                exit={{ opacity: 0 }}
              >
                <div className="bg-white rounded-lg shadow-md">
                  <div className="border-b border-gray-200 p-6">
                    <h1 className="text-2xl font-bold">My Favorite Pets</h1>
                  </div>
                  
                  <div className="p-6">
                    {favoritePets.length > 0 ? (
                      <div className="grid grid-cols-1 gap-4">
                        {favoritePets.map(pet => (
                          <div 
                            key={pet.id}
                            className="flex flex-col sm:flex-row border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                          >
                            <div className="w-full sm:w-40 h-40 shrink-0">
                              <img 
                                src={pet.image} 
                                alt={pet.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-4 flex-grow flex flex-col">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-lg font-bold">{pet.name}</h3>
                                  <p className="text-gray-500 text-sm">{pet.breed} · {pet.age} {pet.age === 1 ? 'year' : 'years'} old</p>
                                </div>
                                <button
                                  onClick={() => handleRemoveFavorite(pet.id)}
                                  className="text-red-500 hover:text-red-700"
                                  aria-label="Remove from favorites"
                                >
                                  <XCircle className="h-5 w-5" />
                                </button>
                              </div>
                              
                              <div className="flex items-center mt-2 text-gray-500 text-sm">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{pet.location}</span>
                              </div>
                              
                              <div className="mt-auto pt-3 flex justify-end">
                                <Link 
                                  to={`/pets/${pet.id}`}
                                  className="btn btn-primary"
                                >
                                  View Details
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-800 mb-2">No favorites yet</h3>
                        <p className="text-gray-600 mb-6">
                          You haven't added any pets to your favorites yet.
                        </p>
                        <Link to="/pets" className="btn btn-primary">
                          Find Pets
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'applications' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                exit={{ opacity: 0 }}
              >
                <div className="bg-white rounded-lg shadow-md">
                  <div className="border-b border-gray-200 p-6">
                    <h1 className="text-2xl font-bold">My Applications</h1>
                  </div>
                  
                  <div className="p-6">
                    {adoptions.length > 0 ? (
                      <div className="grid grid-cols-1 gap-4">
                        {adoptions.map((adoption, index) => {
                          const pet = getPetById(adoption.petId);
                          return (
                            <div 
                              key={index}
                              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                            >
                              <div className="flex flex-col sm:flex-row">
                                {pet && (
                                  <div className="w-full sm:w-40 h-40 shrink-0">
                                    <img 
                                      src={pet.image} 
                                      alt={pet.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}
                                <div className="p-4 flex-grow flex flex-col">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h3 className="text-lg font-bold">{adoption.petName}</h3>
                                      <div className="flex items-center mt-1">
                                        <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(adoption.status)}`}>
                                          {adoption.status.charAt(0).toUpperCase() + adoption.status.slice(1)}
                                        </span>
                                        <span className="text-gray-500 text-sm ml-2 flex items-center">
                                          <Clock className="h-3 w-3 mr-1" />
                                          {new Date(adoption.date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                          })}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="mt-3 border-t border-gray-100 pt-3">
                                    <div className="text-sm text-gray-500">
                                      {adoption.status === 'pending' && (
                                        <p>Your application is being reviewed. We'll contact you soon.</p>
                                      )}
                                      {adoption.status === 'approved' && (
                                        <p className="text-green-700">Your application has been approved! We'll contact you to arrange a meeting.</p>
                                      )}
                                      {adoption.status === 'rejected' && (
                                        <p className="text-red-700">We're sorry, your application was not approved at this time.</p>
                                      )}
                                    </div>
                                  </div>
                                  
                                  {pet && (
                                    <div className="mt-auto pt-3 flex justify-end">
                                      <Link 
                                        to={`/pets/${pet.id}`}
                                        className="btn btn-outline"
                                      >
                                        View Pet
                                      </Link>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <CalendarClock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-800 mb-2">No applications yet</h3>
                        <p className="text-gray-600 mb-6">
                          You haven't submitted any adoption applications yet.
                        </p>
                        <Link to="/pets" className="btn btn-primary">
                          Find Pets
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;