export type Plano = {
  id: string;
  nome: string;
  preco: number;
  beneficios: string[];
  destaque?: boolean;
};

const beneficiosComuns = [
  "Atividade interativa",
  "Card exclusivo",
  "Desconto na loja",
];

export const planos: Plano[] = [
  {
    id: "essencial",
    nome: "Plano Essencial",
    preco: 49.9,
    beneficios: ["1 livro infantil indicado para a idade", ...beneficiosComuns],
  },
    {
    id: "duplo",
    nome: "Plano Em Dobro",
    preco: 69.9,
    beneficios: [
      "2 livros infantis indicados para a idade",
      ...beneficiosComuns,
      "Brinde exclusivo",
    ],
    destaque: true,
  },
];