"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getUsuarioLogado, type UsuarioLogado } from "@/lib/usuarios";

const links = [
  { href: "/#planos", label: "Planos" },
  { href: "/#como-funciona", label: "Como funciona o kit" },
];

export default function Header() {
  const [usuario, setUsuario] = useState<UsuarioLogado | null>(null);

  useEffect(() => {
    setUsuario(getUsuarioLogado());
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-2">
        <Link href="/">
          <Image
            src="/logo-xodo.png"
            alt="Xodó Clube de Leitura"
            width={80}
            height={80}
            className="scale-[1.8] origin-left"
            priority
          />
        </Link>

        <nav className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hidden md:block font-medium hover:text-rosa transition"
            >
              {link.label}
            </Link>
          ))}

          {usuario ? (
            <Link
              href="/assinante"
              className="rounded-full bg-mint px-5 py-2 font-semibold hover:brightness-95 transition"
            >
              Oi, {usuario.nome.split(" ")[0]}
            </Link>
          ) : (
            <>
              <Link
                href="/assinante"
                className="hidden md:block font-medium hover:text-rosa transition"
              >
                Área do assinante
              </Link>
              <Link
                href="/cadastro"
                className="rounded-full bg-amarelo px-5 py-2 font-semibold hover:brightness-95 transition"
              >
                Assinar
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}