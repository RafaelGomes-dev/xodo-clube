"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUsuarioLogado } from "@/lib/usuarios";

export function useRedirecionarSeLogado(destino: string) {
  const router = useRouter();
  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    if (getUsuarioLogado()) {
      router.replace(destino);
      return;
    }
    setVerificando(false);
  }, [router, destino]);

  return verificando;
}