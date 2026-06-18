import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow } from "date-fns";
import type { FindingSeverity, RunStatus } from "./api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeAgo(dateStr: string): string {
  return formatDistanceToNow(new Date(dateStr), { addSuffix: true });
}

export function severityColor(severity: FindingSeverity): string {
  switch (severity) {
    case "critical": return "text-red-600 bg-red-50 border-red-200";
    case "high":     return "text-orange-600 bg-orange-50 border-orange-200";
    case "medium":   return "text-yellow-600 bg-yellow-50 border-yellow-200";
    case "low":      return "text-blue-600 bg-blue-50 border-blue-200";
    case "info":     return "text-gray-600 bg-gray-50 border-gray-200";
  }
}

export function statusColor(status: RunStatus): string {
  switch (status) {
    case "passed":  return "text-green-700 bg-green-50 border-green-200";
    case "failed":  return "text-red-700 bg-red-50 border-red-200";
    case "running": return "text-blue-700 bg-blue-50 border-blue-200";
    case "queued":  return "text-gray-600 bg-gray-50 border-gray-200";
    case "errored": return "text-purple-700 bg-purple-50 border-purple-200";
  }
}
