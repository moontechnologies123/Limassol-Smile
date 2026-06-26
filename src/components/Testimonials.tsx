import React, { useState } from 'react';
import { Star, Quote, Languages } from 'lucide-react';
import { Testimonial } from '../types';

export default function Testimonials() {
  const [langFilter, setLangFilter] = useState<'ALL' | 'EN' | 'GR' | 'RU'>('ALL');

  const reviews: Testimonial[] = [
    {
      id: "rev-1",
      name: "Julia Smirnova",
      location: "Limassol Marina (Expat)",
      rating: 5,
      treatment: "Teeth Whitening & Clean",
      language: "RU",
      text: "Отличный опыт в Limassol Smile Studio! Доктор Елена очень внимательна и профессиональна. Я очень довольна лазерным отбеливанием — зубы стали на несколько тонов белее, а процедура была абсолютно безболезненной! Весь персонал говорит по-английски и очень приветлив."
    },
    {
      id: "rev-2",
      name: "Andreas Mavromoustakis",
      location: "Germasogeia, Limassol",
      rating: 5,
      treatment: "Dental Implants",
      language: "GR",
      text: "Η καλύτερη οδοντιατρική κλινική στη Λεμεσό. Ολοκλήρωσα τη θεραπεία οδοντικών εμφυτευμάτων με τη Δρ. Έλενα Γεωργίου. Η δουλειά της είναι υποδειγματική, χωρίς καθόλου πόνο. Εξαιρετικές εγκαταστάσεις και τρισδιάστατη σχεδίαση. Συστήνεται ανεπιφύλακτα!"
    },
    {
      id: "rev-3",
      name: "Mark Harrison",
      location: "Agios Tychonas (Expat)",
      rating: 5,
      treatment: "Invisalign Alignment",
      language: "EN",
      text: "As an expat living in Limassol, finding a top-class dentist who communicates flawlessly was key. Dr. Elena Georgiou and her team at Limassol Smile Studio exceeded all my expectations. The 3D oral scans before my Invisalign treatment were incredible. Zero friction, clear pricing, and amazing results!"
    },
    {
      id: "rev-4",
      name: "Eleni Constantinou",
      location: "Zakaki, Limassol",
      rating: 5,
      treatment: "Porcelain Veneers",
      language: "GR",
      text: "Έκανα όψεις πορσελάνης και το χαμόγελό μου άλλαξε τελείως. Η Δρ. Έλενα είναι πραγματική καλλιτέχνης! Σχεδιάσαμε το χαμόγελο μαζί στον υπολογιστή πριν ξεκινήσουμε. Καθαρή κλινική, σύγχρονος εξοπλισμός και πολύ λογικές τιμές για τέτοια κορυφαία ποιότητα."
    },
    {
      id: "rev-5",
      name: "Dmitry Volkov",
      location: "Pyrgos, Limassol",
      rating: 5,
      treatment: "Emergency Root Canal",
      language: "RU",
      text: "У меня сильно заболел зуб поздно вечером, и мне помогли в тот же день! Сделали чистку каналов под микроскопом абсолютно без боли. Я невероятно благодарен доктору Елене за скорую помощь и сохранение зуба. Профессионализм высочайшего уровня!"
    },
    {
      id: "rev-6",
      name: "Sarah Jenkins",
      location: "Limassol City Centre",
      rating: 5,
      treatment: "Preventive Hygiene Care",
      language: "EN",
      text: "The professional teeth cleaning with airflow polishing is a game changer! It removed all my tea stains in 40 minutes. Dr. Elena was so gentle, and gave me great brushing tips. The clinic is bright, modern, and very easy to access near Gladstonos."
    }
  ];

  const filteredReviews = langFilter === 'ALL'
    ? reviews
    : reviews.filter(r => r.language === langFilter);

  const getLangBadgeColor = (lang: string) => {
    switch(lang) {
      case 'EN': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'GR': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'RU': return 'bg-purple-50 text-purple-700 border-purple-100';
      default: return 'bg-neutral-50 text-neutral-700 border-neutral-100';
    }
  };

  return (
    <section id="testimonials" className="py-20 bg-transparent border-b border-white/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">Patient Success Stories</span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Loved by the Limassol Community
          </h2>
          <p className="text-slate-600 font-light text-base leading-relaxed">
            We are proud to serve a diverse, multilingual community in Limassol, Cyprus. Hear directly from our patients about their clinical experiences and smile transformations.
          </p>
        </div>

        {/* Language Filter */}
        <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
          <div className="flex items-center space-x-1 text-xs text-slate-400 font-bold uppercase tracking-wider mr-2">
            <Languages className="w-4 h-4 text-slate-400" />
            <span>Select Language:</span>
          </div>
          {(['ALL', 'EN', 'GR', 'RU'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLangFilter(lang)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer border ${
                langFilter === lang
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                  : 'bg-white/40 backdrop-blur-sm border-white/40 text-slate-600 hover:bg-white/60'
              }`}
            >
              {lang === 'ALL' ? 'Show All' : lang}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 text-left">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white/40 backdrop-blur-md hover:bg-white/60 border border-white/40 hover:border-blue-500/20 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Rating Stars & Language Indicator */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${getLangBadgeColor(review.language)}`}>
                    {review.language === 'EN' ? 'English' : review.language === 'GR' ? 'Ελληνικά' : 'Русский'}
                  </span>
                </div>

                {/* Quote Text */}
                <div className="relative">
                  <Quote className="w-8 h-8 text-blue-100 absolute -top-4 -left-3 -z-10" />
                  <p className="text-sm text-slate-600 leading-relaxed font-light italic relative z-10 pl-2">
                    {review.text}
                  </p>
                </div>
              </div>

              {/* Patient info */}
              <div className="pt-6 mt-6 border-t border-white/40 flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-slate-900 text-sm">
                    {review.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">
                    {review.location}
                  </span>
                </div>

                <span className="px-2.5 py-1 bg-blue-50 text-blue-800 text-[10px] font-bold rounded-lg border border-blue-100/50">
                  {review.treatment}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
