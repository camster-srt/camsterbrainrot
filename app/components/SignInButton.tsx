'use client'

import { auth, provider } from '../firebaseConfig'
import { signInWithPopup, signOut } from 'firebase/auth'
import { useState, useEffect } from 'react'

export default function SignInButton() {
  const [user, setUser] = useState<any>(null)

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      setUser(result.user)
    } catch (error) {
      console.error("Sign-in error:", error)
    }
  }

  const handleSignOut = async () => {
    await signOut(auth)
    setUser(null)
  }

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(u => setUser(u))
    return () => unsubscribe()
  }, [])

  return (
    <div>
      {user ? (
        <div>
          <p>Signed in as {user.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign in with Google</button>
      )}
    </div>
  )
}
