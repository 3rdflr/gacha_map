import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import type { Subscription } from '@supabase/supabase-js';

let authListener: Subscription | null = null;

interface Profile {
  nickname?: string;
  avatar_url?: string;
  is_admin?: boolean;
}

interface AuthState {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;

  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;

  loadProfile: (userId: string) => Promise<void>;
  initialize: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  isLoading: true,

  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),

  /**
   * 🔹 프로필 로드
   */
  loadProfile: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('nickname, avatar_url, is_admin')
        .eq('id', userId)
        .single();

      if (error) {
        console.warn('프로필 없음 (신규 유저 가능):', error.message);
        set({ profile: null });
        return;
      }

      set({ profile: data });
    } catch (err) {
      console.error('프로필 로드 실패:', err);
    }
  },

  // 초기화 및 인증상태 등록
  initialize: async () => {
    // 중복 등록 방지
    if (authListener) return;

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        set({ user: session.user });
        await get().loadProfile(session.user.id);
      }
    } catch (error) {
      console.error('❌ 초기 세션 확인 실패:', error);
    } finally {
      set({ isLoading: false });
    }

    // 리스너 등록 + subscription 저장
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔄 Auth Event:', event);

      if (event === 'SIGNED_IN' && session?.user) {
        set({ user: session.user });
        await get().loadProfile(session.user.id);
      }

      if (event === 'SIGNED_OUT') {
        set({ user: null, profile: null });
      }
    });

    authListener = data.subscription;
  },

  // 로그아웃
  logout: async () => {
    const ok = window.confirm('로그아웃 하시겠습니까?');
    if (!ok) return;

    await supabase.auth.signOut();
    set({ user: null, profile: null });
    alert('로그아웃 되었습니다.');
  },
}));
