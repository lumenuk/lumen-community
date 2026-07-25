import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "submissions");

/* File fallback for form submissions. Works on persistent hosts; on serverless
   hosts the filesystem is ephemeral, so email delivery (lib/notify.ts) is the
   primary channel there. The data/ directory is git-ignored. */
export async function saveSubmission(
  type: "membership" | "growth-audit" | "newsletter",
  payload: Record<string, unknown>
): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  const record = { type, submittedAt: new Date().toISOString(), ...payload };
  await appendFile(
    path.join(DATA_DIR, `${type}.jsonl`),
    `${JSON.stringify(record)}\n`,
    "utf8"
  );
}
