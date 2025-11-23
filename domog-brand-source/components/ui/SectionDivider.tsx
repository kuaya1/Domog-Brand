import React from 'react';

interface SectionDividerProps {
  variant?: 'ornament' | 'knot' | 'gradient' | 'wave';
  color?: 'gold' | 'crimson' | 'mixed';
  className?: string;
  animate?: boolean;
}

const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = 'ornament',
  color = 'gold',
  className = '',
  animate = true,
}) => {
  const animationClass = animate ? 'animate-fade-in' : '';

  // Color schemes
  const colors = {
    gold: {
      primary: '#dfa932',
      secondary: '#c18828',
      gradient: 'url(#goldGradient)',
    },
    crimson: {
      primary: '#e34d64',
      secondary: '#ad1f3d',
      gradient: 'url(#crimsonGradient)',
    },
    mixed: {
      primary: '#dfa932',
      secondary: '#e34d64',
      gradient: 'url(#mixedGradient)',
    },
  };

  const currentColors = colors[color];

  // Ornament Variant - Centered decorative element
  if (variant === 'ornament') {
    return (
      <div className={`flex items-center justify-center my-12 ${animationClass} ${className}`}>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-warmGray-300 to-warmGray-300" />
        <div className="px-6">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={animate ? 'animate-scale-in' : ''}
          >
            <defs>
              <linearGradient id="ornamentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={currentColors.primary} />
                <stop offset="100%" stopColor={currentColors.secondary} />
              </linearGradient>
            </defs>
            
            {/* Outer circle */}
            <circle cx="30" cy="30" r="24" stroke="url(#ornamentGradient)" strokeWidth="1.5" fill="none" />
            
            {/* Inner decorative elements */}
            <circle cx="30" cy="30" r="16" stroke="url(#ornamentGradient)" strokeWidth="1" fill="none" />
            
            {/* Four petal design */}
            <path
              d="M30 14 L30 22 M30 38 L30 46 M14 30 L22 30 M38 30 L46 30"
              stroke="url(#ornamentGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            
            {/* Diamond shapes */}
            <path
              d="M30 10 L34 14 L30 18 L26 14 Z"
              fill="url(#ornamentGradient)"
            />
            <path
              d="M30 42 L34 46 L30 50 L26 46 Z"
              fill="url(#ornamentGradient)"
            />
            <path
              d="M10 30 L14 34 L18 30 L14 26 Z"
              fill="url(#ornamentGradient)"
            />
            <path
              d="M42 30 L46 34 L50 30 L46 26 Z"
              fill="url(#ornamentGradient)"
            />
          </svg>
        </div>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-warmGray-300 to-warmGray-300" />
      </div>
    );
  }

  // Endless Knot Pattern - Traditional Buddhist/Mongolian symbol
  if (variant === 'knot') {
    return (
      <div className={`flex items-center justify-center my-12 ${animationClass} ${className}`}>
        <svg
          width="120"
          height="80"
          viewBox="0 0 120 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={animate ? 'animate-scale-in' : ''}
        >
          <defs>
            <linearGradient id="knotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={currentColors.primary} />
              <stop offset="50%" stopColor={currentColors.secondary} />
              <stop offset="100%" stopColor={currentColors.primary} />
            </linearGradient>
          </defs>
          
          {/* Endless knot pattern */}
          <g stroke="url(#knotGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Top loops */}
            <path d="M20,25 Q30,15 40,25 T60,25 T80,25 T100,25" />
            
            {/* Middle interwoven section */}
            <path d="M25,30 L35,30 L35,50 L25,50 Z" />
            <path d="M45,30 L55,30 L55,50 L45,50 Z" />
            <path d="M65,30 L75,30 L75,50 L65,50 Z" />
            <path d="M85,30 L95,30 L95,50 L85,50 Z" />
            
            {/* Crossing lines */}
            <path d="M30,35 L90,45" opacity="0.8" />
            <path d="M90,35 L30,45" opacity="0.8" />
            
            {/* Bottom loops */}
            <path d="M20,55 Q30,65 40,55 T60,55 T80,55 T100,55" />
            
            {/* Connecting curves */}
            <path d="M20,25 Q15,40 20,55" />
            <path d="M100,25 Q105,40 100,55" />
          </g>
        </svg>
      </div>
    );
  }

  // Gradient Line - Simple elegant divider
  if (variant === 'gradient') {
    return (
      <div className={`my-12 ${animationClass} ${className}`}>
        <svg
          width="100%"
          height="4"
          viewBox="0 0 1200 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className={animate ? 'animate-fade-in' : ''}
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={currentColors.primary} stopOpacity="0" />
              <stop offset="25%" stopColor={currentColors.primary} stopOpacity="0.5" />
              <stop offset="50%" stopColor={currentColors.secondary} stopOpacity="1" />
              <stop offset="75%" stopColor={currentColors.primary} stopOpacity="0.5" />
              <stop offset="100%" stopColor={currentColors.primary} stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="1200" height="4" fill="url(#lineGradient)" rx="2" />
        </svg>
      </div>
    );
  }

  // Wave/Cloud Pattern - Traditional Mongolian motif
  if (variant === 'wave') {
    return (
      <div className={`my-12 overflow-hidden ${animationClass} ${className}`}>
        <svg
          width="100%"
          height="60"
          viewBox="0 0 1200 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          className={animate ? 'animate-fade-in' : ''}
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={currentColors.primary} stopOpacity="0.3" />
              <stop offset="50%" stopColor={currentColors.secondary} stopOpacity="0.8" />
              <stop offset="100%" stopColor={currentColors.primary} stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="waveStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={currentColors.primary} />
              <stop offset="50%" stopColor={currentColors.secondary} />
              <stop offset="100%" stopColor={currentColors.primary} />
            </linearGradient>
          </defs>
          
          {/* Cloud/wave pattern - multiple layers */}
          <g opacity="0.6">
            <path
              d="M0,30 Q50,10 100,30 T200,30 T300,30 T400,30 T500,30 T600,30 T700,30 T800,30 T900,30 T1000,30 T1100,30 T1200,30"
              stroke="url(#waveStroke)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M0,35 Q60,20 120,35 T240,35 T360,35 T480,35 T600,35 T720,35 T840,35 T960,35 T1080,35 T1200,35"
              stroke="url(#waveStroke)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M0,40 Q40,25 80,40 T160,40 T240,40 T320,40 T400,40 T480,40 T560,40 T640,40 T720,40 T800,40 T880,40 T960,40 T1040,40 T1120,40 T1200,40"
              stroke="url(#waveStroke)"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
              opacity="0.5"
            />
          </g>
          
          {/* Decorative circles at wave peaks */}
          <g fill="url(#waveGradient)">
            <circle cx="100" cy="30" r="3" />
            <circle cx="300" cy="30" r="3" />
            <circle cx="500" cy="30" r="3" />
            <circle cx="700" cy="30" r="3" />
            <circle cx="900" cy="30" r="3" />
            <circle cx="1100" cy="30" r="3" />
          </g>
        </svg>
      </div>
    );
  }

  return null;
};

export default SectionDivider;
