import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
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
    <div className="flex flex-col items-center justify-center gap-8">
      <h1 className="text-5xl md:text-6xl font-bold text-center">
        REPORT AN ISSUE
      </h1>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Let us know what's wrong</CardTitle>
        </CardHeader>
        <CardContent>
          <form ref={formRef} onSubmit={handleSubmit}>
            <FieldGroup>
              <FieldSet>
                <Field>
                  <FieldLabel>
                    Issue <span className="text-destructive">*</span>
                  </FieldLabel>
                  <FieldDescription>
                    Describe the issue you're experiencing
                  </FieldDescription>
                  <Textarea
                    name="issue"
                    placeholder="There are nuts in my phone"
                    required
                  />
                </Field>
              </FieldSet>
              <FieldSet>
                <FieldLabel>
                  Platform <span className="text-destructive">*</span>
                </FieldLabel>
                <FieldDescription>
                  The operating system you're using
                </FieldDescription>
                <RadioGroup name="platform" required>
                  <Field orientation="horizontal">
                    <RadioGroupItem value="iOS" id="iOS" />
                    <FieldLabel htmlFor="iOS" className="font-normal">
                      iOS
                    </FieldLabel>
                  </Field>
                  <Field orientation="horizontal">
                    <RadioGroupItem value="Android" id="Android" />
                    <FieldLabel htmlFor="Android" className="font-normal">
                      Android
                    </FieldLabel>
                  </Field>
                </RadioGroup>
              </FieldSet>
              <FieldSet>
                <Field>
                  <FieldLabel>OS Version</FieldLabel>
                  <FieldDescription>
                    Optional: e.g., iOS 17.2, Android 14
                  </FieldDescription>
                  <Input name="osVersion" placeholder="Enter your OS version" />
                </Field>
              </FieldSet>
              <FieldSet>
                <Field>
                  <FieldLabel>Device Model</FieldLabel>
                  <FieldDescription>
                    Optional: e.g., iPhone 15 Pro, Samsung Galaxy S24
                  </FieldDescription>
                  <Input
                    name="deviceModel"
                    placeholder="Enter your device model"
                  />
                </Field>
              </FieldSet>
              <Button type="submit" className="w-full" disabled={isLoading}>
                Submit Report
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ReportIssue;
