/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from "react";
import { PROPERTIES, Property } from "../types";
import { X, Calendar, Users, CheckCircle, Sparkles, AlertCircle, Copy, Check, Printer } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPropertyId?: string;
}

interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

const LUXURY_ADD_ONS: AddOn[] = [
  { id: "dining", name: "Enchanting Forest Banquet", price: 12000, description: "Gourmet 5-course private dinner under the canopy" },
  { id: "spa", name: "Hydrotherapy Stone Spa", price: 6500, description: "Custom 90-minute therapeutic massage & waterfall lounge" },
  { id: "butler", name: "Dedicated Private Butler", price: 5000, description: "24/7 personal care, packing help & private room service" }
];

export default function BookingModal({ isOpen, onClose, selectedPropertyId }: BookingModalProps) {
  // Booking Form State
  const [propertyId, setPropertyId] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [requests, setRequests] = useState("");
  const [addons, setAddons] = useState<string[]>([]);

  // Workflow states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [formError, setFormError] = useState("");
  const [copied, setCopied] = useState(false);

  // Set default dates and pre-filled property
  useEffect(() => {
    if (isOpen) {
      // Set property ID
      if (selectedPropertyId) {
        setPropertyId(selectedPropertyId);
      } else {
        setPropertyId(PROPERTIES[0].id);
      }

      // Default Check-In: tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split("T")[0];
      setCheckIn(tomorrowStr);

      // Default Check-Out: 3 days after tomorrow
      const afterTomorrow = new Date();
      afterTomorrow.setDate(afterTomorrow.getDate() + 4);
      const afterTomorrowStr = afterTomorrow.toISOString().split("T")[0];
      setCheckOut(afterTomorrowStr);

      // Reset submission states
      setIsSubmitting(false);
      setIsConfirmed(false);
      setFormError("");
    }
  }, [isOpen, selectedPropertyId]);

  // Find active property details
  const selectedProp = PROPERTIES.find(p => p.id === propertyId) || PROPERTIES[0];

  // Calculate nights
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diffTime = outDate.getTime() - inDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nights = calculateNights();

  // Dynamic calculations
  const basePriceTotal = selectedProp.priceNum * nights;
  const addonsTotal = addons.reduce((sum, addonId) => {
    const item = LUXURY_ADD_ONS.find(a => a.id === addonId);
    return sum + (item ? item.price : 0);
  }, 0);
  const subtotal = basePriceTotal + addonsTotal;
  const gstTax = Math.round(subtotal * 0.18); // 18% GST Luxury Hospitality tax
  const grandTotal = subtotal + gstTax;

  const handleAddonToggle = (id: string) => {
    if (addons.includes(id)) {
      setAddons(addons.filter(a => a !== id));
    } else {
      setAddons([...addons, id]);
    }
  };

  // Form Submission
  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validate Check-in & Check-out
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    if (outDate <= inDate) {
      setFormError("Check-out date must be after the check-in date.");
      return;
    }

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setFormError("Please fill out your contact details.");
      return;
    }

    setFormError("");
    setIsSubmitting(true);
    setSubmitStep(1);

    // Simulate luxury booking ledgers confirmation steps
    setTimeout(() => {
      setSubmitStep(2);
      setTimeout(() => {
        setSubmitStep(3);
        setTimeout(() => {
          // Generate unique Confirmation ID
          const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
          const year = new Date().getFullYear();
          setConfirmationCode(`BT-${randomHex}-${year}`);
          setIsSubmitting(false);
          setIsConfirmed(true);
        }, 1200);
      }, 1000);
    }, 1000);
  };

  const handleCopyCode = () => {
    const summaryText = `
BROWN TREE LUXURY ESCAPE RECEIPT
Confirmation Code: ${confirmationCode}
-----------------------------------------
Retreat: ${selectedProp.name}
Location: ${selectedProp.location}
Guest Name: ${fullName}
Dates: ${checkIn} to ${checkOut} (${nights} Nights)
Guests: ${adults} Adults, ${children} Children
Subtotal: ₹${subtotal.toLocaleString()}
GST (18%): ₹${gstTax.toLocaleString()}
Grand Total: ₹${grandTotal.toLocaleString()}
-----------------------------------------
Thank you for staying with Brown Tree.
`;
    navigator.clipboard.writeText(summaryText.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.4 }}
          className="bg-surface text-on-surface w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative border border-surface-variant/20 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-surface-variant/30 flex justify-between items-center bg-surface-container-low shrink-0">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-primary/10 text-primary rounded-xl">
                <Sparkles size={20} className="animate-pulse" />
              </span>
              <div>
                <h3 className="font-serif text-2xl font-bold">Booking Studio</h3>
                <p className="text-xs text-on-surface-variant font-sans">Configure your bespoke sanctuary stay</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-on-surface-variant hover:text-primary p-2.5 hover:bg-surface-container-high rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Main Workspace */}
          <div className="overflow-y-auto flex-1">
            {!isSubmitting && !isConfirmed ? (
              /* ACTIVE FORM SCREEN */
              <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 lg:grid-cols-12">
                {/* Form Inputs (Left) */}
                <div className="lg:col-span-7 p-6 md:p-8 space-y-6">
                  {formError && (
                    <div className="bg-error/10 border border-error/20 text-error p-4 rounded-xl flex items-center gap-3 text-xs font-sans">
                      <AlertCircle size={18} className="shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* Property Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 font-sans">
                      Select Sanctuary Destination
                    </label>
                    <select
                      value={propertyId}
                      onChange={(e) => setPropertyId(e.target.value)}
                      className="w-full bg-surface-container-low border border-surface-variant/40 rounded-xl px-4 py-3.5 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                    >
                      {PROPERTIES.map(p => (
                        <option key={p.id} value={p.id}>{p.name} — {p.location} ({p.price}/night)</option>
                      ))}
                    </select>
                  </div>

                  {/* Dates Picker Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 font-sans">
                        Check-In Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={checkIn}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="w-full bg-surface-container-low border border-surface-variant/40 rounded-xl pl-11 pr-4 py-3 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                        />
                        <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 font-sans">
                        Check-Out Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={checkOut}
                          min={checkIn || new Date().toISOString().split("T")[0]}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full bg-surface-container-low border border-surface-variant/40 rounded-xl pl-11 pr-4 py-3 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                        />
                        <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                      </div>
                    </div>
                  </div>

                  {/* Guests Picker Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 font-sans">
                        Adults
                      </label>
                      <div className="relative">
                        <select
                          value={adults}
                          onChange={(e) => setAdults(Number(e.target.value))}
                          className="w-full bg-surface-container-low border border-surface-variant/40 rounded-xl pl-11 pr-4 py-3 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                            <option key={n} value={n}>{n} {n === 1 ? 'Adult' : 'Adults'}</option>
                          ))}
                        </select>
                        <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 font-sans">
                        Children
                      </label>
                      <div className="relative">
                        <select
                          value={children}
                          onChange={(e) => setChildren(Number(e.target.value))}
                          className="w-full bg-surface-container-low border border-surface-variant/40 rounded-xl pl-11 pr-4 py-3 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                        >
                          {[0, 1, 2, 3, 4].map(n => (
                            <option key={n} value={n}>{n} {n === 1 ? 'Child' : 'Children'}</option>
                          ))}
                        </select>
                        <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                      </div>
                    </div>
                  </div>

                  {/* Luxury Add-ons Section */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3 font-sans">
                      Enhance Your Experience
                    </label>
                    <div className="space-y-3">
                      {LUXURY_ADD_ONS.map(addon => {
                        const isChecked = addons.includes(addon.id);
                        return (
                          <div
                            key={addon.id}
                            onClick={() => handleAddonToggle(addon.id)}
                            className={`flex justify-between items-start p-3.5 rounded-xl border cursor-pointer select-none transition-all duration-300 ${
                              isChecked
                                ? "bg-primary-fixed/25 border-primary/40 shadow-sm"
                                : "bg-surface-container-low border-surface-variant/30 hover:border-surface-variant/60"
                            }`}
                          >
                            <div className="flex gap-3">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {}} // Swallowed since parent handles click
                                className="mt-1 rounded text-primary focus:ring-primary"
                              />
                              <div>
                                <h4 className="font-sans text-xs font-bold text-on-surface">
                                  {addon.name}
                                </h4>
                                <p className="text-[10px] text-on-surface-variant mt-0.5 leading-snug">
                                  {addon.description}
                                </p>
                              </div>
                            </div>
                            <span className="font-sans text-xs font-extrabold text-primary ml-4">
                              +₹{addon.price.toLocaleString()}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Guest Contact Details */}
                  <div className="border-t border-surface-variant/20 pt-6 space-y-4">
                    <h4 className="font-serif text-base font-bold mb-2">Primary Guest Information</h4>
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-surface-container-low border border-surface-variant/40 rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="email"
                        placeholder="Email Address"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-surface-container-low border border-surface-variant/40 rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-surface-container-low border border-surface-variant/40 rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Special Requests (Dietary, room preferences, arrival times)"
                        rows={2}
                        value={requests}
                        onChange={(e) => setRequests(e.target.value)}
                        className="w-full bg-surface-container-low border border-surface-variant/40 rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Live Checkout Summary Column (Right) */}
                <div className="lg:col-span-5 bg-surface-container-low p-6 md:p-8 flex flex-col justify-between border-l border-surface-variant/30">
                  <div>
                    <h4 className="font-serif text-lg font-bold mb-6 pb-2 border-b border-surface-variant/20">
                      Stay Summary
                    </h4>

                    {/* Stay Info Card */}
                    <div className="flex gap-4 items-center mb-6">
                      <img
                        src={selectedProp.image}
                        alt={selectedProp.name}
                        className="w-20 h-20 object-cover rounded-xl shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h5 className="font-serif text-sm font-bold leading-tight">{selectedProp.name}</h5>
                        <p className="text-[11px] text-on-surface-variant font-sans mt-0.5">{selectedProp.location}</p>
                        <p className="text-xs text-primary font-bold font-sans mt-1">
                          {selectedProp.price} <span className="text-[10px] text-on-surface-variant font-normal">/ night</span>
                        </p>
                      </div>
                    </div>

                    {/* Cost ledger list */}
                    <div className="space-y-3.5 text-xs font-sans pb-6 border-b border-surface-variant/20">
                      <div className="flex justify-between text-on-surface-variant">
                        <span>Base Room Rate ({nights} nights)</span>
                        <span className="font-semibold text-on-surface">
                          ₹{basePriceTotal.toLocaleString()}
                        </span>
                      </div>

                      {addons.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-[11px] uppercase tracking-wider font-bold text-primary">Selected Add-ons</div>
                          {addons.map(addId => {
                            const item = LUXURY_ADD_ONS.find(a => a.id === addId);
                            if (!item) return null;
                            return (
                              <div key={addId} className="flex justify-between pl-3 text-on-surface-variant">
                                <span>• {item.name}</span>
                                <span>₹{item.price.toLocaleString()}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <div className="flex justify-between text-on-surface-variant pt-2 border-t border-dashed border-surface-variant/20">
                        <span>Resort Subtotal</span>
                        <span className="font-semibold text-on-surface">₹{subtotal.toLocaleString()}</span>
                      </div>

                      <div className="flex justify-between text-on-surface-variant">
                        <span>GST Luxury Tax (18%)</span>
                        <span className="font-semibold text-on-surface">₹{gstTax.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    {/* Grand Total */}
                    <div className="flex justify-between items-baseline mb-6">
                      <span className="font-serif text-base font-bold text-on-surface">Estimated Total</span>
                      <span className="font-serif text-3xl font-black text-primary">
                        ₹{grandTotal.toLocaleString()}
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary-container text-on-primary py-4 rounded-xl font-sans text-sm font-bold tracking-wide shadow-lg hover:shadow-primary/20 transition-all text-center"
                    >
                      Confirm Bespoke Booking
                    </button>
                    <p className="text-[10px] text-on-surface-variant text-center mt-3 leading-snug">
                      No immediate payment required. Pay upon arrival at the reservation check-in lobby.
                    </p>
                  </div>
                </div>
              </form>
            ) : isSubmitting ? (
              /* SECURING LEDGER STEPS SCREEN */
              <div className="p-12 flex flex-col items-center justify-center text-center space-y-8 min-h-[450px]">
                {/* Custom animated double spinner */}
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                  <div className="absolute inset-0 border-4 border-t-primary rounded-full animate-spin" />
                  <div className="absolute inset-2 border-4 border-transparent border-b-secondary rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }} />
                </div>

                <div className="space-y-2 max-w-sm">
                  <AnimatePresence mode="wait">
                    {submitStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-1"
                      >
                        <h4 className="font-serif text-lg font-bold">Verifying Room Availability</h4>
                        <p className="text-xs text-on-surface-variant">Securing real-time slot clearance with {selectedProp.name}...</p>
                      </motion.div>
                    )}
                    {submitStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-1"
                      >
                        <h4 className="font-serif text-lg font-bold">Assembling Customized Room Assets</h4>
                        <p className="text-xs text-on-surface-variant">Attaching luxury packages and guest ledger parameters...</p>
                      </motion.div>
                    )}
                    {submitStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-1"
                      >
                        <h4 className="font-serif text-lg font-bold">Confirming Booking Ledger</h4>
                        <p className="text-xs text-on-surface-variant">Generating secure BT-Ledger transaction signature...</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              /* SUCCESS CONFIRMATION RECEIPT SCREEN */
              <div className="p-8 md:p-12 max-w-2xl mx-auto space-y-8 text-center min-h-[450px]">
                <div className="inline-flex p-4 bg-green-500/10 text-green-600 rounded-full animate-bounce">
                  <CheckCircle size={44} />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-3xl font-black text-on-surface">Sanctuary Reserved</h3>
                  <p className="text-sm text-on-surface-variant max-w-md mx-auto">
                    Your luxury stay details are locked. A personalized itinerary and welcome handbook have been dispatched to <strong>{email}</strong>.
                  </p>
                </div>

                {/* Luxury Receipt Container */}
                <div id="print-area" className="bg-surface-container-low border-2 border-dashed border-outline-variant/60 rounded-2xl p-6 text-left space-y-4">
                  <div className="flex justify-between items-start border-b border-surface-variant/30 pb-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Confirmation Code</p>
                      <h4 className="font-mono text-base font-extrabold text-on-surface select-all">{confirmationCode}</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Status</p>
                      <span className="text-xs font-bold text-green-600 uppercase">● Verified Stay</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-y-4 text-xs font-sans border-b border-surface-variant/30 pb-4">
                    <div>
                      <span className="block text-on-surface-variant font-medium">Sanctuary</span>
                      <strong className="text-sm font-serif font-bold text-on-surface">{selectedProp.name}</strong>
                    </div>
                    <div>
                      <span className="block text-on-surface-variant font-medium">Primary Guest</span>
                      <strong className="text-on-surface">{fullName}</strong>
                    </div>
                    <div>
                      <span className="block text-on-surface-variant font-medium">Dates & Nights</span>
                      <strong className="text-on-surface">{checkIn} to {checkOut} ({nights} Nights)</strong>
                    </div>
                    <div>
                      <span className="block text-on-surface-variant font-medium">Resort Party</span>
                      <strong className="text-on-surface">{adults} Adults, {children} Children</strong>
                    </div>
                  </div>

                  {/* Add-ons list if selected */}
                  {addons.length > 0 && (
                    <div className="text-xs font-sans border-b border-surface-variant/30 pb-4">
                      <span className="block text-on-surface-variant font-medium mb-1.5">Curated Stay Upgrades</span>
                      <div className="space-y-1">
                        {addons.map(id => (
                          <div key={id} className="flex justify-between text-on-surface-variant">
                            <span>• {LUXURY_ADD_ONS.find(a => a.id === id)?.name}</span>
                            <span>₹{LUXURY_ADD_ONS.find(a => a.id === id)?.price.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pricing Breakdown */}
                  <div className="text-xs font-sans space-y-2">
                    <div className="flex justify-between text-on-surface-variant">
                      <span>Room Base Total</span>
                      <span>₹{basePriceTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-on-surface-variant">
                      <span>GST (18%)</span>
                      <span>₹{gstTax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-serif font-bold text-on-surface pt-2 border-t border-surface-variant/20">
                      <span>Grand Total</span>
                      <span className="text-primary text-base font-extrabold">₹{grandTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Print/Copy Receipt Action Row */}
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={handleCopyCode}
                    className="bg-surface-container-highest hover:bg-surface-container-high border border-surface-variant/50 px-6 py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-green-600" />
                        <span>Receipt Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy Stay Details</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handlePrint}
                    className="bg-surface-container-highest hover:bg-surface-container-high border border-surface-variant/50 px-6 py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all"
                  >
                    <Printer size={14} />
                    <span>Print Receipt</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="bg-primary hover:bg-primary-container text-on-primary px-8 py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Back to Retreats
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
