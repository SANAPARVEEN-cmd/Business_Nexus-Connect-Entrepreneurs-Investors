
import React from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "outline"
  | "ghost"
  | "link"
  | "success"
  | "warning"
  | "error";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = "",
  disabled,
  ...props
}) => {
  const base =
    `
    relative inline-flex items-center justify-center
    font-semibold tracking-wide
    rounded-2xl
    overflow-hidden
    select-none

    transition-all duration-300 ease-out
    active:scale-[0.96]

    focus:outline-none focus:ring-2 focus:ring-offset-0

    group
  `;

  const sizes = {
    xs: "text-xs px-3 py-1.5",
    sm: "text-sm px-4 py-2",
    md: "text-sm px-5 py-2.5",
    lg: "text-base px-6 py-3",
    xl: "text-lg px-7 py-3.5",
  };

  const variants = {
    primary: `
      text-white
      bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600

      shadow-[0_10px_30px_rgba(34,211,238,0.25)]
      hover:shadow-[0_12px_40px_rgba(34,211,238,0.35)]

      focus:ring-cyan-400
    `,

    secondary: `
      text-white
      bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-600

      shadow-[0_10px_30px_rgba(168,85,247,0.25)]
      hover:shadow-[0_12px_40px_rgba(168,85,247,0.35)]

      focus:ring-violet-400
    `,

    accent: `
      text-white
      bg-gradient-to-br from-pink-400 via-rose-500 to-red-500

      shadow-[0_10px_30px_rgba(244,63,94,0.25)]
      hover:shadow-[0_12px_40px_rgba(244,63,94,0.35)]

      focus:ring-pink-400
    `,

    success: `
      text-white
      bg-gradient-to-br from-emerald-400 via-green-500 to-lime-500

      shadow-[0_10px_30px_rgba(16,185,129,0.25)]
      hover:shadow-[0_12px_40px_rgba(16,185,129,0.35)]

      focus:ring-emerald-400
    `,

    warning: `
      text-[#0b0f19]
      bg-gradient-to-br from-amber-300 via-orange-400 to-yellow-400

      shadow-[0_10px_30px_rgba(251,146,60,0.25)]
      hover:shadow-[0_12px_40px_rgba(251,146,60,0.35)]

      focus:ring-orange-400
    `,

    error: `
      text-white
      bg-gradient-to-br from-rose-500 via-red-500 to-red-600

      shadow-[0_10px_30px_rgba(244,63,94,0.25)]
      hover:shadow-[0_12px_40px_rgba(244,63,94,0.35)]

      focus:ring-rose-400
    `,

    outline: `
      text-cyan-200
      bg-white/5 backdrop-blur-xl
      border border-white/10

      hover:bg-white/10 hover:border-cyan-400/40

      shadow-[0_0_0px_rgba(0,0,0,0)]
      focus:ring-cyan-400
    `,

    ghost: `
      text-gray-200
      hover:bg-white/10
      backdrop-blur-xl
      focus:ring-white/10
    `,

    link: `
      text-cyan-300
      hover:text-cyan-200
      underline underline-offset-4
      px-0
    `,
  };

  const disabledStyle =
    disabled || isLoading
      ? "opacity-50 cursor-not-allowed"
      : "";

  const width = fullWidth ? "w-full" : "";

  return (
    <button
      className={`
        ${base}
        ${sizes[size]}
        ${variants[variant]}
        ${width}
        ${disabledStyle}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Glass shine effect */}
      <span className="absolute inset-0 overflow-hidden rounded-2xl">
        <span
          className="
            absolute top-0 left-[-130%]
            h-full w-[60%]

            bg-gradient-to-r from-transparent via-white/20 to-transparent

            skew-x-[-25deg]

            group-hover:left-[150%]

            transition-all duration-700
          "
        />
      </span>

      {/* Border glow ring */}
      <span
        className="
          absolute inset-0 rounded-2xl
          border border-white/10
          group-hover:border-white/20
          transition-all duration-300
        "
      />

      {/* Loading state (AI style pulse) */}
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="h-2 w-2 bg-white rounded-full animate-ping" />
          <span className="h-2 w-2 bg-white rounded-full ml-1 animate-ping delay-150" />
          <span className="h-2 w-2 bg-white rounded-full ml-1 animate-ping delay-300" />
        </span>
      )}

      {!isLoading && leftIcon && (
        <span className="mr-2 relative z-10">{leftIcon}</span>
      )}

      {!isLoading && (
        <span className="relative z-10">{children}</span>
      )}

      {!isLoading && rightIcon && (
        <span className="ml-2 relative z-10">{rightIcon}</span>
      )}
    </button>
  );
};

