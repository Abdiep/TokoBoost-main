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

  // --- FITUR BARU: Penangkap Link Referral dari URL ---
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get('ref');
      if (ref) {
        // Simpan di memori HP
        localStorage.setItem('tokoboost_ref', ref);
        
        // Panggil fungsi SQL untuk nambah hitungan klik di DB
        supabase.rpc('increment_referral_clicks', { p_code: ref })
          .then(({ error }) => {
            if (!error) console.log("Klik referral tercatat!");
          });
      }
    }
  }, []);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      handleSession(session);
    };

    const handleSession = async (session: any) => {
      if (session) {
        const { user: supaUser } = session;
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', supaUser.id)
          .single();

        if (profile) {
          // --- FITUR BARU: Proses Penautan Referral ---
          const savedRef = localStorage.getItem('tokoboost_ref');
          // Jika ada kode tersimpan, user belum punya 'referred_by', dan dia bukan ngundang diri sendiri
          if (savedRef && !profile.referred_by && profile.referral_code !== savedRef) {
            console.log("Memproses tautan afiliasi...");
            // Cari ID si pemilik kode referral
            const { data: refUser } = await supabase
              .from('profiles')
              .select('id')
              .eq('referral_code', savedRef)
              .single();

            if (refUser) {
              // Tautkan user baru ini ke Bapak Afiliator-nya
              await supabase
                .from('profiles')
                .update({ referred_by: refUser.id })
                .eq('id', supaUser.id);
              console.log("Berhasil menautkan ke afiliator!");
            }
            // Hapus dari memory biar nggak diproses 2x
            localStorage.removeItem('tokoboost_ref'); 
          }

          setIsLoggedIn(true);
          setUser({
            uid: supaUser.id,
            name: supaUser.user_metadata.full_name || 'User',
            email: supaUser.email || '',
            avatar: supaUser.user_metadata.avatar_url || '',
          });
          setTokens(profile.tokens);
        } else {
          await supabase.auth.signOut();
          setIsLoggedIn(false);
          setUser(null);
          setTokens(0);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
        setTokens(0);
      }
    };

    fetchSession();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback(async () => {
    try {
      const { error: loginError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/dashboard` },
      });
      if (loginError) throw loginError;
    } catch (error: any) {
      console.error("Login Error:", error.message);
    }
  }, []);

  const logout = useCallback(async () => {await supabase.auth.signOut();}, []);

  const deductTokens = useCallback(async (amount: number): Promise<boolean> => {
    if (tokens >= amount) {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser) return false;
      const newAmount = tokens - amount;
      const { error } = await supabase.from('profiles').update({ tokens: newAmount }).eq('id', currentUser.id);
      if (!error) { setTokens(newAmount); return true; }
    }
    alert('Token Anda habis!'); return false;
  }, [tokens]);

  const addTokens = useCallback(async (amount: number) => {
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (!currentUser) return;
    const newAmount = tokens + amount;
    const { error } = await supabase.from('profiles').update({ tokens: newAmount }).eq('id', currentUser.id);
    if (!error) setTokens(newAmount);
  }, [tokens]);

  const authContextValue = useMemo(() => ({
    isLoggedIn, user, tokens, login, logout, deductTokens, addTokens, setTokens 
  }), [isLoggedIn, user, tokens, login, logout, deductTokens, addTokens]);

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};