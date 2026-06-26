import React from 'react';
import { Award, BookOpen, Heart, Sparkles, Smile, ShieldCheck, CalendarRange } from 'lucide-react';

const drElenaPhoto = "/src/assets/images/dr_elena_portrait_1782419902647.jpg";

export default function AboutClinic() {
  const doctorCredentials = [
    {
      icon: <CalendarRange className="w-5 h-5 text-blue-600" />,
      title: "15+ Years Clinical Experience",
      desc: "Over 15 years of standard-setting practice in prestigious cosmetic and surgical dental centers across Athens, London, and Limassol."
    },
    {
      icon: <Award className="w-5 h-5 text-blue-600" />,
      title: "Academic Excellence",
      desc: "DDS Doctor of Dental Surgery with honours from the National and Kapodistrian University of Athens, Greece."
    },
    {
      icon: <BookOpen className="w-5 h-5 text-blue-600" />,
      title: "Master's in Implantology",
      desc: "Master of Science (MSc) in Clinical Oral Implantology from King's College London, United Kingdom."
    },
    {
      icon: <Sparkles className="w-5 h-5 text-blue-600" />,
      title: "Cosmetic Specialty",
      desc: "Certified practitioner in Digital Smile Design (DSD) and specialized non-invasive porcelain restoration."
    }
  ];

  const technologies = [
    "High-definition digital intraoral 3D camera mapping",
    "Low-radiation instant 3D CBCT digital panoramic imaging",
    "Surgical dental microscope for precision root canal therapies",
    "Gentle therapeutic soft-tissue laser sterilization",
    "Computerized painless 'Wand' anesthesia delivery"
  ];

  const specializations = [
    "Cosmetic Dentistry",
    "Dental Implants",
    "Orthodontics & Clear Aligners",
    "General Dentistry",
    "Pediatric Dentistry",
    "Root Canal & Restorations"
  ];

  return (
    <section id="about" className="py-20 bg-transparent border-b border-white/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Column Left: Visual Bio Card Representation */}
          <div className="lg:col-span-5 relative text-left">
            <div className="relative">
              {/* Profile Card Mockup */}
              <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-xl border border-white/50 relative overflow-hidden">
                {/* Visual Headshot Frame */}
                <div className="w-full h-96 rounded-2xl bg-slate-100 relative overflow-hidden flex flex-col justify-end p-6 text-white shadow-md group">
                  <img 
                    src={drElenaPhoto} 
                    alt="Dr. Elena Georgiou, DDS" 
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-transparent pointer-events-none" />
                  <div className="relative z-10 space-y-1">
                    <span className="text-blue-300 text-[10px] font-extrabold tracking-widest uppercase">Chief Dental Surgeon</span>
                    <h3 className="font-display text-2xl font-extrabold">Dr. Elena Georgiou, DDS</h3>
                    <p className="text-xs text-blue-100 font-light">MSc in Implantology (King's College London)</p>
                  </div>
                </div>

                {/* Personal Signature / Clinical Message */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-center space-x-2">
                    <Smile className="w-5 h-5 text-blue-600" />
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">A Message from Dr. Elena</span>
                  </div>
                  <p className="text-xs text-slate-600 font-light italic leading-relaxed">
                    "My philosophy is rooted in compassionate, conservative dental surgery. Many patients arrive with profound dental anxiety; we aim to dismantle that fear. By blending cutting-edge computerized anesthesia and advanced 3D previews, we make sure every dental procedure is comfortable, fully understood, and perfectly tailored."
                  </p>
                  <div className="pt-2 border-t border-white/40 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Medical License Registry</span>
                    <span className="text-xs font-bold text-slate-800 font-mono">Cyprus Dental Council #1842</span>
                  </div>
                </div>
              </div>

              {/* Behind Accent Backdrop */}
              <div className="absolute -inset-2 bg-gradient-to-br from-blue-600/10 to-indigo-100/50 rounded-[32px] -z-10 blur-lg" />
            </div>
          </div>

          {/* Column Right: Details & Credentials */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-3">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">The Surgeon Behind the Smile</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Academic Rigour and Gentle Care combined
              </h2>
              <p className="text-slate-600 font-light text-base leading-relaxed">
                Dr. Elena Georgiou established Limassol Smile Studio with a single, clear vision: bringing world-class, premium clinical dentistry from London to the Limassol beachfront community. Our team speaks <strong>English, Greek, and Russian</strong>, offering highly personalized care to both Cyprus nationals and the international expat sector.
              </p>
            </div>

            {/* Specialization tags */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Clinical Specializations</span>
              <div className="flex flex-wrap gap-1.5">
                {specializations.map((spec, i) => (
                  <span key={i} className="px-3 py-1.5 bg-blue-50/75 backdrop-blur-sm text-blue-800 text-xs font-bold rounded-xl border border-blue-100/50 shadow-sm">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Credentials Stack */}
            <div className="space-y-4">
              {doctorCredentials.map((cred, idx) => (
                <div 
                  key={idx}
                  className="bg-white/40 backdrop-blur-md rounded-2xl p-4 border border-white/40 shadow-sm flex items-start space-x-4 hover:border-blue-500/20 transition-all"
                >
                  <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 shrink-0 mt-0.5">
                    {cred.icon}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-semibold text-slate-900">{cred.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">{cred.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech details panel */}
            <div className="bg-white/40 backdrop-blur-md rounded-[2rem] p-6 border border-white/40 shadow-sm space-y-4">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <h4 className="text-sm font-bold text-slate-950 uppercase tracking-wide">
                  Advanced Clinic Technology
                </h4>
              </div>
              
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                We believe in continuous medical investment. Limassol Smile Studio operates under strict European Union sterilization guidelines (Class-B vacuum autoclaving) and incorporates standard-setting diagnostic machinery:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {technologies.map((tech, i) => (
                  <div key={i} className="flex items-start text-xs text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-2 mr-2" />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
