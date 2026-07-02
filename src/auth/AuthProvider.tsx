import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type Account = { name: string; email: string; phone: string };
type StoredAccount = Account & { password: string };
export type SignUpData = StoredAccount;

const USERS_KEY = "studio-m-users";
const SESSION_KEY = "studio-m-session";

function loadUsers(): StoredAccount[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredAccount[]) : [];
  } catch {
    return [];
  }
}
function saveUsers(users: StoredAccount[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export type AuthResult = { ok: boolean; error?: "exists" | "invalid" };

type AuthContextValue = {
  user: Account | null;
  signUp: (data: SignUpData) => AuthResult;
  signIn: (email: string, password: string) => AuthResult;
  signOut: () => void;
  // Modal control
  authOpen: boolean;
  authMode: "signin" | "signup";
  /** Open the auth modal; if provided, the callback runs (with the account)
   * after a successful auth. */
  openAuth: (afterSuccess?: (user: Account) => void, mode?: "signin" | "signup") => void;
  closeAuth: () => void;
  setAuthMode: (mode: "signin" | "signup") => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Account | null>(() => {
    if (typeof window === "undefined") return null;
    const email = localStorage.getItem(SESSION_KEY);
    if (!email) return null;
    const acc = loadUsers().find((u) => u.email === email);
    return acc ? { name: acc.name, email: acc.email, phone: acc.phone } : null;
  });

  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signup");
  const afterRef = useRef<((user: Account) => void) | null>(null);

  const finishSuccess = useCallback((acc: StoredAccount) => {
    const account: Account = { name: acc.name, email: acc.email, phone: acc.phone };
    localStorage.setItem(SESSION_KEY, acc.email);
    setUser(account);
    setAuthOpen(false);
    const after = afterRef.current;
    afterRef.current = null;
    if (after) setTimeout(() => after(account), 80);
  }, []);

  const signUp = useCallback(
    (data: SignUpData): AuthResult => {
      const email = data.email.trim().toLowerCase();
      const users = loadUsers();
      if (users.some((u) => u.email === email)) return { ok: false, error: "exists" };
      const acc: StoredAccount = { ...data, email, name: data.name.trim() };
      users.push(acc);
      saveUsers(users);
      finishSuccess(acc);
      return { ok: true };
    },
    [finishSuccess]
  );

  const signIn = useCallback(
    (email: string, password: string): AuthResult => {
      const e = email.trim().toLowerCase();
      const acc = loadUsers().find((u) => u.email === e);
      if (!acc || acc.password !== password) return { ok: false, error: "invalid" };
      finishSuccess(acc);
      return { ok: true };
    },
    [finishSuccess]
  );

  const signOut = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const openAuth = useCallback(
    (afterSuccess?: (user: Account) => void, mode: "signin" | "signup" = "signup") => {
      afterRef.current = afterSuccess ?? null;
      setAuthMode(mode);
      setAuthOpen(true);
    },
    []
  );

  const closeAuth = useCallback(() => {
    afterRef.current = null;
    setAuthOpen(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signIn,
        signOut,
        authOpen,
        authMode,
        openAuth,
        closeAuth,
        setAuthMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
