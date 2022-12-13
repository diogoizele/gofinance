export function currency(amount: number) {
  return amount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}