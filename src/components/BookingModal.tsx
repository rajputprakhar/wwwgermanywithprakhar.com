import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  Check, 
  ExternalLink, 
  Star, 
  ShieldCheck, 
  ArrowRight,
  User,
  Mail,
  GraduationCap
} from 'lucide-react';
import { CONSULTING_SERVICES, PERSONAL_INFO } from '../data/siteData';
import { ConsultingService, ConsultationBooking } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ConsultingService;
  onBookingCreated?: (booking: ConsultationBooking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService,
  onBookingCreated
}) => {
  const [selectedService, setSelectedService] = useState<ConsultingService>(
    initialService || CONSULTING_SERVICES[0]
  );
  const [selectedDate, setSelectedDate] = useState<string>('Thu, 17 Sep');
  const [selectedTime, setSelectedTime] = useState<string>('16:00 CET (20:30 IST)');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [background, setBackground] = useState('');
  const [step, setStep] = useState<'details' | 'confirmed'>('details');

  const availableDates = [
    { day: 'Thu', date: '17 Sep', label: 'Thu, 17 Sep' },
    { day: 'Fri', date: '18 Sep', label: 'Fri, 18 Sep' },
    { day: 'Sat', date: '19 Sep', label: 'Sat, 19 Sep' },
    { day: 'Sun', date: '20 Sep', label: 'Sun, 20 Sep' }
  ];

  const availableTimes = [
    '14:00 CET (18:30 IST)',
    '16:00 CET (20:30 IST)',
    '18:00 CET (22:30 IST)',
    '19:30 CET (00:00 IST)'
  ];

  if (!isOpen) return null;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onBookingCreated) {
      const newBooking: ConsultationBooking = {
        id: `bk-${Date.now()}`,
        serviceId: selectedService.id,
        serviceTitle: selectedService.title,
        price: selectedService.price,
        clientName: name,
        clientEmail: email,
        background: background,
        scheduledDate: selectedDate,
        scheduledTime: selectedTime,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };
      onBookingCreated(newBooking);
    }
    setStep('confirmed');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0D0F18] border border-white/15 rounded-3xl shadow-2xl shadow-black/90 p-5 sm:p-8 z-10 my-4 sm:my-8 max-h-[92vh] overflow-y-auto text-left"
        >
          {/* Top Gradient Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-gray-400 hover:text-white transition-colors z-20"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>

          {step === 'details' ? (
            <div>
              {/* Header */}
              <div className="flex items-center gap-3.5 mb-6 pr-8">
                <a
                  href={PERSONAL_INFO.socials.brandInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View Prakhar on Instagram (@germanywithprakhar)"
                  aria-label="View Prakhar on Instagram"
                  className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-500/50 hover:border-pink-500 shrink-0 cursor-pointer transition-colors block group/modal-avatar"
                >
                  <img
                    src="/image-for-website.jpg"
                    alt="Prakhar Rajput"
                    className="w-full h-full object-cover group-hover/modal-avatar:scale-110 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </a>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      Schedule with Prakhar Rajput
                    </h3>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 font-bold">
                      TOPMATE PRO
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 font-mono">
                    CS @ Uni Bremen • 1-on-1 Germany Strategy
                  </p>
                </div>
              </div>

              {/* Service Selection */}
              <div className="mb-5">
                <label className="text-xs font-mono text-gray-400 block mb-2 uppercase tracking-wider">
                  Select Service
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {CONSULTING_SERVICES.map((srv) => (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => setSelectedService(srv)}
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        selectedService.id === srv.id
                          ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                          : 'bg-white/[0.02] border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-semibold text-white truncate">{srv.title}</div>
                      <div className="text-[11px] font-mono text-cyan-300 font-bold mt-0.5">
                        {srv.price} • {srv.duration}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-2 uppercase tracking-wider">
                    Select Day
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableDates.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => setSelectedDate(item.label)}
                        className={`p-2 rounded-xl text-center border text-xs font-mono transition-all ${
                          selectedDate === item.label
                            ? 'bg-indigo-600/25 border-indigo-400 text-white font-bold'
                            : 'bg-white/[0.02] border-white/10 text-gray-300 hover:bg-white/[0.06]'
                        }`}
                      >
                        <span className="block text-[10px] text-gray-400">{item.day}</span>
                        <span>{item.date}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-2 uppercase tracking-wider">
                    Select Time Slot (CET / IST)
                  </label>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`w-full p-2 rounded-xl text-left border text-xs font-mono transition-all ${
                          selectedTime === time
                            ? 'bg-indigo-600/25 border-indigo-400 text-white font-bold'
                            : 'bg-white/[0.02] border-white/10 text-gray-300 hover:bg-white/[0.06]'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Input */}
              <form onSubmit={handleBookingSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono text-gray-400 block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aryan Sharma"
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 focus:border-indigo-500 focus:outline-none text-xs text-white placeholder-gray-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-gray-400 block mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. aryan@gmail.com"
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 focus:border-indigo-500 focus:outline-none text-xs text-white placeholder-gray-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-gray-400 block mb-1">
                    Target German Degree &amp; Universities
                  </label>
                  <input
                    type="text"
                    required
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    placeholder="e.g. B.Tech CS applying for M.Sc. CS at Uni Bremen, TU Munich"
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.05] border border-white/15 focus:border-indigo-500 focus:outline-none text-xs text-white placeholder-gray-500 font-mono"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-indigo-900/40 transition-all cursor-pointer"
                  >
                    <span>Reserve Slot &amp; Open Topmate Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Confirmation Step */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Slot Reserved!</h3>
              <p className="text-sm text-gray-300 max-w-md mx-auto mb-6">
                Thank you, <strong className="text-white">{name}</strong>. We have earmarked your session for <strong className="text-cyan-300">{selectedDate}</strong> at <strong className="text-cyan-300">{selectedTime}</strong>.
              </p>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 max-w-md mx-auto text-left text-xs font-mono space-y-2 mb-6 text-gray-300">
                <div><span className="text-gray-500">Service:</span> {selectedService.title} ({selectedService.duration})</div>
                <div><span className="text-gray-500">Total:</span> {selectedService.price}</div>
                <div><span className="text-gray-500">Attendee:</span> {email}</div>
                <div><span className="text-gray-500">Platform:</span> Google Meet Video Link</div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="https://topmate.io/prakhar_rajput/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
                >
                  <span>Complete Payment on Topmate.io</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/10 text-white text-xs font-medium"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
