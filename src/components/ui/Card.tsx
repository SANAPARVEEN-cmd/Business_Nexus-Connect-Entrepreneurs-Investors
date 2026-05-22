import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  onClick,
  hoverable = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden

        rounded-2xl

        bg-white/5
        backdrop-blur-xl

        border border-white/10

        shadow-[0_8px_30px_rgba(0,0,0,0.5)]

        transition-all duration-300 ease-out

        ${
          hoverable
            ? "hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
            : ""
        }

        ${onClick ? "cursor-pointer" : ""}

        ${className}
      `}
    >
      {children}
    </div>
  );
};

/* =========================
   HEADER
========================= */

export const CardHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <div
      className={`
        px-6 py-4

        border-b border-white/10

        text-white font-semibold text-base

        ${className}
      `}
    >
      {children}
    </div>
  );
};

/* =========================
   BODY
========================= */

export const CardBody: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <div
      className={`
        px-6 py-5

        text-gray-300 text-sm leading-relaxed

        ${className}
      `}
    >
      {children}
    </div>
  );
};

/* =========================
   FOOTER
========================= */

export const CardFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <div
      className={`
        px-6 py-4

        border-t border-white/10

        flex items-center justify-between

        text-gray-400 text-sm

        ${className}
      `}
    >
      {children}
    </div>
  );
};
