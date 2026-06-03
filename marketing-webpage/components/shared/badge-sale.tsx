import { calculateDiscount } from "@/lib/calculate-discount";
import { Badge } from "@/components/ui/badge";

interface BadgeSaleProps {
  price: number;
  salePrice: number;
}

export function BadgeSale({ price, salePrice }: BadgeSaleProps) {
  const discount = calculateDiscount(price, salePrice);
  return (
    <Badge variant="gold" className="absolute top-3 left-3 z-10">
      -{discount}%
    </Badge>
  );
}