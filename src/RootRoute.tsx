import { Link, Outlet } from "react-router";
import { NetworkAnimation } from "./components/NetworkAnimation";
import { Toaster } from "./components/ui/sonner";

function RootRoute() {
  return (
    <div className="site-shell relative min-h-screen overflow-x-hidden">
      <div className="fixed inset-0 -z-20">
        <NetworkAnimation />
      </div>
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_72%_18%,rgba(42,229,169,0.18),transparent_32%),linear-gradient(135deg,rgba(3,10,14,0.94),rgba(5,18,23,0.86)_46%,rgba(2,8,10,0.96))]" />

      <header className="relative z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <Link
            to="/"
            className="text-sm font-semibold tracking-[0.28em] text-white"
          >
            ENUTS
          </Link>
          <nav className="flex items-center gap-5 text-sm text-white/62">
            <Link className="transition-colors hover:text-white" to="/">
              Home
            </Link>
            <Link
              className="transition-colors hover:text-white"
              to="/report-issue"
            >
              Support
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 min-h-screen">
        <Outlet />
      </main>
      <Toaster position="top-center" />
    </div>
  );
}

export default RootRoute;
