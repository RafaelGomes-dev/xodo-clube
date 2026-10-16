"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { planos } from "@/data/planos";
import { formatarData, formatarPreco } from "@/lib/formatar";
import {
  getUsuarioLogado,
  getUsuarioCompleto,
  sair,
  type UsuarioLogado,
  type UsuarioCompleto,
} from "@/lib/usuarios";
import { getAssinatura, cancelarAssinatura, type Assinatura } from "@/lib/assinaturas";

const DIA_ENTREGA = 10;
const etapasEntrega = ["Separando os livros", "A caminho", "Entregue"];

function calcularProximaEntrega(): Date {
  const hoje = new Date();
  const entrega = new Date(hoje.getFullYear(), hoje.getMonth(), DIA_ENTREGA);
  if (hoje.getDate() >= DIA_ENTREGA) {
    entrega.setMonth(entrega.getMonth() + 1);
  }
  return entrega;
}

export default function AssinantePage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<UsuarioLogado | null>(null);
  const [dados, setDados] = useState<UsuarioCompleto | null>(null);
  const [assinatura, setAssinatura] = useState<Assinatura | null>(null);

  useEffect(() => {
    const logado = getUsuarioLogado();
    if (!logado) {
      router.replace("/login");
      return;
    }
    setUsuario(logado);
    setDados(getUsuarioCompleto(logado.email));
    setAssinatura(getAssinatura(logado.email));
  }, [router]);

  function handleSair() {
    sair();
    router.push("/");
  }

  function handleCancelar() {
    if (!usuario) return;
    if (!confirm("Tem certeza que quer cancelar a assinatura?")) return;
    cancelarAssinatura(usuario.email);
    setAssinatura(null);
  }

  if (!usuario) return null;

  const plano = planos.find((p) => p.id === assinatura?.planoId);
  const entrega = calcularProximaEntrega();
  const diasAteEntrega = Math.ceil(
    (entrega.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  const etapaAtual = diasAteEntrega <= 5 ? 1 : 0;

  return (
    <main className="px-4 py-12">
      <div className="mx-auto max-w-3xl flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-semibold">
            Oi, {usuario.nome.split(" ")[0]}!
          </h1>
          <button
            type="button"
            onClick={handleSair}
            className="rounded-full border-2 border-rosa px-5 py-2 font-semibold hover:bg-rosa/20 transition"
          >
            Sair
          </button>
        </div>

        {!plano || !assinatura ? (
          <section className="rounded-3xl bg-white p-8 shadow-sm text-center">
            <h2 className="text-xl font-semibold">Você ainda não tem um plano</h2>
            <p className="mt-2">Escolha um plano para começar a receber os livros.</p>
            <Link
              href="/planos"
              className="mt-6 inline-block rounded-full bg-amarelo px-8 py-3 font-semibold hover:brightness-95 transition"
            >
              Escolher plano
            </Link>
          </section>
        ) : (
          <>
            <section className="rounded-3xl bg-white p-8 shadow-sm">
              <p className="text-sm">Seu plano</p>
              <h2 className="text-2xl font-semibold">{plano.nome}</h2>
              <p className="mt-1">
                {formatarPreco(plano.preco)}/mês · assinante desde{" "}
                {formatarData(new Date(assinatura.inicio))}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/planos"
                  className="rounded-full bg-amarelo px-6 py-2 font-semibold hover:brightness-95 transition"
                >
                  Trocar de plano
                </Link>
                <button
                  type="button"
                  onClick={handleCancelar}
                  className="rounded-full border-2 border-azul px-6 py-2 font-semibold hover:bg-azul/20 transition"
                >
                  Cancelar assinatura
                </button>
              </div>
            </section>

            <section className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold">Próxima entrega</h2>
              <p className="mt-1">
                Previsão: <strong>{formatarData(entrega)}</strong> (
                {diasAteEntrega === 1 ? "1 dia" : `${diasAteEntrega} dias`})
              </p>

              <ol className="mt-6 grid grid-cols-3 text-center text-sm">
                {etapasEntrega.map((etapa, index) => (
                  <li key={etapa} className="relative flex flex-col items-center gap-2">
                    {index < etapasEntrega.length - 1 && (
                      <span
                        aria-hidden="true"
                        className={`absolute top-[7px] left-1/2 w-full border-t-2 border-dashed ${
                          index < etapaAtual ? "border-mint" : "border-azul/30"
                        }`}
                      />
                    )}
                    <span
                      className={`relative z-10 size-4 rounded-full ${
                        index <= etapaAtual ? "bg-mint" : "bg-azul/30"
                      }`}
                    />
                    <span className={index === etapaAtual ? "font-semibold" : ""}>
                      {etapa}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          </>
        )}

        {dados?.criancas && (
          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">Sobre as crianças</h2>

            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm">Nome(s)</dt>
                <dd className="font-medium">{dados.criancas.nomes}</dd>
              </div>
              <div>
                <dt className="text-sm">Idade(s)</dt>
                <dd className="font-medium">{dados.criancas.idades}</dd>
              </div>
              <div>
                <dt className="text-sm">Sabe ler?</dt>
                <dd className="font-medium">{dados.criancas.sabeLer}</dd>
              </div>
              <div>
                <dt className="text-sm">Hábito de leitura?</dt>
                <dd className="font-medium">{dados.criancas.habitoLeitura}</dd>
              </div>
            </dl>

            <div className="mt-4 flex flex-wrap gap-2">
              {dados.criancas.generos.map((genero) => (
                <span key={genero} className="rounded-full bg-rosa/40 px-3 py-1 text-sm">
                  {genero}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}