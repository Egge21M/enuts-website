import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatIssueReportContent(
  issue: string,
  platform: string,
  osVersion?: string,
  deviceModel?: string
): string {
  const timestamp = new Date().toISOString();

  return `ENuts Issue Report

📅 Submitted: ${timestamp}

---

📝 ISSUE DESCRIPTION:
${issue}

---

🔧 SYSTEM INFORMATION:

Platform: ${platform}${
    osVersion
      ? `
OS Version: ${osVersion}`
      : ""
  }${
    deviceModel
      ? `
Device Model: ${deviceModel}`
      : ""
  }`;
}
