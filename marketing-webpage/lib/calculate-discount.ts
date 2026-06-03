export function calculateDiscount(price: number, salePrice: number): number {
  if (!price || price === 0) return 0;
  return Math.round(((price - salePrice) / price) * 100);
}