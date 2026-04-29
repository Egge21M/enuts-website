import { Button } from "./ui/button";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { ArrowUpRight, Github, TestTube } from "lucide-react";
import { cn } from "@/lib/utils";

interface DownloadSectionProps {
  className?: string;
  compact?: boolean;
}

function DownloadSection({ className, compact = false }: DownloadSectionProps) {
  const [accepted, setAccepted] = useState(false);
  return (
    <div
      className={cn(
        "download-cta",
        compact && "download-cta-compact",
        className
      )}
    >
      <div className="space-y-1">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/90">
          Alpha test
        </p>
        {!compact && (
          <p className="max-w-md text-sm leading-6 text-white/62">
            TestFlight access is limited while the rebuild hardens.
          </p>
        )}
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          onCheckedChange={setAccepted}
          id={compact ? "accept-terms-compact" : "accept-terms"}
          className="mt-1 cursor-pointer border-white/24 bg-white/8"
        />
        <Label
          htmlFor={compact ? "accept-terms-compact" : "accept-terms"}
          className="max-w-md cursor-pointer text-sm leading-6 text-white/68"
        >
          I understand this alpha is used at my own risk.
        </Label>
      </div>

      <div className="download-actions">
        <Button
          className="download-button download-button-primary"
          disabled={!accepted}
          onClick={() =>
            window.open("https://testflight.apple.com/join/tuY72JE3", "_blank")
          }
        >
          <span className="inline-flex items-center gap-2">
            <TestTube />
            iOS TestFlight
          </span>
          <ArrowUpRight className="opacity-70" />
        </Button>
        <Button
          className="download-button download-button-secondary"
          disabled={!accepted}
          onClick={() =>
            window.open("https://github.com/cashubtc/eNuts/releases", "_blank")
          }
        >
          <span className="inline-flex items-center gap-2">
            <Github />
            Android releases
          </span>
          <ArrowUpRight className="opacity-70" />
        </Button>
      </div>
    </div>
  );
}

export default DownloadSection;
