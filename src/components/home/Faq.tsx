const perguntas = [
  {
    pergunta: "Como os livros são escolhidos?",
    resposta:
      "Temos uma equipe composta por professores e pedagogos, que nos auxiliam a definir o livro mais adequado para a criança baseado na idade e gostos. Todos os livros do clube assinatura, são do nosso acervo em parceria com a editora XXX.",
  },
  {
    pergunta: "Quando o kit chega?",
    resposta:
      "Todo mês! A previsão de entrega é até o dia 10, e você acompanha o status na área do assinante.",
  },
  {
    pergunta: "Posso trocar de plano?",
    resposta:
      "Pode sim. É só entrar na área do assinante e clicar em \"Trocar de plano\".",
  },
  {
    pergunta: "Posso cancelar quando quiser?",
    resposta:
      "Pode. O cancelamento é feito direto na área do assinante, sem complicação.",
  },
  {
    pergunta: "Para qual idade o clube de leitura Xodó é indicado?",
    resposta:
      "Para crianças de 0 a 12 anos! Os livros mudam conforme a idade, então o kit cresce junto com a criança.",
  },
];

export default function Faq() {
  return (
    <section id="duvidas" className="scroll-mt-24 px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-semibold text-center">Dúvidas frequentes</h2>
        <p className="text-center mt-2 mb-12">
          Se a sua não estiver aqui, fala com a gente.
        </p>

        <div className="flex flex-col gap-4">
          {perguntas.map((item) => (
            <details key={item.pergunta} className="group rounded-2xl bg-white p-6 shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                {item.pergunta}
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-amarelo text-xl transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4">{item.resposta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}