"use client";

import Link from "next/link";

export default function Error() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Erro!</h1>
      <p className="text-lg text-gray-700 mb-4">Algum erro ocorreu!</p>
      <Link href="/" className="text-blue-500 underline">
        Home
      </Link>
    </main>
  );
}