import { DashboardSummary } from "@/components/dashboard/DashboardSummary";
import { RecentRuns } from "@/components/dashboard/RecentRuns";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Soroban Sentinel</h1>
        <p className="mt-1 text-sm text-gray-500">
          Automated fuzzing &amp; formal verification for every PR
        </p>
      </div>
      <DashboardSummary />
      <RecentRuns />
    </div>
  );
}
