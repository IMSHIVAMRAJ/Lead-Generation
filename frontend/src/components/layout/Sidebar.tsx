import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <aside className="hidden w-64 flex-col gap-8 border-r border-white/30 bg-white/70 px-6 py-8 backdrop-blur lg:flex dark:border-ink-800/60 dark:bg-ink-900/70">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-500 dark:text-ink-300">Smart Leads</p>
        <h1 className="mt-2 text-2xl font-bold text-ink-900 dark:text-ink-50">Control Hub</h1>
        <p className="mt-2 text-xs text-ink-500 dark:text-ink-300">Pipeline clarity in one view.</p>
      </div>
      <nav className="flex flex-col gap-2 text-sm font-semibold text-ink-600 dark:text-ink-300">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `rounded-xl px-3 py-2 transition ${
              isActive
                ? "bg-ink-900 text-white dark:bg-ink-50 dark:text-ink-900"
                : "hover:bg-ink-50 dark:hover:bg-ink-800/60"
            }`
          }
        >
          Leads Dashboard
        </NavLink>
      </nav>
      <div className="mt-auto rounded-2xl border border-white/50 bg-white/60 p-4 text-xs text-ink-600 dark:border-ink-700 dark:bg-ink-900/70 dark:text-ink-300">
        <p className="font-semibold text-ink-700 dark:text-ink-100">Quick tip</p>
        <p className="mt-1">Combine status, source, and search to narrow results fast.</p>
      </div>
    </aside>
  );
};
