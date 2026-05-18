import clsx from "clsx";
import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select = ({ label, className, children, ...props }: SelectProps) => {
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold text-ink-700 dark:text-ink-200">
      {label && <span>{label}</span>}
      <select
        className={clsx(
          "rounded-xl border border-ink-200 bg-white px-3 py-2 text-ink-900 placeholder-ink-400",
          "focus:outline-none focus:ring-2 focus:ring-accent-300",
          "dark:border-ink-700 dark:bg-ink-900/70 dark:text-ink-100 dark:placeholder-ink-400",
          "dark:focus:ring-accent-300/60",
          className
        )}
        {...props}
      >
        {children}
      </select>
    </label>
  );
};
