import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col text-ink-900 dark:text-ink-100">
        <Topbar />
        <main className="flex-1 px-6 pb-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
