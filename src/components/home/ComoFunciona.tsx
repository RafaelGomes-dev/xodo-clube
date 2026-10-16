const passos = [
  {
    titulo: "Faça o cadastro",
    texto: "Conte pra gente a idade e os gostos da criança.",
  },
  {
    titulo: "A gente escolhe",
    texto: "Selecionamos livros pensados para a idade e os interesses dela.",
  },
  {
    titulo: "Chega em casa",
    texto: "Todo mês o kit chega no seu endereço, sem você precisar sair.",
  },
  {
    titulo: "Leiam juntos",
    texto: "Com a atividade interativa, a leitura vira um momento em família.",
  },
];

const cores = ["bg-rosa", "bg-amarelo", "bg-azul", "bg-mint"];

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="scroll-mt-24 bg-white px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-semibold text-center">Como funciona o kit</h2>
        <p className="text-center mt-2 mb-12">
          Do cadastro até a hora da história, em 4 passos.
        </p>

        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {passos.map((passo, index) => (
            <li key={passo.titulo} className="flex flex-col items-center text-center">
              <div
                className={`flex size-24 items-center justify-center rounded-full text-4xl font-bold ${
                  cores[index % cores.length]
                }`}
              >
                {index + 1}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{passo.titulo}</h3>
              <p className="mt-1 text-sm">{passo.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}