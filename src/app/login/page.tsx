"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { todosUsuarios, logar } from "@/lib/usuarios";
import { useRedirecionarSeLogado } from "@/hooks/useRedirecionarSeLogado";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const verificando = useRedirecionarSeLogado("/assinante");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");

    if (!email || !senha) {
      setErro("Preencha e-mail e senha.");
      return;
    }

    setCarregando(true);

    // simula o tempo de resposta de um servidor
    setTimeout(() => {
      const usuario = todosUsuarios().find(
        (u) => u.email === email.trim().toLowerCase() && u.senha === senha
      );

      if (!usuario) {
        setErro("E-mail ou senha incorretos.");
        setCarregando(false);
        return;
      }

      logar(usuario);
      router.push("/assinante");
    }, 800);
  }

  if (verificando) return null;

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-[url('/fundo-login.png')] bg-cover bg-center">
      <div className="w-full max-w-sm bg-amarelo-claro/100 backdrop-blur-sm rounded-3xl shadow-sm p-8">
        <Image
          src="/logo-xodo.png"
          alt="Xodó Clube de Leitura"
          width={160}
          height={160}
          className="mx-auto mb-2"
          priority
        />

        <h1 className="text-2xl font-semibold text-center mb-6">Entrar</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="voce@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border-2 border-azul/40 bg-white px-4 py-2 outline-none focus:border-rosa transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="senha" className="text-sm font-medium">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="rounded-xl border-2 border-azul/40 bg-white px-4 py-2 outline-none focus:border-rosa transition"
            />
          </div>

          {erro && (
            <p role="alert" className="text-sm text-red-600 text-center">
              {erro}
            </p>
          )}

          <button
            type="submit"
            disabled={carregando}
            className="mt-2 rounded-full bg-amarelo py-3 font-semibold hover:brightness-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Ainda não é assinante?{" "}
          <Link
            href="/cadastro"
            className="font-semibold underline decoration-rosa decoration-2 underline-offset-4"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </main>
  );
}