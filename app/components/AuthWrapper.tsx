// app/components/AuthWrapper.tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

export default function AuthWrapper({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const isAdmin = user?.email === 'cameronshiu@gmail.com';

  return (
    <div>
      {!user ? (
        <button onClick={login} className="bg-blue-600 text-white px-4 py-2 rounded">
          Sign in with Google
        </button>
      ) : (
        <>
          <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded">
            Sign Out
          </button>
          {isAdmin && <p className="mt-2 text-green-600">You have admin access</p>}
        </>
      )}
      {children}
    </div>
  );
}
