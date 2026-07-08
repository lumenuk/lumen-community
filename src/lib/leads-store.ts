import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import type { GrowthAuditInput } from "@/lib/validation/growth-audit";

export type GrowthAuditLead = Omit<GrowthAuditInput, "company"> & {
  submittedAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data", "leads");
const LEADS_FILE = path.join(DATA_DIR, "growth-audit-leads.jsonl");

export async function saveGrowthAuditLead(lead: GrowthAuditLead): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await appendFile(LEADS_FILE, `${JSON.stringify(lead)}\n`, "utf8");
}
