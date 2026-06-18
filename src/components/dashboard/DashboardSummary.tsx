"use client";

import { useQuery } from "@tanstack/react-query";
import { getRuns } from "@/lib/api";
import type { Run } from "@/lib/api";
import { ShieldCheck, AlertTriangle, BarChart2, Activity } from "lucide-react";

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="card flex items-center gap-4">
      <div className={`rounded-lg p-2 ${color}`}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

export function DashboardSummary() {
  const { data: runs } = useQuery<Run[]>({
    queryKey: ["runs"],
    queryFn: getRuns,
    refetchInterval: 30_000,
  });

  const total = runs?.length ?? 0;
  const failed = runs?.filter((r) => r.status === "failed").length ?? 0;
  const avgCoverage =
    runs && runs.length > 0
      ? (
          runs.reduce((sum, r) => sum + (r.coverage_pct ?? 0), 0) / runs.length
        ).toFixed(1)
      : "—";
  const totalFindings = runs?.reduce((sum, r) => sum + r.finding_count, 0) ?? 0;

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard label="Total Runs"      value={total}          icon={Activity}      color="bg-blue-50 text-blue-600" />
      <StatCard label="Failed Runs"     value={failed}         icon={AlertTriangle} color="bg-red-50 text-red-600" />
      <StatCard label="Avg Coverage"    value={`${avgCoverage}%`} icon={BarChart2}  color="bg-green-50 text-green-600" />
      <StatCard label="Total Findings"  value={totalFindings}  icon={ShieldCheck}   color="bg-yellow-50 text-yellow-600" />
    </div>
  );
}
