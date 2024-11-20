"use client";
import { Button, Image } from "@nextui-org/react";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { fetchFile } from "@/data/services/fetchFile";
import { fetchGET } from "@/data/services/fetchGET";
import { fetchPOST } from "@/data/services/fetchPOST";
import { fetchDELETE } from "@/data/services/fetchDELETE";
import { StampPostModel, StampGetModel } from "@/lib/schemas/schemasStamp";

export default function ArtistPage() {

    const [stamps, setStamps] = useState<StampGetModel[]>([]); // Estado para almacenar las camisetas
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEstampas = async () => {
            try {
                const url = "/api/stamps?populate=*"
                const response = await fetchGET({
                    url,
                    error: "Error get camisetas",
                });
                const data = response.data;

                // Validar y mapear los datos para ajustarlos al modelo
                const mappedStamps: StampGetModel[] = data.map((item: any) => ({
                    id: item.id,
                    name: item.attributes.name,
                    description: item.attributes.description,
                    rating: item.attributes.rating,
                    image: item.attributes.image.data.attributes.url,

                }));
                console.log(mappedStamps)
                setStamps(mappedStamps); // Asume que data es un array de camisetas
            } catch (error) {
                console.error(error);
                setError("Hubo un problema al cargar las estampas.");
            } finally {
                setLoading(false); // Finaliza el estado de carga
            }
        };

        fetchEstampas();
    }, []);

    if (loading) {
        return <p>Cargando Stamps...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        const file = formData.get('files');
        const fileForm = new FormData();
        fileForm.append('files', file as Blob);

        try {
            let url = "/api/upload"
            const response = await fetchFile({
                url,
                fileForm,
                error: "Error al subir imagen"
            });

            console.log("Respuesta 1: " + response)

            const image = response[0]?.id;

            const body: StampPostModel = {
                data: {
                    name: formData.get('name') as string,
                    description: formData.get('description') as string,
                    rating: 0,
                    image: image
                }
            };

            url = "/api/stamps"
            // Segunda petición: usa `id`, `name` y `age`
            const secondResponse = await fetchPOST<StampPostModel>({
                url,
                body,
                error: "Error al crear la Estampa"
            });
            console.log(secondResponse)
            window.alert("Estampa creada con exito")
            window.location.reload()
        } catch (error) {
            console.error("Hubo un error:", error);
            window.alert("Hubo un error:" + error);
            window.location.reload();
        }

    };

    const stampDeleteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const id = formData.get("id");
        let url = `/api/stamps/${id}?populate=*`

        try {

            const response = await fetchDELETE({
                url,
                error: "Error al Eliminar estampa",
            });
            const id_image = response.data.attributes.image.data.id;
            url = `/api/upload/files/${id_image}`

            const imageDelete = await fetchDELETE({
                url,
                error: "Error al Eliminar estampa",
            });
            console.log("Estampa eliminada con éxito:", response, imageDelete);
            window.alert("Estampa eliminada con éxito");
            window.location.reload();
        } catch (error) {
            console.error("Hubo un error:", error);
            window.alert("Hubo un error:" + error);
            window.location.reload();
        }
    }

    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <a
                    href="/"
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver al catálogo
                </a>
                <div className="container mx-auto p-10 text-center flex flex-col items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Nombre Artista
                    </h1>
                    <h3 className="text-3xl font-bold text-center mb-12">
                        Crear tus estampas
                    </h3>
                    {/* Formulario de carga de archivos */}
                    <form onSubmit={handleSubmit} className="mb-6 flex flex-col space-y-4">
                        <input type="file" name="files" className="p-2 border rounded w-64" />
                        <input type="text" name="name" placeholder="Nombre Estampa" className="p-2 border rounded w-64" />
                        <input type="text" name="description" placeholder="Descripción Estampa" className="p-2 border rounded w-64" />
                        <Button type="submit" color="primary" className="w-64">
                            Crear Estampa
                        </Button>
                    </form>
                    <h3 className="text-3xl font-bold text-center mb-12">
                        Eliminar estampa
                    </h3>
                    <form onSubmit={stampDeleteSubmit} className="mb-6 flex flex-col space-y-4">
                        <input type="number" name="id" placeholder="id" className="p-2 border rounded w-64" />
                        <Button type="submit" color="primary" className="w-64">
                            Eliminar estampa
                        </Button>
                    </form>
                </div>
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-3xl font-bold text-center mb-12">
                        Mis Estampas
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stamps.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden"
                            >
                                <img
                                    src={item.image}
                                    alt={`Estampa ${item.name}`}
                                    className="w-full h-fit object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="font-semibold mb-2">id: {item.id}</h3>
                                    <h3 className="font-semibold mb-2">{item.name}</h3>
                                    <p className="text-indigo-600 font-bold">Descripción: {item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
