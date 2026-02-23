import { describe, it, expect } from 'vitest';
import { formatDate, formatPrice } from '@/lib/formatters';

describe('formatDate', () => {
  it('날짜 문자열을 한국어 형식으로 변환한다', () => {
    const result = formatDate('2025-03-15');
    expect(result).toBe('2025년 3월 15일');
  });

  it('1자리 월/일도 올바르게 변환한다', () => {
    const result = formatDate('2025-01-05');
    expect(result).toBe('2025년 1월 5일');
  });
});

describe('formatPrice', () => {
  it('일본 가격은 엔 단위로 표시한다', () => {
    expect(formatPrice(500, '일본')).toBe('500엔');
  });

  it('일본 가격에 천 단위 구분자를 적용한다', () => {
    expect(formatPrice(4500, '일본')).toBe('4,500엔');
  });

  it('한국 가격은 원 단위로 표시한다', () => {
    expect(formatPrice(15000, '한국')).toBe('15,000원');
  });

  it('price가 0이면 "가격 미정"을 반환한다', () => {
    expect(formatPrice(0, '한국')).toBe('가격 미정');
  });

  it('알 수 없는 국가는 원 단위로 표시한다', () => {
    expect(formatPrice(1000, '미국')).toBe('1,000원');
  });
});
