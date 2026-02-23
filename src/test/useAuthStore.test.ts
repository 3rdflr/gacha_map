import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAuthStore } from '@/store/useAuthStore';

// Supabase 전체 mock
vi.mock('@/lib/supabase', () => {
  const mockSubscription = { unsubscribe: vi.fn() };

  return {
    supabase: {
      auth: {
        getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
        onAuthStateChange: vi.fn().mockReturnValue({ data: { subscription: mockSubscription } }),
        signOut: vi.fn().mockResolvedValue({}),
      },
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: null, error: null }),
      }),
    },
  };
});

describe('useAuthStore', () => {
  beforeEach(() => {
    // 각 테스트 전 스토어 초기 상태로 리셋
    useAuthStore.setState({
      user: null,
      profile: null,
      isLoading: true,
    });
    // authListener 리셋을 위해 모듈 캐시를 우회
    vi.clearAllMocks();
  });

  describe('setUser / setProfile', () => {
    it('setUser로 user를 설정한다', () => {
      const mockUser = { id: 'user-1', email: 'test@example.com' } as any;
      useAuthStore.getState().setUser(mockUser);
      expect(useAuthStore.getState().user).toEqual(mockUser);
    });

    it('setUser(null)로 user를 초기화한다', () => {
      useAuthStore.setState({ user: { id: 'user-1' } as any });
      useAuthStore.getState().setUser(null);
      expect(useAuthStore.getState().user).toBeNull();
    });

    it('setProfile로 profile을 설정한다', () => {
      const mockProfile = { nickname: '테스트유저', is_admin: false };
      useAuthStore.getState().setProfile(mockProfile);
      expect(useAuthStore.getState().profile).toEqual(mockProfile);
    });

    it('setProfile(null)로 profile을 초기화한다', () => {
      useAuthStore.setState({ profile: { nickname: '유저' } });
      useAuthStore.getState().setProfile(null);
      expect(useAuthStore.getState().profile).toBeNull();
    });
  });

  describe('loadProfile', () => {
    it('프로필 로드 성공 시 profile 상태를 업데이트한다', async () => {
      const { supabase } = await import('@/lib/supabase');
      const mockProfile = { nickname: '홍길동', avatar_url: null, is_admin: false };

      (supabase.from as any).mockReturnValue({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: mockProfile, error: null }),
      });

      await useAuthStore.getState().loadProfile('user-1');
      expect(useAuthStore.getState().profile).toEqual(mockProfile);
    });

    it('프로필 로드 실패 시 profile을 null로 설정한다', async () => {
      const { supabase } = await import('@/lib/supabase');

      (supabase.from as any).mockReturnValue({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: null, error: { message: '프로필 없음' } }),
      });

      useAuthStore.setState({ profile: { nickname: '기존유저' } });
      await useAuthStore.getState().loadProfile('user-1');
      expect(useAuthStore.getState().profile).toBeNull();
    });
  });

  describe('초기 상태', () => {
    it('초기 user는 null이다', () => {
      expect(useAuthStore.getState().user).toBeNull();
    });

    it('초기 profile은 null이다', () => {
      expect(useAuthStore.getState().profile).toBeNull();
    });
  });
});
