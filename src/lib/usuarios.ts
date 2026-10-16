import { usuariosMock, type Usuario } from "@/data/usuarios";

const CHAVE_USUARIOS = "xodo:usuarios";
const CHAVE_LOGADO = "xodo:usuario";

export function getUsuariosSalvos(): Usuario[] {
  try {
    const salvo = localStorage.getItem(CHAVE_USUARIOS);
    return salvo ? JSON.parse(salvo) : [];
  } catch {
    return [];
  }
}

export function todosUsuarios(): Usuario[] {
  return [...usuariosMock, ...getUsuariosSalvos()];
}

export function emailJaCadastrado(email: string): boolean {
  return todosUsuarios().some((u) => u.email === email);
}

export function salvarUsuario(usuario: Usuario & Record<string, unknown>) {
  const usuarios = getUsuariosSalvos();
  localStorage.setItem(CHAVE_USUARIOS, JSON.stringify([...usuarios, usuario]));
}

export function logar(usuario: Usuario) {
  localStorage.setItem(
    CHAVE_LOGADO,
    JSON.stringify({ nome: usuario.nome, email: usuario.email })
  );
}

export type UsuarioLogado = {
  nome: string;
  email: string;
};

export function getUsuarioLogado(): UsuarioLogado | null {
  try {
    const salvo = localStorage.getItem(CHAVE_LOGADO);
    return salvo ? JSON.parse(salvo) : null;
  } catch {
    return null;
  }
}

export function sair() {
  localStorage.removeItem(CHAVE_LOGADO);
}

export type DadosCriancas = {
  quantidade: string;
  nomes: string;
  idades: string;
  sabeLer: string;
  habitoLeitura: string;
  generos: string[];
};

export type UsuarioCompleto = Usuario & {
  criancas?: DadosCriancas;
};

export function getUsuarioCompleto(email: string): UsuarioCompleto | null {
  const usuarios = getUsuariosSalvos() as UsuarioCompleto[];
  return usuarios.find((u) => u.email === email) ?? null;
}