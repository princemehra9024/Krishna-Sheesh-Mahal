import { useEffect, useState, FormEvent } from "react";
import { lockScroll } from "../hooks/useScrollEngine";
import { generateWhatsAppLink } from "../data";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, Calendar, Users, MessageSquare, User } from "lucide-react";

const U = "https://thepopuphotel.com/wp-content/uploads";

const BOOKING_OPTIONS = [
  { type: "Room", title: "Rooms & Suites", desc: "Discover our luxurious accommodations.", src: `${U}/2026/03/img-5-1600x900.webp` },
  { type: "Banquet", title: "Banquet & Events", desc: "Plan your grand celebration.", src: "/images/banquet-corporate-new.jpg" },
  { type: "Restaurant", title: "Fine Dining", desc: "Experience culinary excellence.", src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1600" },
  { type: "Rooftop", title: "Rooftop Terrace", desc: "Intimate dining under the stars.", src: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1600" },
];

interface Props {
  open: boolean;
  onClose: () => void;
  initialType?: string;
}

export default function BookNowPopover({ open, onClose, initialType = "Room" }: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const [bookingType, setBookingType] = useState(initialType);
  
  // Form State
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [requests, setRequests] = useState("");

  useEffect(() => {
    if (open) {
      setStep(1);
    }
    lockScroll(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleOptionClick = (type: string) => {
    setBookingType(type);
    setStep(2);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const link = generateWhatsAppLink({ type: bookingType, name, date, guests, requests });
    window.open(link, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[101] w-full max-w-md bg-[#fdfbf7]/95 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col border-l border-white/20"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-black/5 relative z-10 bg-white/50">
              <div className="flex items-center gap-3">
                {step === 2 && (
                  <button 
                    onClick={() => setStep(1)}
                    className="p-2 hover:bg-black/5 rounded-full transition-colors"
                  >
                    <ArrowLeft size={20} className="text-[#591829]" />
                  </button>
                )}
                <h3 className="font-['Noe_Display'] text-2xl text-[#591829] tracking-wide">
                  {step === 1 ? "Select Experience" : `Book ${bookingType}`}
                </h3>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X size={24} className="text-black/60" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto relative scrollbar-hide p-6">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col gap-4"
                  >
                    {BOOKING_OPTIONS.map((option, i) => (
                      <motion.button
                        key={option.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleOptionClick(option.type)}
                        className="group relative overflow-hidden rounded-2xl aspect-[21/9] shadow-md border border-black/5 text-left"
                      >
                        <img 
                          src={option.src} 
                          alt={option.title} 
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute inset-0 p-5 flex flex-col justify-end">
                          <h4 className="text-white font-['Noe_Display'] text-xl mb-1">{option.title}</h4>
                          <p className="text-white/80 font-['Satoshi'] text-sm">{option.desc}</p>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                ) : (
                  <motion.form 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 h-full"
                  >
                    <div className="space-y-4 flex-1">
                      {/* Name */}
                      <div className="relative">
                        <label className="text-sm font-semibold text-[#591829] mb-1.5 block font-['Satoshi']">Full Name</label>
                        <div className="relative flex items-center">
                          <User size={18} className="absolute left-3 text-black/40" />
                          <input 
                            required 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. John Doe"
                            className="w-full pl-10 pr-4 py-3 bg-white/60 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#591829]/30 focus:bg-white transition-all font-['Satoshi']"
                          />
                        </div>
                      </div>

                      {/* Date */}
                      <div className="relative">
                        <label className="text-sm font-semibold text-[#591829] mb-1.5 block font-['Satoshi']">
                          {bookingType === "Room" ? "Check-in Date" : "Event Date"}
                        </label>
                        <div className="relative flex items-center">
                          <Calendar size={18} className="absolute left-3 text-black/40" />
                          <input 
                            required 
                            type="date" 
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/60 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#591829]/30 focus:bg-white transition-all font-['Satoshi'] text-black/70"
                          />
                        </div>
                      </div>

                      {/* Guests */}
                      <div className="relative">
                        <label className="text-sm font-semibold text-[#591829] mb-1.5 block font-['Satoshi']">Number of Guests</label>
                        <div className="relative flex items-center">
                          <Users size={18} className="absolute left-3 text-black/40" />
                          <input 
                            required 
                            type="number" 
                            min="1"
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            placeholder="e.g. 2"
                            className="w-full pl-10 pr-4 py-3 bg-white/60 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#591829]/30 focus:bg-white transition-all font-['Satoshi']"
                          />
                        </div>
                      </div>

                      {/* Requests */}
                      <div className="relative">
                        <label className="text-sm font-semibold text-[#591829] mb-1.5 block font-['Satoshi']">Special Requests</label>
                        <div className="relative">
                          <MessageSquare size={18} className="absolute left-3 top-3.5 text-black/40" />
                          <textarea 
                            rows={3}
                            value={requests}
                            onChange={(e) => setRequests(e.target.value)}
                            placeholder="Any special requirements? (Optional)"
                            className="w-full pl-10 pr-4 py-3 bg-white/60 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#591829]/30 focus:bg-white transition-all resize-none font-['Satoshi']"
                          />
                        </div>
                      </div>
                    </div>

                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit" 
                      className="w-full mt-4 bg-[#591829] text-[#fdfbf7] py-4 rounded-xl font-semibold tracking-wide shadow-lg shadow-[#591829]/30 hover:shadow-[#591829]/50 transition-shadow font-['Satoshi'] flex justify-center items-center gap-2"
                    >
                      Continue to WhatsApp
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
