export function formatarPreco(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatarData(data: Date) {
  return data.toLocaleDateString("pt-BR", { day: "numeric", month: "long" });
}