/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Star, Check, ArrowRight } from "lucide-react";
import { PROPERTIES, Property } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface PropertiesSectionProps {
  onBookProperty: (propertyId: string) => void;
}

export default function PropertiesSection({ onBookProperty }: PropertiesSectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeProperty = PROPERTIES[activeIdx];

  return (
    <section id="properties" className="py-24 bg-surface-container-lowest relative overflow-hidden">
      {/* Aesthetic geometric mesh background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-fixed/10 via-transparent to-transparent opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-sans text-xs font-bold tracking-widest uppercase block mb-3">
            Curated Retreats
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-on-surface font-bold tracking-tight mb-5">
            Architecture of Warmth
          </h2>
          <p className="text-on-surface-variant font-sans text-base leading-relaxed">
            Every Brown Tree destination is an authentic masterpiece designed to echo the cultural heritage, landscape contours, and organic atmosphere of its setting.
          </p>
        </div>

        {/* Coverflow Selection Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Cards Stack / Slider (Column span 7) */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-6 justify-center">
            {PROPERTIES.map((prop, idx) => {
              const isActive = idx === activeIdx;
              return (
                <motion.div
                  key={prop.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`relative overflow-hidden rounded-2xl cursor-pointer w-full md:w-1/3 transition-all duration-500 ease-out flex-shrink-0 group ${
                    isActive
                      ? "md:w-[45%] shadow-[0_30px_60px_rgba(156,61,0,0.15)] ring-2 ring-primary scale-[1.01]"
                      : "opacity-65 hover:opacity-90 scale-[0.98] hover:scale-[1.0]"
                  }`}
                  whileHover={{ y: isActive ? 0 : -5 }}
                >
                  <div className="relative aspect-[3/4] w-full">
                    <img
                      src={prop.image}
                      alt={prop.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {/* Shadow Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Simple Details Overlaid on Card */}
                    <div className="absolute bottom-0 left-0 w-full p-5 text-white">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-primary-fixed mb-1">
                        {prop.location}
                      </p>
                      <h3 className="font-serif text-lg font-bold leading-tight mb-2">
                        {prop.name}
                      </h3>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-sans font-medium text-white/90">
                          {prop.price} <span className="text-[10px] opacity-75">/ night</span>
                        </span>
                        <div className="flex items-center gap-0.5 text-primary-fixed">
                          <Star size={11} fill="currentColor" />
                          <span className="font-semibold">{prop.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Selected Property Showcase Block (Column span 5) */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProperty.id}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.4 }}
                className="glass-panel p-8 md:p-10 rounded-3xl"
              >
                {/* Upper Badge */}
                <div className="flex justify-between items-center mb-6">
                  <span className="bg-primary/10 text-primary font-sans text-xs font-bold tracking-wider px-3 py-1.5 rounded-full">
                    {activeProperty.location}
                  </span>
                  <div className="flex items-center gap-1.5 text-primary font-bold font-sans text-sm">
                    <Star size={16} fill="currentColor" />
                    <span>{activeProperty.rating.toFixed(1)} Rating</span>
                  </div>
                </div>

                {/* Main Titles */}
                <h3 className="font-serif text-3xl md:text-4xl text-on-surface font-bold mb-4">
                  {activeProperty.name}
                </h3>

                <p className="text-on-surface-variant font-sans text-sm leading-relaxed mb-8">
                  {activeProperty.description}
                </p>

                {/* Structural Key Features */}
                <div className="mb-8 border-t border-b border-surface-variant/30 py-6">
                  <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-primary mb-4">
                    Exclusive Curated Features
                  </h4>
                  <ul className="space-y-3">
                    {activeProperty.features.map((feature, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="bg-primary-fixed text-on-primary-fixed p-1 rounded-full mt-0.5 shrink-0">
                          <Check size={11} />
                        </span>
                        <span className="font-sans text-xs font-medium text-on-surface-variant">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Booking Call to Action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="block text-[11px] font-sans font-bold uppercase tracking-wider text-on-surface-variant">
                      Nightly Rate
                    </span>
                    <span className="font-serif text-2xl text-on-surface font-black">
                      {activeProperty.price}
                    </span>
                  </div>

                  <button
                    onClick={() => onBookProperty(activeProperty.id)}
                    className="bg-primary hover:bg-primary-container text-on-primary font-sans text-sm font-semibold tracking-wide px-8 py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors group"
                  >
                    Book This Retreat
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
