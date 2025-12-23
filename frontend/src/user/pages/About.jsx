import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import { Heart, MapPin, Users, Zap, Star, Target, Mail, Phone } from 'lucide-react';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* HERO SECTION */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-lg border border-pink-200 mb-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl flex items-center justify-center">
                <Heart className="w-10 h-10 text-white fill-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">Happy Weekend</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover amazing weekend events and activities near you. Find your next favorite experience with Happy Weekend!
            </p>
          </div>
        </div>

        {/* ABOUT US SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* LEFT - ABOUT */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-pink-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">About Us</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Happy Weekend is your ultimate guide to discovering exciting weekend events and activities. We connect people with memorable experiences in their local area.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Whether you're looking for cultural events, outdoor activities, entertainment, or dining experiences, we've got you covered. Our platform makes it easy to find, explore, and book your next adventure.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We believe every weekend should be special, and we're here to help you make the most of your time off.
            </p>
          </div>

          {/* RIGHT - MISSION */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-pink-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <Target className="w-8 h-8 text-pink-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Connect & Discover</h3>
                  <p className="text-gray-600 text-sm">Help people discover amazing events and connect with their community.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Zap className="w-8 h-8 text-pink-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Make it Easy</h3>
                  <p className="text-gray-600 text-sm">Simplify event discovery with advanced search and personalization.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Heart className="w-8 h-8 text-pink-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Personalized Experience</h3>
                  <p className="text-gray-600 text-sm">Save your favorites and get recommendations tailored to your interests.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* FEATURES SECTION */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-pink-200 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-gradient-to-br from-pink-50 to-white rounded-2xl p-6 border border-pink-100">
              <MapPin className="w-8 h-8 text-pink-500 mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">Location Search</h3>
              <p className="text-gray-600 text-sm">Find events by district or city. Filter by distance to discover nearby activities.</p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-white rounded-2xl p-6 border border-pink-100">
              <Star className="w-8 h-8 text-pink-500 mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">Smart Recommendations</h3>
              <p className="text-gray-600 text-sm">Get personalized event recommendations based on ratings and trending events.</p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-white rounded-2xl p-6 border border-pink-100">
              <Heart className="w-8 h-8 text-pink-500 mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">Save Favorites</h3>
              <p className="text-gray-600 text-sm">Bookmark your favorite events and easily access them anytime you want.</p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-white rounded-2xl p-6 border border-pink-100">
              <Zap className="w-8 h-8 text-pink-500 mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">Price Sorting</h3>
              <p className="text-gray-600 text-sm">Filter events by price range. Find free events or explore premium experiences.</p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-white rounded-2xl p-6 border border-pink-100">
              <Target className="w-8 h-8 text-pink-500 mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">Advanced Filters</h3>
              <p className="text-gray-600 text-sm">Sort by rating, price, and other criteria to find exactly what you're looking for.</p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-white rounded-2xl p-6 border border-pink-100">
              <Users className="w-8 h-8 text-pink-500 mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">Community Reviews</h3>
              <p className="text-gray-600 text-sm">Read genuine reviews and ratings from other event attendees.</p>
            </div>

          </div>
        </div>

        {/* TEAM SECTION */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-pink-200 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-white font-bold">Dev</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Development</h3>
              <p className="text-gray-600">Building amazing experiences with cutting-edge technology and clean code.</p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-white font-bold">Design</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Design</h3>
              <p className="text-gray-600">Creating beautiful and intuitive user interfaces that delight users.</p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-pink-500 to-red-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-white font-bold">Product</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Product</h3>
              <p className="text-gray-600">Ensuring every feature delivers real value to our users.</p>
            </div>

          </div>
        </div>

        {/* CONTACT SECTION */}
        <div className="bg-gradient-to-r from-pink-400 to-pink-500 rounded-3xl p-8 sm:p-12 shadow-lg text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">Get In Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            
            <div className="flex gap-4">
              <Mail className="w-8 h-8 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1">Email</h3>
                <p className="text-pink-50">hello@happyweekend.com</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Phone className="w-8 h-8 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1">Phone</h3>
                <p className="text-pink-50">+1 (555) 123-4567</p>
              </div>
            </div>

          </div>
        </div>

        {/* CTA SECTION */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/events/search')}
            className="px-12 py-4 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-full font-bold text-lg hover:from-pink-500 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
          >
            Start Exploring Events
          </button>
        </div>

      </div>
    </div>
  );
}
