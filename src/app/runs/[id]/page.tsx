"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getFindings, getRun } from "@/lib/api";
import { FindingCard } from "@/components/findings/FindingCard";
import { cn, severityColor, statusColor, timeAgo } from "@/lib/utils";

export default function RunDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: run } = useQuery({
    queryKey: ["run", id],
    queryFn: () => getRun(id),
    refetchInterval: (q) =>
      q.state.data?.status === "running" ? 5_000 : false,
  });

  const { data: findings } = useQuery({
    queryKey: ["findings", id],
    queryFn: () => getFindings(id),
    enabled: !!run,
  });

  if (!run) return <p className="text-sm text-gray-500">Loading…</p>;

  return (
    <div className="space-y-8">
      {/* Run header */}
      <div className="card">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold truncate">{run.repo}</h1>
            <p className="mt-1 font-mono text-sm text-gray-500">{run.commit_sha.slice(0, 12)}</p>
          </div>
          <span className={cn("badge border", statusColor(run.status))}>
            {run.status}
          </span>
        </div>
        <dl className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div>
            <dt className="text-gray-500">Coverage</dt>
            <dd className="font-semibold">{run.coverage_pct != null ? `${run.coverage_pct.toFixed(1)}%` : "—"}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Findings</dt>
            <dd className="font-semibold">{run.finding_count}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Triggered</dt>
            <dd className="font-semibold">{timeAgo(run.created_at)}</dd>
          </div>
        </dl>
      </div>

      {/* Findings */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Findings</h2>
        {findings?.length === 0 && (
          <p className="text-sm text-gray-500">No findings — all invariants hold.</p>
        )}
        <div className="space-y-4">
          {findings?.map((f) => <FindingCard key={f.id} finding={f} />)}
        </div>
      </div>
    </div>
  );
}
