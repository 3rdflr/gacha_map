import { ImageLoaderProps } from 'next/image';

export const wsrvLoader = ({ src, width, quality }: ImageLoaderProps): string => {
  const q = quality || 75;
  return `https://wsrv.nl/?url=${encodeURIComponent(src)}&w=${width}&q=${q}&output=webp`;
};
