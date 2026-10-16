import Link from "next/link";
import type { Plano } from "@/data/planos";
import { formatarPreco } from "@/lib/formatar";

type PlanoCardProps = {
  plano: Plano;
  onEscolher?: () => void;
};

export default function PlanoCard({ plano, onEscolher }: PlanoCardProps) {
  return (
    <article
      className={`relative flex flex-col rounded-3xl bg-white p-8 shadow-sm border-2 ${
        plano.destaque ? "border-rosa" : "border-transparent"
      }`}
    >
      {plano.destaque && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-rosa px-4 py-1 text-xs font-semibold">
          Mais escolhido
        </span>
      )}

      <h3 className="text-xl font-semibold">{plano.nome}</h3>

      <p className="mt-4">
        <span className="text-4xl font-bold">{formatarPreco(plano.preco)}</span>
        <span className="text-sm">/mês</span>
      </p>

      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {plano.beneficios.map((beneficio) => (
          <li key={beneficio} className="flex items-start gap-2">
            <span
              aria-hidden="true"
              className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-mint text-xs font-bold"
            >
              ✓
            </span>
            {beneficio}
          </li>
        ))}
      </ul>

      {onEscolher ? (
        <button
          type="button"
          onClick={onEscolher}
          className="mt-8 rounded-full bg-amarelo py-3 font-semibold hover:brightness-95 transition"
        >
          Escolher esse plano
        </button>
      ) : (
        <Link
          href={`/cadastro?plano=${plano.id}`}
          className="mt-8 rounded-full bg-amarelo py-3 text-center font-semibold hover:brightness-95 transition"
        >
          Quero esse
        </Link>
      )}
    </article>
  );
}