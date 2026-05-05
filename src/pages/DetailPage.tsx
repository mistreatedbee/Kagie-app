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
import ImageGallery from '../components/ImageGallery';
import ReserveCard from '../components/ReserveCard';
import HostCard from '../components/HostCard';
import Reviews from '../components/Reviews';
import SimilarListings from '../components/SimilarListings';
import Map from '../components/Map';
import Policies from '../components/Policies';
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
      <div className="relative w-full">
        <ImageGallery images={acc.images} />

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
              className={`w-5 h-5 transition-colors ${isSaved ? 'fill-brand text-brand' : ''}`} />
          </button>
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
                <Map location={acc.location} />
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

            {/* Host card */}
            <div className="mb-6">
              <HostCard host={acc.host} />
            </div>

            {/* Reviews */}
            <div className="mb-6">
              <Reviews reviews={acc.reviewsList} />
            </div>

            {/* Similar listings */}
            <div className="mb-6">
              <SimilarListings currentId={acc.id} />
            </div>

            {/* Policies */}
            <div className="mb-6">
              <Policies />
            </div>
          </div>

          {/* Desktop sidebar reserve card */}
          <aside className="hidden lg:block">
              <div className="sticky top-8">
              <ReserveCard price={acc.price} minNights={acc.minNights} onInstantBook={(p) => { alert('Booked (mock)'); console.log('book', p); }} onRequest={(p) => { alert('Request sent (mock)'); console.log('request', p); }} unavailable={acc.unavailableDates} />
            </div>
          </aside>
        </div>
      </div>

      {/* Sticky Bottom Reserve (mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-20 p-4">
        <ReserveCard price={acc.price} onInstantBook={(p) => { alert('Booked (mock)'); }} onRequest={(p) => { alert('Request sent (mock)'); }} unavailable={acc.unavailableDates} />
      </div>
    </motion.div>);

}