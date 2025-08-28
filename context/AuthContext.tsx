'use client';

import { auth } from '../firebase'

import {
  // createUserWithEmailAndPassword,
  onAuthStateChanged,
  // sendPasswordResetEmail,
  // signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// Define the shape of the context
interface AuthContextType {
  currentUser: User | null;
  isLoadingUser: boolean;
  signInWithGoogle: () => Promise<UserCredential>;
  // signup: (email: string, password: string) => Promise<any>;
  // login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  // sendPassResetEmail: (email: string) => Promise<void>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to use the context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Props for the provider
interface AuthProviderProps {
  children: ReactNode;
}

// Provider component
export default function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

  // const signup = (email: string, password: string) => {
  //   return createUserWithEmailAndPassword(auth, email, password);
  // };

  const signInWithGoogle = async () => {
    const provider = await new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
  }

  // const login = (email: string, password: string) => {
  //   return signInWithEmailAndPassword(auth, email, password);
  // };

  const logout = () => {
    setCurrentUser(null);
    return signOut(auth);
  };

  // const sendPassResetEmail = (email: string) => {
  //   return sendPasswordResetEmail(auth, email);
  // };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Authenticating user...");
      setIsLoadingUser(true);
      try {
        setCurrentUser(user);
        if (!user) throw new Error("No user found");
        console.log("Found user");
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setIsLoadingUser(false);
      }
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    isLoadingUser,
    signInWithGoogle,
    // signup,
    // login,
    logout,
    // sendPassResetEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
