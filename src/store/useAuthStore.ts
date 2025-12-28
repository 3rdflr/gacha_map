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
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('nickname, avatar_url')
        .eq('id', userId)
        .single();

      if (error) {
        // 데이터가 없는 경우(신규 유저 등) 에러가 발생할 수 있음
        console.warn('프로필을 찾을 수 없습니다:', error.message);
        set({ profile: null });
      } else {
        set({ profile: data });
      }
    } catch (err) {
      console.error('프로필 로드 중 예상치 못한 에러:', err);
    }
  },

  initialize: async () => {
    // 이미 로딩이 끝난 상태라면 중복 실행 방지
    // set({ isLoading: true }); // 제거하거나 필요시 유지

    try {
      // 1. 현재 세션 즉시 확인
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
      // 2. 초기 로드 완료 표시 (매우 중요)
      set({ isLoading: false });
    }

    // 3. 실시간 리스너 설정 (한 번만 등록되도록 주의)
    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔄 인증 상태 변경:', event);

      const user = session?.user || null;

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        set({ user, isLoading: true }); // 다시 로딩 시작
        await get().loadProfile(user!.id);
        set({ isLoading: false });
      } else if (event === 'SIGNED_OUT') {
        set({ user: null, profile: null, isLoading: false });
      } else if (event === 'INITIAL_SESSION') {
        // 초기 세션 로드 시에도 로딩 종료 보장
        set({ isLoading: false });
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
