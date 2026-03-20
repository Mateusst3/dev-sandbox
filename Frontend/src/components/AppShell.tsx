import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { session, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
          <Link to="/chat" className="text-lg font-semibold tracking-tight">
            ChatDesk
          </Link>
          {session ? (
            <nav className="flex items-center gap-2">
              <NavLink
                to="/chat"
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium ${
                    isActive ? "bg-slate-900 text-white" : "text-slate-600"
                  }`
                }
              >
                Chat
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium ${
                    isActive ? "bg-slate-900 text-white" : "text-slate-600"
                  }`
                }
              >
                Perfil
              </NavLink>
              <Button variant="outline" size="sm" onClick={logout}>
                Sair
              </Button>
            </nav>
          ) : null}
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        {children}
      </main>
    </div>
  );
}
