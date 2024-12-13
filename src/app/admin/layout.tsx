"use client";
import { LogoutButton } from "@/components/custom/LogoutButton";
import { Link, useTransitionRouter } from "next-view-transitions";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useTransitionRouter();

  return (
    <div className="container">
      <div className="relative z-10 min-w-full md:min-h-header md:h-header md:px-8 border-b border-transparent py-5">
        <header className="grid grid-flow-col lg:auto-cols-fr items-center py-4 md:py-0 md:h-header md:min-h-header mx-auto max-w-container px-3">
          <div className="flex space-x-1 items-center md:w-auto md:min-w-0 flex-none">
            <Link
              title="Dashboard"
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-700 flex items-center mr-3"
              href="/dashboard"
            >
              <img src="/logos/logo.svg" alt="" className="w-8" />
              <span className="ml-3 text-xl font-bold hidden">
                Espectrosoft
              </span>
            </Link>
          </div>
          <nav className="flex items-center ml-auto space-x-8">
            <Link
              className="font-semibold text-sm text-gray-500 rounded-sm hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-700 nav-link-dashboard"
              href="/dashboard"
            >
              Dashboard
            </Link>
            <LogoutButton />
          </nav>
        </header>
      </div>
      <main className="px-5 md:px-8 min-h-[calc(100vh-73px)] pb-20 bg-background">
        <div>{children}</div>
      </main>
    </div>
  );
}
