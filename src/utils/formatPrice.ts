export function formatPrice(price: number | bigint) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD"
  }).format(price);
}

export function currencyToNumber(formattedPrice: string) {
  return Number(formattedPrice.replace(/[^0-9.-]+/g, ""));
}
