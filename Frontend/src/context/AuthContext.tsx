import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api } from "../lib/api";
import { clearSession, getSession, setSession } from "../lib/storage";
import type { Session, User } from "../types";

type LoginInput = {
  email: string;
  password: string;
};

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

type ProfileInput = {
  name: string;
  email: string;
};

type AuthContextValue = {
  session: Session | null;
  loading: boolean;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  updateProfile: (input: ProfileInput) => Promise<User>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSessionState] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getSession();
    if (stored) {
      setSessionState(stored);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    const response = await api.post<Session>("/login", input);
    setSession(response.data);
    setSessionState(response.data);
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    const response = await api.post<Session>("/register", input);
    setSession(response.data);
    setSessionState(response.data);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setSessionState(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!session) return;
    const response = await api.get<User>("/user");
    const updated: Session = { ...session, user: response.data };
    setSession(updated);
    setSessionState(updated);
  }, [session]);

  const updateProfile = useCallback(
    async (input: ProfileInput) => {
      const response = await api.patch<User>("/user", input);
      if (session) {
        const updated: Session = { ...session, user: response.data };
        setSession(updated);
        setSessionState(updated);
      }
      return response.data;
    },
    [session]
  );

  const value = useMemo(
    () => ({
      session,
      loading,
      login,
      register,
      logout,
      refreshProfile,
      updateProfile,
    }),
    [session, loading, login, register, logout, refreshProfile, updateProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
