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

/**
 * Storage that NEVER throws. iOS Safari in private browsing and some in-app
 * browsers (Instagram/Facebook) block localStorage — a raw setItem there
 * throws, which used to crash sign-up silently ("the button does nothing").
 * When localStorage is unavailable we fall back to in-memory storage, so
 * login still works for the current visit.
 */
const memStore: Record<string, string> = {};

function storageGet(key: string): string | null {
  try {
    const v = localStorage.getItem(key);
    if (v !== null) return v;
  } catch {
    /* blocked */
  }
  return key in memStore ? memStore[key] : null;
}

function storageSet(key: string, value: string) {
  memStore[key] = value;
  try {
    localStorage.setItem(key, value);
  } catch {
    /* blocked — memStore already holds it */
  }
}

function storageRemove(key: string) {
  delete memStore[key];
  try {
    localStorage.removeItem(key);
  } catch {
    /* blocked */
  }
}

function loadUsers(): StoredAccount[] {
  try {
    const raw = storageGet(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredAccount[]) : [];
  } catch {
    return [];
  }
}
function saveUsers(users: StoredAccount[]) {
  storageSet(USERS_KEY, JSON.stringify(users));
}

export type AuthResult = {
  ok: boolean;
  error?: "exists" | "invalid" | "notfound";
};

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
    const email = storageGet(SESSION_KEY);
    if (!email) return null;
    const acc = loadUsers().find((u) => u.email === email);
    return acc ? { name: acc.name, email: acc.email, phone: acc.phone } : null;
  });

  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signup");
  const afterRef = useRef<((user: Account) => void) | null>(null);

  const finishSuccess = useCallback((acc: StoredAccount) => {
    const account: Account = { name: acc.name, email: acc.email, phone: acc.phone };
    storageSet(SESSION_KEY, acc.email);
    setUser(account);
    setAuthOpen(false);
    const after = afterRef.current;
    afterRef.current = null;
    // Run synchronously so it stays inside the click gesture (otherwise the
    // browser blocks opening WhatsApp as a popup).
    if (after) after(account);
  }, []);

  const signUp = useCallback(
    (data: SignUpData): AuthResult => {
      const email = data.email.trim().toLowerCase();
      const users = loadUsers();
      const existing = users.find((u) => u.email === email);
      if (existing) {
        // Same email + same password → the user simply re-registered; treat
        // it as a sign-in instead of failing ("sometimes it doesn't work").
        if (existing.password === data.password) {
          finishSuccess(existing);
          return { ok: true };
        }
        return { ok: false, error: "exists" };
      }
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
      // Distinguish "no such account" (→ UI switches to sign-up) from a
      // wrong password.
      if (!acc) return { ok: false, error: "notfound" };
      if (acc.password !== password) return { ok: false, error: "invalid" };
      finishSuccess(acc);
      return { ok: true };
    },
    [finishSuccess]
  );

  const signOut = useCallback(() => {
    storageRemove(SESSION_KEY);
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
