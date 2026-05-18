import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger";
}

export const Button = ({ variant = "primary", className, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(
        "rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-md",
        variant === "primary" &&
          "bg-ink-900 text-white hover:bg-ink-700 dark:bg-ink-50 dark:text-ink-900 dark:hover:bg-ink-200",
        variant === "ghost" &&
          "bg-transparent text-ink-700 hover:bg-ink-50 dark:text-ink-200 dark:hover:bg-ink-800",
        variant === "danger" &&
          "bg-sunset-500 text-white hover:bg-sunset-300 dark:bg-sunset-500 dark:hover:bg-sunset-300",
        className
      )}
      {...props}
    />
  );
};
