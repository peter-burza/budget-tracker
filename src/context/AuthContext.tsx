'use client'

import { auth } from '../../firebase'

import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  UserCredential
} from 'firebase/auth'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from 'react'
import { useSettingsStore } from './SettingsState'

// Define the shape of the context
interface AuthContextType {
  currentUser: User | null
  isLoadingUser: boolean
  isLoggedIn: boolean
  signInWithGoogle: () => Promise<UserCredential>
  logout: () => Promise<void>
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Hook to use the context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Props for the provider
interface AuthProviderProps {
  children: ReactNode
}

// Provider component
export default function AuthProvider({ children }: AuthProviderProps) {
  const setHasFetchedUserSettings = useSettingsStore(state => state.setHasFetchedUserSettings)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true)

  const isLoggedIn = currentUser ? true : false

  const signInWithGoogle = async () => {
    setIsLoadingUser(true)
    const provider = await new GoogleAuthProvider()
    setIsLoadingUser(false)
    return signInWithPopup(auth, provider)
  }

  const logout = async () => {
    setCurrentUser(null)
    setHasFetchedUserSettings(false)

    return await signOut(auth)
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // console.log('Authenticating user...')
      setIsLoadingUser(true)
      try {
        setCurrentUser(user)
        if (!user) throw new Error('No user found')
        console.log('Found user')
      } catch (error: any) {
        console.log(error.message)
      } finally {
        setIsLoadingUser(false)
      }
    })

    return unsubscribe
  }, [])

  const value: AuthContextType = {
    currentUser,
    isLoadingUser,
    isLoggedIn,
    signInWithGoogle,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
