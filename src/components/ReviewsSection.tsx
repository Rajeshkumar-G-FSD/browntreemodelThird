/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { REVIEWS } from "../types";
import { Star, Quote } from "lucide-react";
import { motion } from "motion/react";

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-24 bg-surface relative overflow-hidden">
      {/* Decorative blurred back light circles */}
      <div className="absolute top-1/2 left-10 w-72 h-72 rounded-full bg-primary/5 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-sans text-xs font-bold tracking-widest uppercase block mb-3">
            Guest Testimonials
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-on-surface font-bold tracking-tight mb-5">
            Chronicles of Hospitality
          </h2>
          <p className="text-on-surface-variant font-sans text-base leading-relaxed">
            Read stories and recollections shared by guests who have walked our forest paths and rested in our curated architectural havens.
          </p>
        </div>

        {/* Testimonials Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="glass-panel p-8 rounded-3xl relative flex flex-col justify-between"
            >
              {/* Giant elegant background Quote Mark */}
              <div className="absolute top-6 right-8 text-primary/10 select-none pointer-events-none">
                <Quote size={54} strokeWidth={1} fill="currentColor" />
              </div>

              <div>
                {/* Stars Row */}
                <div className="flex gap-1 mb-6 text-primary">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>

                {/* Content Text */}
                <p className="font-sans italic text-sm md:text-base leading-relaxed text-on-surface-variant mb-8 relative z-10">
                  "{review.content}"
                </p>
              </div>

              {/* Author Row */}
              <div className="flex items-center gap-4 pt-4 border-t border-surface-variant/20">
                <div className={`w-11 h-11 rounded-full ${review.avatarBg} flex items-center justify-center font-sans font-bold text-sm shrink-0 shadow-sm`}>
                  {review.avatarChar}
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-on-surface">
                    {review.author}
                  </h4>
                  <p className="text-[11px] font-sans font-semibold text-on-surface-variant uppercase tracking-wider">
                    {review.stay}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
