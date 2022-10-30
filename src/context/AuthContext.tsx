import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

// create auth context type
type AuthContextType = {
  user: any;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
};

// create auth context
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  signIn: async () => {},
  logout: async () => {},
});

// create type for children
type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, loading, error] = useAuthState(auth);

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
