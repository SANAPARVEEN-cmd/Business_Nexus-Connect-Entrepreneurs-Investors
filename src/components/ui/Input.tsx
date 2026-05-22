
import React, { forwardRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      startAdornment,
      endAdornment,
      fullWidth = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const widthClass = fullWidth ? "w-full" : "";

    return (
      <div className={`${widthClass} space-y-1 ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-300">
            {label}
          </label>
        )}

        <div className="relative group">
          {/* Glow */}
          <div
            className="
              absolute -inset-[1px]
              rounded-xl
              bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-purple-500/20
              opacity-0 group-focus-within:opacity-100
              blur-md transition-all duration-300
            "
          />

          {/* Input Container */}
          <div
            className="
              relative flex items-center
              rounded-xl

              bg-white/5 backdrop-blur-xl
              border border-white/10

              focus-within:border-cyan-400/40

              shadow-[0_8px_30px_rgba(0,0,0,0.5)]
              transition-all duration-300
            "
          >
            {startAdornment && (
              <div className="pl-3 text-gray-400">
                {startAdornment}
              </div>
            )}

            <input
              ref={ref}
              {...props}
              className={`
                w-full bg-transparent

                px-3 py-2.5

                text-gray-50
                font-medium
                tracking-wide

                placeholder:text-gray-400

                focus:outline-none

                caret-cyan-400

                text-sm
              `}
            />

            {endAdornment && (
              <div className="pr-3 text-gray-400">
                {endAdornment}
              </div>
            )}
          </div>
        </div>

        {(error || helperText) && (
          <p
            className={`
              text-xs
              ${error ? "text-rose-400" : "text-gray-400"}
            `}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

