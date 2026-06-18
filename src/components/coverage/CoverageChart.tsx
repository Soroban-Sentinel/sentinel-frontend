"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import type { CoverageSnapshot } from "@/lib/api";
import { format } from "date-fns";

interface Props {
  snapshots: CoverageSnapshot[];
}

export function CoverageChart({ snapshots }: Props) {
  const data = snapshots.map((s) => ({
    date: format(new Date(s.snapshot_at), "MMM d"),
    coverage: parseFloat(s.coverage_pct.toFixed(1)),
    edges: s.unique_edges,
    runId: s.run_id.slice(0, 8),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fill: "#9ca3af" }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          domain={[0, 100]}
          tickFormatter={(v) => `${v}%`}
          tick={{ fontSize: 11, fill: "#9ca3af" }}
          tickLine={false}
          axisLine={false}
          width={40}
        />
        <Tooltip
          formatter={(value: number) => [`${value}%`, "Coverage"]}
          labelFormatter={(label) => `Date: ${label}`}
          contentStyle={{
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            fontSize: "12px",
          }}
        />
        <ReferenceLine y={80} stroke="#22c55e" strokeDasharray="4 4" label={{ value: "80% target", fill: "#16a34a", fontSize: 11 }} />
        <Line
          type="monotone"
          dataKey="coverage"
          stroke="#22c55e"
          strokeWidth={2}
          dot={{ r: 3, fill: "#22c55e" }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
