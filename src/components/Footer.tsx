import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/#planos", label: "Planos" },
  { href: "/#como-funciona", label: "Como funciona o kit" },
  { href: "/#duvidas", label: "Dúvidas frequentes" },
  { href: "/assinante", label: "Área do assinante" },
];

export default function Footer() {
  return (
    <footer className="bg-azul/20 px-4 pt-12 pb-6">
      <div className="mx-auto max-w-6xl flex flex-col gap-10 md:flex-row md:justify-between">
        <div className="max-w-xs">
          <Image
            src="/logo-xodo.png"
            alt="Xodó Clube de Leitura"
            width={120}
            height={120}
          />
          <p className="mt-2 text-sm">
            Livros infantis escolhidos com carinho, entregues todo mês na sua casa.
          </p>
        </div>

        <div className="flex flex-col gap-10 sm:flex-row sm:gap-12">
          <nav aria-label="Rodapé">
            <h2 className="font-semibold mb-3">Navegação</h2>
            <ul className="flex flex-col gap-2 text-sm">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:underline underline-offset-4">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-semibold mb-3">Contato</h2>
            <ul className="flex flex-col gap-2 text-sm">
              <li>contato@xodoclube.com.br</li>
              <li>@xodoclubedeleitura</li>
            </ul>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-6xl border-t border-azul/30 pt-6 text-center text-xs">
        © 2026 Xodó Clube de Leitura · Projeto acadêmico
      </p>
    </footer>
  );
}