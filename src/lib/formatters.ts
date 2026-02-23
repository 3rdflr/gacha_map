export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatPrice = (price: number, country: string): string => {
  if (!price) return '가격 미정';
  return country === '일본' ? `${price.toLocaleString()}엔` : `${price.toLocaleString()}원`;
};
