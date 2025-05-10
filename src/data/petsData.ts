export type Pet = {
  id: string;
  name: string;
  type: 'dog' | 'cat' | 'bird' | 'small-animal' | 'reptile';
  breed: string;
  age: number;
  gender: 'male' | 'female';
  size: 'small' | 'medium' | 'large';
  description: string;
  image: string;
  location: string;
  vaccinated: boolean;
  neutered: boolean;
  adoptionFee: number;
  createdAt: string;
};

export const petsData: Pet[] = [
  {
    id: '1',
    name: 'Max',
    type: 'dog',
    breed: 'Golden Retriever',
    age: 3,
    gender: 'male',
    size: 'large',
    description: 'Max is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks. He gets along well with other dogs and is great with children. Max is fully trained and responds well to commands.',
    image: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Delhi,Dl',
    vaccinated: true,
    neutered: true,
    adoptionFee: 250,
    createdAt: '2023-06-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Luna',
    type: 'cat',
    breed: 'Siamese',
    age: 2,
    gender: 'female',
    size: 'medium',
    description: 'Luna is a sweet and affectionate Siamese cat who enjoys lounging in sunny spots and playing with toy mice. She has beautiful blue eyes and a curious personality. Luna is litter-trained and would do well in a quiet home.',
    image: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Vizag, Vskp',
    vaccinated: true,
    neutered: true,
    adoptionFee: 150,
    createdAt: '2023-07-22T14:15:00Z',
  },
  {
    id: '3',
    name: 'Charlie',
    type: 'dog',
    breed: 'Beagle',
    age: 1,
    gender: 'male',
    size: 'medium',
    description: 'Charlie is a playful and curious Beagle puppy who loves to explore his surroundings. He has a great nose and enjoys scent games. Charlie is in the process of being house-trained and would benefit from an owner who can devote time to his training.',
    image: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Hyderabad, Hyd',
    vaccinated: true,
    neutered: false,
    adoptionFee: 200,
    createdAt: '2023-08-05T09:45:00Z',
  },
  {
    id: '4',
    name: 'Bella',
    type: 'cat',
    breed: 'Maine Coon',
    age: 4,
    gender: 'female',
    size: 'large',
    description: 'Bella is a majestic Maine Coon with a beautiful coat and friendly disposition. She enjoys being brushed and will happily sit in your lap for hours. Bella is well-behaved and gets along with other cats.',
    image: 'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Vijayawada, BZA',
    vaccinated: true,
    neutered: true,
    adoptionFee: 175,
    createdAt: '2023-05-30T11:20:00Z',
  },
  {
    id: '5',
    name: 'Buddy',
    type: 'dog',
    breed: 'Labrador Mix',
    age: 5,
    gender: 'male',
    size: 'large',
    description: 'Buddy is a loyal and gentle Labrador mix who loves swimming and playing fetch. He has a calm temperament and is great with children of all ages. Buddy is fully trained and knows several commands.',
    image: 'https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Rayagada, RGDA',
    vaccinated: true,
    neutered: true,
    adoptionFee: 200,
    createdAt: '2023-06-10T13:40:00Z',
  },
  {
    id: '6',
    name: 'Coco',
    type: 'bird',
    breed: 'Cockatiel',
    age: 2,
    gender: 'female',
    size: 'small',
    description: 'Coco is a cheerful Cockatiel who loves to whistle and mimic sounds. She enjoys being out of her cage and interacting with people. Coco would thrive in a home where she can receive plenty of attention and mental stimulation.',
    image: 'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Chennai, CSK',
    vaccinated: true,
    neutered: false,
    adoptionFee: 100,
    createdAt: '2023-07-05T10:15:00Z',
  },
  {
    id: '7',
    name: 'Oliver',
    type: 'cat',
    breed: 'Tabby',
    age: 1,
    gender: 'male',
    size: 'medium',
    description: 'Oliver is a playful and adventurous Tabby kitten who loves to climb and pounce on toys. He has endless energy and will keep you entertained with his antics. Oliver is litter-trained and would do well in a home with other pets.',
    image: 'https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Kolkata, Klk',
    vaccinated: true,
    neutered: false,
    adoptionFee: 125,
    createdAt: '2023-08-15T15:30:00Z',
  },
  {
    id: '8',
    name: 'Daisy',
    type: 'dog',
    breed: 'Dachshund',
    age: 6,
    gender: 'female',
    size: 'small',
    description: 'Daisy is a sweet and loyal Dachshund who loves to cuddle and take naps. She enjoys short walks and is content to lounge around the house. Daisy is fully house-trained and would be perfect for a less active home.',
    image: 'https://images.pexels.com/photos/895259/pexels-photo-895259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Banglore, Beg',
    vaccinated: true,
    neutered: true,
    adoptionFee: 175,
    createdAt: '2023-05-20T12:50:00Z',
  },
  {
    id: '9',
    name: 'Rocky',
    type: 'small-animal',
    breed: 'Guinea Pig',
    age: 1,
    gender: 'male',
    size: 'small',
    description: 'Rocky is a friendly Guinea Pig who loves vegetables and being petted. He makes cute squeaking noises when excited. Rocky would do well in a home where he can have plenty of space to explore and play.',
    image: 'https://images.pexels.com/photos/18962761/pexels-photo-18962761/free-photo-of-guinea-pig-on-grass.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'kerela, kr',
    vaccinated: true,
    neutered: false,
    adoptionFee: 50,
    createdAt: '2023-07-18T11:10:00Z',
  },
  {
    id: '10',
    name: 'Spike',
    type: 'reptile',
    breed: 'Bearded Dragon',
    age: 3,
    gender: 'male',
    size: 'small',
    description: 'Spike is a calm and curious Bearded Dragon who enjoys basking under his heat lamp and being handled. He has a healthy appetite and is easy to care for. Spike would be a great pet for someone interested in reptiles.',
    image: 'https://images.pexels.com/photos/6816308/pexels-photo-6816308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Guntur, gnt',
    vaccinated: false,
    neutered: false,
    adoptionFee: 75,
    createdAt: '2023-06-25T14:20:00Z',
  },
  {
    id: '11',
    name: 'Molly',
    type: 'dog',
    breed: 'Border Collie',
    age: 2,
    gender: 'female',
    size: 'medium',
    description: 'Molly is an intelligent and energetic Border Collie who excels at agility courses and learning new tricks. She needs plenty of exercise and mental stimulation. Molly would thrive in an active household with a yard.',
    image: 'https://images.pexels.com/photos/2623968/pexels-photo-2623968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Mumbai, MA',
    vaccinated: true,
    neutered: true,
    adoptionFee: 225,
    createdAt: '2023-08-01T09:30:00Z',
  },
  {
    id: '12',
    name: 'Whiskers',
    type: 'cat',
    breed: 'Persian',
    age: 7,
    gender: 'male',
    size: 'medium',
    description: 'Whiskers is a dignified Persian cat with a luxurious coat that requires regular grooming. He enjoys peace and quiet, and prefers a calm environment. Whiskers is litter-trained and very well-behaved.',
    image: 'https://images.pexels.com/photos/1521306/pexels-photo-1521306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Bihar, B',
    vaccinated: true,
    neutered: true,
    adoptionFee: 150,
    createdAt: '2023-05-10T16:45:00Z',
  },
];

// Get all pets
export const getAllPets = () => {
  return petsData;
};

// Get pet by ID
export const getPetById = (id: string) => {
  return petsData.find(pet => pet.id === id);
};

// Get pets by type
export const getPetsByType = (type: Pet['type']) => {
  return petsData.filter(pet => pet.type === type);
};

// Search pets
export const searchPets = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return petsData.filter(pet => 
    pet.name.toLowerCase().includes(lowercaseQuery) ||
    pet.breed.toLowerCase().includes(lowercaseQuery) ||
    pet.location.toLowerCase().includes(lowercaseQuery) ||
    pet.description.toLowerCase().includes(lowercaseQuery)
  );
};

// Filter pets
export type FilterOptions = {
  type?: Pet['type'];
  gender?: Pet['gender'];
  size?: Pet['size'];
  age?: { min?: number; max?: number };
  location?: string;
  vaccinated?: boolean;
  neutered?: boolean;
};

export const filterPets = (options: FilterOptions) => {
  return petsData.filter(pet => {
    // Check each filter option
    if (options.type && pet.type !== options.type) return false;
    if (options.gender && pet.gender !== options.gender) return false;
    if (options.size && pet.size !== options.size) return false;
    
    if (options.age) {
      if (options.age.min !== undefined && pet.age < options.age.min) return false;
      if (options.age.max !== undefined && pet.age > options.age.max) return false;
    }
    
    if (options.location && !pet.location.toLowerCase().includes(options.location.toLowerCase())) return false;
    if (options.vaccinated !== undefined && pet.vaccinated !== options.vaccinated) return false;
    if (options.neutered !== undefined && pet.neutered !== options.neutered) return false;
    
    return true;
  });
};