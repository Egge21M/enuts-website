import { Separator } from "./components/ui/separator";
import { NetworkAnimation } from "./components/NetworkAnimation";
import DownloadSection from "./components/DownloadSection";

export function App() {
  return (
    <main>
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Background animation */}
        <div className="absolute inset-0">
          <NetworkAnimation />
        </div>

        {/* Foreground text */}
        <div className="relative z-10 px-6 py-12 md:px-12 md:py-16 w-full max-w-xl lg:max-w-2xl flex flex-col items-center justify-center gap-8">
          <h1 className="text-5xl md:text-6xl font-bold">
            <span className="text-primary">ENUTS.</span>
            <br />
            <span className="">PRIVATE.</span>
            <br />
            <span className="">SIMPLE.</span>
          </h1>
          <Separator className="w-full" />
          <div className="space-y-6 text-justify">
            <p className="text-lg">
              eNuts is back. Completely rebuilt from the ground up to bring you
              private, simple Bitcoin payments with an intuitive UX.
            </p>
            <DownloadSection />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
