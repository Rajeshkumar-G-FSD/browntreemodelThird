/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EXPERIENCES } from "../types";
import { Compass, Sparkles, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

interface ExperiencesSectionProps {
  onBookClick: () => void;
}

export default function ExperiencesSection({ onBookClick }: ExperiencesSectionProps) {
  return (
    <section id="experiences" className="py-24 bg-surface relative overflow-hidden">
      {/* Decorative vertical background divider lines */}
      <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-surface-variant/10 hidden md:block" />
      <div className="absolute top-0 bottom-0 left-2/4 w-[1px] bg-surface-variant/10 hidden md:block" />
      <div className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-surface-variant/10 hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Intro */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <Compass className="text-primary animate-spin" style={{ animationDuration: '20s' }} size={16} />
            <span className="text-primary font-sans text-xs font-bold tracking-widest uppercase">
              Curated Living
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-on-surface font-bold tracking-tight mb-6">
            Bespoke Experiences
          </h2>
          <p className="text-on-surface-variant font-sans text-base leading-relaxed max-w-2xl">
            A stay at Brown Tree is more than a room reservation. It is a portal to private luxury adventures tailored meticulously to your desires.
          </p>
        </div>

        {/* Experiences Stack */}
        <div className="space-y-24">
          {EXPERIENCES.map((exp, index) => {
            const isLeft = exp.align === "left";
            return (
              <div
                key={exp.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
              >
                {/* Image Box */}
                <div
                  className={`lg:col-span-6 relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] group ${
                    isLeft ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle organic shine overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                {/* Text Content Box */}
                <div
                  className={`lg:col-span-6 ${
                    isLeft ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="inline-flex p-3 bg-primary-fixed/20 rounded-xl mb-6">
                    <Sparkles size={18} className="text-primary" />
                  </div>

                  <h3 className="font-serif text-3xl md:text-4xl text-on-surface font-bold mb-5">
                    {exp.title}
                  </h3>

                  <p className="text-on-surface-variant font-sans text-base leading-relaxed mb-8">
                    {exp.description}
                  </p>

                  <button
                    onClick={onBookClick}
                    className="inline-flex items-center gap-2.5 font-sans text-sm font-bold tracking-wider text-primary hover:text-primary-container border-b-2 border-primary pb-1 group transition-all"
                  >
                    <span>{exp.actionText}</span>
                    <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
