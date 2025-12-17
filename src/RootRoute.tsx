import { Outlet } from "react-router";
import { NetworkAnimation } from "./components/NetworkAnimation";

function RootRoute() {
  return (
    <div className="relative min-h-screen">
      {/* Fixed background animation spanning full viewport */}
      <div className="fixed inset-0 -z-10">
        <NetworkAnimation />
      </div>

      {/* Scrollable content area */}
      <div className="relative z-0">
        <Outlet />
      </div>
    </div>
  );
}

export default RootRoute;
