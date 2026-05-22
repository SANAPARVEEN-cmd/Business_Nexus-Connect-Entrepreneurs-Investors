
import React from 'react';

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'error'
  | 'gray';

export type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  rounded = true,
  className = '',
}) => {
  const variants = {
    primary: {
      gradient: 'from-cyan-400 to-blue-500',
      text: 'text-cyan-950',
      bg: 'bg-cyan-300/90',
      dot: 'bg-cyan-950',
    },

    secondary: {
      gradient: 'from-violet-400 to-fuchsia-500',
      text: 'text-violet-950',
      bg: 'bg-violet-300/90',
      dot: 'bg-violet-950',
    },

    accent: {
      gradient: 'from-pink-400 to-rose-500',
      text: 'text-rose-950',
      bg: 'bg-pink-300/90',
      dot: 'bg-rose-950',
    },

    success: {
      gradient: 'from-emerald-400 to-green-500',
      text: 'text-emerald-950',
      bg: 'bg-emerald-300/90',
      dot: 'bg-emerald-950',
    },

    warning: {
      gradient: 'from-amber-300 to-orange-500',
      text: 'text-orange-950',
      bg: 'bg-orange-300/90',
      dot: 'bg-orange-950',
    },

    error: {
      gradient: 'from-rose-400 to-red-500',
      text: 'text-red-950',
      bg: 'bg-rose-300/90',
      dot: 'bg-red-950',
    },

    gray: {
      gradient: 'from-slate-400 to-slate-600',
      text: 'text-gray-900',
      bg: 'bg-gray-200/90',
      dot: 'bg-gray-900',
    },
  };

  const sizeClasses = {
    sm: 'text-[10px] px-3 py-1',
    md: 'text-xs px-4 py-1.5',
    lg: 'text-sm px-5 py-2',
  };

  return (
    <div className={`relative inline-flex group ${className}`}>
      {/* Controlled Glow */}
      <div
        className={`
          absolute inset-0 rounded-full
          bg-gradient-to-r ${variants[variant].gradient}

          opacity-30 blur-lg
          group-hover:opacity-50

          transition-all duration-500
        `}
      />

      {/* Badge */}
      <span
        className={`
          relative z-10
          inline-flex items-center gap-2

          ${sizeClasses[size]}
          ${variants[variant].bg}
          ${variants[variant].text}

          ${
            rounded
              ? 'rounded-full'
              : 'rounded-2xl'
          }

          font-bold tracking-[0.14em]
          uppercase

          border border-white/20
          backdrop-blur-xl

          shadow-[0_8px_30px_rgba(0,0,0,0.25)]

          transition-all duration-300

          hover:scale-105
          hover:-translate-y-[2px]

          select-none
          whitespace-nowrap
        `}
      >
        {/* Digital Pulse Dot */}
        <span className="relative flex h-2.5 w-2.5">
          <span
            className={`
              absolute inline-flex h-full w-full
              rounded-full
              ${variants[variant].dot}
              opacity-40
              animate-ping
            `}
          />

          <span
            className={`
              relative inline-flex h-2.5 w-2.5
              rounded-full
              ${variants[variant].dot}
            `}
          />
        </span>

        {/* Text */}
        <span className="relative z-20">
          {children}
        </span>
      </span>
    </div>
  );
};
