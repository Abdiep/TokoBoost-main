// src/context/AuthContext.tsx
'use client'; // <--- WAJIB ADA DI NEXT.JS APP ROUTER

import React, { useState, createContext, useMemo, useCallback, useContext, useEffect } from 'react';
import { User, AuthContextType } from '../types/types';
import { INITIAL_TOKENS } from '../constants/constants';
// Import dari services yang baru kita buat
import { auth, googleProvider, db } from "../services/firebase"; 
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";

export const AuthContext = createContext<AuthContextType>(null!);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User LOGGED IN
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        let currentTokens = 0;
        const today = new Date().toDateString();

        if (userSnap.exists()) {
          // --- USER LAMA ---
          const userData = userSnap.data();
          currentTokens = userData.tokens || 0;
          
          let lastRefreshDate = '';
          if (userData.lastDailyRefresh) {
             lastRefreshDate = userData.lastDailyRefresh.toDate().toDateString();
          }

          if (currentTokens === 0 && lastRefreshDate !== today) {
            currentTokens = 3; // Daily Bonus
            await setDoc(userRef, { 
              tokens: currentTokens,
              lastDailyRefresh: Timestamp.now(),
              lastLogin: Timestamp.now(),
              name: firebaseUser.displayName,
              avatar: firebaseUser.photoURL
            }, { merge: true });
          } else {
             await setDoc(userRef, { 
                lastLogin: Timestamp.now(),
                name: firebaseUser.displayName,
                avatar: firebaseUser.photoURL
             }, { merge: true });
          }

        } else {
          // --- USER BARU ---
          currentTokens = INITIAL_TOKENS;
          await setDoc(userRef, {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName,
            avatar: firebaseUser.photoURL,
            lastLogin: Timestamp.now(),
            createdAt: Timestamp.now(),
            tokens: currentTokens,
          });
        }

        setUser({
          name: firebaseUser.displayName || 'Pengguna',
          email: firebaseUser.email || 'email@tokoboost.com',
          avatar: firebaseUser.photoURL || 'https://picsum.photos/100/100'
        });
        setTokens(currentTokens);
        setIsLoggedIn(true);

      } else {
        // User LOGGED OUT
        setIsLoggedIn(false);
        setUser(null);
        setTokens(0);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = useCallback(async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error saat login Google:", error);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error saat logout:", error);
    }
  }, []);

  const deductTokens = useCallback(async (amount: number): Promise<boolean> => {
    const currentUser = auth.currentUser;
    if (!currentUser) return false;
    
    if (tokens >= amount) {
      setTokens(prev => prev - amount);
      const userRef = doc(db, "users", currentUser.uid);
      try {
          await setDoc(userRef, { tokens: tokens - amount }, { merge: true });
          return true;
      } catch (error) {
          console.error("Gagal update token di DB:", error);
          setTokens(prev => prev + amount); 
          alert('Gagal memproses token. Silakan coba lagi.');
          return false;
      }
    }
    alert('Token Anda habis! Top up dulu yuk untuk lanjut berkreasi.');
    return false;
  }, [tokens]);

  const addTokens = useCallback(async (amount: number) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;
    const newTokens = tokens + amount;
    setTokens(newTokens); 
    try {
      const userRef = doc(db, "users", currentUser.uid);
      await setDoc(userRef, { tokens: newTokens }, { merge: true });
    } catch (error) {
      console.error("Gagal menambahkan token ke DB:", error);
      setTokens(tokens);
    }
  }, [tokens]);

  const authContextValue = useMemo(() => ({
    isLoggedIn, user, tokens, login, logout, deductTokens, setTokens, addTokens
  }), [isLoggedIn, user, tokens, login, logout, deductTokens, addTokens]);

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

