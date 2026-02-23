import { describe, it, expect } from 'vitest';
import { wsrvLoader } from '@/components/common/wsrvLoader';

describe('wsrvLoader', () => {
  it('기본 URL을 wsrv.nl 형식으로 변환한다', () => {
    const result = wsrvLoader({
      src: 'https://example.com/image.png',
      width: 800,
      quality: 75,
    });
    expect(result).toBe(
      'https://wsrv.nl/?url=https%3A%2F%2Fexample.com%2Fimage.png&w=800&q=75&output=webp'
    );
  });

  it('quality가 없으면 기본값 75를 사용한다', () => {
    const result = wsrvLoader({
      src: 'https://example.com/image.png',
      width: 400,
    });
    expect(result).toContain('&q=75&');
  });

  it('지정한 quality 값을 사용한다', () => {
    const result = wsrvLoader({
      src: 'https://example.com/image.png',
      width: 400,
      quality: 90,
    });
    expect(result).toContain('&q=90&');
  });

  it('width 값이 URL에 포함된다', () => {
    const result = wsrvLoader({
      src: 'https://example.com/image.png',
      width: 1200,
      quality: 75,
    });
    expect(result).toContain('&w=1200&');
  });

  it('output은 항상 webp이다', () => {
    const result = wsrvLoader({
      src: 'https://example.com/image.png',
      width: 800,
      quality: 75,
    });
    expect(result).toContain('&output=webp');
  });

  it('src에 특수문자가 있으면 인코딩한다', () => {
    const result = wsrvLoader({
      src: 'https://example.com/path/이미지 파일.png',
      width: 800,
      quality: 75,
    });
    expect(result).not.toContain(' ');
    expect(result).toContain(encodeURIComponent('https://example.com/path/이미지 파일.png'));
  });
});
