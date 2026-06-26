import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Compass, Car, Send, CheckCircle } from 'lucide-react';

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const contacts = [
    {
      icon: <MapPin className="w-4 h-4 text-blue-600" />,
      label: "Our Physical Address",
      value: "45 Gladstonos Street, Limassol 3041, Cyprus",
      subtext: "Near Molos Beachfront & District Office"
    },
    {
      icon: <Phone className="w-4 h-4 text-blue-600" />,
      label: "Inquiry Line",
      value: "+357 25 345678",
      subtext: "English, Greek, Russian spoken"
    },
    {
      icon: <Mail className="w-4 h-4 text-blue-600" />,
      label: "Secure Email",
      value: "info@limassolsmile.com",
      subtext: "General queries & medical documents"
    }
  ];

  const operatingHours = [
    { day: "Mon - Fri", hours: "08:30 - 18:00" },
    { day: "Saturday", hours: "09:00 - 14:00" },
    { day: "Sunday", hours: "Emergencies Only" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setFormLoading(true);
    // Simulate administrative delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setFormLoading(false);
    setFormSubmitted(true);
    
    // Auto-reset after a few seconds or allow manual dismissal
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-20 bg-transparent scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block font-mono">Connect With Us</span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            We are easy to find in Limassol
          </h2>
          <p className="text-slate-600 font-light text-base leading-relaxed">
            Reach out via our direct contact desk, send a general inquiry, or find driving directions to our beachfront surgical office below.
          </p>
        </div>

        {/* 3-Column Modern Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
          
          {/* Column 1: Core Contact & Operating Hours (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            
            {/* Contact details card */}
            <div className="bg-white/40 backdrop-blur-md rounded-[2rem] p-6 border border-white/40 shadow-sm space-y-6 flex-1">
              <h3 className="font-display text-base font-bold text-slate-950 border-b border-white/45 pb-3">
                Contact Protocols
              </h3>
              
              <div className="space-y-4">
                {contacts.map((contact, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-50 rounded-xl border border-blue-100 text-blue-600 shrink-0 mt-0.5">
                      {contact.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        {contact.label}
                      </span>
                      <p className="text-xs font-bold text-slate-800 leading-tight mt-0.5">
                        {contact.value}
                      </p>
                      <span className="text-[10px] text-slate-500 font-light block mt-0.5">
                        {contact.subtext}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Operating Hours card */}
            <div className="bg-white/40 backdrop-blur-md rounded-[2rem] p-6 border border-white/40 shadow-sm space-y-4">
              <h3 className="font-display text-base font-bold text-slate-950 border-b border-white/45 pb-3">
                Clinical Hours
              </h3>
              <div className="space-y-2">
                {operatingHours.map((slot, i) => (
                  <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-white/30 last:border-0">
                    <span className="font-medium text-slate-600">{slot.day}</span>
                    <span className={`font-bold ${
                      slot.hours.includes("Closed") || slot.hours.includes("Emergencies") 
                        ? 'text-rose-600' 
                        : 'text-slate-800'
                    }`}>
                      {slot.hours}
                    </span>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50/50 backdrop-blur-sm rounded-xl p-3 border border-blue-100 text-[10px] text-blue-800 font-light leading-relaxed">
                <span className="font-bold text-blue-950 uppercase block mb-0.5 tracking-wide text-[9px]">Emergency Protocol</span>
                Call <strong className="font-semibold">+357 25 345678</strong> for our 24/7 same-day emergency dentist callback in Limassol.
              </div>
            </div>

          </div>

          {/* Column 2: Interactive Map Block (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div className="bg-white/40 backdrop-blur-md rounded-[2rem] p-5 border border-white/40 shadow-sm flex-1 flex flex-col justify-between overflow-hidden relative min-h-[350px]">
              
              {/* Map Title block */}
              <div className="relative z-10 text-left mb-3">
                <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest block font-mono">Location Map</span>
                <h3 className="font-display text-sm font-bold text-slate-900">Gladstonos Medical District</h3>
              </div>

              {/* Real Embedded Interactive Google Map */}
              <div className="flex-1 min-h-[220px] rounded-2xl border border-white/50 overflow-hidden relative shadow-inner bg-slate-100">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.378947038166!2d33.04415847672288!3d34.683057872926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14e73315a6bfa9f1%3A0xe54d89fae037f59d!2sGladstonos%2C%20Limassol!5e0!3m2!1sen!2scy!4v1719260000000!5m2!1sen!2scy" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full object-cover"
                  title="Limassol Smile Studio Map Location"
                />
              </div>

              {/* Driving Instructions CTA */}
              <div className="mt-4 pt-1">
                <a
                  href="https://maps.google.com/?q=45+Gladstonos+Street,+Limassol,+Cyprus"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm text-center flex items-center justify-center space-x-1.5 cursor-pointer z-10 transition-colors"
                >
                  <Compass className="w-4 h-4 text-blue-400" />
                  <span>Launch Google Maps GPS</span>
                </a>
              </div>

            </div>
          </div>

          {/* Column 3: General Inquiry Contact Form (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="bg-white/40 backdrop-blur-md rounded-[2rem] p-6 border border-white/40 shadow-sm flex-1 flex flex-col justify-between text-left">
              
              <div>
                <h3 className="font-display text-base font-bold text-slate-950 border-b border-white/45 pb-3 mb-4">
                  General Inquiries
                </h3>

                {formSubmitted ? (
                  <div className="bg-emerald-50/50 backdrop-blur-sm border border-emerald-100 rounded-2xl p-6 text-center space-y-3 animate-fade-in my-auto py-12">
                    <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                    <h4 className="font-display font-bold text-slate-900 text-sm">Inquiry Received</h4>
                    <p className="text-xs text-slate-600 font-light leading-relaxed">
                      Thank you for contacting us! Our administrative coordinators speak English, Greek, and Russian and will email or call you back shortly.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    
                    {/* Name */}
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-white/40 bg-white/40 focus:border-blue-500 focus:ring-1 focus:ring-blue-50 outline-none transition-all placeholder-slate-400 text-slate-800"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-white/40 bg-white/40 focus:border-blue-500 focus:ring-1 focus:ring-blue-50 outline-none transition-all placeholder-slate-400 text-slate-800"
                      />
                    </div>

                    {/* Subject Select */}
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Inquiry Subject</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-white/40 bg-white/40 focus:border-blue-500 focus:ring-1 focus:ring-blue-50 outline-none transition-all text-slate-800"
                      >
                        <option value="General Inquiry">General Inquiry / Question</option>
                        <option value="Pricing / Quote">Pricing & Insurance Cover</option>
                        <option value="Medical History">Medical File / Transfer</option>
                        <option value="Feedback">Patient Feedback</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">How can we help? *</label>
                      <textarea
                        name="message"
                        required
                        rows={3}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Write your question or request details about our treatments..."
                        className="w-full px-3 py-2 text-xs rounded-xl border border-white/40 bg-white/40 focus:border-blue-500 focus:ring-1 focus:ring-blue-50 outline-none transition-all placeholder-slate-400 text-slate-800 resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={formLoading || !formData.name || !formData.email || !formData.message}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center space-x-1.5"
                    >
                      {formLoading ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Delivering...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Inquiry Message</span>
                        </>
                      )}
                    </button>

                  </form>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
