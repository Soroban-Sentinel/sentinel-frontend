"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCoverage } from "@/lib/api";
import { CoverageChart } from "@/components/coverage/CoverageChart";

const CONTRACTS = ["sentinel-token", "sentinel-vault"];

export default function CoveragePage() {
  const [selected, setSelected] = useState(CONTRACTS[0]);

  const { data, isLoading } = useQuery({
    queryKey: ["coverage", selected],
    queryFn: () => getCoverage(selected),
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Coverage History</h1>

      {/* Contract selector */}
      <div className="flex gap-2">
        {CONTRACTS.map((c) => (
          <button
            key={c}
            onClick={() => setSelected(c)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              selected === c
                ? "bg-green-600 text-white"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="card">
        <h2 className="mb-4 text-base font-semibold">{selected} — edge coverage over time</h2>
        {isLoading && <p className="text-sm text-gray-400">Loading…</p>}
        {data && data.length === 0 && (
          <p className="text-sm text-gray-400">No coverage data yet for this contract.</p>
        )}
        {data && data.length > 0 && <CoverageChart snapshots={data} />}
      </div>
    </div>
  );
}
