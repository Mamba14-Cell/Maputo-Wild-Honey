import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './i18n';
import { 
  Leaf, 
  MapPin, 
  Users, 
  ShoppingBag, 
  CheckCircle2, 
  Phone, 
  Droplets,
  Globe,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  TreePine,
  Waves,
  Bug as BeeIcon,
  Languages
} from 'lucide-react';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'pt', label: 'Português' },
    { code: 'it', label: 'Italiano' }
  ];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white/70 hover:text-[#D4A017] transition-colors"
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
                  className={`w-full text-left px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-colors ${i18n.language.startsWith(lang.code) ? 'text-[#D4A017]' : 'text-white/60'}`}
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


// --- Custom Icons ---
const Bee = ({ className }: { className?: string }) => (
  <BeeIcon className={className} />
);

// --- Utility Components ---
interface SectionTagProps {
  children: React.ReactNode;
  className?: string;
}

const SectionTag = ({ children, className = "" }: SectionTagProps) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-[10px] uppercase tracking-[0.2em] font-bold mb-6 ${className}`}
  >
    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
    {children}
  </motion.div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'dark';
}

const Button = ({ children, variant = 'primary', className = "", ...props }: ButtonProps) => {
  const base = "px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 active:scale-95";
  const variants = {
    primary: "bg-[#D4A017] text-black hover:bg-[#F5C842] hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/20",
    outline: "border-2 border-white/20 text-white hover:border-[#D4A017] hover:text-[#D4A017] hover:-translate-y-1",
    dark: "bg-black text-[#D4A017] hover:bg-zinc-900 border border-[#D4A017]/30"
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- Main Components ---

const Navbar = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.challenge'), href: '#challenge' },
    { name: t('nav.story'), href: '#story' },
    { name: t('nav.product'), href: '#product' },
    { name: t('nav.impact'), href: '#impact' },
    { name: t('nav.experience'), href: '#experience' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl py-3 border-b border-white/10' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 group">
          <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
            <Bee className="w-8 h-8 text-[#D4A017]" />
          </motion.div>
          <span className="text-white font-serif font-bold text-lg tracking-tight group-hover:text-amber-500 transition-colors">
            Maputo <span className="text-[#D4A017]">Wild Honey</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-white/70 hover:text-[#D4A017] text-[10px] font-bold uppercase tracking-widest transition-colors relative group">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-500 transition-all group-hover:w-full" />
            </a>
          ))}
          <LanguageSelector />
          <Button variant="primary" className="py-2.5 px-6 scale-90">{t('nav.get_involved')}</Button>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <LanguageSelector />
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-black z-[60] flex flex-col items-center justify-center gap-8 p-12"
          >
            <button className="absolute top-8 right-8 text-white" onClick={() => setIsOpen(false)}><X className="w-8 h-8" /></button>
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-3xl text-white font-serif hover:text-amber-500">{link.name}</a>
            ))}
            <Button variant="primary" className="w-full">Get Involved</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HoneyJarSVG = ({ className = "" }) => (
  <motion.svg 
    viewBox="0 0 320 400" 
    className={`filter drop-shadow-2xl ${className}`}
    initial={{ y: 20, rotate: -2 }}
    animate={{ y: -20, rotate: 2 }}
    transition={{ repeat: Infinity, duration: 4, repeatType: "reverse", ease: "easeInOut" }}
  >
    <defs>
      <radialGradient id="hJ" cx="32%" cy="28%">
        <stop offset="0%" stopColor="#FFF9E6"/>
        <stop offset="20%" stopColor="#FFDE59"/>
        <stop offset="55%" stopColor="#F5C842"/>
        <stop offset="80%" stopColor="#D4A017"/>
        <stop offset="100%" stopColor="#7A5A00"/>
      </radialGradient>
      <linearGradient id="hS" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="white" stopOpacity="0.35"/>
        <stop offset="100%" stopColor="white" stopOpacity="0"/>
      </linearGradient>
    </defs>
    <ellipse cx="160" cy="378" rx="120" ry="14" fill="rgba(0,0,0,0.4)"/>
    <path d="M55,80 Q45,80 40,100 L32,320 Q30,360 160,365 Q290,360 288,320 L280,100 Q275,80 265,80 Z" fill="url(#hJ)"/>
    <path d="M55,80 Q45,80 40,100 L32,320 Q30,360 160,365 Q290,360 288,320 L280,100 Q275,80 265,80 Z" fill="url(#hS)"/>
    <ellipse cx="95" cy="190" rx="16" ry="65" fill="rgba(255,255,255,0.28)" transform="rotate(-12,95,190)"/>
    <rect x="68" y="68" width="184" height="22" rx="11" fill="#CCCCCC"/>
    <rect x="72" y="71" width="176" height="15" rx="8" fill="#E0E0E0"/>
    <ellipse cx="160" cy="60" rx="108" ry="30" fill="#8B4513"/>
    <rect x="85" y="168" width="150" height="130" rx="14" fill="white" opacity="0.94"/>
    <circle cx="160" cy="220" r="38" fill="#0097A7"/>
    <text x="160" y="278" textAnchor="middle" fontFamily="Arial" fontSize="8.5" fill="#0097A7" fontWeight="bold" letterSpacing="1.5">PARQUE NACIONAL</text>
    <text x="160" y="291" textAnchor="middle" fontFamily="Arial" fontSize="9" fill="#0097A7" fontWeight="bold" letterSpacing="2">DE MAPUTO</text>
  </motion.svg>
);

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-[#050505]">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <SectionTag>{t('hero.eyebrow')}</SectionTag>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[0.95] mb-8">
            {t('hero.title_part1')} <span className="text-[#D4A017] italic">{t('hero.title_gold')}</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500/50 to-amber-500 border-white/10">{t('hero.title_outline')}</span> {t('hero.title_part2')}
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-12">
            <Button variant="primary">{t('hero.discover')} <Bee className="w-4 h-4" /></Button>
            <Button variant="outline">{t('hero.see_impact')}</Button>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
            {[
              { label: t('stats.hives'), val: '270' },
              { label: t('stats.families'), val: '64' },
              { label: t('stats.potential'), val: '5.4T' }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl font-bold text-amber-500 mb-1">{stat.val}</div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="relative flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <div className="relative w-full max-w-[500px] aspect-square">
            {/* Spinning Rings */}
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute inset-0 border border-amber-500/10 rounded-full"
            />
            <motion.div 
              animate={{ rotate: -360 }} 
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="absolute inset-8 border border-teal-500/10 rounded-full border-dashed"
            />
            
<HoneyJarSVG className="w-3/4 mx-auto relative z-10" />

            {/* Floating Info Chips */}
            {[
              { icon: <Leaf className="w-3 h-3 text-green-500" />, text: "100% Natural", pos: "top-10 right-0" },
              { icon: <CheckCircle2 className="w-3 h-3 text-teal-500" />, text: "Park-Certified", pos: "bottom-20 -right-4" },
              { icon: <Users className="w-3 h-3 text-amber-500" />, text: "Women-Led", pos: "bottom-10 left-0" }
            ].map((chip, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + (i * 0.2) }}
                className={`absolute ${chip.pos} z-20 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 shadow-2xl`}
              >
                {chip.icon}
                <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider">{chip.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] text-white/30 uppercase tracking-[0.3em]">Scroll</span>
        <motion.div 
          animate={{ y: [0, 20, 0], opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-[1px] h-12 bg-gradient-to-b from-amber-500 to-transparent"
        />
      </div>
    </section>
  );
};

const Challenge = () => {
  const problems = [
    { title: "Unbranded & Invisible", desc: "Sold informally with no identity or premium market positioning.", icon: <X className="text-red-500" /> },
    { title: "Undervalued Product", desc: "No eco-certification preventing premium pricing and global access.", icon: <ShoppingBag className="text-amber-500" /> },
    { title: "Disconnected from Tourism", desc: "Absent from lodges, retail, and hospitality visitor channels.", icon: <Globe className="text-teal-500" /> },
  ];

  return (
    <section id="challenge" className="py-24 bg-zinc-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -inset-10 bg-amber-200/50 rounded-full blur-[100px] z-0" />
          <HoneyJarSVG className="w-2/3 mx-auto relative z-10 opacity-40 grayscale" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full z-20">
            <span className="text-8xl font-serif text-black/5 block mb-4">LOST</span>
            <div className="bg-white p-6 rounded-2xl shadow-xl inline-block border-l-4 border-amber-500">
              <p className="text-sm font-bold text-zinc-900 leading-tight">"Incredible Honey. <br/>Invisible to the World."</p>
            </div>
          </div>
        </motion.div>

        <div>
          <SectionTag>The Challenge</SectionTag>
          <h2 className="text-4xl md:text-5xl font-serif text-zinc-900 mb-8 leading-tight">
            Connecting Wild Landscapes to <span className="text-amber-600 italic underline decoration-amber-500/30">Global Markets.</span>
          </h2>
          <p className="text-zinc-500 mb-10 text-lg leading-relaxed">
            Around Maputo National Park, 64 families already produce wild honey. But without branding, storytelling, or distribution, this conservation-grade asset remains undervalued.
          </p>
          
          <div className="space-y-4">
            {problems.map((p, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 10 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 flex items-start gap-4 transition-all hover:shadow-md"
              >
                <div className="p-3 rounded-xl bg-zinc-50">{p.icon}</div>
                <div>
                  <h4 className="font-bold text-zinc-900 mb-1">{p.title}</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Impact = () => {
  const stats = [
    { icon: <Bee className="w-8 h-8" />, num: 270, suffix: "", label: "Active Hives" },
    { icon: <Users className="w-8 h-8" />, num: 64, suffix: "", label: "Families Supported" },
    { icon: <Droplets className="w-8 h-8" />, num: 5.4, suffix: "T", label: "Annual Potential" },
    { icon: <TreePine className="w-8 h-8" />, num: 100, suffix: "%", label: "Nature Positive" },
  ];

  const Counter = ({ value, suffix }: { value: number, suffix: string }) => {
    const [count, setCount] = useState(0);
    const [ref, setRef] = useState<HTMLElement | null>(null);

    useEffect(() => {
      if (!ref) return;
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = value;
          const duration = 2000;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
          observer.disconnect();
        }
      }, { threshold: 0.5 });
      observer.observe(ref);
      return () => observer.disconnect();
    }, [ref, value]);

    return (
      <span ref={setRef}>
        {count.toFixed(value % 1 === 0 ? 0 : 1)}
        {suffix}
      </span>
    );
  };

  return (
    <section id="impact" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 p-24 opacity-20 pointer-events-none">
        <Sparkles className="w-64 h-64 text-amber-500" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <SectionTag className="mx-auto">Our Impact</SectionTag>
          <h2 className="text-4xl md:text-6xl font-serif text-white mt-4">What One Jar Can Do</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 p-8 rounded-3xl text-center group hover:bg-amber-500/10 hover:border-amber-500/30 transition-all cursor-default"
            >
              <div className="text-amber-500 mb-6 flex justify-center group-hover:scale-110 transition-transform">{s.icon}</div>
              <div className="text-4xl font-bold text-white mb-2">
  <Counter value={s.num} suffix={s.suffix} />
</div>
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{s.label}</div>
            </motion.div>
          ))}
        </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Habitat Protection", text: "Bees need wild landscapes — honey producers become natural guardians of the park.", icon: <TreePine className="w-8 h-8 text-emerald-500" /> },
              { title: "Household Income", text: "Direct revenue for smallholders with a low ecological footprint and high social return.", icon: <Sparkles className="w-8 h-8 text-amber-500" /> },
              { title: "Women Empowerment", text: "Targeted inclusion in cooperatives and enterprise leadership across the value chain.", icon: <Users className="w-8 h-8 text-teal-500" /> },
              { title: "Park Sustainability", text: "Diversified revenue streams beyond entry fees, strengthening conservation viability.", icon: <Globe className="w-8 h-8 text-blue-500" /> },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.02 }}
                className="flex gap-6 p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all cursor-default"
              >
                <div className="flex-shrink-0 p-4 rounded-2xl bg-white/5">
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
};

const HoneyTrailMap = () => {
  return (
    <div className="relative bg-zinc-900 rounded-[3rem] p-4 md:p-8 overflow-hidden shadow-2xl border border-white/10">
      <div className="flex items-center gap-2 mb-8 px-4">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-amber-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-auto text-[10px] font-bold text-white/30 uppercase tracking-widest">Maputo Honey Trail System</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 relative aspect-video bg-[#D4EDDA] rounded-2xl overflow-hidden group">
          {/* Conceptual Isometric Map */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-200 to-green-100 opacity-80" />
          <div className="absolute inset-0 p-8 flex flex-col justify-center items-center">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="text-9xl mb-4"
            >
              🗺️
            </motion.div>
            <p className="text-zinc-600 font-bold uppercase tracking-widest text-[10px]">Interactive Experience Map</p>
            <p className="text-zinc-400 text-xs mt-2">Connect Village • Forest • Lodge</p>
          </div>
          
          {/* Floating Map Nodes */}
          {[
            { label: "Village", icon: "🏠", pos: "top-1/4 left-1/4" },
            { label: "Harvest", icon: "🐝", pos: "top-1/2 left-1/2" },
            { label: "Lodge", icon: "🏨", pos: "bottom-1/4 right-1/4" }
          ].map((node, i) => (
            <motion.div 
              key={i}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className={`absolute ${node.pos} bg-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2`}
            >
              <span>{node.icon}</span>
              <span className="text-[9px] font-bold uppercase tracking-wider">{node.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-[#D4A017] text-black">
            <h4 className="font-bold text-xl mb-2 flex items-center gap-2">Adopt a Hive <Bee className="w-5 h-5" /></h4>
            <div className="text-3xl font-serif font-bold mb-4">$50 <span className="text-sm font-sans font-normal opacity-70">/ year</span></div>
            <p className="text-sm mb-6 leading-relaxed opacity-90">Sponsor a hive, fund a family, and receive annual jars from your community.</p>
            <Button variant="dark" className="w-full py-2.5">Join Program</Button>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-4">Upcoming Expeditions</div>
            <div className="space-y-4">
              {[1,2].map(i => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-white/80 font-bold">Wildflower Harvest {i}</div>
                    <div className="text-[10px] text-white/30 uppercase">Aug 2025 • Mozambique</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          <div>
            <SectionTag>The Experience</SectionTag>
            <h2 className="text-4xl md:text-6xl font-serif text-zinc-900 mb-8 leading-tight">
              The Maputo <span className="text-amber-600 italic">Honey Trail</span>
            </h2>
            <p className="text-zinc-500 text-lg max-w-xl mb-8 leading-relaxed">
              More than a product — an encounter with nature. An immersive eco-tourism journey integrating conservation and community.
            </p>
            
            <div className="space-y-8 relative pl-10 border-l border-zinc-100">
              {[
                { title: "Village Welcome", text: "Meet beekeeping families and learn traditional knowledge passed through generations.", step: "01" },
                { title: "Pollinator Walk", text: "A guided walk with a ranger through the wildflower corridors of the park.", step: "02" },
                { title: "Live Harvest", text: "Watch — or participate in — a real honey harvest under expert guidance.", step: "03" },
                { title: "Tasting Station", text: "Compare seasonal flavors paired with local fruits and traditional bread.", step: "04" },
              ].map((step, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-14 top-0 w-8 h-8 rounded-full bg-white border-2 border-amber-500 flex items-center justify-center text-[10px] font-bold text-amber-600 shadow-sm z-10">
                    {step.step}
                  </div>
                  <h4 className="text-lg font-bold text-zinc-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed">{step.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="sticky top-32">
             <HoneyTrailMap />
          </div>
        </div>

        <div className="bg-zinc-900 rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden group">
          <div className="absolute inset-0 bg-amber-500 opacity-0 group-hover:opacity-[0.03] transition-opacity pointer-events-none" />
          <Waves className="w-12 h-12 text-teal-500 mx-auto mb-6 opacity-40" />
          <h3 className="text-2xl md:text-3xl font-serif mb-6 italic text-white/90">"When a community earns its livelihood from a healthy ecosystem, they become its most powerful protectors."</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12 pt-12 border-t border-white/5">
            <div className="flex -space-x-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-zinc-900 bg-amber-500 flex items-center justify-center font-bold text-black text-xs">
                  {i===4 ? '64+' : 'M'}
                </div>
              ))}
            </div>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest max-w-[200px] text-left">
              Supported by local beekeeping cooperatives
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <SectionTag>Get Involved</SectionTag>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">Let's Build This <span className="text-[#D4A017]">Together.</span></h2>
          <p className="text-white/50 text-lg mb-12 leading-relaxed">
            Whether you're a lodge operator, impact investor, or conservationist — join us in scaling this nature-positive model across Mozambique.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-amber-500">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Contact Strategist</div>
                <div className="text-white">Bruno Micali</div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-amber-500">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Location</div>
                <div className="text-white">Maputo, Mozambique 🇲🇿</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem]">
          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Name" className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-amber-500/50 transition-colors" />
              <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-amber-500/50 transition-colors" />
            </div>
            <select className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white/50 text-sm outline-none focus:border-amber-500/50 transition-colors appearance-none">
              <option>I am a...</option>
              <option>Lodge Operator</option>
              <option>Conservationist</option>
              <option>Distributor</option>
            </select>
            <textarea placeholder="How would you like to be involved?" rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-amber-500/50 transition-colors" />
            <Button variant="primary" className="w-full">Send Message <ChevronRight className="w-4 h-4" /></Button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-black py-16 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
        <a href="#" className="flex items-center gap-2">
          <Bee className="w-6 h-6 text-[#D4A017]" />
          <span className="text-white font-serif font-bold text-sm tracking-widest uppercase">Maputo Wild Honey</span>
        </a>
        <div className="flex gap-8">
          <a href="#" className="text-white/40 hover:text-white transition-colors text-xl">📸</a>
          <a href="#" className="text-white/40 hover:text-white transition-colors text-xl">💼</a>
          <a href="#" className="text-white/40 hover:text-white transition-colors text-xl">🐦</a>
        </div>
      </div>
      <div className="text-center md:text-left text-[10px] text-white/20 uppercase tracking-[0.3em] font-bold">
        © 2025 Maputo Wild Honey • A concept by Bruno Micali • Peace Parks Foundation 🇲🇿
      </div>
    </div>
  </footer>
);

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <div className="bg-[#050505] selection:bg-amber-500 selection:text-black">
      <AnimatePresence>
        {loading && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center gap-6"
          >
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }} 
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-6xl"
            >
              🍯
            </motion.div>
            <div className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.5em] animate-pulse">
              Harvesting the Wild...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Navbar />
          <Hero />
          
          <div className="bg-amber-500 py-4 overflow-hidden relative border-y border-white/10">
            <div className="flex whitespace-nowrap gap-12 animate-marquee">
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className="flex items-center gap-4 text-black text-[10px] font-black uppercase tracking-[0.2em]">
                  <Bee className="w-4 h-4" /> 270 Active Hives • 64 Families • Maputo National Park
                </div>
              ))}
            </div>
          </div>

          <Challenge />
          <Impact />
          <Experience />
          <Contact />
          <Footer />
        </motion.main>
      )}

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
      `}} />
    </div>
  );
}
