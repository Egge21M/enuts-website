import {
  finalizeEvent,
  generateSecretKey,
  nip04,
  SimplePool,
  type Event,
  type EventTemplate,
} from "nostr-tools";
import { formatIssueReportContent } from "./utils";
const RELAYS = ["wss://relay.damus.io", "wss://relay.snort.social"];

const pool = new SimplePool();
const receiverPubkeyHex =
  "ddf03aca85ade039e6742d5bef3df352df199d0d31e22b9858e7eda85cb3bbbe";
const randomSecretKey = generateSecretKey();

export async function publishIssueReportEvent(
  issue: string,
  platform: string,
  osVersion?: string,
  deviceModel?: string
): Promise<{ success: string[]; failed: string[]; timeout: string[] }> {
  const event = createIssueReportEventTemplate(
    issue,
    platform,
    osVersion,
    deviceModel
  );
  const signedEvent = finalizeEvent(event, randomSecretKey);
  const results: { success: string[]; failed: string[]; timeout: string[] } = {
    success: [],
    failed: [],
    timeout: [],
  };
  const promiseResults = await publishEvent(signedEvent);
  for (const [relay, result] of promiseResults) {
    if (result === "success") {
      results.success.push(relay);
    } else if (result === "failed") {
      results.failed.push(relay);
    } else if (result === "timeout") {
      results.timeout.push(relay);
    }
  }
  return results;
}

async function publishEvent(
  event: Event
): Promise<Map<string, "success" | "failed" | "timeout">> {
  const pubPromises = pool.publish(RELAYS, event);
  const timeoutMs = 3500;

  const results = await Promise.all(
    pubPromises.map(async (p, index) => {
      const relay = RELAYS[index];
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), timeoutMs)
      );

      try {
        await Promise.race([p, timeout]);
        return [relay, "success"] as const;
      } catch (error) {
        if (error instanceof Error && error.message === "timeout") {
          return [relay, "timeout"] as const;
        }
        return [relay, "failed"] as const;
      }
    })
  );

  return new Map(results);
}

function createIssueReportEventTemplate(
  issue: string,
  platform: string,
  osVersion?: string,
  deviceModel?: string
): EventTemplate {
  const encryptedContent = nip04.encrypt(
    randomSecretKey,
    receiverPubkeyHex,
    formatIssueReportContent(issue, platform, osVersion, deviceModel)
  );
  const template: EventTemplate = {
    kind: 4,
    tags: [["p", receiverPubkeyHex]],
    content: encryptedContent,
    created_at: Math.floor(Date.now() / 1000),
  };
  return template;
}
