import React, { useState } from 'react';
import { Sparkles, Check, Info, Smile, Heart, Shield, Activity } from 'lucide-react';
import { Service } from '../types';

interface ServicesProps {
  onBookClick: (treatmentName?: string) => void;
}

export default function Services({ onBookClick }: ServicesProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'cosmetic' | 'general' | 'specialist'>('all');
  const [activeDetailId, setActiveDetailId] = useState<string | null>(null);

  const servicesData: Service[] = [
    {
      id: "srv-clean",
      name: "General Checkup & Professional Cleaning",
      description: "Includes digital x-rays, comprehensive dental mapping, periodontal health screening, and detailed scaling with state-of-the-art airflow powder polishing.",
      category: "general",
      priceRange: "€60 - €80",
      duration: "45 mins",
      benefits: ["Removes stubborn plaque & stains", "Prevents gum disease (gingivitis)", "Freshens breath instantly", "Detailed diagnosis with intraoral camera"]
    },
    {
      id: "srv-white",
      name: "Cosmetic Teeth Whitening",
      description: "Advanced dual-activation light therapy combined with custom-molded take-home booster trays to brighten your teeth up to 8 shades safely.",
      category: "cosmetic",
      priceRange: "€250 - €400",
      duration: "60 mins",
      benefits: ["Fast, single-visit laser procedure", "Includes premium home touch-up kit", "Zero-sensitivity computerized light protection", "Removes deep coffee, wine & tobacco stains"]
    },
    {
      id: "srv-veneer",
      name: "Premium Porcelain Veneers",
      description: "Ultra-thin, bespoke German porcelain veneers custom crafted in our partner Limassol digital laboratory to fix gaps, chips, alignment, or severe discoloration.",
      category: "cosmetic",
      priceRange: "€450 - €600 per tooth",
      duration: "2-3 visits",
      benefits: ["Highly stain-resistant & long-lasting", "Custom shaded to match your face profile", "Digital mock-up preview before placement", "Minimal healthy tooth preparation required"]
    },
    {
      id: "srv-implant",
      name: "Dental Implants & Restoration",
      description: "Titanium Swiss implants surgically placed to restore missing teeth. Seamlessly integrated with customized zirconia crowns matching original teeth aesthetics.",
      category: "specialist",
      priceRange: "€1,200 - €1,800",
      duration: "Surgical / multi-step",
      benefits: ["Restores full biting force & speaking", "Prevents jaw bone deterioration", "Permanent solution with lifetime implant warranty", "No shifting or discomfort (unlike dentures)"]
    },
    {
      id: "srv-invis",
      name: "Invisalign & Clear Aligners",
      description: "Discrete, clear alignment treatment for adults and teenagers. Plan your perfect journey with our advanced 3D iTero scanners showing week-by-week progress.",
      category: "cosmetic",
      priceRange: "€2,500 - €4,500",
      duration: "6-18 months",
      benefits: ["Completely invisible & removable", "Eat your favorite Cyprus food without restrictions", "Fewer clinic visits than metal braces", "Includes custom clinical retainers"]
    },
    {
      id: "srv-root",
      name: "Emergency Pain Relief & Root Canal",
      description: "Same-day therapeutic root canal procedure designed to eliminate acute dental pain, clear deep infections, and preserve your original tooth.",
      category: "specialist",
      priceRange: "€150 - €300",
      duration: "60-90 mins",
      benefits: ["Immediate pain alleviation", "Performed under high-precision dental microscope", "Preserves natural tooth structural support", "Infection clearance to safeguard general health"]
    },
    {
      id: "srv-filling",
      name: "Composite Dental Fillings",
      description: "High-strength, aesthetic dental composite fillings matching your exact tooth color to treat cavities and repair small structural chips seamlessly.",
      category: "general",
      priceRange: "€70 - €110",
      duration: "30-45 mins",
      benefits: ["Invisible, natural tooth-colored finish", "Mercury-free composite bonding technology", "Protects tooth from future decay propagation", "Fast, single-appointment restoration"]
    },
    {
      id: "srv-crown",
      name: "Porcelain & Zirconia Crowns",
      description: "Full-coverage porcelain or ultra-resilient zirconia dental crowns used to reinforce weak, decayed, or fractured teeth while restoring natural size and luster.",
      category: "specialist",
      priceRange: "€350 - €500",
      duration: "1-2 visits",
      benefits: ["Reinforces highly compromised tooth structures", "Stain-resistant premium European zirconia", "Restores full masticatory function safely", "Perfect anatomical match using digital scans"]
    },
    {
      id: "srv-bridge",
      name: "Cosmetic Dental Bridges",
      description: "Custom-engineered cosmetic bridges to fill empty gaps left by missing teeth, anchored securely to adjacent healthy teeth or clinical implants.",
      category: "specialist",
      priceRange: "€800 - €1,400",
      duration: "2 visits",
      benefits: ["Restores natural dental alignment & smile symmetry", "Prevents shifting of adjacent healthy teeth", "Enhances clear speech articulation & chewing comfort", "Highly durable premium ceramic build"]
    },
    {
      id: "srv-pediatric",
      name: "Pediatric Dentistry (Kids Care)",
      description: "Gentle, non-intimidating dental care specifically designed for toddlers, children, and teens, focusing on preventative sealants, habit counseling, and cavity prevention.",
      category: "general",
      priceRange: "€40 - €60",
      duration: "30 mins",
      benefits: ["Fun, stress-free clinic environment for kids", "Fluoride varnishes & protective dental sealants", "Establishes lifelong healthy dental hygiene habits", "Early detection of potential orthodontic needs"]
    }
  ];

  const filteredServices = selectedCategory === 'all'
    ? servicesData
    : servicesData.filter(s => s.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'cosmetic': return <Sparkles className="w-5 h-5 text-blue-600" />;
      case 'general': return <Heart className="w-5 h-5 text-blue-600" />;
      case 'specialist': return <Shield className="w-5 h-5 text-blue-600" />;
      default: return <Activity className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-transparent border-y border-white/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">Our Clinical Offerings</span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Advanced Treatments with Transparent Pricing
          </h2>
          <p className="text-slate-600 font-light text-base leading-relaxed">
            At Limassol Smile Studio, we believe in full clarity. Explore our dental services, standard durations, and direct pricing guides. No hidden fees or unexpected costs.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center items-center gap-2 mt-10 md:mt-12">
          {(['all', 'general', 'cosmetic', 'specialist'] as const).map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setActiveDetailId(null);
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all active:scale-95 cursor-pointer capitalize border ${
                selectedCategory === category
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                  : 'bg-white/40 backdrop-blur-sm border-white/40 text-slate-600 hover:bg-white/60'
              }`}
            >
              {category === 'all' ? 'All Services' : category + ' Care'}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white/40 backdrop-blur-md hover:bg-white/60 rounded-[2rem] p-6 border border-white/40 hover:border-blue-500/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left"
            >
              <div className="space-y-4">
                {/* Card Icon & Category Badge */}
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                    {getCategoryIcon(service.category)}
                  </div>
                  <span className="text-[10px] font-extrabold tracking-widest uppercase text-slate-400">
                    {service.category}
                  </span>
                </div>

                {/* Service Name */}
                <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {service.name}
                </h3>

                {/* Price and Duration Row */}
                <div className="flex items-center space-x-4 text-xs">
                  <div className="bg-blue-50/60 px-2.5 py-1 rounded-lg text-blue-800 font-semibold border border-blue-100/50">
                    Cost: {service.priceRange}
                  </div>
                  <div className="text-slate-500 font-medium">
                    Duration: {service.duration}
                  </div>
                </div>

                {/* Brief Description */}
                <p className="text-sm text-slate-600 font-light leading-relaxed">
                  {service.description}
                </p>

                {/* Benefits Bullets */}
                <ul className="space-y-1.5 pt-2">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start text-xs text-slate-600">
                      <Check className="w-4 h-4 text-blue-500 shrink-0 mr-2 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Booking Trigger inside Card */}
              <div className="pt-6 mt-6 border-t border-white/40 flex items-center justify-between">
                <button
                  onClick={() => setActiveDetailId(activeDetailId === service.id ? null : service.id)}
                  className="flex items-center space-x-1 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>{activeDetailId === service.id ? "Hide Details" : "Clinical Info"}</span>
                </button>

                <button
                  onClick={() => onBookClick(service.name)}
                  className="px-4 py-2 bg-slate-900 group-hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  Request Consultation
                </button>
              </div>

              {/* Dropdown clinical detail sheet */}
              {activeDetailId === service.id && (
                <div className="mt-4 p-4 bg-blue-50/50 backdrop-blur-sm rounded-2xl border border-blue-100 text-xs text-slate-700 space-y-2 animate-fade-in text-left">
                  <span className="font-bold text-blue-800 uppercase block tracking-wider text-[10px]">Clinical Protocol</span>
                  <p className="leading-relaxed">
                    Our Limassol dental surgery applies strict European hygiene sterilisation codes. First consultation includes digital intraoral photographs and a customized preventive therapy draft.
                  </p>
                  <p className="font-semibold text-slate-800">
                    *We offer flexible payment schemes and accept direct local dental insurance proxies (like GHS/GESY consultations where applicable).
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Free Consultation Banner */}
        <div className="mt-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between text-left gap-6 shadow-lg border border-white/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-24 -mt-24 pointer-events-none" />
          <div className="space-y-2 max-w-xl">
            <span className="text-blue-200 text-xs font-bold uppercase tracking-widest block">GHS & Private Alignment</span>
            <h3 className="font-display text-xl sm:text-2xl font-bold">Free Cosmetic alignment and Implant planning consultations</h3>
            <p className="text-blue-50/90 text-sm font-light leading-relaxed">
              Wondering if implants or Invisalign clear aligners are right for you? Consult Dr. Elena Georgiou in person for a free evaluation, featuring 3D intraoral imagery.
            </p>
          </div>
          <button
            onClick={() => onBookClick("Free Consultation")}
            className="px-6 py-3.5 bg-white hover:bg-blue-50 text-blue-950 font-bold text-xs rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 shrink-0 cursor-pointer"
          >
            Claim Free Consultation
          </button>
        </div>

      </div>
    </section>
  );
}
