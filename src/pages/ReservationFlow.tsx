import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  Calendar,
  CheckCircle,
  User,
  Users,
  Home } from
'lucide-react';
import { accommodations } from '../data/mockData';
const roomTypes = [
{
  id: 'single',
  name: 'Single Room',
  icon: User,
  priceOffset: 0,
  desc: 'Private room, shared bathroom'
},
{
  id: 'shared',
  name: 'Shared Room',
  icon: Users,
  priceOffset: -400,
  desc: 'Share with 1 roommate'
},
{
  id: 'studio',
  name: 'Studio',
  icon: Home,
  priceOffset: 700,
  desc: 'Entire place to yourself'
}];

export function ReservationFlow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const acc = accommodations.find((a) => a.id === id);
  const [step, setStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(roomTypes[0]);
  const [date, setDate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  if (!acc) return null;
  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => {
    if (submitted) return;
    if (step === 1) navigate(-1);else
    setStep((s) => Math.max(s - 1, 1));
  };
  const slideVariants = {
    enter: {
      x: 50,
      opacity: 0
    },
    center: {
      x: 0,
      opacity: 1
    },
    exit: {
      x: -50,
      opacity: 0
    }
  };
  const finalPrice = acc.price + selectedRoom.priceOffset;
  return (
    <div className="min-h-screen bg-neutral-50 pb-28 sm:pb-0">
      {/* Header */}
      <header className="bg-white sticky top-0 z-20 border-b border-neutral-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-4">
          <div className="flex items-center">
            <button
              onClick={prevStep}
              className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-neutral-800 hover:bg-neutral-100 transition-colors disabled:opacity-30"
              disabled={submitted}>
              
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex-1 text-center pr-8">
              <h2 className="text-lg font-bold text-neutral-900">
                {submitted ?
                'Reservation Confirmed' :
                step === 1 ?
                'Select Room' :
                step === 2 ?
                'Move-in Date' :
                'Confirm Details'}
              </h2>
            </div>
          </div>

          {!submitted &&
          <div className="flex space-x-2 mt-4">
              {[1, 2, 3].map((i) =>
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i <= step ? 'bg-red-600' : 'bg-neutral-200'}`} />

            )}
            </div>
          }
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <AnimatePresence mode="wait">
          {submitted ?
          <motion.div
            key="success"
            initial={{
              opacity: 0,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            className="flex flex-col items-center text-center pt-8">
            
              <motion.div
              initial={{
                scale: 0
              }}
              animate={{
                scale: 1
              }}
              transition={{
                type: 'spring',
                delay: 0.1
              }}
              className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-red-600/30">
              
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                Reservation request submitted successfully.
              </h2>
              <p className="text-neutral-500 text-sm max-w-md mb-8">
                We've sent your details to {acc.name}. They will be in touch
                shortly to confirm.
              </p>
              <div className="bg-white rounded-2xl p-5 border border-neutral-100 w-full max-w-md text-left space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Accommodation</span>
                  <span className="font-semibold text-neutral-900">
                    {acc.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Room Type</span>
                  <span className="font-semibold text-neutral-900">
                    {selectedRoom.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Move-in Date</span>
                  <span className="font-semibold text-neutral-900">
                    {new Date(date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-neutral-100">
                  <span className="text-neutral-500">Monthly Price</span>
                  <span className="font-bold text-red-600">
                    R{finalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
              <button
              onClick={() => navigate('/')}
              className="mt-8 bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-red-600/30 transition-all active:scale-95">
              
                Back to Listings
              </button>
            </motion.div> :
          step === 1 ?
          <motion.div
            key="step1"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-4">
            
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-6">
                What type of room do you need?
              </h3>
              {roomTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedRoom.id === type.id;
              const price = acc.price + type.priceOffset;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedRoom(type)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center text-left ${isSelected ? 'border-red-600 bg-red-50/50' : 'border-neutral-200 bg-white hover:border-red-200'}`}>
                  
                    <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 ${isSelected ? 'bg-red-100 text-red-600' : 'bg-neutral-100 text-neutral-500'}`}>
                    
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-neutral-900">
                        {type.name}
                      </h4>
                      <p className="text-sm text-neutral-500">{type.desc}</p>
                    </div>
                    <div className="text-right">
                      <span className="block font-bold text-red-600">
                        R{price.toLocaleString()}
                      </span>
                      <span className="text-xs text-neutral-400">/mo</span>
                    </div>
                  </button>);

            })}
            </motion.div> :
          step === 2 ?
          <motion.div
            key="step2"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-6">
            
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2">
                When do you want to move in?
              </h3>
              <p className="text-neutral-500 text-sm mb-6">
                Select a date to start your lease. Leases typically run for 12
                months.
              </p>

              <div className="relative max-w-md">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-red-600" />
                </div>
                <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-neutral-200 rounded-2xl text-neutral-900 font-medium focus:border-red-600 focus:ring-0 transition-all outline-none" />
              
              </div>
            </motion.div> :

          <motion.div
            key="step3"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-6">
            
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2">
                Review &amp; Confirm
              </h3>
              <p className="text-neutral-500 text-sm mb-6">
                Please confirm the details below.
              </p>

              <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-sm space-y-4">
                <div className="flex space-x-4">
                  <img
                  src={acc.images[0]}
                  alt={acc.name}
                  className="w-20 h-20 rounded-xl object-cover" />
                
                  <div>
                    <h4 className="font-bold text-neutral-900">{acc.name}</h4>
                    <p className="text-sm text-neutral-500">{acc.address}</p>
                  </div>
                </div>

                <hr className="border-neutral-100" />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Room Type</span>
                    <span className="font-semibold text-neutral-900">
                      {selectedRoom.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Move-in Date</span>
                    <span className="font-semibold text-neutral-900">
                      {date ?
                    new Date(date).toLocaleDateString() :
                    'Not selected'}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-neutral-100">
                    <span className="text-neutral-500 font-medium">
                      Monthly Total
                    </span>
                    <span className="font-bold text-red-600 text-lg">
                      R{finalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Desktop inline confirm button */}
              <div className="hidden sm:block">
                <button
                onClick={() => setSubmitted(true)}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-lg shadow-red-600/30 transition-all active:scale-95">
                
                  Confirm Reservation
                </button>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>

      {/* Bottom Action - mobile only */}
      {!submitted &&
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-100 p-4 px-6 pb-6 z-20">
          <button
          onClick={step === 3 ? () => setSubmitted(true) : nextStep}
          disabled={step === 2 && !date}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-red-600/30 disabled:shadow-none transition-all active:scale-95 flex justify-center items-center">
          
            {step === 3 ? 'Confirm Reservation' : 'Continue'}
          </button>
        </div>
      }

      {/* Tablet/Desktop Continue button (steps 1 & 2) */}
      {!submitted && step < 3 &&
      <div className="hidden sm:block max-w-3xl mx-auto px-4 sm:px-6 pb-10">
          <button
          onClick={nextStep}
          disabled={step === 2 && !date}
          className="w-full sm:w-auto bg-red-600 hover:bg-red-700 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-lg shadow-red-600/30 disabled:shadow-none transition-all active:scale-95">
          
            Continue
          </button>
        </div>
      }
    </div>);

}