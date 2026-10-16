"use client";

import { use, useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/Input";
import Select from "@/components/Select";
import RadioGroup from "@/components/RadioGroup";
import { planos } from "@/data/planos";
import { emailJaCadastrado, salvarUsuario, logar } from "@/lib/usuarios";
import { assinar } from "@/lib/assinaturas";
import { useRedirecionarSeLogado } from "@/hooks/useRedirecionarSeLogado";

const opcoesComoConheceu = [
  "Evento",
  "Escola",
  "Indicação",
  "Redes Sociais",
  "Anúncio",
  "Outros",
];

const opcoesGeneros = [
  "Aventura",
  "Fantasia",
  "Animais",
  "Contos de fadas",
  "Humor",
  "Natureza",
  "Ciência e curiosidades",
  "Poesia",
  "Amizade e sentimentos",
  "Mistério",
];

const formInicial = {
  nome: "",
  email: "",
  telefone: "",
  senha: "",
  confirmarSenha: "",
  comoConheceu: "",
  cep: "",
  rua: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  estado: "",
};

const criancasInicial = {
  quantidade: "",
  nomes: "",
  idades: "",
  sabeLer: "",
  habitoLeitura: "",
  generos: [] as string[],
};

const camposObrigatorios = [
  "nome",
  "email",
  "telefone",
  "senha",
  "confirmarSenha",
  "comoConheceu",
  "cep",
  "rua",
  "numero",
  "bairro",
  "cidade",
  "estado",
] as const;

type CadastroPageProps = {
  searchParams: Promise<{ plano?: string | string[] }>;
};

export default function CadastroPage({ searchParams }: CadastroPageProps) {
  const router = useRouter();
  const { plano: planoParam } = use(searchParams);
  const planoEscolhido = planos.find((p) => p.id === planoParam);

  const [etapa, setEtapa] = useState<1 | 2>(1);
  const [form, setForm] = useState(formInicial);
  const [criancas, setCriancas] = useState(criancasInicial);
  const [erro, setErro] = useState("");
  const verificando = useRedirecionarSeLogado("/planos");

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((anterior) => ({ ...anterior, [name]: value }));
  }

  function handleCriancasChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCriancas((anterior) => ({ ...anterior, [name]: value }));
  }

  function toggleGenero(genero: string) {
    setCriancas((anterior) => ({
      ...anterior,
      generos: anterior.generos.includes(genero)
        ? anterior.generos.filter((g) => g !== genero)
        : [...anterior.generos, genero],
    }));
  }

  function validarEtapa1(): string {
    if (camposObrigatorios.some((campo) => !form[campo].trim())) {
      return "Preencha todos os campos obrigatórios.";
    }
    if (!form.email.includes("@")) {
      return "Digite um e-mail válido.";
    }
    if (emailJaCadastrado(form.email.trim().toLowerCase())) {
      return "Esse e-mail já está cadastrado.";
    }
    if (form.senha.length < 6) {
      return "A senha precisa ter pelo menos 6 caracteres.";
    }
    if (form.senha !== form.confirmarSenha) {
      return "As senhas não são iguais.";
    }
    return "";
  }

  function validarEtapa2(): string {
    const { quantidade, nomes, idades, sabeLer, habitoLeitura, generos } = criancas;
    if (!quantidade || !nomes.trim() || !idades.trim() || !sabeLer || !habitoLeitura) {
      return "Preencha todas as informações das crianças.";
    }
    if (generos.length === 0) {
      return "Escolha pelo menos um gênero.";
    }
    return "";
  }

  function handleEtapa1(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const mensagem = validarEtapa1();
    setErro(mensagem);
    if (mensagem) return;
    setEtapa(2);
  }

  function handleEtapa2(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const mensagem = validarEtapa2();
    setErro(mensagem);
    if (mensagem) return;

    const { confirmarSenha, ...dados } = form;
    const usuario = {
      ...dados,
      email: form.email.trim().toLowerCase(),
      criancas,
    };

    salvarUsuario(usuario);
    logar(usuario);

    if (planoEscolhido) {
      assinar(usuario.email, planoEscolhido.id);
      router.push("/assinante");
    } else {
      router.push("/planos");
    }
  }

  function voltar() {
    setErro("");
    setEtapa(1);
  }

  if (verificando) return null;

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10 bg-[url('/fundo-login.png')] bg-cover bg-center bg-fixed">
      <div className="w-full max-w-2xl bg-amarelo-claro/100 backdrop-blur-sm rounded-3xl shadow-sm p-8">
        <Image
          src="/logo-xodo.png"
          alt="Xodó Clube de Leitura"
          width={120}
          height={120}
          className="mx-auto mb-2"
          priority
        />

        <h1 className="text-2xl font-semibold text-center">Criar conta</h1>
        <p className="text-sm text-center">Etapa {etapa} de 2</p>

        {planoEscolhido ? (
          <p className="mx-auto mt-4 mb-8 w-fit rounded-full bg-white px-4 py-1 text-sm">
            Plano escolhido: <strong>{planoEscolhido.nome}</strong>
          </p>
        ) : (
          <div className="mb-8" />
        )}

        {etapa === 1 ? (
          <form onSubmit={handleEtapa1} className="flex flex-col gap-8">
            <section>
              <h2 className="text-lg font-semibold mb-3">Seus dados</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Nome completo"
                  id="nome"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  className="md:col-span-2"
                />
                <Input
                  label="E-mail"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="voce@email.com"
                  value={form.email}
                  onChange={handleChange}
                />
                <Input
                  label="Telefone"
                  id="telefone"
                  name="telefone"
                  type="tel"
                  placeholder="(41) 99999-9999"
                  value={form.telefone}
                  onChange={handleChange}
                />
                <Input
                  label="Senha"
                  id="senha"
                  name="senha"
                  type="password"
                  value={form.senha}
                  onChange={handleChange}
                />
                <Input
                  label="Confirmar senha"
                  id="confirmarSenha"
                  name="confirmarSenha"
                  type="password"
                  value={form.confirmarSenha}
                  onChange={handleChange}
                />
                <Select
                  label="Como conheceu o Xodó?"
                  id="comoConheceu"
                  name="comoConheceu"
                  opcoes={opcoesComoConheceu}
                  value={form.comoConheceu}
                  onChange={handleChange}
                  className="md:col-span-2"
                />
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">Endereço de entrega</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="CEP"
                  id="cep"
                  name="cep"
                  placeholder="00000-000"
                  value={form.cep}
                  onChange={handleChange}
                />
                <Input
                  label="Número"
                  id="numero"
                  name="numero"
                  value={form.numero}
                  onChange={handleChange}
                />
                <Input
                  label="Rua"
                  id="rua"
                  name="rua"
                  value={form.rua}
                  onChange={handleChange}
                  className="md:col-span-2"
                />
                <Input
                  label="Complemento"
                  id="complemento"
                  name="complemento"
                  placeholder="Apto, bloco... (opcional)"
                  value={form.complemento}
                  onChange={handleChange}
                />
                <Input
                  label="Bairro"
                  id="bairro"
                  name="bairro"
                  value={form.bairro}
                  onChange={handleChange}
                />
                <Input
                  label="Cidade"
                  id="cidade"
                  name="cidade"
                  value={form.cidade}
                  onChange={handleChange}
                />
                <Input
                  label="Estado"
                  id="estado"
                  name="estado"
                  placeholder="PR"
                  maxLength={2}
                  value={form.estado}
                  onChange={handleChange}
                />
              </div>
            </section>

            {erro && (
              <p role="alert" className="text-sm text-red-600 text-center">
                {erro}
              </p>
            )}

            <button
              type="submit"
              className="rounded-full bg-amarelo py-3 font-semibold hover:brightness-95 transition"
            >
              Continuar
            </button>
          </form>
        ) : (
          <form onSubmit={handleEtapa2} className="flex flex-col gap-8">
            <RadioGroup
              label="Quantas crianças?"
              name="quantidade"
              opcoes={["1", "2", "3", "4+"]}
              valor={criancas.quantidade}
              onChange={handleCriancasChange}
            />

            <div className="flex flex-col gap-4">
              <Input
                label="Nome(s)"
                id="nomes"
                name="nomes"
                placeholder="Ex: Ana, Pedro"
                value={criancas.nomes}
                onChange={handleCriancasChange}
              />
              <Input
                label="Idade(s)"
                id="idades"
                name="idades"
                placeholder="Ex: 4 e 7 anos"
                value={criancas.idades}
                onChange={handleCriancasChange}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <RadioGroup
                label="Sabe ler?"
                name="sabeLer"
                opcoes={["Sim", "Não", "Está aprendendo"]}
                valor={criancas.sabeLer}
                onChange={handleCriancasChange}
              />
              <RadioGroup
                label="Já tem hábito de leitura?"
                name="habitoLeitura"
                opcoes={["Sim", "Não"]}
                valor={criancas.habitoLeitura}
                onChange={handleCriancasChange}
              />
            </div>

            <fieldset>
              <legend className="text-sm font-medium mb-2">
                Gêneros de interesse (pode marcar mais de um)
              </legend>
              <div className="flex flex-wrap gap-2">
                {opcoesGeneros.map((genero) => {
                  const marcado = criancas.generos.includes(genero);
                  return (
                    <label
                      key={genero}
                      className={`cursor-pointer rounded-full border-2 px-4 py-1 text-sm transition has-[:focus-visible]:ring-2 ring-azul ${
                        marcado ? "bg-rosa border-rosa" : "bg-white border-azul/40"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={marcado}
                        onChange={() => toggleGenero(genero)}
                      />
                      {genero}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {erro && (
              <p role="alert" className="text-sm text-red-600 text-center">
                {erro}
              </p>
            )}

            <div className="flex flex-col-reverse gap-3 md:flex-row">
              <button
                type="button"
                onClick={voltar}
                className="flex-1 rounded-full border-2 border-amarelo py-3 font-semibold hover:bg-amarelo/20 transition"
              >
                Voltar
              </button>
              <button
                type="submit"
                className="flex-1 rounded-full bg-amarelo py-3 font-semibold hover:brightness-95 transition"
              >
                Finalizar cadastro
              </button>
            </div>
          </form>
        )}

        <p className="text-sm text-center mt-6">
          Já é assinante?{" "}
          <Link
            href="/login"
            className="font-semibold underline decoration-rosa decoration-2 underline-offset-4"
          >
            Entrar
          </Link>
        </p>
      </div>
    </main>
  );
}