import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// Componente de cabeçalho
const Header = () => {
  return (
    <header className="bg-black text-white py-4">
      <div className="container mx-auto">
        <nav className="flex justify-between items-center">
          <div className="flex gap-5 items-center">
            <Link
              className="text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer text-xl font-semibold"
              href="/"
            >
              Central Equipamentos
            </Link>
          </div>
          <div>
            <Link
                className="text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer mr-10"
                href="/post"
              >
                Cadastrar Equipamento
            </Link>
            <Link href="/logout">Logout</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

// Componente de rodapé
const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 relative bottom-0 left-0 w-full">
      <div className="container mx-auto text-center">Grupo Rodrigo e Fernando@ Todos os direitos reservados.</div>
    </footer>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Header />
        <div className="flex flex-col min-h-screen">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}