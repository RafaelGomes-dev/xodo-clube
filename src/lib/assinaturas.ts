const CHAVE_ASSINATURAS = "xodo:assinaturas";

export type Assinatura = {
  planoId: string;
  inicio: string;
};

function lerTodas(): Record<string, Assinatura> {
  try {
    const salvo = localStorage.getItem(CHAVE_ASSINATURAS);
    return salvo ? JSON.parse(salvo) : {};
  } catch {
    return {};
  }
}

export function getAssinatura(email: string): Assinatura | null {
  return lerTodas()[email] ?? null;
}

export function assinar(email: string, planoId: string) {
  const todas = lerTodas();
  todas[email] = { planoId, inicio: new Date().toISOString() };
  localStorage.setItem(CHAVE_ASSINATURAS, JSON.stringify(todas));
}

export function cancelarAssinatura(email: string) {
  const todas = lerTodas();
  delete todas[email];
  localStorage.setItem(CHAVE_ASSINATURAS, JSON.stringify(todas));
}