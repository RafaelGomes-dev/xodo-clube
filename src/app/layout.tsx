import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Xodó Clube de Leitura",
  description: "Livros infantis na sua casa todo mês!",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }> ) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} scroll-smooth`}>
      <body className="font-sans bg-creme text-texto antialiased">
        {children}
      </body>

    </html>
  );
}