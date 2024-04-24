"use client"

import { useState, useEffect } from "react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams, useRouter } from "next/navigation";
import api from "../../../services/api";

interface IParams extends Params {
    id: number;
}

interface IEquipamentos {
  id: number;
  tipo: string;
  marca: string;
  modelo: string;
  numero_serie: string;
  data_aquisicao: string;
  status: boolean;
}

export default function EditUser() {
    const router = useRouter();
    const params: IParams = useParams();
    const { id } = params;
    const [ equipamento, setEquipamento ] = useState<IEquipamentos>({
        id: 0,
        tipo: "",
        marca: "",
        modelo: "",
        numero_serie: "",
        data_aquisicao: "",
        status: true,
    });

    useEffect(() => {
        const fetchEquipamentos = async () => {
            try {
                const response = await api.get(`/equipamentos/${id}`);
                const equipData: IEquipamentos = response.data;

                const formattedDate = new Date(equipData.data_aquisicao)
                    .toISOString()
                    .split("T")[0];
                
                setEquipamento({ ...equipData, data_aquisicao: formattedDate });

            } catch (error) {
                console.error("Erro!", error);
            }

        };

        if (id) {
            fetchEquipamentos();
        }
    }, [id]);

    const handler = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setEquipamento((prevEquipamento) => ({
                ...prevEquipamento,
                [name]: checked,
            }));
        } else {
            setEquipamento((prevEquipamento) => ({
                ...prevEquipamento,
                [name]: value,
            }));
        }
    };

    const formatDate = (dateString: string): string => {
        const [year, month, day] = dateString.split("-");
        return `${day}-${month}-${year}`;
    };

    const updateEquip = async () => {
        try {
            const formattedDate = formatDate(equipamento.data_aquisicao);
            const response = await api.put(`/equipamentos/${id}`, {
                ...equipamento,
                data_aquisicao: formattedDate
            });

            console.log("Equipamento atualizado! Resposta: ", response.data)
            router.push("/")

        } catch (error) {
            console.error("Error!", error);
        }
    };

    return (
        <div className="container items-center justify-center flex my-32">
            <form className="forms inline-block bg-black text-black rounded-xl font-semibold pt-2">
                <div>
                    <label className="bot inline-block bg-blue-600 rounded px-2 ml-2 text-white">Tipo</label>
                    <input type="text"
                        name="tipo"
                        value={equipamento.tipo}
                        onChange={handler}
                        placeholder="Insira o tipo"
                        className="desc px-2 rounded mb-2 mt-2 ml-2 mr-2"
                    />
                </div>
                <div>
                    <label className="bot inline-block bg-blue-600 rounded px-2 ml-2 text-white">Marca</label>
                    <input type="text" 
                        name="marca"
                        value={equipamento.marca}
                        onChange={handler}
                        placeholder="Insira a marca"
                        className="desc px-2 rounded mb-2 mt-2 ml-2 mr-2"
                    />
                </div>
                <div>
                    <label className="bot inline-block bg-blue-600 rounded px-2 ml-2 text-white">Modelo</label>
                    <input type="text"
                        name="modelo"
                        value={equipamento.modelo}
                        onChange={handler}
                        placeholder="Insira o modelo"
                        className="desc px-2 rounded mb-2 mt-2 ml-2 mr-2"
                    />
                </div>
                <div>
                    <label className="bot inline-block bg-blue-600 rounded px-2 ml-2 text-white">Número de Série</label>
                    <input type="text"
                        name="numero_serie"
                        value={equipamento.numero_serie}
                        onChange={handler}
                        placeholder="xxxx-xxxx"
                        className="desc px-2 rounded mb-2 mt-2 ml-2 mr-2"
                    />
                </div>
                <div>
                    <label className="bot inline-block bg-blue-600 rounded px-2 ml-2 text-white">Data de Aquisição</label>
                    <input type="text"
                        name="data_aquisicao"
                        value={equipamento.data_aquisicao}
                        onChange={handler}
                        placeholder="Data de Aquisição"
                        className="desc px-2 rounded mb-2 mt-2 ml-2 mr-2"
                    />
                </div>
                <div>
                    <label className="bot inline-block bg-blue-600 rounded px-2 ml-2 text-white">Status</label>
                    <input type="checkbox"
                        name="status"
                        checked={equipamento.status}
                        onChange={handler}
                        placeholder="Status"
                        className="desc px-2 rounded mb-2 mt-2 ml-2 mr-2"
                    />
                </div>
                <br />
                <div className="flex flex-row gap-2 items-center justify-center w-[97%] text-white font-bold">
                    <button type="button"
                        onClick={updateEquip}
                        className=" inline-block bg-blue-600 rounded p-1 px-3"
                    >
                        Salvar
                    </button>
                    <br />
                    <button type="button"
                        onClick={() => router.push("/")}
                        className=" inline-block bg-red-500 rounded p-1 px-3"
                    >
                        Cancelar
                    </button>
                </div>
                <br />
            </form>
        </div>
    )
}