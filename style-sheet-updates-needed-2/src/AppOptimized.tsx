import React, { Suspense, lazy, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './i18n';
import { 
  Leaf, 
  MapPin, 
  Users, 
  ShoppingBag, 
  CheckCircle2, 
  Phone, 
  Globe,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  TreePine,
  Languages,
  Bug as BeeIcon
} from 'lucide-react';

// Code splitting for better performance
const OptimizedHero = lazy(() => import('./components/OptimizedHero').then(module => ({ 
  default: module.OptimizedHero 
})));

// Error Boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Website error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 bg-black flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-amber-500">Something went wrong</h1>
            <p className="text-white/60">Please refresh the page or try again later.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Language Selector Component
const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = useMemo(() => [
    { code: 'en', label: 'English' },
    { code: 'pt', label: 'Português' },
    { code: 'it', label: 'Italiano' }
  ], []);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white/70 hover:text-[#D4A017] transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50 rounded-lg px-2 py-1"
        aria-label="Select language"
      >
        <Languages size={18} />
        <span className="text-[10px] font-bold uppercase tracking-widest">{i18n.language.toUpperCase().split('-')[0]}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 mt-4 py-2 w-32 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    i18n.changeLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-colors active:scale-95 ${i18n.language.startsWith(lang.code) ? 'text-[#D4A017]' : 'text-white/60'}`}
                >
                  {lang.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// Section Tag Component
const SectionTag = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const reducedMotion = useReducedMotion();
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: reducedMotion ? 0 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-[10px] uppercase tracking-[0.2em] font-bold mb-6 ${className}`}
    >
      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
      {children}
    </motion.div>
  );
};

// Optimized Button Component
const Button = ({ 
  children, 
  variant = 'primary', 
  className = "", 
  ...props 
}: { 
  children: React.ReactNode; 
  variant?: 'primary' | 'outline' | 'dark';
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const base = "px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-500/50";
  const variants = {
    primary: "bg-amber-500 text-black hover:bg-amber-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/20",
    outline: "border-2 border-white/20 text-white hover:border-amber-500 hover:text-amber-500 hover:-translate-y-1",
    dark: "bg-black text-amber-500 hover:bg-zinc-900 border border-amber-500/30"
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// Optimized Navbar
const Navbar = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    
    handleScroll();
    checkMobile();
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = useMemo(() => [
    { name: t('nav.challenge'), href: '#challenge' },
    { name: t('nav.story'), href: '#story' },
    { name: t('nav.product'), href: '#product' },
    { name: t('nav.impact'), href: '#impact' },
    { name: t('nav.experience'), href: '#experience' }
  ], [t]);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl py-3 border-b border-white/10' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 group" onClick={(e) => handleNavClick(e, '#')}>
          <motion.div 
            animate={{ rotate: [0, 5, -5, 0] }} 
            transition={{ repeat: Infinity, duration: 3 }}
            className="pointer-events-none"
          >
            <BeeIcon className="w-6 h-6 md:w-8 md:h-8 text-amber-500" />
          </motion.div>
          <span className="text-white font-serif font-bold text-base md:text-lg tracking-tight group-hover:text-amber-500 transition-colors">
            Maputo <span className="text-amber-500">Wild Honey</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-white/70 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors relative py-2 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <LanguageSelector />
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <LanguageSelector />
          </div>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && isMobile && (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-black/95 backdrop-blur-xl z-50 p-8 lg:hidden"
            >
              <div className="flex justify-end mb-12">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a 
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-white text-lg font-bold uppercase tracking-widest py-3 border-b border-white/10 hover:text-amber-500 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

// Counter Component with IntersectionObserver
const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [ref, setRef] = useState<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const duration = 2000;
            const steps = 60;
            const stepValue = value / steps;
            let currentStep = 0;

            const timer = setInterval(() => {
              currentStep++;
              setCount(stepValue * currentStep);
              
              if (currentStep >= steps) {
                setCount(value);
                clearInterval(timer);
              }
            }, duration / steps);

            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, value]);

  return (
    <span ref={setRef} className="inline-block min-w-[60px]">
      {count.toFixed(value % 1 === 0 ? 0 : 1)}
      {suffix}
    </span>
  );
};

// Lazy-loaded sections for better performance
const Challenge = lazy(() => Promise.resolve({
  default: () => {
    const { t } = useTranslation();
    const reducedMotion = useReducedMotion();
    
    return (
      <section id="challenge" className="py-20 md:py-32 bg-zinc-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: reducedMotion ? 0 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center lg:text-left"
            >
              <SectionTag>{t('challenge.tag')}</SectionTag>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                {t('challenge.title')}
              </h2>
              <p className="text-white/60 text-lg mb-8">
                {t('challenge.description')}
              </p>
              <div className="space-y-4">
                {[
                  { icon: "❌", title: t('challenge.problem1.title'), text: t('challenge.problem1.desc') },
                  { icon: "📉", title: t('challenge.problem2.title'), text: t('challenge.problem2.desc') },
                  { icon: "🚫", title: t('challenge.problem3.title'), text: t('challenge.problem3.desc') },
                  { icon: "🔇", title: t('challenge.problem4.title'), text: t('challenge.problem4.desc') }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-default"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-xl">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">{item.title}</h4>
                      <p className="text-white/50 text-sm">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-3xl" />
                <svg viewBox="0 0 320 400" className="w-full h-auto relative">
                  <use href="#jar-icon" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }
}));

const Impact = lazy(() => Promise.resolve({
  default: () => {
    const { t } = useTranslation();
    const reducedMotion = useReducedMotion();
    
    const stats = [
      { num: 270, label: t('impact.hives'), icon: <BeeIcon className="w-8 h-8" /> },
      { num: 64, label: t('impact.families'), icon: <Users className="w-8 h-8" /> },
      { num: 5400, label: t('impact.harvest'), suffix: " kg", icon: <ShoppingBag className="w-8 h-8" /> },
      { num: 3, label: t('impact.villages'), suffix: " Villages", icon: <MapPin className="w-8 h-8" /> }
    ];

    return (
      <section id="impact" className="py-20 md:py-32 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-16">
            <SectionTag className="mx-auto">{t('impact.tag')}</SectionTag>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mt-4">
              {t('impact.title')}
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
            {stats.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: reducedMotion ? 0 : i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl text-center group hover:bg-amber-500/10 hover:border-amber-500/30 transition-all cursor-default"
              >
                <div className="text-amber-500 mb-4 flex justify-center">
                  {s.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  <Counter value={s.num} suffix={s.suffix || ''} />
                </div>
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {[
              { title: t('impact.item1.title'), text: t('impact.item1.desc'), icon: <TreePine className="w-6 h-6 text-emerald-500" /> },
              { title: t('impact.item2.title'), text: t('impact.item2.desc'), icon: <Sparkles className="w-6 h-6 text-amber-500" /> },
              { title: t('impact.item3.title'), text: t('impact.item3.desc'), icon: <Users className="w-6 h-6 text-teal-500" /> },
              { title: t('impact.item4.title'), text: t('impact.item4.desc'), icon: <Globe className="w-6 h-6 text-blue-500" /> }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: reducedMotion ? 0 : i * 0.1 }}
                className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-default"
              >
                <div className="flex-shrink-0 p-3 rounded-xl bg-white/5">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}));

const Experience = lazy(() => Promise.resolve({
  default: () => {
    const { t } = useTranslation();
    const reducedMotion = useReducedMotion();
    
    return (
      <section id="experience" className="py-20 md:py-32 bg-zinc-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <SectionTag className="mx-auto">{t('experience.tag')}</SectionTag>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mt-4">
              {t('experience.title')}
            </h2>
            <p className="text-white/60 text-lg mt-6 max-w-2xl mx-auto">
              {t('experience.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {[
              { num: "01", title: t('experience.step1.title'), desc: t('experience.step1.desc'), icon: "🏘️" },
              { num: "02", title: t('experience.step2.title'), desc: t('experience.step2.desc'), icon: "🌸" },
              { num: "03", title: t('experience.step3.title'), desc: t('experience.step3.desc'), icon: "🐝" },
              { num: "04", title: t('experience.step4.title'), desc: t('experience.step4.desc'), icon: "🍯" },
              { num: "05", title: t('experience.step5.title'), desc: t('experience.step5.desc'), icon: "🎁" }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: reducedMotion ? 0 : i * 0.1 }}
                className="relative bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all group"
              >
                <div className="text-amber-500 text-3xl mb-4">{step.icon}</div>
                <div className="text-white/20 text-2xl font-bold mb-2">{step.num}</div>
                <h4 className="text-white font-bold text-xl mb-3">{step.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                <div className="absolute left-0 top-0 h-full w-1 bg-amber-500 origin-top scale-y-0 group-hover:scale-y-100 transition-transform" />
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-amber-500 to-amber-700 rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden"
          >
            <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              {t('experience.cta.title')}
            </h3>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              {t('experience.cta.subtitle')}
            </p>
            <Button variant="dark" className="bg-white text-amber-600 hover:bg-white/90">
              {t('experience.cta.button')} <ChevronRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }
}));

const Contact = lazy(() => Promise.resolve({
  default: () => {
    const { t } = useTranslation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        alert('Thank you for your message! We\'ll be in touch soon.');
      }, 1000);
    };

    return (
      <section id="contact" className="py-20 md:py-32 bg-zinc-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionTag>{t('contact.tag')}</SectionTag>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
              {t('contact.title')}
            </h2>
            <p className="text-white/60 text-lg mb-8">
              {t('contact.subtitle')}
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-amber-500 flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold">{t('contact.info1.label')}</div>
                  <div className="text-white">{t('contact.info1.value')}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-amber-500 flex-shrink-0">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold">{t('contact.info2.label')}</div>
                  <div className="text-white">{t('contact.info2.value')}</div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-12 rounded-[2.5rem]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input 
                type="text" 
                placeholder={t('contact.form.name')} 
                required
                className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-amber-500/50 transition-colors"
              />
              <input 
                type="email" 
                placeholder={t('contact.form.email')} 
                required
                className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>
            <select 
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white/70 text-sm outline-none focus:border-amber-500/50 transition-colors mb-4"
            >
              <option value="">{t('contact.form.role')}</option>
              <option value="lodge">{t('contact.form.options.lodge')}</option>
              <option value="conservation">{t('contact.form.options.conservation')}</option>
              <option value="distributor">{t('contact.form.options.distributor')}</option>
              <option value="other">{t('contact.form.options.other')}</option>
            </select>
            <textarea 
              placeholder={t('contact.form.message')} 
              rows={4}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-amber-500/50 transition-colors mb-6"
            />
            <Button 
              variant="primary" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? t('contact.form.sending') : t('contact.form.send')} <ChevronRight className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </section>
    );
  }
}));

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <a href="#" className="flex items-center gap-2">
            <BeeIcon className="w-6 h-6 text-amber-500" />
            <span className="text-white font-serif font-bold text-sm tracking-widest uppercase">
              Maputo Wild Honey
            </span>
          </a>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-amber-500 transition-colors text-xl" aria-label="Instagram">📸</a>
            <a href="#" className="text-white/40 hover:text-amber-500 transition-colors text-xl" aria-label="LinkedIn">💼</a>
            <a href="#" className="text-white/40 hover:text-amber-500 transition-colors text-xl" aria-label="Twitter">🐦</a>
          </div>
        </div>
        <div className="text-center md:text-left text-[10px] text-white/20 uppercase tracking-widest font-bold">
          © {currentYear} {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
};

// Main App Component
export default function App() {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Simulate loading and check device
    const timer = setTimeout(() => setLoading(false), 1500);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Memoize static values
  const loadingText = useMemo(() => t('loading.text'), [t]);
  const loadingSubtext = useMemo(() => t('loading.subtext'), [t]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center gap-6 z-50">
        <motion.div 
          animate={{ 
            rotate: prefersReducedMotion ? 0 : [0, 10, -10, 0],
            scale: prefersReducedMotion ? 1 : [1, 1.1, 1]
          }} 
          transition={{ repeat: Infinity, duration: prefersReducedMotion ? 0.1 : 1 }}
          className="text-6xl"
        >
          🍯
        </motion.div>
        <div className="text-amber-500 text-[10px] font-bold uppercase tracking-widest animate-pulse text-center">
          <div>{loadingText}</div>
          <div className="text-white/40 mt-2">{loadingSubtext}</div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="bg-[#050505] selection:bg-amber-500 selection:text-black overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.main 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 1 }}
          >
            <Navbar />
            <Suspense fallback={<div className="min-h-screen bg-black" />}> 
              <OptimizedHero />
            </Suspense>
            
            <div className="bg-amber-500 py-4 overflow-hidden relative border-y border-white/10">
              <div className="flex whitespace-nowrap gap-12 animate-marquee">
                {[1,2,3,4].map(i => (
                  <div key={i} className="flex items-center gap-4 text-black text-[10px] font-black uppercase tracking-widest">
                    <BeeIcon className="w-4 h-4" /> 270 Active Hives • 64 Families • Maputo National Park
                  </div>
                ))}
              </div>
            </div>

            <Suspense fallback={<div className="py-32 bg-zinc-900"><div className="animate-pulse bg-white/5 rounded-3xl w-full h-96 mx-auto max-w-7xl" /></div>}>
              <Challenge />
            </Suspense>
            
            <Suspense fallback={<div className="py-32 bg-black"><div className="animate-pulse bg-white/5 rounded-3xl w-full h-96 mx-auto max-w-7xl" /></div>}>
              <Impact />
            </Suspense>
            
            <Suspense fallback={<div className="py-32 bg-zinc-900"><div className="animate-pulse bg-white/5 rounded-3xl w-full h-96 mx-auto max-w-7xl" /></div>}>
              <Experience />
            </Suspense>
            
            <Suspense fallback={<div className="py-32 bg-zinc-950"><div className="animate-pulse bg-white/5 rounded-3xl w-full h-96 mx-auto max-w-7xl" /></div>}>
              <Contact />
            </Suspense>
            
            <Footer />
          </motion.main>
        </AnimatePresence>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
            display: flex;
            width: 200%;
          }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
          
          /* Reduced motion for accessibility */
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
          
          /* Mobile performance optimizations */
          @media (max-width: 768px) {
            .animate-marquee {
              animation-duration: 20s;
            }
          }
        `}} />
      </div>
    </ErrorBoundary>
  );
}