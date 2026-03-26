import React, { useState, useEffect, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Bee } from './CustomIcons';
import { useTranslation } from 'react-i18next';

export const OptimizedHero = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reduce particles on mobile for performance
  const particleCount = useMemo(() => isMobile ? 30 : 80, [isMobile]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
        delayChildren: prefersReducedMotion ? 0 : 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: prefersReducedMotion ? 0.1 : 0.6
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-900 to-black">
      {/* Optimized Background Canvas */}
      <div className="absolute inset-0 opacity-30">
        <Particles count={particleCount} />
      </div>
      
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center lg:text-left">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] uppercase tracking-widest font-bold mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            {t('hero.eyebrow')}
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            {t('hero.title1')} <br className="hidden md:block" />
            <span className="text-amber-500">{t('hero.title2')}</span><br className="hidden md:block" />
            {t('hero.title3')} <span className="text-white/20">{t('hero.title4')}</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-white/60 text-lg mb-8 max-w-xl">
            {t('hero.subtitle')}
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
            <button className="px-8 py-4 bg-amber-500 text-black rounded-full font-bold text-xs uppercase tracking-widest hover:bg-amber-400 transition-all active:scale-95">
              {t('hero.cta1')}
            </button>
            <button className="px-8 py-4 border-2 border-white/20 text-white rounded-full font-bold text-xs uppercase tracking-widest hover:border-amber-500 hover:text-amber-500 transition-all active:scale-95">
              {t('hero.cta2')}
            </button>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-wrap gap-6 justify-center lg:justify-start text-center">
            <div>
              <div className="text-2xl font-bold text-amber-500">270</div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{t('hero.stat1')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-500">64</div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{t('hero.stat2')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-500">5.4T</div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{t('hero.stat3')}</div>
            </div>
          </motion.div>
        </div>
        
        {/* Hide complex 3D jar on mobile for performance */}
        <div className="hidden lg:block">
          <motion.div 
            className="relative"
            animate={{ rotate: [0, 2, -2, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          >
            <OptimizedJar />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

// Performance-optimized particle system
const Particles: React.FC<{ count: number }> = ({ count }) => {
  const particles = useMemo(() => 
    Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.4 + 0.1,
      color: Math.random() > 0.6 ? '#D4A017' : '#F5C842'
    })),
    [count]
  );

  return (
    <div className="absolute inset-0">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            opacity: p.opacity,
            animation: `float ${10 / p.speed}s linear infinite`
          }}
        />
      ))}
    </div>
  );
};

// Optimized jar component with memoization
export const OptimizedJar = React.memo(() => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg viewBox="0 0 320 400" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="jarGradient" cx="32%" cy="28%">
            <stop offset="0%" stopColor="#FFF9E6"/>
            <stop offset="20%" stopColor="#FFDE59"/>
            <stop offset="55%" stopColor="#F5C842"/>
            <stop offset="80%" stopColor="#D4A017"/>
            <stop offset="100%" stopColor="#7A5A00"/>
          </radialGradient>
          <filter id="jarShadow">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodOpacity="0.4"/>
          </filter>
        </defs>
        <ellipse cx="160" cy="378" rx="120" ry="14" fill="rgba(0,0,0,0.25)"/>
        <path d="M55,80 Q45,80 40,100 L32,320 Q30,360 160,365 Q290,360 288,320 L280,100 Q275,80 265,80 Z" fill="url(#jarGradient)" filter="url(#jarShadow)"/>
        <ellipse cx="95" cy="190" rx="16" ry="65" fill="rgba(255,255,255,0.28)" transform="rotate(-12,95,190)"/>
        <rect x="68" y="68" width="184" height="22" rx="11" fill="#CCCCCC"/>
        <ellipse cx="160" cy="60" rx="108" ry="30" fill="#8B4513"/>
        <rect x="85" y="168" width="150" height="130" rx="14" fill="white" opacity="0.94"/>
        <circle cx="160" cy="220" r="38" fill="#0097A7"/>
        <text x="160" y="278" textAnchor="middle" fontFamily="Arial" fontSize="8.5" fill="#0097A7" fontWeight="bold">PARQUE NACIONAL</text>
        <text x="160" y="291" textAnchor="middle" fontFamily="Arial" fontSize="9" fill="#0097A7" fontWeight="bold">DE MAPUTO</text>
      </svg>
    </div>
  );
});

OptimizedJar.displayName = 'OptimizedJar';