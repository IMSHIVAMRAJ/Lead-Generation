export const ErrorState = ({ message }: { message: string }) => (
  <div className="rounded-2xl border border-sunset-300/70 bg-sunset-300/20 p-4 text-sm font-semibold text-ink-700 dark:border-sunset-300/60 dark:text-ink-100">
    {message}
  </div>
);
