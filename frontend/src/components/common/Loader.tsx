export const Loader = ({ label = "Loading" }: { label?: string }) => (
  <div className="flex items-center gap-3 text-ink-500 dark:text-ink-300">
    <span className="h-3 w-3 animate-pulse rounded-full bg-accent-500" />
    <span className="text-sm font-semibold">{label}...</span>
  </div>
);
