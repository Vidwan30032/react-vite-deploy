import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Heart, Mail, MapPin, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and mission */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <PawPrint className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold text-white">PetPal</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Finding forever homes for pets in need. Every adoption makes a difference.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/pets" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Find a Pet
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Pet Types */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Pet Types</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/pets?type=dogs" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Dogs
                </Link>
              </li>
              <li>
                <Link to="/pets?type=cats" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Cats
                </Link>
              </li>
              <li>
                <Link to="/pets?type=birds" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Birds
                </Link>
              </li>
              <li>
                <Link to="/pets?type=small-animals" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Small Animals
                </Link>
              </li>
              <li>
                <Link to="/pets?type=reptiles" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Reptiles
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">Vizag, PC 765001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <span className="text-gray-400">(+91) 9078073777</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <span className="text-gray-400">2300030032@kluniversity.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} PetPal. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-primary-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;