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
    // 1. Cek sesi saat pertama kali web dibuka
    const fetchSession = async () => {
      console.log("Mengecek sesi aktif...");
      const { data: { session } } = await supabase.auth.getSession();
      handleSession(session);
    };

    // 2. Fungsi utama pemroses sesi & profil
    const handleSession = async (session: any) => {
      if (session) {
        const { user: supaUser } = session;

        // Ambil data dari tabel profiles
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', supaUser.id)
          .single();

        if (error) {
          console.error("🚨 ERROR BACA DB:", error.message);
        }

        if (profile) {
          // Profil lengkap, set state login
          setIsLoggedIn(true);
          setUser({
            uid: supaUser.id,
            name: supaUser.user_metadata.full_name || 'User',
            email: supaUser.email || '',
            avatar: supaUser.user_metadata.avatar_url || '',
          });
          setTokens(profile.tokens);
        } else {
          // Self-Healing: Token ada di browser tapi data di DB kosong -> Paksa Logout
          console.log("🚨 Profil tidak ada di DB, membersihkan cache...");
          await supabase.auth.signOut();
          setIsLoggedIn(false);
          setUser(null);
          setTokens(0);
        }
      } else {
        // Tidak ada yang login
        setIsLoggedIn(false);
        setUser(null);
        setTokens(0);
      }
    };

    fetchSession();

    // 3. Listener: Pantau jika ada proses login/logout berjalan di background
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // --- FUNGSI UTAMA ---

  const login = useCallback(async () => {
    try {
      const { error: loginError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // Pastikan redirect selalu kembali ke domain origin yang benar (Localhost/Vercel)
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (loginError) throw loginError;
    } catch (error: any) {
      console.error("Login Error:", error.message);
      alert("Gagal terhubung ke Google. Silakan coba lagi.");
    }
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const deductTokens = useCallback(async (amount: number): Promise<boolean> => {
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

  // Bungkus context value agar tidak re-render berlebihan
  const authContextValue = useMemo(() => ({
    isLoggedIn, 
    user, 
    tokens, 
    login, 
    logout, 
    deductTokens, 
    addTokens,
    setTokens 
  }), [isLoggedIn, user, tokens, login, logout, deductTokens, addTokens]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};