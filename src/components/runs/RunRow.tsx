import Link from "next/link";
import type { Run } from "@/lib/api";
import { cn, statusColor, timeAgo } from "@/lib/utils";

export function RunRow({ run }: { run: Run }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3">
        <Link
          href={`/runs/${run.id}`}
          className="font-mono text-xs text-green-700 hover:underline"
        >
          {run.id.slice(0, 8)}
        </Link>
      </td>
      <td className="px-4 py-3 max-w-[200px] truncate text-gray-700">
        {run.repo}
      </td>
      <td className="px-4 py-3 font-mono text-xs text-gray-500">
        {run.commit_sha.slice(0, 8)}
        {run.pr_number && (
          <span className="ml-2 text-blue-500">#{run.pr_number}</span>
        )}
      </td>
      <td className="px-4 py-3">
        <span className={cn("badge border", statusColor(run.status))}>
          {run.status}
        </span>
      </td>
      <td className="px-4 py-3 text-right tabular-nums">
        {run.coverage_pct != null ? `${run.coverage_pct.toFixed(1)}%` : "—"}
      </td>
      <td className="px-4 py-3 text-right tabular-nums">
        <span
          className={
            run.finding_count > 0 ? "font-semibold text-red-600" : "text-gray-500"
          }
        >
          {run.finding_count}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-400">
        {timeAgo(run.created_at)}
      </td>
    </tr>
  );
}
