import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  Heart,
  MapPin,
  Star,
  Wifi,
  Utensils,
  Shirt,
  Shield,
  Car,
  Sofa,
  Navigation } from
'lucide-react';
import { accommodations } from '../data/mockData';
const amenityIcons: Record<string, React.ElementType> = {
  wifi: Wifi,
  kitchen: Utensils,
  laundry: Shirt,
  security: Shield,
  parking: Car,
  furnished: Sofa
};
export function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const acc = accommodations.find((a) => a.id === id);
  if (!acc)
  return <div className="p-8 text-center">Accommodation not found</div>;
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 20
      }}
      animate={{
        opacity: 1,
        x: 0
      }}
      exit={{
        opacity: 0,
        x: -20
      }}
      className="min-h-screen bg-white relative pb-28 lg:pb-0">
      
      {/* Image Gallery */}
      <div className="relative h-72 sm:h-96 lg:h-[480px] w-full bg-neutral-100">
        <div
          className="flex overflow-x-auto snap-x snap-mandatory h-full hide-scrollbar"
          onScroll={(e) => {
            const scrollLeft = (e.target as HTMLElement).scrollLeft;
            const width = (e.target as HTMLElement).clientWidth;
            setActiveImage(Math.round(scrollLeft / width));
          }}>
          
          {acc.images.map((img, i) =>
          <img
            key={i}
            src={img}
            alt={`${acc.name} ${i + 1}`}
            className="w-full h-full object-cover snap-center flex-shrink-0" />

          )}
        </div>

        {/* Top Actions */}
        <div className="absolute top-6 left-0 right-0 px-4 sm:px-8 flex justify-between items-center z-10 max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm text-neutral-800 hover:bg-white transition-colors">
            
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm text-neutral-800 hover:bg-white transition-colors"
            aria-label="Save">
            
            <Heart
              className={`w-5 h-5 transition-colors ${isSaved ? 'fill-red-600 text-red-600' : ''}`} />
            
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-1.5 z-10">
          {acc.images.map((_, i) =>
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all ${i === activeImage ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`} />

          )}
        </div>
      </div>

      {/* Content area: 2-column on desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-start mb-4 gap-4">
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 leading-tight mb-2">
                  {acc.name}
                </h1>
                <div className="flex items-center text-neutral-500">
                  <MapPin className="w-4 h-4 mr-1.5 text-red-600 flex-shrink-0" />
                  <span className="text-sm font-medium">{acc.address}</span>
                </div>
              </div>
              <div className="flex flex-col items-end flex-shrink-0">
                <div className="flex items-center space-x-1 bg-amber-50 px-2.5 py-1 rounded-lg">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-sm font-bold text-amber-700">
                    {acc.rating}
                  </span>
                </div>
                <span className="text-xs text-neutral-400 mt-1">
                  {acc.reviews} reviews
                </span>
              </div>
            </div>

            <hr className="my-6 border-neutral-100" />

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-neutral-900 mb-2">About</h3>
              <p
                className={`text-neutral-600 text-sm sm:text-base leading-relaxed ${!expanded ? 'line-clamp-3' : ''}`}>
                
                {acc.description}
              </p>
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-red-600 font-semibold text-sm mt-2 hover:text-red-700">
                
                {expanded ? 'Show less' : 'Read more'}
              </button>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">
                Amenities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {acc.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity] || Star;
                  return (
                    <div key={amenity} className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center text-red-600 flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium text-neutral-700 capitalize">
                        {amenity}
                      </span>
                    </div>);

                })}
              </div>
            </div>

            {/* Map / Distance */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">
                Near campus
              </h3>
              <div className="rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-50">
                <div
                  className="h-40 sm:h-56 w-full relative bg-gradient-to-br from-neutral-100 to-neutral-200"
                  style={{
                    backgroundImage:
                    'radial-gradient(circle at 20% 30%, rgba(220,38,38,0.08) 0, transparent 40%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.04) 0, transparent 40%)'
                  }}>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-600/30 ring-8 ring-red-600/10">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-4 flex items-center space-x-3 bg-white">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-900">
                      {acc.distance}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {acc.institution}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop sidebar reserve card */}
          <aside className="hidden lg:block">
            <div className="sticky top-8 bg-white rounded-2xl border border-neutral-200 shadow-sm p-6">
              <div className="flex items-baseline mb-1">
                <span className="text-3xl font-bold text-neutral-900">
                  R{acc.price.toLocaleString()}
                </span>
                <span className="text-sm text-neutral-500 ml-1">/ month</span>
              </div>
              <div className="flex items-center text-sm text-neutral-500 mb-6">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400 mr-1" />
                <span className="font-semibold text-neutral-800">
                  {acc.rating}
                </span>
                <span className="mx-1.5">·</span>
                <span>{acc.reviews} reviews</span>
              </div>
              <button
                onClick={() => navigate(`/accommodation/${acc.id}/reserve`)}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-red-600/30 transition-all active:scale-95">
                
                Reserve Now
              </button>
              <p className="text-xs text-neutral-400 text-center mt-3">
                You won't be charged yet
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Sticky Bottom Bar (mobile/tablet only) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-100 p-4 px-6 pb-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20 flex justify-between items-center">
        <div>
          <span className="text-sm text-neutral-500 font-medium block">
            Price
          </span>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-neutral-900">
              R{acc.price.toLocaleString()}
            </span>
            <span className="text-sm text-neutral-500 ml-1">/mo</span>
          </div>
        </div>
        <button
          onClick={() => navigate(`/accommodation/${acc.id}/reserve`)}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-red-600/30 transition-all active:scale-95">
          
          Reserve Now
        </button>
      </div>
    </motion.div>);

}