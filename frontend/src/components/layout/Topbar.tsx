import { ThemeToggle } from "../common/ThemeToggle";
import { Button } from "../common/Button";
import { useAuth } from "../../context/AuthContext";

export const Topbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex flex-col gap-4 border-b border-white/30 bg-white/50 px-6 py-6 backdrop-blur sm:flex-row sm:items-center sm:justify-between dark:border-ink-800/60 dark:bg-ink-900/60">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-500 dark:text-ink-300">Lead Management</p>
        <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-50">Smart Leads Dashboard</h2>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <ThemeToggle />
        {user && (
          <div className="rounded-2xl bg-white/80 px-3 py-2 text-xs font-semibold text-ink-700 shadow dark:bg-ink-900/70 dark:text-ink-100">
            {user.name} - {user.role}
          </div>
        )}
        <Button variant="ghost" onClick={logout}>
          Log out
        </Button>
      </div>
    </header>
  );
};
