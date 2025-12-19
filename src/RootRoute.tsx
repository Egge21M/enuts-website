import { Outlet } from "react-router";
import { NetworkAnimation } from "./components/NetworkAnimation";
import { Toaster } from "./components/ui/sonner";

function RootRoute() {
  return (
    <div className="relative min-h-screen">
      {/* Fixed background animation spanning full viewport */}
      <div className="fixed inset-0 -z-10">
        <NetworkAnimation />
      </div>

      {/* Scrollable content area with centered layout */}
      <main className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="px-6 py-12 md:px-12 md:py-16 w-full max-w-xl lg:max-w-2xl">
          <Outlet />
        </div>
      </main>
      <Toaster position="top-center" />
    </div>
  );
}

export default RootRoute;
