import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: (email: string) => {
    set({
      user: {
        id: '1',
        email,
        name: 'Demo User'
      },
      isAuthenticated: true,
      error: null
    });
  },

  logout: () => {
    set({ 
      user: null, 
      isAuthenticated: false, 
      error: null 
    });
  }
}));