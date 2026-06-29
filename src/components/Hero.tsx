/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { Star, ChevronDown } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      // Calculate offset percentage from center (-0.5 to 0.5)
      const x = (clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (clientY - innerHeight / 2) / (innerHeight / 2);
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const headingWords = "Experience Nature Like Never Before".split(" ");

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden curved-bottom bg-[#0d1b34]"
    >
      {/* Zoom and Cinematic Background */}
      <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
        <div
          className="w-full h-full bg-cover bg-center opacity-75 mix-blend-overlay scale-105"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCZVCq1lFoP_Bu9d1bN9lij_wB_h0i6T1TsQcnjghDBhFwzm5JjkmlQSB6GVp1mJhNHorAoT-srxVdx8sGrXDGGUNk3FEOSi-YbhLIl_-lqs9SNsPq0iClp_vJ30dNRuiIoBlbuVu7Pm7megCB0O_dmbIhsaaWQ3PAK16MCusXNvpn1Jval7fkcusAu7yLvsEljxV4nqgWRzsyQYm6_l2djHNF2RvVIfwt3_JrCb4tJ4K3jzC010Xj1aG9UnTyx_h3Y-m5bGMVAG3o3')`,
            transform: `scale(1.08) translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)`,
            transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
          data-alt="Cinematic luxury eco-resort in a misty forest at dusk."
        />
      </div>

      {/* Parallax Floating Ambient Light Blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary-fixed/15 rounded-full blur-[100px] pointer-events-none animate-blob-1"
        style={{
          transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)`,
          transition: "transform 0.6s cubic-bezier(0.1, 0.8, 0.2, 1)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-tertiary-fixed/15 rounded-full blur-[120px] pointer-events-none animate-blob-2"
        style={{
          transform: `translate(${mousePos.x * -50}px, ${mousePos.y * -50}px)`,
          transition: "transform 0.6s cubic-bezier(0.1, 0.8, 0.2, 1)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-[350px] h-[350px] bg-secondary-fixed/10 rounded-full blur-[110px] pointer-events-none animate-blob-3"
        style={{
          transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)`,
          transition: "transform 0.6s cubic-bezier(0.1, 0.8, 0.2, 1)",
        }}
      />

      {/* Main Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 max-w-7xl mx-auto pt-24 pb-12">
        {/* Five Star Micro-badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 glass-panel px-5 py-2.5 rounded-full mb-8"
        >
          <div className="flex gap-0.5 text-surface-tint">
            <Star size={15} fill="currentColor" className="text-primary" />
            <Star size={15} fill="currentColor" className="text-primary" />
            <Star size={15} fill="currentColor" className="text-primary" />
            <Star size={15} fill="currentColor" className="text-primary" />
            <Star size={15} fill="currentColor" className="text-primary" />
          </div>
          <span className="text-xs font-semibold tracking-wider uppercase font-sans text-on-surface">
            Ultra Luxury Escapes
          </span>
        </motion.div>

        {/* Word Reveal Animated Slogan */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-bold leading-[1.1] tracking-tight max-w-5xl mb-8 select-none">
          {headingWords.map((word, index) => (
            <motion.span
              key={index}
              className="inline-block mr-3 sm:mr-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.85,
                delay: 0.3 + index * 0.12,
                ease: [0.2, 0.8, 0.2, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 1.2, delay: 1.3 }}
          className="text-white/80 font-sans text-lg md:text-xl max-w-xl mx-auto tracking-wide mb-12 font-medium"
        >
          Secluded architectural wonders woven beautifully into the planet's most pristine landscapes.
        </motion.p>

        {/* Call to Action Button */}
        <motion.a
          href="#properties"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 px-10 py-4.5 rounded-full font-sans text-sm font-semibold tracking-widest uppercase hover:scale-[1.03] transition-all duration-300"
        >
          Explore Properties
        </motion.a>
      </div>

      {/* Down Bouncing Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white opacity-75">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={36} strokeWidth={1.5} />
        </motion.div>
      </div>
    </section>
  );
}
