import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Heart, MapPin, Clock, Calendar, CheckCircle, XCircle, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getPetById } from '../data/petsData';

const PetDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pet, setPet] = useState(id ? getPetById(id) : null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdopting, setIsAdopting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    if (!pet) {
      // If pet not found, redirect to pets page
      navigate('/pets');
    }
    
    // Check if pet is favorited
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites && id) {
      const favorites = JSON.parse(storedFavorites);
      setIsFavorited(favorites.includes(id));
    }
  }, [pet, id, navigate]);
  
  const handleToggleFavorite = () => {
    if (!id) return;
    
    const storedFavorites = localStorage.getItem('favorites');
    let favorites: string[] = storedFavorites ? JSON.parse(storedFavorites) : [];
    
    if (isFavorited) {
      favorites = favorites.filter(petId => petId !== id);
    } else {
      favorites.push(id);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorited(!isFavorited);
  };
  
  const handleAdoptClick = () => {
    setIsAdopting(true);
  };
  
  const handleSubmitAdoption = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Store adoption in localStorage
      const adoptions = JSON.parse(localStorage.getItem('adoptions') || '[]');
      adoptions.push({
        petId: id,
        petName: pet?.name,
        status: 'pending',
        date: new Date().toISOString(),
      });
      localStorage.setItem('adoptions', JSON.stringify(adoptions));
    }, 1500);
  };
  
  if (!pet) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to pets</span>
          </button>
        </div>
        
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-8 text-center max-w-md mx-auto"
          >
            <div className="w-16 h-16 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Application Submitted!</h2>
            <p className="text-gray-700 mb-4">
              Thank you for your interest in adopting {pet.name}. We've received your application and will contact you soon.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/pets" className="btn btn-outline">
                Browse More Pets
              </Link>
              <Link to="/dashboard" className="btn btn-primary">
                View My Applications
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pet image */}
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg"
              >
                <img 
                  src={pet.image} 
                  alt={`${pet.name} - ${pet.breed}`}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </div>
            
            {/* Pet details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">{pet.name}</h1>
                  {isAuthenticated && (
                    <button
                      onClick={handleToggleFavorite}
                      className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Heart 
                        className={`h-6 w-6 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                      />
                    </button>
                  )}
                </div>
                
                <div className="flex items-center space-x-1 text-gray-600 mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{pet.location}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Breed</p>
                    <p className="font-medium">{pet.breed}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="font-medium">{pet.age} {pet.age === 1 ? 'year' : 'years'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium capitalize">{pet.gender}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Size</p>
                    <p className="font-medium capitalize">{pet.size}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">About {pet.name}</h2>
                  <p className="text-gray-700 mb-4">{pet.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center text-gray-700">
                      {pet.vaccinated ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 mr-2" />
                      )}
                      <span>Vaccinated</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      {pet.neutered ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 mr-2" />
                      )}
                      <span>Neutered/Spayed</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-gray-600 mr-1" />
                      <span className="text-lg font-bold">${pet.adoptionFee}</span>
                      <span className="text-gray-500 ml-1">adoption fee</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>
                        Posted{' '}
                        {new Date(pet.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                
                {isAdopting ? (
                  <div className="border-t border-gray-200 pt-6">
                    <h2 className="text-xl font-semibold mb-4">Adoption Application</h2>
                    <form onSubmit={handleSubmitAdoption}>
                      <div className="mb-4">
                        <label htmlFor="reason" className="label">
                          Why do you want to adopt {pet.name}?
                        </label>
                        <textarea
                          id="reason"
                          className="input min-h-[120px]"
                          placeholder="Tell us about your home environment and why you'd be a good fit for this pet..."
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="experience" className="label">
                          Do you have experience with pets?
                        </label>
                        <select id="experience" className="input" required>
                          <option value="">Please select...</option>
                          <option value="first-time">First-time pet owner</option>
                          <option value="previous">Had pets previously</option>
                          <option value="current">Currently have other pets</option>
                          <option value="expert">Experienced with this species</option>
                        </select>
                      </div>
                      <div className="mb-6">
                        <label htmlFor="housing" className="label">
                          Housing Type
                        </label>
                        <select id="housing" className="input" required>
                          <option value="">Please select...</option>
                          <option value="house">House with yard</option>
                          <option value="house-no-yard">House without yard</option>
                          <option value="apartment">Apartment</option>
                          <option value="condo">Condo</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          type="button"
                          onClick={() => setIsAdopting(false)}
                          className="btn btn-outline flex-1"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary flex-1"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Submitting...
                            </span>
                          ) : (
                            "Submit Application"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleAdoptClick}
                      className="btn btn-primary flex-grow"
                    >
                      Start Adoption Process
                    </button>
                    <Link to="/contact" className="btn btn-outline flex-grow">
                      Ask About {pet.name}
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetDetailsPage;