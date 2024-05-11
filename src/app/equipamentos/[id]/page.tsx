// src/app/post/[id]/page.tsx
"use client"

import Link from "next/link";
import { useParams, useRouter } from 'next/navigation'; // Use next/navigation
import React, { useEffect, useState } from 'react';
import api from '../../../services/api';

interface IEquipamentos {
    id: number;
    tipo: string;
    marca: string;
    modelo: string;
    numero_serie: string;
    data_aquisicao: string;
    status: boolean;
}

export default function Post() { // Porque Post?
  const params = useParams();
  const router = useRouter(); // variavel n usada
  const { id } = params;
  const [response, setPost] = useState<IEquipamentos | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await api.get(`/equipamentos/${id}`);
      setPost(response.data);
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (!response) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container items-center justify-center flex my-48'>
        <div className='m-4 bg-white rounded-lg p-4 shadow-xl w-48 md:w-1/4 lg:w-1/5 mx-auto'>
            <p className='text-black p-2 bg-gray-300 rounded-lg '>ID: {response.id}</p>
            <h1 className='text-2xl font-bold text-black'>{response.modelo}</h1>
            <p className='text-black'>Tipo: {response.tipo}</p>
            <p className='text-black'>Marca: {response.marca}</p>
            <p className='text-black'>N° de série: {response.numero_serie}</p>
            <p className='text-black'>Data de aquisição: {response.data_aquisicao}</p>
            <p className='text-black'>Status: {response.status ? 'Active' : 'Inactive'}</p>
            <div>
              <Link href={`/edit/${id}`} className="edit inline-block bg-black rounded mt-2 px-2">
                Editar
              </Link>
            </div>
        </div>
    </div>
  );
} 

