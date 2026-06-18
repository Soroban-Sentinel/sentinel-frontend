import type { Finding } from "@/lib/api";
import { cn, severityColor, timeAgo } from "@/lib/utils";
import { Bug, ShieldX, Radar } from "lucide-react";

const KIND_LABEL: Record<Finding["kind"], string> = {
  fuzz_crash:          "Fuzz Crash",
  invariant_violation: "Invariant Violation",
  coverage_edge:       "New Coverage Edge",
};

const KIND_ICON: Record<Finding["kind"], React.ElementType> = {
  fuzz_crash:          Bug,
  invariant_violation: ShieldX,
  coverage_edge:       Radar,
};

export function FindingCard({ finding }: { finding: Finding }) {
  const Icon = KIND_ICON[finding.kind];

  return (
    <div className="card space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 shrink-0 text-gray-500" aria-hidden="true" />
          <span className="font-medium text-sm">{KIND_LABEL[finding.kind]}</span>
          <span className="text-gray-400 text-xs">·</span>
          <span className="text-xs text-gray-500 font-mono">{finding.contract_name}</span>
        </div>
        <span className={cn("badge border shrink-0", severityColor(finding.severity))}>
          {finding.severity}
        </span>
      </div>

      <p className="text-sm text-gray-700">{finding.description}</p>

      {finding.reproducer && (
        <details className="text-xs">
          <summary className="cursor-pointer text-gray-500 hover:text-gray-700">
            Show reproducer
          </summary>
          <pre className="mt-2 overflow-x-auto rounded-lg bg-gray-900 p-3 text-green-400">
            {finding.reproducer}
          </pre>
        </details>
      )}

      <p className="text-xs text-gray-400">{timeAgo(finding.created_at)}</p>
    </div>
  );
}
