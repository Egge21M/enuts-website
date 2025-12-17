import { Separator } from "./components/ui/separator";
import DownloadSection from "./components/DownloadSection";

export function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
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
  );
}

export default Home;
