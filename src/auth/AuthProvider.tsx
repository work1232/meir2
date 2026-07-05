import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type Account = { name: string; email: string; phone: string };
// Legacy stored accounts may still carry a password field — it is ignored.
type StoredAccount = Account & { password?: string };

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

type AuthContextValue = {
  user: Account | null;
  /**
   * One-step join: saves the visitor's details (upsert by email) and signs
   * them in. No passwords, no separate sign-in — a returning email simply
   * updates the stored details. This cannot "fail" beyond empty fields.
   */
  join: (data: Account) => void;
  signOut: () => void;
  // Modal control
  authOpen: boolean;
  /** Open the join modal; if provided, the callback runs (with the account)
   * after a successful join. */
  openAuth: (afterSuccess?: (user: Account) => void) => void;
  closeAuth: () => void;
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
  const afterRef = useRef<((user: Account) => void) | null>(null);

  const join = useCallback((data: Account) => {
    const email = data.email.trim().toLowerCase();
    const account: Account = {
      name: data.name.trim(),
      email,
      phone: data.phone.trim(),
    };

    const users = loadUsers();
    const idx = users.findIndex((u) => u.email === email);
    if (idx >= 0) {
      users[idx] = { ...users[idx], ...account };
    } else {
      users.push(account);
    }
    saveUsers(users);
    storageSet(SESSION_KEY, email);
    setUser(account);
    setAuthOpen(false);

    const after = afterRef.current;
    afterRef.current = null;
    // Run synchronously so it stays inside the click gesture (otherwise the
    // browser blocks opening WhatsApp).
    if (after) after(account);
  }, []);

  const signOut = useCallback(() => {
    storageRemove(SESSION_KEY);
    setUser(null);
  }, []);

  const openAuth = useCallback((afterSuccess?: (user: Account) => void) => {
    afterRef.current = afterSuccess ?? null;
    setAuthOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    afterRef.current = null;
    setAuthOpen(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, join, signOut, authOpen, openAuth, closeAuth }}
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
