import React from 'react';
import { motion } from 'framer-motion';

export const IslamicSceneDecorations: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* 1. Subtle Islamic Geometric Lattice Pattern (Ar-Raqm Al-Handasi) */}
      <div
        className="absolute inset-0 opacity-[0.035] bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2317436A' fill-rule='evenodd'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='none' stroke='%2317436A' stroke-width='1.2'/%3E%3Ccircle cx='30' cy='30' r='10' fill='none' stroke='%2317436A' stroke-width='1'/%3E%3Cpath d='M30 15l15 15-15 15-15-15z' fill='none' stroke='%2317436A' stroke-width='0.8'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* 2. Top Arch Corner Ornaments (Left & Right) */}
      <div className="absolute top-0 right-0 w-32 sm:w-48 h-32 sm:h-48 opacity-25 text-[#17436A]">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M 100,0 Q 40,0 20,40 Q 0,80 0,100 L 100,100 Z" fill="none" stroke="#BCEBDD" strokeWidth="1.5" />
          <path d="M 100,10 Q 50,10 32,45 Q 15,80 10,100" fill="none" stroke="#17436A" strokeWidth="1" opacity="0.6" />
          <circle cx="20" cy="40" r="3" fill="#BCEBDD" />
        </svg>
      </div>

      <div className="absolute top-0 left-0 w-32 sm:w-48 h-32 sm:h-48 opacity-25 text-[#17436A] -scale-x-100">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M 100,0 Q 40,0 20,40 Q 0,80 0,100 L 100,100 Z" fill="none" stroke="#BCEBDD" strokeWidth="1.5" />
          <path d="M 100,10 Q 50,10 32,45 Q 15,80 10,100" fill="none" stroke="#17436A" strokeWidth="1" opacity="0.6" />
          <circle cx="20" cy="40" r="3" fill="#BCEBDD" />
        </svg>
      </div>

      {/* 3. Traditional Hanging Lantern (Right) with gentle swing */}
      <motion.div
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 6.5, ease: 'easeInOut' }}
        style={{ transformOrigin: 'top center' }}
        className="absolute top-0 right-4 sm:right-12 md:right-20 w-12 sm:w-16 md:w-20 z-10 opacity-70"
      >
        <svg viewBox="0 0 100 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-xs">
          {/* Chain */}
          <line x1="50" y1="0" x2="50" y2="70" stroke="#17436A" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" />
          <circle cx="50" cy="72" r="3" fill="#BCEBDD" />
          {/* Top Cap */}
          <path d="M 32,85 Q 50,72 68,85 L 64,95 L 36,95 Z" fill="#BCEBDD" stroke="#17436A" strokeWidth="1.2" />
          {/* Lantern Body / Dome */}
          <path d="M 34,95 C 34,95 24,115 28,145 L 72,145 C 76,115 66,95 66,95 Z" fill="#FFFFFF" stroke="#17436A" strokeWidth="1.2" />
          {/* Glowing Windows */}
          <rect x="38" y="105" width="24" height="30" rx="3" fill="#BCEBDD" opacity="0.45" />
          <line x1="50" y1="105" x2="50" y2="135" stroke="#17436A" strokeWidth="1" opacity="0.5" />
          <line x1="38" y1="120" x2="62" y2="120" stroke="#17436A" strokeWidth="1" opacity="0.5" />
          {/* Inner Light Glow */}
          <circle cx="50" cy="120" r="7" fill="#BCEBDD" />
          {/* Base */}
          <path d="M 30,145 L 70,145 L 60,162 L 40,162 Z" fill="#BCEBDD" stroke="#17436A" strokeWidth="1.2" />
          {/* Finial */}
          <circle cx="50" cy="168" r="3.5" fill="#17436A" />
          <polygon points="50,172 52.5,182 47.5,182" fill="#17436A" />
        </svg>
      </motion.div>

      {/* 4. Traditional Hanging Lantern (Left) with gentle swing */}
      <motion.div
        animate={{ rotate: [2, -2, 2] }}
        transition={{ repeat: Infinity, duration: 7.2, ease: 'easeInOut' }}
        style={{ transformOrigin: 'top center' }}
        className="absolute top-0 left-4 sm:left-12 md:left-20 w-11 sm:w-14 md:w-16 z-10 opacity-65"
      >
        <svg viewBox="0 0 100 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-xs">
          <line x1="50" y1="0" x2="50" y2="50" stroke="#17436A" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" />
          <circle cx="50" cy="52" r="2.5" fill="#BCEBDD" />
          <path d="M 34,62 Q 50,50 66,62 L 62,71 L 38,71 Z" fill="#BCEBDD" stroke="#17436A" strokeWidth="1.2" />
          <path d="M 36,71 C 36,71 26,90 30,118 L 70,118 C 74,90 64,71 64,71 Z" fill="#FFFFFF" stroke="#17436A" strokeWidth="1.2" />
          <rect x="40" y="80" width="20" height="28" rx="3" fill="#BCEBDD" opacity="0.4" />
          <line x1="50" y1="80" x2="50" y2="108" stroke="#17436A" strokeWidth="1" opacity="0.5" />
          <circle cx="50" cy="94" r="6" fill="#BCEBDD" />
          <path d="M 32,118 L 68,118 L 58,134 L 42,134 Z" fill="#BCEBDD" stroke="#17436A" strokeWidth="1.2" />
          <circle cx="50" cy="139" r="3" fill="#17436A" />
        </svg>
      </motion.div>

      {/* 5. Mosque Dome Silhouette & Crescent (Bottom Right) */}
      <div className="absolute -bottom-6 -right-6 sm:right-0 w-44 sm:w-64 md:w-72 opacity-40 z-0">
        <svg viewBox="0 0 300 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          {/* Mosque Main Dome */}
          <path d="M 90,260 L 90,190 C 90,150 110,120 140,110 C 140,95 142,95 140,90 Q 140,85 145,85 Q 150,85 150,90 C 148,95 150,95 150,110 C 180,120 200,150 200,190 L 200,260 Z" fill="#FFFFFF" stroke="#BCEBDD" strokeWidth="2.5" />
          <circle cx="145" cy="78" r="4.5" fill="#BCEBDD" stroke="#17436A" strokeWidth="0.8" />
          <rect x="55" y="140" width="22" height="120" fill="#FFFFFF" stroke="#BCEBDD" strokeWidth="2" rx="2" />
          <polygon points="66,80 50,140 82,140" fill="#BCEBDD" stroke="#BCEBDD" strokeWidth="1" />
          <circle cx="66" cy="74" r="3" fill="#17436A" />
        </svg>
      </div>

      {/* 6. Holy Quran on Wooden Rehal Silhouette (Bottom Left) */}
      <div className="absolute -bottom-6 -left-6 sm:left-0 w-44 sm:w-64 md:w-72 opacity-40 z-0">
        <svg viewBox="0 0 300 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <g transform="translate(60, 110)">
            <polygon points="40,90 120,10 135,18 55,98" fill="#17436A" opacity="0.6" />
            <polygon points="120,90 40,10 25,18 105,98" fill="#17436A" opacity="0.8" />
            <polygon points="78,14 10,32 25,75 82,50" fill="#17436A" stroke="#BCEBDD" strokeWidth="1.5" />
            <polygon points="75,17 14,34 27,72 80,48" fill="#BCEBDD" opacity="0.35" />
            <polygon points="82,14 150,32 135,75 78,50" fill="#17436A" stroke="#BCEBDD" strokeWidth="1.5" />
            <polygon points="85,17 146,34 133,72 80,48" fill="#BCEBDD" opacity="0.35" />
          </g>
        </svg>
      </div>

      {/* 7. Twinkling Islamic 8-Point Stars */}
      <motion.div
        animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.95, 1.1, 0.95] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="absolute top-20 right-8 sm:right-28 text-[#BCEBDD]"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12,2 15,9 22,12 15,15 12,22 9,15 2,12 9,9" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 5.2, ease: 'easeInOut', delay: 1 }}
        className="absolute top-28 left-10 sm:left-32 text-[#17436A]/40"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12,2 15,9 22,12 15,15 12,22 9,15 2,12 9,9" />
        </svg>
      </motion.div>
    </div>
  );
};
