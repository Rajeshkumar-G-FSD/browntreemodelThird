/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from "react";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Check if already subscribed in prior sessions
  useEffect(() => {
    const hasSubscribed = localStorage.getItem("bt_newsletter_subscribed");
    if (hasSubscribed) {
      setIsSubscribed(true);
    }
  }, []);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;

    setIsSubmitting(true);

    // Simulate luxury API database submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      localStorage.setItem("bt_newsletter_subscribed", "true");
      setEmail("");
    }, 1500);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-[#0d1b34] text-white pt-24 pb-12 relative overflow-hidden border-t border-white/5">
      {/* Dynamic blurred ambient light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
        {/* Brand details (Col span 4) */}
        <div className="md:col-span-4 space-y-6">
          <a href="#home" className="font-serif text-3xl font-black tracking-tight text-white inline-block">
            Brown Tree
          </a>
          <p className="text-white/60 font-sans text-sm leading-relaxed max-w-sm">
            Architectural precision woven seamlessly into Earth's most breathtaking settings. Experience unparalleled organic warmth and curated living.
          </p>

          <div className="space-y-3 pt-2 text-sm font-sans text-white/80">
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-primary-fixed-dim" />
              <span>14/3, Woodbury Estate, Coorg, KA, India</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-primary-fixed-dim" />
              <span>+91 80 4921 5400</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-primary-fixed-dim" />
              <a href="mailto:concierge@browntree.luxury" className="hover:text-primary-fixed transition-colors">
                concierge@browntree.luxury
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links (Col span 2) */}
        <div className="md:col-span-2 space-y-5">
          <h4 className="font-serif text-base font-bold tracking-wide uppercase text-white/95">Navigation</h4>
          <ul className="space-y-3 text-sm font-sans text-white/60">
            <li>
              <a href="#home" className="hover:text-primary-fixed-dim transition-colors">
                Home Stay
              </a>
            </li>
            <li>
              <a href="#properties" className="hover:text-primary-fixed-dim transition-colors">
                Retreats
              </a>
            </li>
            <li>
              <a href="#experiences" className="hover:text-primary-fixed-dim transition-colors">
                Experiences
              </a>
            </li>
            <li>
              <a href="#gallery" className="hover:text-primary-fixed-dim transition-colors">
                Chronicles
              </a>
            </li>
            <li>
              <a href="#reviews" className="hover:text-primary-fixed-dim transition-colors">
                Testimonials
              </a>
            </li>
          </ul>
        </div>

        {/* Brand Pillars (Col span 2) */}
        <div className="md:col-span-2 space-y-5">
          <h4 className="font-serif text-base font-bold tracking-wide uppercase text-white/95">Destinations</h4>
          <ul className="space-y-3 text-sm font-sans text-white/60">
            <li>
              <a href="#properties" className="hover:text-primary-fixed-dim transition-colors">
                The Misty Peaks (Coorg)
              </a>
            </li>
            <li>
              <a href="#properties" className="hover:text-primary-fixed-dim transition-colors">
                Heritage Haveli (Rajasthan)
              </a>
            </li>
            <li>
              <a href="#properties" className="hover:text-primary-fixed-dim transition-colors">
                Urban Oasis (Bangalore)
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription (Col span 4) */}
        <div className="md:col-span-4 space-y-5">
          <h4 className="font-serif text-base font-bold tracking-wide uppercase text-white/95">The Circle</h4>
          <p className="text-white/60 font-sans text-sm leading-relaxed">
            Subscribe to receive private invitations to new property openings, seasonal retreats, and architectural journals.
          </p>

          <AnimatePresence mode="wait">
            {!isSubscribed ? (
              <motion.form
                key="subscription-form"
                onSubmit={handleSubscribe}
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <input
                  type="email"
                  placeholder="Your luxury email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full bg-white/5 border border-white/15 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none rounded-xl pl-4 pr-14 py-3.5 text-sm font-sans tracking-wide transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary-container text-on-primary p-2.5 rounded-lg transition-colors duration-300 disabled:opacity-50 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <Loader2 size={16} className="animate-spin text-white" />
                  ) : (
                    <ArrowRight size={16} className="text-white" />
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="subscribed-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center gap-3"
              >
                <CheckCircle2 className="text-primary-fixed-dim shrink-0" size={18} />
                <div className="font-sans text-xs">
                  <strong className="block text-white">Welcome to the Inner Circle</strong>
                  <span className="text-white/70">Your bespoke travel access is activated.</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Bottom Credentials */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans text-white/40 select-none">
        <p>© {currentYear} Brown Tree Luxury Hospitality Private Limited. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-white transition-colors">Booking Terms</a>
        </div>
      </div>
    </footer>
  );
}
