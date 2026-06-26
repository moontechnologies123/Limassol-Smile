import React, { useState, useEffect } from 'react';
import { Smile, Calendar, Lock, Menu, X, Phone, Globe } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onBookClick: () => void;
  onAiClick: () => void;
}

export default function Header({ activeTab, setActiveTab, onBookClick, onAiClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'EN' | 'GR' | 'RU'>('EN');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: { EN: 'Home', GR: 'Αρχική', RU: 'Главная' } },
    { id: 'services', label: { EN: 'Services', GR: 'Υπηρεσίες', RU: 'Услуги' } },
    { id: 'about', label: { EN: 'Dr. Elena', GR: 'Δρ. Έλενα', RU: 'Др. Елена' } },
    { id: 'testimonials', label: { EN: 'Reviews', GR: 'Αξιολογήσεις', RU: 'Отзывы' } },
    { id: 'contact', label: { EN: 'Contact', GR: 'Επικοινωνία', RU: 'Контакты' } },
  ];

  const toggleLanguage = () => {
    const langs: ('EN' | 'GR' | 'RU')[] = ['EN', 'GR', 'RU'];
    const nextIndex = (langs.indexOf(lang) + 1) % langs.length;
    setLang(langs[nextIndex]);
  };

  const handleNavClick = (id: string) => {
    setActiveTab('patient');
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/60 backdrop-blur-xl border-b border-white/40 shadow-sm py-3'
          : 'bg-white/30 backdrop-blur-md border-b border-white/20 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
              <Smile className="w-6 h-6" />
            </div>
            <div>
              <span className="font-display text-xl font-bold tracking-tight text-slate-900 block leading-tight">
                Limassol Smile
              </span>
              <span className="text-xs text-blue-600 font-medium tracking-widest uppercase block -mt-1">
                Studio
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {activeTab === 'patient' && navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
              >
                {item.label[lang]}
              </button>
            ))}

            {activeTab === 'staff' && (
              <button
                onClick={() => setActiveTab('patient')}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors cursor-pointer flex items-center space-x-1"
              >
                <span>← Back to Patient Site</span>
              </button>
            )}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl border border-white/40 bg-white/40 backdrop-blur-sm text-xs font-semibold text-slate-700 hover:bg-white/60 transition-colors"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{lang}</span>
            </button>

            {/* Quick Phone */}
            <a 
              href="tel:+35725345678"
              className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              <span>+357 25 345678</span>
            </a>

            {/* AI Assistant shortcut */}
            <button
              onClick={onAiClick}
              className="px-4 py-2 text-xs font-semibold text-blue-700 bg-blue-50/70 hover:bg-blue-100 rounded-full transition-all cursor-pointer border border-blue-100/50"
            >
              Ask AI Assistant
            </button>

            {/* Patient Booking CTA */}
            <button
              onClick={onBookClick}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all cursor-pointer flex items-center space-x-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>

            {/* Staff Dashboard Toggle */}
            <button
              onClick={() => setActiveTab(activeTab === 'staff' ? 'patient' : 'staff')}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                activeTab === 'staff'
                  ? 'bg-slate-900 border-slate-900 text-white hover:bg-slate-800'
                  : 'bg-white/40 border-white/40 text-slate-600 hover:bg-white/60 hover:text-slate-900'
              }`}
              title={activeTab === 'staff' ? "Switch to Patient Site" : "Doctor Portal Login"}
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-2 py-1 rounded-lg border border-white/40 bg-white/30 text-xs font-semibold text-slate-700"
            >
              <Globe className="w-3 h-3 text-slate-500" />
              <span>{lang}</span>
            </button>

            <button
              onClick={() => setActiveTab(activeTab === 'staff' ? 'patient' : 'staff')}
              className={`p-2 rounded-lg border transition-all ${
                activeTab === 'staff'
                  ? 'bg-slate-900 border-slate-900 text-white'
                  : 'bg-white/30 border-white/40 text-slate-600'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-white/30 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/90 backdrop-blur-xl border-t border-white/40 shadow-xl px-4 py-6 space-y-4 absolute top-full left-0 right-0 animate-fade-in">
          {activeTab === 'patient' && (
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="text-left py-2 font-medium text-slate-800 hover:text-blue-600 transition-colors border-b border-neutral-100"
                >
                  {item.label[lang]}
                </button>
              ))}
            </div>
          )}

          {activeTab === 'staff' && (
            <button
              onClick={() => {
                setActiveTab('patient');
                setMobileMenuOpen(false);
              }}
              className="text-left w-full py-2 font-medium text-blue-600 hover:text-blue-700 transition-colors border-b border-neutral-100"
            >
              ← Return to Patient Website
            </button>
          )}

          <div className="pt-2 flex flex-col space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onAiClick();
              }}
              className="w-full py-2.5 text-center bg-blue-50/80 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg text-sm transition-all"
            >
              Ask AI Assistant
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full py-2.5 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition-all flex items-center justify-center space-x-1.5 shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>

            <div className="text-center text-xs text-slate-500 pt-2 flex items-center justify-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>+357 25 345678</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
