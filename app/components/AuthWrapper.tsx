// app/components/AuthWrapper.tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  setPersistence,
  browserSessionPersistence
} from 'firebase/auth';

interface AuthWrapperProps {
  children: ReactNode;
  adminOnly?: boolean;
}

export default function AuthWrapper({ children, adminOnly = false }: AuthWrapperProps) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    if (loginLoading) return;
    setLoginLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await setPersistence(auth, browserSessionPersistence); // session-only
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error('Login error:', error);
    } finally {
      setLoginLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const isAdmin = user?.email === 'cameronshiu@gmail.com';

  if (loading) return <p className="text-center mt-20 text-gray-600">Loading...</p>;

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <button
          onClick={login}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
        >
          {loginLoading ? 'Signing in...' : 'Sign in with Google'}
        </button>
      </div>
    );
  }

  if (adminOnly && !isAdmin) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center">
        <p className="text-red-600 text-xl mb-4">Access Denied</p>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-red-700 transition"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="absolute top-4 left-4">
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Sign Out
        </button>
      </div>
      {children}
    </div>
  );
}
