
'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "../services/api";
import { useRouter } from "next/navigation";

interface IEquipamentos {
  id: number;
  tipo: string;
  marca: string;
  modelo: string;
  numero_serie: string;
  data_aquisicao: string;
  status: boolean;
}

async function fetchEquipamentos(): Promise<any> {
  const result = await api.get("/equipamentos");
  return result.data;
}

async function deleteEquipamentos(id: number): Promise<void> {
  await api.delete(`/equipamentos/${id}`);
}

export default function Home() {
  const router = useRouter();
  const [equipamentos, setEquipamentos] = useState<IEquipamentos[]>([]);
  const [ filtered, setFiltered ] = useState<IEquipamentos[]>([]);
  const [ search, setSearch ] = useState<string>("");
  const [ loading, setLoading ] = useState<boolean>(true);

  useEffect(() => {
    const getEquipamentos = async () => {
      const fetchedEquipamentos = await fetchEquipamentos();
      setEquipamentos(fetchedEquipamentos);
      setFiltered(fetchedEquipamentos);
      setLoading(false);
    };
    getEquipamentos();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteEquipamentos(id);
    router.refresh()
    // Atualiza a lista de usuários após a exclusão
    setEquipamentos(equipamentos.filter(equipamentos => equipamentos.id !== id));
  };

  const filterSearch = () => {
    const filtered = equipamentos.filter((equipamentos) =>
      equipamentos.tipo.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filtered);
  };

  if (loading) {
    return (
      <main className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Carregando...</h1>
      </main>
    );
  }

  return (
    <main className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl text-black mt-10 text-shadow font-bold mb-8 text-center">Equipamentos</h1>
      <div className="flex mb-8 mt-8 justify-center items-center">
        <input
          type="text"
          placeholder="Filtrar por tipo"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 text-black rounded-md px-3 py-2 mr-2"
        />
        <button
          onClickCapture={filterSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Filtrar
        </button>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-20 lg:grid-cols-4 gap-4">
        {filtered.length > 0 ? (
          filtered.map((equipamentos: IEquipamentos) => {
            return (
              <div
                key={equipamentos.id}
                className="bg-white rounded-lg overflow-hidden shadow-xl border-2 border-gray	 flex flex-col mb-10"
              >
                <div className="px-6 py-4 flex-grow flex flex-col justify-between">
                  <Link href={`/equipamentos/${equipamentos.id}`}>
                    <h2 className="font-bold text-xl text-black text-center uppercase mb-2 h-auto overflow-hidden">
                      {equipamentos.tipo}
                    </h2>
                  </Link>
                </div>

                <div className="px-6 pt-4  pb-4 flex items-center justify-center text-center">
                  <span className="inline-block w-[25%] bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    ID: {equipamentos.id}
                  </span>
                  <span className="inline-block w-[40%] bg-gray-200 rounded-md px-1 py-1 text-sm font-semibold text-gray-700 mr-2">
                    {equipamentos.status ? "DISPONIVEL" : "EM USO"}
                  </span>
                  {/* Botão de exclusão */}
                  <button
                    onClick={() => handleDelete(equipamentos.id)}
                    className="inline-block w-[30%] bg-red-500 rounded-md px-3 py-1 text-sm font-semibold text-white"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <h1>Sem dados!</h1>
        )}
      </section>
    </main>
  );
}
