import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({ label, className, ...props }: InputProps) => {
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold text-ink-700 dark:text-ink-200">
      {label && <span>{label}</span>}
      <input
        className={clsx(
          "rounded-xl border border-ink-200 bg-white px-3 py-2 text-ink-900 placeholder-ink-400",
          "focus:outline-none focus:ring-2 focus:ring-accent-300",
          "dark:border-ink-700 dark:bg-ink-900/70 dark:text-ink-100 dark:placeholder-ink-400",
          "dark:focus:ring-accent-300/60",
          className
        )}
        {...props}
      />
    </label>
  );
};
