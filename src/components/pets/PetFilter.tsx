import React, { useState } from 'react';
import { FilterOptions } from '../../data/petsData';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type PetFilterProps = {
  onFilter: (filters: FilterOptions) => void;
  initialFilters?: FilterOptions;
  className?: string;
};

const PetFilter: React.FC<PetFilterProps> = ({ 
  onFilter, 
  initialFilters = {}, 
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  
  const [minAge, setMinAge] = useState<string>(
    initialFilters.age?.min !== undefined ? initialFilters.age.min.toString() : ''
  );
  
  const [maxAge, setMaxAge] = useState<string>(
    initialFilters.age?.max !== undefined ? initialFilters.age.max.toString() : ''
  );
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Process age filters
    const age = {};
    if (minAge) {
      Object.assign(age, { min: parseInt(minAge, 10) });
    }
    if (maxAge) {
      Object.assign(age, { max: parseInt(maxAge, 10) });
    }
    
    // Apply age filters only if they exist
    const finalFilters = { ...filters };
    if (Object.keys(age).length > 0) {
      finalFilters.age = age;
    } else {
      delete finalFilters.age;
    }
    
    onFilter(finalFilters);
    setIsOpen(false);
  };
  
  const resetFilters = () => {
    setFilters({});
    setMinAge('');
    setMaxAge('');
    onFilter({});
  };
  
  const handleTypeChange = (type: string) => {
    setFilters({
      ...filters,
      type: type as FilterOptions['type']
    });
  };
  
  const handleGenderChange = (gender: string) => {
    setFilters({
      ...filters,
      gender: gender as FilterOptions['gender']
    });
  };
  
  const handleSizeChange = (size: string) => {
    setFilters({
      ...filters,
      size: size as FilterOptions['size']
    });
  };
  
  const handleVaccinatedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFilters({
      ...filters,
      vaccinated: checked
    });
  };
  
  const handleNeuteredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFilters({
      ...filters,
      neutered: checked
    });
  };
  
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilters({
      ...filters,
      location: value
    });
  };
  
  const countActiveFilters = () => {
    let count = 0;
    if (filters.type) count++;
    if (filters.gender) count++;
    if (filters.size) count++;
    if (filters.location) count++;
    if (filters.vaccinated) count++;
    if (filters.neutered) count++;
    if (minAge || maxAge) count++;
    return count;
  };
  
  const activeFilterCount = countActiveFilters();
  
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-outline w-full flex items-center justify-between"
      >
        <div className="flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-primary-100 text-primary-800">
              {activeFilterCount}
            </span>
          )}
        </div>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4"
          >
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filter Pets</h3>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-sm text-primary-600 hover:text-primary-800 flex items-center"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear all
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Pet Type */}
                <div>
                  <label className="label">Pet Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['dog', 'cat', 'bird', 'small-animal', 'reptile'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleTypeChange(filters.type === type ? '' : type)}
                        className={`px-2 py-1 text-xs rounded-md transition-colors ${
                          filters.type === type
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Gender */}
                <div>
                  <label className="label">Gender</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['male', 'female'].map((gender) => (
                      <button
                        key={gender}
                        type="button"
                        onClick={() => handleGenderChange(filters.gender === gender ? '' : gender)}
                        className={`px-3 py-1 text-sm rounded-md transition-colors ${
                          filters.gender === gender
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {gender.charAt(0).toUpperCase() + gender.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Size */}
                <div>
                  <label className="label">Size</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['small', 'medium', 'large'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleSizeChange(filters.size === size ? '' : size)}
                        className={`px-2 py-1 text-sm rounded-md transition-colors ${
                          filters.size === size
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {size.charAt(0).toUpperCase() + size.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Age Range */}
                <div>
                  <label className="label">Age (years)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={minAge}
                      onChange={(e) => setMinAge(e.target.value)}
                      min="0"
                      className="input"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxAge}
                      onChange={(e) => setMaxAge(e.target.value)}
                      min="0"
                      className="input"
                    />
                  </div>
                </div>
                
                {/* Location */}
                <div>
                  <label className="label">Location</label>
                  <input
                    type="text"
                    placeholder="City or state"
                    value={filters.location || ''}
                    onChange={handleLocationChange}
                    className="input"
                  />
                </div>
                
                {/* Health */}
                <div>
                  <label className="label">Health</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.vaccinated || false}
                        onChange={handleVaccinatedChange}
                        className="rounded text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">Vaccinated</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.neutered || false}
                        onChange={handleNeuteredChange}
                        className="rounded text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">Neutered/Spayed</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2 pt-2 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn btn-outline flex-1"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary flex-1">
                  Apply Filters
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PetFilter;