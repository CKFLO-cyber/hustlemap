'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserMode } from '@/types';

interface UserContextType {
  user: User | null;
  setUserMode: (mode: UserMode) => void;
  setSubscriptionActive: (active: boolean, plan?: string) => void;
  isSubscribed: boolean;
  navigateTo: (path: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem('casa-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse saved user:', e);
      }
    }
  }, []);

  const setUserMode = (mode: UserMode) => {
    const newUser: User = {
      id: user?.id || 'user-' + Date.now(),
      mode,
      subscription_active: false,
    };
    setUser(newUser);
    localStorage.setItem('casa-user', JSON.stringify(newUser));
  };

  const setSubscriptionActive = (active: boolean, plan?: string) => {
    if (!user) return;
    
    const updatedUser: User = {
      ...user,
      subscription_active: active,
      subscription_plan: plan as any || undefined,
    };
    setUser(updatedUser);
    localStorage.setItem('casa-user', JSON.stringify(updatedUser));
  };

  const navigateTo = (path: string) => {
    // For static export, use window.location
    if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  const isSubscribed = user?.subscription_active || false;

  return (
    <UserContext.Provider value={{
      user,
      setUserMode,
      setSubscriptionActive,
      isSubscribed,
      navigateTo,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
