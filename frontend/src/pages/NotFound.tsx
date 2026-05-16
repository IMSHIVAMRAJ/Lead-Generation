import { Link } from "react-router-dom";

export const NotFound = () => (
  <div className="flex min-h-screen items-center justify-center px-6 text-center">
    <div className="card max-w-lg p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-500 dark:text-ink-300">Lost</p>
      <h1 className="mt-2 text-3xl font-bold text-ink-900 dark:text-ink-100">Page not found</h1>
      <p className="mt-4 text-sm text-ink-500 dark:text-ink-300">The route you tried to reach does not exist.</p>
      <Link className="mt-6 inline-block rounded-xl bg-ink-900 px-4 py-2 text-sm font-semibold text-white dark:bg-accent-500 dark:text-ink-900" to="/">
        Return to dashboard
      </Link>
    </div>
  </div>
);
