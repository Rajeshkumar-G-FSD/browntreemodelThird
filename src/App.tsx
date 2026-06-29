/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PropertiesSection from "./components/PropertiesSection";
import ExperiencesSection from "./components/ExperiencesSection";
import GallerySection from "./components/GallerySection";
import ReviewsSection from "./components/ReviewsSection";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";
import { Sparkles, Calendar } from "lucide-react";

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPropId, setSelectedPropId] = useState<string | undefined>(undefined);

  // Trigger booking globally (resets pre-selected property)
  const handleOpenGlobalBooking = () => {
    setSelectedPropId(undefined);
    setIsBookingOpen(true);
  };

  // Trigger booking for a specific property
  const handleOpenPropertyBooking = (propertyId: string) => {
    setSelectedPropId(propertyId);
    setIsBookingOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-background text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed antialiased">
      {/* Dynamic Header */}
      <Navbar onBookClick={handleOpenGlobalBooking} />

      {/* Main Structural Blocks */}
      <main>
        {/* Parallax Hero Canopy */}
        <Hero />

        {/* Curator's Property Coverflow Slider */}
        <PropertiesSection onBookProperty={handleOpenPropertyBooking} />

        {/* Bespoke Alternating Experiences */}
        <ExperiencesSection onBookClick={handleOpenGlobalBooking} />

        {/* High-Definition Grid Masonry & Lightbox */}
        <GallerySection />

        {/* Guest Chronicles & Testimonials */}
        <ReviewsSection />
      </main>

      {/* Professional Footer & newsletter registry */}
      <Footer />

      {/* Interactive Reservation modal workflow */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedPropertyId={selectedPropId}
      />

      {/* Persistent Floating Quick Reservation Action Button */}
      <button
        onClick={handleOpenGlobalBooking}
        className="fixed bottom-6 right-6 z-40 bg-primary hover:bg-primary-container text-on-primary p-4 rounded-full shadow-[0_15px_30px_rgba(156,61,0,0.25)] hover:shadow-[0_20px_40px_rgba(156,61,0,0.35)] transition-all duration-300 transform hover:scale-105 active:scale-95 group flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider"
        aria-label="Quick Booking"
      >
        <Calendar size={18} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap">
          Reserve Now
        </span>
      </button>
    </div>
  );
}
