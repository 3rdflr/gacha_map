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

    try {
      // 현재 세션 확인
      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log('🔐 세션 확인:', session ? '로그인됨' : '로그인 안됨');

      if (session?.user) {
        set({ user: session.user });
        await get().loadProfile(session.user.id);
      }
    } catch (error) {
      console.error('❌ 세션 로드 실패:', error);
    }

    set({ isLoading: false });

    // 실시간 인증 상태 변경 감지
    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔄 인증 상태 변경:', event, session?.user?.email);

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
