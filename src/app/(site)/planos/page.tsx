"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PlanoCard from "@/components/PlanoCard";
import { planos } from "@/data/planos";
import { getUsuarioLogado, type UsuarioLogado } from "@/lib/usuarios";
import { assinar } from "@/lib/assinaturas";

export default function PlanosPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<UsuarioLogado | null>(null);

  useEffect(() => {
    const logado = getUsuarioLogado();
    if (!logado) {
      router.replace("/login");
      return;
    }
    setUsuario(logado);
  }, [router]);

  function escolher(planoId: string) {
    if (!usuario) return;
    assinar(usuario.email, planoId);
    router.push("/assinante");
  }

  if (!usuario) return null;

  const primeiroNome = usuario.nome.split(" ")[0];

  return (
    <main className="px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-semibold text-center">
          Oi, {primeiroNome}! Escolha seu plano
        </h1>
        <p className="text-center mt-2 mb-12">
          Você pode trocar de plano quando quiser.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {planos.map((plano) => (
            <PlanoCard
              key={plano.id}
              plano={plano}
              onEscolher={() => escolher(plano.id)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}