import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";
import { ThemeToggle } from "./ThemeToggle";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { session, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
          <Link to="/chat" className="text-lg font-semibold tracking-tight">
            ChatDesk
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {session ? (
              <>
                <nav className="hidden items-center gap-2 md:flex">
                  <NavLink
                    to="/chat"
                    className={({ isActive }) =>
                      `rounded-md px-3 py-2 text-sm font-medium ${
                        isActive
                          ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                          : "text-slate-600 dark:text-slate-300"
                      }`
                    }
                  >
                    Chat
                  </NavLink>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `rounded-md px-3 py-2 text-sm font-medium ${
                        isActive
                          ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                          : "text-slate-600 dark:text-slate-300"
                      }`
                    }
                  >
                    Perfil
                  </NavLink>
                  <Button variant="outline" size="sm" onClick={logout}>
                    Sair
                  </Button>
                </nav>
                <button
                  type="button"
                  onClick={() => setMenuOpen((open) => !open)}
                  className="rounded-md border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition hover:bg-slate-50 md:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                  aria-label="Abrir menu"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 6h18" />
                    <path d="M3 12h18" />
                    <path d="M3 18h18" />
                  </svg>
                </button>
              </>
            ) : null}
          </div>
        </div>
        {session ? (
          <div
            className={`md:hidden overflow-hidden transition-all duration-200 ${
              menuOpen ? "max-h-48" : "max-h-0"
            }`}
          >
            <div className="border-t border-slate-200 px-4 pb-4 pt-2 dark:border-slate-800">
              <nav className="flex flex-col gap-2">
                <NavLink
                  to="/chat"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2 text-sm font-medium ${
                      isActive
                        ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                        : "text-slate-600 dark:text-slate-300"
                    }`
                  }
                >
                  Chat
                </NavLink>
                <NavLink
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2 text-sm font-medium ${
                      isActive
                        ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                        : "text-slate-600 dark:text-slate-300"
                    }`
                  }
                >
                  Perfil
                </NavLink>
                <Button variant="outline" size="sm" onClick={logout}>
                  Sair
                </Button>
              </nav>
            </div>
          </div>
        ) : null}
      </header>
      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        {children}
      </main>
    </div>
  );
}
