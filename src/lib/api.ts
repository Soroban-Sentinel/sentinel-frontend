import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export const api = axios.create({ baseURL: BASE });

// ── Types ────────────────────────────────────────────────────────────────────

export type RunStatus = "queued" | "running" | "passed" | "failed" | "errored";

export interface Run {
  id: string;
  repo: string;
  commit_sha: string;
  pr_number?: number;
  status: RunStatus;
  created_at: string;
  completed_at?: string;
  coverage_pct?: number;
  finding_count: number;
}

export type FindingSeverity = "critical" | "high" | "medium" | "low" | "info";
export type FindingKind = "fuzz_crash" | "invariant_violation" | "coverage_edge";

export interface Finding {
  id: string;
  run_id: string;
  contract_name: string;
  kind: FindingKind;
  severity: FindingSeverity;
  description: string;
  reproducer?: string;
  created_at: string;
}

export interface CoverageSnapshot {
  run_id: string;
  contract_name: string;
  coverage_pct: number;
  unique_edges: number;
  snapshot_at: string;
}

// ── API calls ────────────────────────────────────────────────────────────────

export const getRuns = async (): Promise<Run[]> => {
  const { data } = await api.get<Run[]>("/runs");
  return data;
};

export const getRun = async (id: string): Promise<Run> => {
  const { data } = await api.get<Run>(`/runs/${id}`);
  return data;
};

export const getFindings = async (runId: string): Promise<Finding[]> => {
  const { data } = await api.get<Finding[]>(`/runs/${runId}/findings`);
  return data;
};

export const getCoverage = async (contract: string): Promise<CoverageSnapshot[]> => {
  const { data } = await api.get<CoverageSnapshot[]>(`/coverage/${contract}`);
  return data;
};
