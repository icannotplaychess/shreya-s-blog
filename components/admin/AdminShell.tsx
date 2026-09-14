"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/posts", label: "Posts" },
  { href: "/admin/posts?status=DRAFT", label: "Drafts" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/settings", label: "Site Settings" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) return <>{children}</>;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-semibold text-pink-600">
              SHANKIE&apos;S Admin
            </Link>
            <nav className="hidden md:flex gap-4 text-sm">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`hover:text-pink-600 ${pathname === item.href.split("?")[0] ? "text-pink-600 font-medium" : "text-slate-600"}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/" target="_blank" className="text-slate-500 hover:text-pink-600">
              View site ↗
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
