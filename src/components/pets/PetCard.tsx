import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Pet } from '../../data/petsData';
import { useAuth } from '../../context/AuthContext';

type PetCardProps = {
  pet: Pet;
  isFavorited?: boolean;
  onToggleFavorite?: (id: string) => void;
};

const PetCard: React.FC<PetCardProps> = ({ 
  pet, 
  isFavorited = false,
  onToggleFavorite 
}) => {
  const { isAuthenticated } = useAuth();
  
  return (
    <motion.div 
      className="card h-full flex flex-col"
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden aspect-w-4 aspect-h-3">
        <img 
          src={pet.image} 
          alt={`${pet.name} - ${pet.breed}`}
          className="w-full h-64 object-cover" 
        />
        {isAuthenticated && onToggleFavorite && (
          <button 
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(pet.id);
            }}
            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              className={`h-5 w-5 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
            />
          </button>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center space-x-1 text-white">
            <MapPin className="h-4 w-4 text-gray-200" />
            <span className="text-sm font-medium">{pet.location}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800">
            {pet.type.charAt(0).toUpperCase() + pet.type.slice(1)}
          </span>
        </div>
        
        <p className="text-sm text-gray-500 mb-2">{pet.breed}</p>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="text-sm text-gray-700">
            <span className="font-medium">Age: </span>{pet.age} {pet.age === 1 ? 'year' : 'years'}
          </div>
          <div className="text-sm text-gray-700">
            <span className="font-medium">Gender: </span>{pet.gender.charAt(0).toUpperCase() + pet.gender.slice(1)}
          </div>
          <div className="text-sm text-gray-700">
            <span className="font-medium">Size: </span>{pet.size.charAt(0).toUpperCase() + pet.size.slice(1)}
          </div>
          <div className="text-sm text-gray-700">
            <span className="font-medium">Fee: </span>${pet.adoptionFee}
          </div>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {pet.description}
        </p>
        
        <div className="mt-auto pt-2 flex space-x-2">
          <Link 
            to={`/pets/${pet.id}`}
            className="btn btn-primary flex-grow"
          >
            <Info className="mr-1 h-4 w-4" />
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PetCard;