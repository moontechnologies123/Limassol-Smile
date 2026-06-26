import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import BookingForm from './components/BookingForm';
import AiAssistant from './components/AiAssistant';
import AboutClinic from './components/AboutClinic';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import StaffDashboard from './components/StaffDashboard';
import { Smile, Calendar, Sparkles, Phone, Mail, MapPin } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'patient' | 'staff'>('patient');
  const [selectedTreatment, setSelectedTreatment] = useState<string>('General Checkup & Cleaning');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBookClick = (treatmentName?: string) => {
    if (treatmentName) {
      setSelectedTreatment(treatmentName);
    }
    scrollToSection('booking-grid-section');
  };

  const handleAiClick = () => {
    scrollToSection('booking-grid-section');
    // We can also target the chat box focus if needed
  };

  return (
    <div className="min-h-screen bg-[#eef6ff] flex flex-col font-sans selection:bg-blue-500/10 selection:text-blue-900 relative overflow-hidden">
      
      {/* Mesh Gradient Background layers from the Frosted Glass spec */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[50%] rounded-full bg-blue-300 opacity-40 blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-200 opacity-30 blur-[120px]"></div>
        <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] rounded-full bg-indigo-200 opacity-20 blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-200 opacity-30 blur-[120px]"></div>
      </div>

      {/* Brand Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onBookClick={() => handleBookClick()}
        onAiClick={handleAiClick}
      />

      {activeTab === 'patient' ? (
        <main className="flex-1 relative z-10">
          {/* Hero Banner Section */}
          <Hero onBookClick={() => handleBookClick()} onAiClick={handleAiClick} />

          {/* Clinical Services Grid with transparent pricing */}
          <Services onBookClick={handleBookClick} />

          {/* Interactive Scheduling & Artificial Assistant Split Panel */}
          <section id="booking-grid-section" className="py-20 bg-white/20 backdrop-blur-md border-y border-white/40 scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">Interactive Hub</span>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Schedule or Consult with our Dental AI
                </h2>
                <p className="text-slate-600 font-light text-sm leading-relaxed">
                  Use our live booking request engine to secure a session or consult our smart AI assistant below to get customized treatment overviews.
                </p>
              </div>

              {/* Grid split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Booking Form (Left Col) */}
                <div className="lg:col-span-6 w-full">
                  <BookingForm preFilledTreatment={selectedTreatment} />
                </div>

                {/* AI Assistant (Right Col) */}
                <div className="lg:col-span-6 w-full">
                  <AiAssistant onBookClick={handleBookClick} />
                </div>
              </div>

            </div>
          </section>

          {/* Biography of Dr. Elena Georgiou, DDS */}
          <AboutClinic />

          {/* Patient Testimonials Section (multilingual) */}
          <Testimonials />

          {/* Contact, hours, and direction details */}
          <ContactSection />
        </main>
      ) : (
        <main className="flex-1 bg-[#eef6ff]/80 backdrop-blur-xl pt-20 relative z-10">
          {/* Full Clinician Portal */}
          <StaffDashboard />
        </main>
      )}

      {/* Footer Branding */}
      <footer className="bg-slate-950 text-slate-400 py-16 text-left relative overflow-hidden z-10">
        {/* Visual outline decoration */}
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            
            {/* Branding Column */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md">
                  <Smile className="w-5.5 h-5.5" />
                </div>
                <div>
                  <span className="font-display text-lg font-bold tracking-tight text-white block leading-tight">
                    Limassol Smile Studio
                  </span>
                  <span className="text-[10px] text-blue-400 font-semibold tracking-widest uppercase block -mt-1">
                    Dr. Elena Georgiou, DDS
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-400 font-light leading-relaxed max-w-sm">
                Providing standard-setting, clinical-tier cosmetic, implant, and general preventive dentistry to patients from our state-of-the-art dental clinic in Limassol, Cyprus.
              </p>
              <div className="text-[10px] text-slate-500">
                Medical Registry License: #1842 Cyprus Dental Council • EU Compliant
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 space-y-3 text-xs">
              <h4 className="text-white font-bold uppercase tracking-wider text-xs">Quick Navigation</h4>
              <div className="flex flex-col space-y-2">
                <button onClick={() => { setActiveTab('patient'); scrollToSection('home'); }} className="text-left text-slate-400 hover:text-white transition-colors">Aesthetic Home</button>
                <button onClick={() => { setActiveTab('patient'); scrollToSection('services'); }} className="text-left text-slate-400 hover:text-white transition-colors">Clinical Services & Pricing</button>
                <button onClick={() => { setActiveTab('patient'); scrollToSection('about'); }} className="text-left text-slate-400 hover:text-white transition-colors">Dr. Elena Georgiou DDS</button>
                <button onClick={() => { setActiveTab('patient'); scrollToSection('booking-grid-section'); }} className="text-left text-slate-400 hover:text-white transition-colors">Book Online / Ask AI</button>
                <button onClick={() => setActiveTab('staff')} className="text-left text-blue-400 hover:text-blue-300 font-semibold transition-colors">Staff Portal Login</button>
              </div>
            </div>

            {/* Quick Contacts */}
            <div className="md:col-span-4 space-y-4 text-xs">
              <h4 className="text-white font-bold uppercase tracking-wider text-xs">Clinic Coordinates</h4>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <span>45 Gladstonos Street, Limassol 3041, Cyprus</span>
                </div>

                <div className="flex items-center space-x-2.5">
                  <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>+357 25 345678</span>
                </div>

                <div className="flex items-center space-x-2.5">
                  <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>info@limassolsmile.com</span>
                </div>
              </div>
            </div>

          </div>

          <div className="border-t border-slate-900 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} Limassol Smile Studio. All rights reserved. Registered Dental Surgery, Cyprus.</p>
            <div className="flex space-x-6">
              <span className="hover:text-slate-400 transition-colors">Privacy Policy</span>
              <span className="hover:text-slate-400 transition-colors">Patient Code of Practice</span>
              <span className="hover:text-slate-400 transition-colors">GHS / GESY Guidelines</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
