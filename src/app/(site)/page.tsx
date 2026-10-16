import Image from "next/image";
import PlanoCard from "@/components/PlanoCard";
import ComoFunciona from "@/components/home/ComoFunciona";
import Faq from "@/components/home/Faq";
import { planos } from "@/data/planos";

export default function Home() {
  return (
    <main>
      <section className="relative">
        <Image
          src="/banner.png"
          alt="Xodó Clube de Leitura"
          width={1920}
          height={600}
          sizes="100vw"
          className="w-full h-auto"
          priority
        />
        <svg
          className="absolute -bottom-px left-0 w-full h-16 md:h-28 fill-creme"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,45 C200,95 300,115 450,110 C650,100 850,0 1050,10 C1250,20 1350,50 1440,60 L1440,120 L0,120 Z" />
        </svg>
      </section>

      <section id="planos" className="scroll-mt-24 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-semibold text-center">Escolha seu plano</h2>
          <p className="text-center mt-2 mb-12">
            Livros escolhidos para a idade da criança, entregues todo mês na sua casa.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {planos.map((plano) => (
              <PlanoCard key={plano.id} plano={plano} />
            ))}
          </div>
        </div>
      </section>

      <ComoFunciona />
      <Faq />
    </main>
  );
}