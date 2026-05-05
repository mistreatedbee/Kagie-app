import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  MapPin,
  Star,
  Wifi,
  Utensils,
  Shirt,
  Shield,
  Car,
  Sofa,
  Heart,
  SearchX } from
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
const filters = [
'All',
'Price',
'Distance',
'Single Room',
'Shared Room',
'Studio',
'WiFi',
'Security',
'Furnished'] as
const;
type Filter = (typeof filters)[number];
export function ListingsPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<Filter>('All');
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const distanceValue = (d: string) =>
  parseFloat(d.replace(/[^0-9.]/g, '')) * (
  d.includes('m ') && !d.includes('km') ? 0.001 : 1);
  const filtered = useMemo(() => {
    let list = [...accommodations];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (a) =>
        a.name.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q) ||
        a.institution.toLowerCase().includes(q) ||
        a.address.toLowerCase().includes(q)
      );
    }
    switch (activeFilter) {
      case 'Price':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'Distance':
        list.sort(
          (a, b) => distanceValue(a.distance) - distanceValue(b.distance)
        );
        break;
      case 'Single Room':
        list = list.filter((a) => a.roomTypes.includes('single'));
        break;
      case 'Shared Room':
        list = list.filter((a) => a.roomTypes.includes('shared'));
        break;
      case 'Studio':
        list = list.filter((a) => a.roomTypes.includes('studio'));
        break;
      case 'WiFi':
        list = list.filter((a) => a.amenities.includes('wifi'));
        break;
      case 'Security':
        list = list.filter((a) => a.amenities.includes('security'));
        break;
      case 'Furnished':
        list = list.filter((a) => a.amenities.includes('furnished'));
        break;
    }
    return list;
  }, [query, activeFilter]);
  const toggleSave = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSaved((s) => ({
      ...s,
      [id]: !s[id]
    }));
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      exit={{
        opacity: 0,
        y: -20
      }}
      className="min-h-screen bg-neutral-50">
      
      {/* Header */}
      <header className="bg-white sticky top-0 z-20 shadow-sm border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                Kagie<span className="text-red-600">.</span>
              </h1>
              <p className="text-sm text-neutral-500 font-medium hidden sm:block">
                Find your student home
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-red-50 border-2 border-white shadow-sm overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Profile"
                className="w-full h-full object-cover" />
              
            </div>
          </div>

          {/* Hero */}
          <div className="mb-5 max-w-2xl">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 leading-tight">
              Find student accommodation near campus
            </h2>
            <p className="text-sm sm:text-base text-neutral-500 mt-1 sm:mt-2">
              Reserve safe and affordable rooms in minutes.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4 max-w-2xl">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-neutral-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by institution or city"
              className="w-full pl-11 pr-4 py-3.5 bg-neutral-100 border-transparent rounded-2xl text-sm focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none" />
            
          </div>

          {/* Filters */}
          <div className="flex space-x-2 overflow-x-auto hide-scrollbar pb-2 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            {filters.map((filter) =>
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === filter ? 'bg-red-600 text-white shadow-md shadow-red-600/20' : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'}`}>
              
                {filter}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {filtered.length === 0 ?
        <div className="flex flex-col items-center justify-center text-center py-16 px-4">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
              <SearchX className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 mb-1">
              No accommodation found
            </h3>
            <p className="text-sm text-neutral-500 max-w-xs">
              Try another search or filter.
            </p>
          </div> :

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filtered.map((acc, index) =>
          <motion.div
            key={acc.id}
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: index * 0.05
            }}
            onClick={() => navigate(`/accommodation/${acc.id}`)}
            className="bg-white rounded-[1.5rem] overflow-hidden shadow-sm border border-neutral-100 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all">
            
                {/* Image */}
                <div className="relative h-48 w-full">
                  <img
                src={acc.images[0]}
                alt={acc.name}
                className="w-full h-full object-cover" />
              
                  <button
                onClick={(e) => toggleSave(e, acc.id)}
                className="absolute top-3 left-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                aria-label="Save">
                
                    <Heart
                  className={`w-4 h-4 transition-colors ${saved[acc.id] ? 'fill-red-600 text-red-600' : 'text-neutral-700'}`} />
                
                  </button>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center space-x-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-neutral-800">
                      {acc.rating}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-neutral-900 leading-tight truncate">
                        {acc.name}
                      </h3>
                      <div className="flex items-center text-neutral-500 mt-1">
                        <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                        <span className="text-xs font-medium truncate">
                          {acc.institution} • {acc.distance}
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-xl font-bold text-red-600">
                        R{acc.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-neutral-500 block">
                        / month
                      </span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-neutral-100">
                    {acc.amenities.slice(0, 4).map((amenity) => {
                  const Icon = amenityIcons[amenity] || Star;
                  return (
                    <div
                      key={amenity}
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-50 text-neutral-600"
                      title={amenity}>
                      
                          <Icon className="w-4 h-4" />
                        </div>);

                })}
                    <div className="flex-grow" />
                    <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/accommodation/${acc.id}`);
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-xl transition-colors">
                  
                      Reserve
                    </button>
                  </div>
                </div>
              </motion.div>
          )}
          </div>
        }
      </div>
    </motion.div>);

}