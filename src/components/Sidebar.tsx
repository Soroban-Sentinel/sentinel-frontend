"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PlayCircle, BarChart2, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/",         label: "Dashboard",  icon: LayoutDashboard },
  { href: "/runs",     label: "Runs",       icon: PlayCircle },
  { href: "/coverage", label: "Coverage",   icon: BarChart2 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5 border-b border-gray-100">
        <ShieldAlert className="h-6 w-6 text-green-600" aria-hidden="true" />
        <span className="font-bold text-gray-900 leading-tight">
          Soroban<br />
          <span className="text-green-600">Sentinel</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1" aria-label="Main navigation">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-green-50 text-green-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-100">
        <p className="text-xs text-gray-400">v0.1.0</p>
      </div>
    </aside>
  );
}
