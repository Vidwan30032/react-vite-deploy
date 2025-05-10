import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import axios from 'axios';

import PetCard from '../components/pets/PetCard';
import PetFilter from '../components/pets/PetFilter';
import { getAllPets, searchPets, FilterOptions, filterPets } from '../data/petsData';

const PetsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({});
  const [filteredPets, setFilteredPets] = useState(getAllPets());
  const [favorites, setFavorites] = useState<string[]>([]);

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Send Sample Pet Data to MongoDB
  const sendSamplePetToMongo = async () => {
    try {
      const pet = {
        name: "Charlie",
        age: 3,
        type: "Dog",
        breed: "Labrador",
        location: "Hyderabad",
        description: "Friendly and energetic",
      };

      await axios.post("http://localhost:5000/api/pets", pet);
      alert("✅ Sample pet sent to MongoDB!");
    } catch (error) {
      console.error("❌ Error sending pet to MongoDB:", error);
      alert("Failed to send pet.");
    }
  };

  // Get type from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const typeParam = params.get('type');

    if (typeParam) {
      setActiveFilters(prev => ({ ...prev, type: typeParam as any }));
    }
  }, [location.search]);

  // Apply filters when they change
  useEffect(() => {
    let results = getAllPets();

    if (searchQuery.trim()) {
      results = searchPets(searchQuery);
    }

    if (Object.keys(activeFilters).length > 0) {
      results = filterPets(activeFilters);
    }

    setFilteredPets(results);
  }, [searchQuery, activeFilters]);

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleToggleFavorite = (id: string) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(petId => petId !== id)
      : [...favorites, id];

    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const clearFilters = () => {
    setActiveFilters({});
    navigate('/pets');
  };

  const activeFilterCount = Object.keys(activeFilters).length;

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Find Your Perfect Pet</h1>
          <p className="text-gray-600">
            Browse our available pets and filter to find your perfect match
          </p>
        </div>

        {/* ✅ Button to Send Sample Pet to MongoDB */}
        <button
          onClick={sendSamplePetToMongo}
          className="btn btn-primary mb-4"
        >
          🚀 Send Sample Pet to MongoDB
        </button>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, breed, or location..."
                  className="input pl-10 pr-4 py-3 w-full"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </form>

            <div className="w-full md:w-48">
              <PetFilter 
                onFilter={setActiveFilters} 
                initialFilters={activeFilters} 
              />
            </div>
          </div>

          {activeFilterCount > 0 && (
            <div className="mt-4 flex items-center">
              <span className="text-sm text-gray-500 mr-2">Active filters:</span>
              <div className="flex flex-wrap gap-2">
                {Object.entries(activeFilters).map(([key, value]) => {
                  if (key === 'age') return null;

                  return (
                    <div 
                      key={key} 
                      className="bg-primary-100 text-primary-800 text-xs px-3 py-1 rounded-full flex items-center"
                    >
                      <span className="capitalize">{key}: </span>
                      <span className="ml-1 font-medium capitalize">{value.toString()}</span>
                      <button 
                        onClick={() => {
                          const newFilters = { ...activeFilters };
                          delete newFilters[key as keyof FilterOptions];
                          setActiveFilters(newFilters);
                        }} 
                        className="ml-1 text-primary-600 hover:text-primary-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  );
                })}

                {activeFilters.age && (
                  <div className="bg-primary-100 text-primary-800 text-xs px-3 py-1 rounded-full flex items-center">
                    <span>Age: </span>
                    <span className="ml-1 font-medium">
                      {activeFilters.age.min !== undefined && activeFilters.age.max !== undefined 
                        ? `${activeFilters.age.min}-${activeFilters.age.max}` 
                        : activeFilters.age.min !== undefined
                          ? `${activeFilters.age.min}+`
                          : `0-${activeFilters.age.max}`}
                    </span>
                    <button 
                      onClick={() => {
                        const newFilters = { ...activeFilters };
                        delete newFilters.age;
                        setActiveFilters(newFilters);
                      }} 
                      className="ml-1 text-primary-600 hover:text-primary-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}

                <button 
                  onClick={clearFilters}
                  className="text-primary-600 hover:text-primary-800 text-xs font-medium"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {filteredPets.length} {filteredPets.length === 1 ? 'pet' : 'pets'} available
            </h2>
          </div>

          {filteredPets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredPets.map((pet) => (
                  <PetCard 
                    key={pet.id} 
                    pet={pet} 
                    isFavorited={favorites.includes(pet.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="mb-4">
                <SlidersHorizontal className="h-12 w-12 text-gray-400 mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">No pets found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or search terms
              </p>
              <button 
                onClick={clearFilters}
                className="btn btn-outline"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetsPage;
