"use client";

import { useQuery } from "@tanstack/react-query";
import { getRuns } from "@/lib/api";
import { RunRow } from "@/components/runs/RunRow";

export default function RunsPage() {
  const { data: runs, isLoading, error } = useQuery({
    queryKey: ["runs"],
    queryFn: getRuns,
    refetchInterval: 10_000,
  });

  if (isLoading) return <p className="text-sm text-gray-500">Loading runs…</p>;
  if (error)    return <p className="text-sm text-red-500">Failed to load runs.</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Runs</h1>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
            <tr>
              <th className="px-4 py-3 text-left">Run ID</th>
              <th className="px-4 py-3 text-left">Repo</th>
              <th className="px-4 py-3 text-left">Commit</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Coverage</th>
              <th className="px-4 py-3 text-right">Findings</th>
              <th className="px-4 py-3 text-left">When</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {runs?.map((run) => <RunRow key={run.id} run={run} />)}
            {runs?.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                  No runs yet. Push a PR to trigger Sentinel.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
