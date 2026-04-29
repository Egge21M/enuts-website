import { LockKeyhole, QrCode, ShieldCheck, Zap } from "lucide-react";
import DownloadSection from "./components/DownloadSection";

const principles = [
  {
    icon: LockKeyhole,
    title: "Privacy by default",
    text: "eNuts is a Cashu wallet, built around ecash payments that keep everyday spending more private.",
  },
  {
    icon: ShieldCheck,
    title: "Cashu and Lightning",
    text: "Hold and move Cashu ecash, then pay or receive through Lightning when the moment calls for it.",
  },
  {
    icon: QrCode,
    title: "QR and NFC ready",
    text: "Scan, tap, send, or receive with flows designed for quick in-person and remote payments.",
  },
  {
    icon: Zap,
    title: "Simple by design",
    text: "A streamlined wallet experience keeps the important actions close and the interface out of the way.",
  },
];

export function Home() {
  return (
    <div className="text-white">
      <section className="hero-section">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="hero-kicker">Cashu wallet for everyday Bitcoin</p>
            <h1 className="hero-title">eNuts</h1>
            <p className="hero-subtitle">
              Private Bitcoin payments, rebuilt around a calmer wallet and a
              faster path from balance to paid.
            </p>
            <DownloadSection className="mt-8" />
          </div>

          <div className="hero-stage" aria-hidden="true">
            <div className="signal-ring signal-ring-one" />
            <div className="signal-ring signal-ring-two" />
            <div className="iphone-mockup">
              <span className="iphone-button iphone-button-power" />
              <span className="iphone-button iphone-button-volume" />
              <div className="iphone-glass">
                <span className="dynamic-island" />
                <img
                  className="app-screenshot"
                  src="/enuts-app-home.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 md:grid-cols-[0.9fr_1.1fr] md:px-8">
          <div>
            <p className="section-kicker">What it does</p>
            <h2 className="section-title">
              Private Cashu payments, without the clutter.
            </h2>
          </div>
          <div className="principle-list">
            {principles.map(({ icon: Icon, title, text }) => (
              <div className="principle-row" key={title}>
                <Icon className="size-5 text-primary" />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
