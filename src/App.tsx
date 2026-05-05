import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ListingsPage } from './pages/ListingsPage';
import { DetailPage } from './pages/DetailPage';
import { ReservationFlow } from './pages/ReservationFlow';
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<ListingsPage />} />
        <Route path="/accommodation/:id" element={<DetailPage />} />
        <Route
          path="/accommodation/:id/reserve"
          element={<ReservationFlow />} />
        
      </Routes>
    </AnimatePresence>);

}
export function App() {
  return (
    <div className="min-h-screen w-full bg-neutral-50 font-sans">
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </div>);

}