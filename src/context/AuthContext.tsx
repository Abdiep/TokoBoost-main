// src/context/AuthContext.tsx
'use client';

import React, { useState, createContext, useMemo, useCallback, useContext, useEffect } from 'react';
import { User, AuthContextType } from '../types/types';
import { supabase } from "../services/supabase";

export const AuthContext = createContext<AuthContextType>(null!);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState(0);

  useEffect(() => {
    // Cek sesi saat pertama kali web dibuka
    const fetchSession = async () => {
      console.log("1. Mengecek sesi aktif...");
      const { data: { session } } = await supabase.auth.getSession();
      handleSession(session);
    };

    // Fungsi untuk memproses sesi
    const handleSession = async (session: any) => {
      if (session) {
        console.log("2. Sesi Google ditemukan! Mencari profil di DB...", session.user.id);
        const { user: supaUser } = session;

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', supaUser.id)
          .single();

        if (error) {
          console.error("🚨 ERROR BACA DB:", error.message);
        }

        if (profile) {
          console.log("3. Profil ditemukan! Login sukses.", profile);
          setIsLoggedIn(true);
          setUser({
            uid: supaUser.id,
            name: supaUser.user_metadata.full_name || 'User',
            email: supaUser.email || '',
            avatar: supaUser.user_metadata.avatar_url || '',
          });
          setTokens(profile.tokens);
        } else {
          console.log("🚨 Profil tidak ada di DB, memaksa logout...");
          await supabase.auth.signOut();
          setIsLoggedIn(false);
          setUser(null);
          setTokens(0);
        }
      } else {
        console.log("X. Tidak ada sesi aktif.");
        setIsLoggedIn(false);
        setUser(null);
        setTokens(0);
      }
    };

    fetchSession();

    // Pantau jika ada perubahan login/logout
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback(async () => {
    const { error: loginError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (loginError) console.error("Login Error:", loginError.message);
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const useTokens = useCallback(async (amount: number): Promise<boolean> => {
    if (tokens >= amount) {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser) return false;

      const newAmount = tokens - amount;
      
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ tokens: newAmount })
        .eq('id', currentUser.id);

      if (!updateError) {
        setTokens(newAmount);
        return true;
      }
      console.error("Update Error:", updateError.message);
    }
    alert('Token Anda habis!');
    return false;
  }, [tokens]);

  const addTokens = useCallback(async (amount: number) => {
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (!currentUser) return;

    const newAmount = tokens + amount;
    const { error: addError } = await supabase
      .from('profiles')
      .update({ tokens: newAmount })
      .eq('id', currentUser.id);

    if (!addError) setTokens(newAmount);
  }, [tokens]);

  const authContextValue = useMemo(() => ({
    isLoggedIn, 
    user, 
    tokens, 
    login, 
    logout, 
    useTokens, 
    addTokens,
    setTokens 
  }), [isLoggedIn, user, tokens, login, logout, useTokens, addTokens]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};