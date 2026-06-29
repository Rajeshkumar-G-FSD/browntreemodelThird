/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, MouseEvent } from "react";
import { GALLERY_ITEMS, GalleryItem } from "../types";
import { Eye, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["All", "Suites", "Wellness", "Heritage", "Nature", "Dining"];

  const filteredItems = selectedCategory === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  const handlePrev = (e: MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => {
      if (prev === null) return null;
      return prev === 0 ? filteredItems.length - 1 : prev - 1;
    });
  };

  const handleNext = (e: MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => {
      if (prev === null) return null;
      return prev === filteredItems.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <section id="gallery" className="py-24 bg-surface-container-low relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-sans text-xs font-bold tracking-widest uppercase block mb-3">
            Chronicles of Light
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-on-surface font-bold tracking-tight mb-5">
            Visual Gallery
          </h2>
          <p className="text-on-surface-variant font-sans text-base leading-relaxed">
            Take a visual tour through our handpicked collection of serene spaces, bespoke designs, and stunning surrounding environments.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`font-sans text-xs font-semibold tracking-wider uppercase px-5 py-2.5 rounded-full transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-primary text-on-primary shadow-md"
                  : "bg-surface-container-highest/60 text-on-surface-variant hover:bg-surface-container-highest"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-style Grid */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              // Find index in overall list to pass to lightbox
              const globalIdx = filteredItems.indexOf(item);

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setLightboxIndex(globalIdx)}
                  className="break-inside-avoid relative overflow-hidden rounded-2xl group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-cover rounded-2xl transition-transform duration-700 group-hover:scale-[1.03]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                    <div className="flex justify-end">
                      <div className="bg-white/25 backdrop-blur-md text-white p-2.5 rounded-full">
                        <Eye size={18} />
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-primary-fixed mb-1 block">
                        {item.category}
                      </span>
                      <h4 className="font-serif text-lg font-bold text-white">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            {/* Left Button */}
            <button
              onClick={handlePrev}
              className="absolute left-6 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-4 rounded-full transition-colors"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Middle Container */}
            <div className="relative max-w-5xl max-h-[80vh] flex flex-col items-center">
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className="max-w-full max-h-[75vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
                referrerPolicy="no-referrer"
              />
              <div className="mt-4 text-center text-white select-none">
                <p className="text-xs uppercase tracking-widest text-primary-fixed-dim mb-1 font-sans">
                  {filteredItems[lightboxIndex].category}
                </p>
                <h3 className="font-serif text-lg md:text-xl font-bold">
                  {filteredItems[lightboxIndex].title}
                </h3>
              </div>
            </div>

            {/* Right Button */}
            <button
              onClick={handleNext}
              className="absolute right-6 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-4 rounded-full transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
