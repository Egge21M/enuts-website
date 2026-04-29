import { useRef, useState } from "react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "./components/ui/field";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Textarea } from "./components/ui/textarea";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { publishIssueReportEvent } from "./lib/nostr";
import { toast } from "sonner";
import { Send } from "lucide-react";

function ReportIssue() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const issue = formData.get("issue") as string;
      const platform = formData.get("platform") as string;
      const osVersion = formData.get("osVersion") as string;
      const deviceModel = formData.get("deviceModel") as string;

      if (!issue || !platform) {
        throw new Error("Please fill in all fields", {
          cause: "Missing required fields",
        });
      }
      const results = await publishIssueReportEvent(
        issue,
        platform,
        osVersion || undefined,
        deviceModel || undefined
      );
      if (results.success.length > 0) {
        toast.success("Issue reported successfully");
        formRef.current?.reset();
      } else {
        toast.error("Failed to report issue", {
          description: "Please try again later",
        });
      }
    } catch (error) {
      toast.error("Failed to report issue", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="mx-auto grid min-h-screen max-w-6xl gap-10 px-5 pb-20 pt-28 text-white md:grid-cols-[0.8fr_1fr] md:px-8 md:pt-36">
      <div className="flex flex-col justify-between gap-12">
        <div>
          <p className="section-kicker">Support</p>
          <h1 className="mt-3 text-5xl font-bold leading-none tracking-normal md:text-7xl">
            Report an issue
          </h1>
          <p className="mt-5 max-w-md text-lg leading-8 text-white/64">
            Send a concise bug report to the eNuts team with the device context
            needed to reproduce it.
          </p>
        </div>
        <div className="hidden border-l border-primary/40 pl-5 text-sm leading-6 text-white/54 md:block">
          Reports are published through the configured Nostr relay path in this
          build.
        </div>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="rounded-lg border border-white/12 bg-white/[0.045] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-7"
      >
        <FieldGroup>
          <FieldSet>
            <Field>
              <FieldLabel className="text-white">
                Issue <span className="text-destructive">*</span>
              </FieldLabel>
              <FieldDescription className="text-white/52">
                Describe what happened and what you expected instead.
              </FieldDescription>
              <Textarea
                name="issue"
                placeholder="The wallet closes after I scan a payment request."
                className="min-h-36 border-white/14 bg-black/22 text-white placeholder:text-white/32"
                required
              />
            </Field>
          </FieldSet>
          <FieldSet>
            <FieldLabel className="text-white">
              Platform <span className="text-destructive">*</span>
            </FieldLabel>
            <FieldDescription className="text-white/52">
              The operating system you're using.
            </FieldDescription>
            <RadioGroup name="platform" required className="grid grid-cols-2 gap-3">
              <Field
                orientation="horizontal"
                className="rounded-md border border-white/12 bg-black/18 px-3 py-3"
              >
                <RadioGroupItem value="iOS" id="iOS" />
                <FieldLabel htmlFor="iOS" className="font-normal text-white">
                  iOS
                </FieldLabel>
              </Field>
              <Field
                orientation="horizontal"
                className="rounded-md border border-white/12 bg-black/18 px-3 py-3"
              >
                <RadioGroupItem value="Android" id="Android" />
                <FieldLabel
                  htmlFor="Android"
                  className="font-normal text-white"
                >
                  Android
                </FieldLabel>
              </Field>
            </RadioGroup>
          </FieldSet>
          <FieldSet>
            <Field>
              <FieldLabel className="text-white">OS Version</FieldLabel>
              <FieldDescription className="text-white/52">
                Optional: e.g., iOS 17.2, Android 14.
              </FieldDescription>
              <Input
                name="osVersion"
                placeholder="Enter your OS version"
                className="border-white/14 bg-black/22 text-white placeholder:text-white/32"
              />
            </Field>
          </FieldSet>
          <FieldSet>
            <Field>
              <FieldLabel className="text-white">Device Model</FieldLabel>
              <FieldDescription className="text-white/52">
                Optional: e.g., iPhone 15 Pro, Samsung Galaxy S24.
              </FieldDescription>
              <Input
                name="deviceModel"
                placeholder="Enter your device model"
                className="border-white/14 bg-black/22 text-white placeholder:text-white/32"
              />
            </Field>
          </FieldSet>
          <Button
            type="submit"
            className="h-12 w-full justify-between rounded-md bg-primary px-4 text-sm font-semibold text-[#06120f] hover:bg-primary/90"
            disabled={isLoading}
          >
            Submit report
            <Send />
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}

export default ReportIssue;
