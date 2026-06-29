/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onBookClick: () => void;
}

export default function Navbar({ onBookClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Properties", href: "#properties" },
    { name: "Experiences", href: "#experiences" },
    { name: "Gallery", href: "#gallery" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "bg-surface/90 backdrop-blur-md shadow-[0_20px_50px_rgba(195,79,4,0.08)] py-3 border-b border-surface-variant/30"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#home"
            className="font-serif text-3xl md:text-4xl text-primary font-bold tracking-tight hover:opacity-90 transition-opacity"
          >
            Brown Tree
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-on-surface font-sans text-sm font-semibold tracking-wide hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Booking Button */}
          <div className="hidden md:block">
            <button
              onClick={onBookClick}
              className="bg-primary hover:bg-primary-container text-on-primary px-8 py-3.5 rounded-lg font-sans text-sm font-semibold tracking-wide shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Book Your Stay
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-primary p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[60px] z-40 bg-surface flex flex-col md:hidden px-6 py-8 space-y-6 shadow-xl border-t border-surface-variant/30"
          >
            <div className="flex flex-col space-y-5">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="text-on-surface hover:text-primary font-sans text-lg font-semibold tracking-wide border-b border-surface-variant/20 pb-2"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <motion.button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full bg-primary text-on-primary py-4 rounded-lg font-sans font-semibold tracking-wide shadow-lg text-center"
            >
              Book Your Stay
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
