import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthState {
  user: User | null;
  profile: {
    nickname?: string;
    avatar_url?: string;
  } | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setProfile: (profile: { nickname?: string; avatar_url?: string } | null) => void;
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

  // 프로필 데이터 로드
  loadProfile: async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('nickname, avatar_url')
      .eq('id', userId)
      .single();

    set({ profile: data || null });
  },

  // 초기화: 세션 확인 및 실시간 리스너 설정
  initialize: async () => {
    set({ isLoading: true });

    // 현재 세션 확인
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      set({ user: session.user });
      await get().loadProfile(session.user.id);
    }

    set({ isLoading: false });

    // 실시간 인증 상태 변경 감지
    supabase.auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user || null;
      set({ user });

      if (user) {
        await get().loadProfile(user.id);
      } else {
        set({ profile: null });
      }
    });
  },

  // 로그아웃
  logout: async () => {
    const confirm = window.confirm('로그아웃 하시겠습니까?');
    if (confirm) {
      await supabase.auth.signOut();
      set({ user: null, profile: null });
      alert('로그아웃 되었습니다.');
    }
  },
}));
