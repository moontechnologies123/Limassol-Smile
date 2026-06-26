import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Smile, Sparkles, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface BookingFormProps {
  preFilledTreatment?: string;
  onBookingSuccess?: () => void;
}

export default function BookingForm({ preFilledTreatment, onBookingSuccess }: BookingFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [treatment, setTreatment] = useState('General Checkup & Cleaning');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [notes, setNotes] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Update treatment when prefilled value changes
  useEffect(() => {
    if (preFilledTreatment) {
      setTreatment(preFilledTreatment);
    }
  }, [preFilledTreatment]);

  const treatmentsList = [
    "General Checkup & Cleaning",
    "Cosmetic Teeth Whitening",
    "Premium Porcelain Veneers",
    "Dental Implants & Restoration",
    "Invisalign & Clear Aligners",
    "Emergency Pain Relief & Root Canal",
    "Free Consultation"
  ];

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !preferredDate || !preferredTime) {
      setStatus('error');
      setErrorMessage('Please fill in all mandatory fields.');
      return;
    }

    setIsLoading(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          treatment,
          preferredDate,
          preferredTime,
          notes,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setPhone('');
        setPreferredDate('');
        setPreferredTime('');
        setNotes('');
        if (onBookingSuccess) {
          onBookingSuccess();
        }
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit appointment request.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network error. Please try again or call +357 25 345678.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="booking-container" className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white/50 shadow-xl max-w-xl mx-auto">
      
      {/* Title */}
      <div className="text-center space-y-2 mb-8">
        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mx-auto shadow-sm">
          <Calendar className="w-6 h-6" />
        </div>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
          Request an Appointment
        </h3>
        <p className="text-xs text-slate-500 font-light">
          Fill in the details below. Our dental coordinator will call you to confirm your slot.
        </p>
      </div>

      {status === 'success' ? (
        <div className="bg-blue-50/60 backdrop-blur-sm border border-blue-100 text-blue-800 rounded-2xl p-6 space-y-4 text-center animate-fade-in">
          <CheckCircle className="w-12 h-12 text-blue-500 mx-auto" />
          <h4 className="text-base font-bold">Appointment Requested Successfully!</h4>
          <p className="text-xs text-blue-700 leading-relaxed font-light">
            Thank you, <strong className="font-semibold">{name}</strong>. Your inquiry has been sent directly to Dr. Elena Georgiou's coordinator. We will reach out to you via email or phone at <strong className="font-semibold">{phone}</strong> within 2 hours to confirm your treatment.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-2 text-xs font-bold text-blue-800 underline hover:text-blue-950 transition-colors"
          >
            Submit another request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
          {/* Error Message */}
          {status === 'error' && (
            <div className="bg-rose-50/80 backdrop-blur-sm border border-rose-100 text-rose-800 rounded-xl p-4 flex items-start space-x-2.5 text-xs animate-fade-in">
              <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Submission Error</span>
                <p className="font-light mt-0.5">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Andreas Christodoulou"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/40 bg-white/40 backdrop-blur-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100/50 outline-none transition-all text-sm text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Contact Details (2 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="andreas@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/40 bg-white/40 backdrop-blur-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100/50 outline-none transition-all text-sm text-slate-800 placeholder-slate-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                Cyprus Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. +357 99 123456"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/40 bg-white/40 backdrop-blur-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100/50 outline-none transition-all text-sm text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Service Dropdown Selection */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">
              Select Dental Treatment <span className="text-rose-500">*</span>
            </label>
            <select
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/40 bg-white/40 backdrop-blur-sm focus:border-blue-500 outline-none transition-all text-sm text-slate-800 cursor-pointer"
            >
              {treatmentsList.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Preferred Scheduling (2 Columns: Date & Time) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Preferred Date <span className="text-rose-500">*</span></span>
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/40 bg-white/40 backdrop-blur-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100/50 outline-none transition-all text-sm text-slate-800 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Preferred Slot <span className="text-rose-500">*</span></span>
              </label>
              <select
                required
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/40 bg-white/40 backdrop-blur-sm focus:border-blue-500 outline-none transition-all text-sm text-slate-800 cursor-pointer"
              >
                <option value="">Select Time Slot</option>
                {timeSlots.map((slot, i) => (
                  <option key={i} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Additional Notes (TextArea) */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">
              Clinical Notes / Dental Concerns (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g., Any dental anxiety? Do you have tooth sensitivity or pain? Please mention..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/40 bg-white/40 backdrop-blur-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100/50 outline-none transition-all text-sm text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-xl text-xs font-bold text-white transition-all shadow-md mt-2 flex items-center justify-center space-x-2 cursor-pointer ${
              isLoading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 hover:shadow-xl active:scale-95'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center space-x-2">
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                <span>Submitting Booking...</span>
              </span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Appointment Request</span>
              </>
            )}
          </button>
          
          <div className="text-center pt-2">
            <span className="text-[10px] text-slate-400 block">
              *By submitting, you agree to receive a diagnostic appointment callback.
            </span>
          </div>

        </form>
      )}
    </div>
  );
}
