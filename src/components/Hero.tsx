import React from 'react';
import { Sparkles, ShieldCheck, Award, ChevronRight, Clock, Star } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  onAiClick: () => void;
}

export default function Hero({ onBookClick, onAiClick }: HeroProps) {
  return (
    <section 
      id="home" 
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-transparent overflow-hidden"
    >
      {/* Visual background accents */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-24 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8 text-left bg-white/20 backdrop-blur-md border border-white/40 rounded-[2rem] p-8 sm:p-12 shadow-sm">
            {/* Status Indicator & Trust Badge */}
            <div className="inline-flex items-center space-x-2 bg-blue-50/50 border border-blue-200/50 px-4 py-1.5 rounded-full shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-xs font-semibold text-blue-800 tracking-wide uppercase">
                Accepting New Patients • Limassol, Cyprus
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Crafting Healthy, <br />
              <span className="text-blue-600">
                Radiant Smiles
              </span> <br />
              in the Heart of Limassol
            </h1>

            {/* Sub-headline / Copy */}
            <p className="text-lg text-slate-600 font-light max-w-xl leading-relaxed">
              Experience the highest tier of cosmetic, restorative, and family dentistry led by{' '}
              <strong className="font-medium text-slate-900">Dr. Elena Georgiou, DDS</strong>. 
              We combine advanced digital 3D scans and gentle, pain-free techniques to redefine your dental journey.
            </p>

            {/* Core Brand Value Props (Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
              <div className="flex items-center space-x-3 bg-white/40 backdrop-blur-sm p-3 rounded-2xl border border-white/50">
                <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">100% Painless Care</h4>
                  <p className="text-[11px] text-slate-500">Computerized gentle anesthesia</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-white/40 backdrop-blur-sm p-3 rounded-2xl border border-white/50">
                <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">3D Smile Design</h4>
                  <p className="text-[11px] text-slate-500">Preview beautiful results instantly</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-white/40 backdrop-blur-sm p-3 rounded-2xl border border-white/50">
                <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">World-Class Team</h4>
                  <p className="text-[11px] text-slate-500">UK-trained clinical practitioners</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-white/40 backdrop-blur-sm p-3 rounded-2xl border border-white/50">
                <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Emergency Care</h4>
                  <p className="text-[11px] text-slate-500">Same-day urgent pain relief</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <button
                onClick={onBookClick}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Book Appointment Online</span>
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                onClick={onAiClick}
                className="px-6 py-4 bg-white/40 backdrop-blur-sm border border-white/50 hover:bg-white/60 text-blue-900 font-bold rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Consult Our AI Assistant</span>
                <Sparkles className="w-4 h-4 text-blue-600" />
              </button>
            </div>

            {/* Ratings Overlay */}
            <div className="flex items-center space-x-6 pt-4 border-t border-white/40">
              <div className="flex items-center space-x-1.5">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-900">4.9 / 5.0</span>
              </div>
              <div className="text-xs text-slate-500 font-light">
                Based on <strong className="font-semibold text-slate-700">320+ Google Reviews</strong> from Limassol locals & expats
              </div>
            </div>
          </div>

          {/* Hero Right Visuals */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Decorative Card */}
              <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-xl border border-white/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16" />
                
                <div className="space-y-6">
                  {/* Clinic Detail Card Accent */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Clinic Spotlight</span>
                    <span className="px-2.5 py-0.5 bg-blue-50/70 text-blue-700 text-[10px] font-extrabold rounded-full border border-blue-100/50">MODERN DENTAL INFRASTRUCTURE</span>
                  </div>

                  {/* Dental Clinic Interior or Mock Art Representation */}
                  <div className="w-full h-52 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden flex flex-col justify-end p-6 text-white shadow-lg">
                    <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply" />
                    <div className="relative z-10 space-y-1.5">
                      <div className="text-blue-200 text-[10px] font-extrabold tracking-widest uppercase">LIMASSOL CLINIC</div>
                      <h3 className="font-display text-lg font-bold">Cutting-Edge Smile Studio</h3>
                      <p className="text-xs text-blue-50/90 font-light">Equipped with painless computerized wand anesthesia and 3D digital oral imaging scanners.</p>
                    </div>
                  </div>

                  {/* Operational Information Grid */}
                  <div className="grid grid-cols-2 gap-4 divide-x divide-white/50 text-left">
                    <div className="space-y-1 pl-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Clinic Hours</span>
                      <span className="text-sm font-semibold text-slate-800 block">Mon - Fri: 8:30 - 18:00</span>
                      <span className="text-xs text-slate-500 block">Saturday: 9:00 - 14:00</span>
                    </div>
                    <div className="space-y-1 pl-4">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Location</span>
                      <span className="text-sm font-semibold text-blue-700 block">45 Gladstonos St.</span>
                      <span className="text-xs text-slate-500 block">Limassol, 3041 Cyprus</span>
                    </div>
                  </div>

                  {/* Floating Patient Review Quote inside Right Side */}
                  <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/60 flex items-start space-x-3 text-left">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-md shadow-blue-500/10">
                      JS
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 italic">"Amazing veneer treatment! Dr. Elena was so precise, I felt zero discomfort. Recommended to all Limassol expats!"</p>
                      <span className="text-[10px] font-bold text-slate-800 block mt-1">— Julie S., Dental Patient</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Backside Accent shadow border */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-blue-500/20 to-indigo-500/10 rounded-[36px] -z-10 blur-xl" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
