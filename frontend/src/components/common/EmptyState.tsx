export const EmptyState = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="rounded-2xl border border-dashed border-ink-200 p-8 text-center text-ink-600 dark:border-ink-700 dark:text-ink-300">
    <p className="text-lg font-semibold text-ink-700 dark:text-ink-100">{title}</p>
    {subtitle && <p className="mt-2 text-sm">{subtitle}</p>}
  </div>
);
