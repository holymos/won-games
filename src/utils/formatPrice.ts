export function formatPrice(price: number | bigint) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD"
  }).format(price);
}
