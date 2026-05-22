import React from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  src: string;
  alt: string;
  size?: AvatarSize;
  className?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  className = '',
  status,
}) => {
  const sizeClasses = {
    xs: 'h-10 w-10',
    sm: 'h-12 w-12',
    md: 'h-16 w-16',
    lg: 'h-20 w-20',
    xl: 'h-28 w-28',
  };

  const statusColors = {
    online: 'bg-emerald-400 shadow-emerald-400/70',
    offline: 'bg-gray-400 shadow-gray-400/50',
    away: 'bg-amber-400 shadow-amber-400/70',
    busy: 'bg-rose-500 shadow-rose-500/70',
  };

  const statusSizes = {
    xs: 'h-2.5 w-2.5',
    sm: 'h-3 w-3',
    md: 'h-3.5 w-3.5',
    lg: 'h-4 w-4',
    xl: 'h-5 w-5',
  };

  return (
    <div
      className={`
        relative inline-flex items-center justify-center
        group
        ${className}
      `}
    >
      {/* Animated Gradient Border */}
      <div
        className={`
          absolute inset-0 rounded-full
          bg-gradient-to-br
          from-cyan-400
          via-blue-500
          to-purple-600
          animate-spin-slow
          opacity-90
          blur-[2px]
        `}
      />

      {/* Glass Layer */}
      <div
        className={`
          absolute inset-[2px]
          rounded-full
          bg-white/10
          backdrop-blur-2xl
          border border-white/10
        `}
      />

      {/* Avatar */}
      <img
        src={src}
        alt={alt}
        className={`
          relative z-10
          ${sizeClasses[size]}
          rounded-full
          object-cover

          border border-white/10
          shadow-[0_10px_40px_rgba(0,0,0,0.45)]

          transition-all duration-500 ease-out

          group-hover:scale-105
          group-hover:rotate-1
          group-hover:shadow-cyan-500/30
          group-hover:shadow-2xl

          bg-[#0f172a]
        `}
        onError={(e) => {
          const target = e.target as HTMLImageElement;

          target.onerror = null;

          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            alt
          )}&background=0f172a&color=ffffff&bold=true&size=256`;
        }}
      />

      {/* Premium Status Indicator */}
      {status && (
        <div
          className={`
            absolute bottom-1 right-1 z-20
            flex items-center justify-center
          `}
        >
          <span
            className={`
              absolute inline-flex h-full w-full
              rounded-full
              animate-ping
              opacity-75
              ${statusColors[status]}
            `}
          />

          <span
            className={`
              relative
              ${statusSizes[size]}
              rounded-full
              ring-[3px] ring-[#020617]
              shadow-lg
              ${statusColors[status]}
            `}
          />
        </div>
      )}
    </div>
  );
};

