// app/components/AuthWrapper.tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';
import { auth, provider } from '../firebaseConfig';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';

interface AuthWrapperProps {
  children: ReactNode;
  adminOnly?: boolean; // Restrict access to admin if true
}

export default function AuthWrapper({ children, adminOnly = false }: AuthWrapperProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  // While checking auth state
  if (loading) {
    return <p className="text-center mt-20 text-gray-600">Loading...</p>;
  }

  // If not logged in
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <button
          onClick={login}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  // If adminOnly page but user is not admin
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

  // User is logged in (and admin if adminOnly)
  return <>{children}</>;
}
