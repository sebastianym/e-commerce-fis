"use client";
import { Button, Image } from "@nextui-org/react";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { LogoutButton } from "@/components/custom/LogoutButton";
import { fetchPOST } from "@/data/services/fetchPOST";
import { fetchPUT } from "@/data/services/fetchPUT";
import { fetchGET } from "@/data/services/fetchGET";
import { fetchDELETE } from "@/data/services/fetchDELETE";
import { CamisetaGetModel, CamisetaPostModel } from "@/lib/schemas/schemasCamiseta";
import { number } from "zod";

export default function ArtistPage() {

    const [asignarRole, setAsignarRole] = useState<string>("");

    const [camisetas, setCamisetas] = useState<CamisetaGetModel[]>([]); // Estado para almacenar las camisetas
    const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
    const [error, setError] = useState<string | null>(null); // Estado para manejar errores

    useEffect(() => {
        const fetchCamisetas = async () => {
            try {
                const url = "/api/t-shirts"
                const response = await fetchGET({
                    url,
                    error: "Error get camisetas",
                }); // Cambia por tu URL

                setCamisetas(response.data); // Asume que data es un array de camisetas
            } catch (error) {
                console.error(error);
                setError("Hubo un problema al cargar las camisetas.");
            } finally {
                setLoading(false); // Finaliza el estado de carga
            }
        };

        fetchCamisetas();
    }, []); // Se ejecuta al montar el componente

    if (loading) {
        return <p>Cargando camisetas...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }
    const camisetasPostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const url = "/api/t-shirts"
        const body: CamisetaPostModel = {
            data: {
                name: formData.get("name") as string,
                material: formData.get("material") as string,
                base_price: Number(formData.get("base_price")),
                slug: formData.get("slug") as string,
                sizes: formData.get("sizes") as string,
                colors: formData.get("colors") as string,
                is_available: true,  // Convierte el valor a booleano
                is_active: true,        // Convierte el valor a booleano
            }
        };
        try {

            const response = await fetchPOST<CamisetaPostModel>({
                url, // Endpoint relativo
                body, // Datos a enviar
                error: "Error al crear Camiseta",
            });
            console.log("Camiseta creado con éxito:", response);
            window.alert("Camiseta creado con éxito")
            window.location.reload();
        } catch (error) {
            console.error("Hubo un error:", error);
            window.alert("Hubo un error:" + error);
            window.location.reload();
        }
    }

    const camisetasDeleteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const id = formData.get("id");
        const url = `/api/t-shirts/${id}`

        try {

            const response = await fetchDELETE({
                url,
                error: "Error al Eliminar Camiseta",
            });
            console.log("Role asignado con éxito:", response);
            window.alert("Camiseta eliminada con éxito");
            window.location.reload();
        } catch (error) {
            console.error("Hubo un error:", error);
            window.alert("Hubo un error:" + error);
            window.location.reload();
        }
    }

    //!!!Todavía no funciona!!
    const artistSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const id = formData.get("id");
        const url = `/api/users/${id}`
        const body = {
            role: 3
        };
        try {

            const response = await fetchPUT<{ role: number }>({
                url, // Endpoint relativo
                body, // Datos a enviar
                error: "Error al asignar Role",
            });
            console.log("Role asignado con éxito:", response);
            setAsignarRole("Role asignado con éxito")
        } catch (error) {
            console.error("Hubo un error:", error);
            setAsignarRole("Hubo un error:" + error)
        }

    };

    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                    <a
                        href="/"
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver al catálogo
                    </a>
                    <LogoutButton />
                </div>
                <div className="container mx-auto p-10 text-center flex flex-col items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Página Administrador
                    </h1>
                    <br />
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Sección Artista
                    </h2>
                    <h3 className="text-3xl font-bold text-center mb-12">
                        Asignar role Artista
                    </h3>
                    <form onSubmit={artistSubmit} className="mb-6 flex flex-col space-y-4">
                        <p>Id del Cliente a asignar el role Artista</p>
                        <input type="number" name="id" placeholder="id" className="p-2 border rounded w-64" />
                        <Button type="submit" color="primary" className="w-64">
                            Asignar role
                        </Button>
                        {asignarRole && (
                            <div>
                                {asignarRole}
                            </div>
                        )}
                    </form>
                </div>
                <div className="container mx-auto p-10 text-center flex flex-col items-center justify-center">
                    <br />
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Sección Camiseta
                    </h2>
                    <h3 className="text-3xl font-bold text-center mb-12">
                        Crear Camiseta
                    </h3>
                    <form onSubmit={camisetasPostSubmit} className="mb-6 flex flex-col space-y-4">
                        <input type="text" name="name" placeholder="Nombre camiseta" className="p-2 border rounded w-64" />
                        <input type="number" name="base_price" placeholder="Precio" className="p-2 border rounded w-64" />
                        <input type="text" name="slug" placeholder="slug" className="p-2 border rounded w-64" />
                        <input type="text" name="sizes" placeholder="sizes" className="p-2 border rounded w-64" />
                        <input type="text" name="colors" placeholder="colors" className="p-2 border rounded w-64" />
                        <input type="text" name="material" placeholder="material" className="p-2 border rounded w-64" />
                        <Button type="submit" color="primary" className="w-64">
                            Crear Camiseta
                        </Button>
                    </form>
                    <h3 className="text-3xl font-bold text-center mb-12">
                        Eliminar Camiseta
                    </h3>
                    <form onSubmit={camisetasDeleteSubmit} className="mb-6 flex flex-col space-y-4">
                        <input type="number" name="id" placeholder="id" className="p-2 border rounded w-64" />
                        <Button type="submit" color="primary" className="w-64">
                            Eliminar Camiseta
                        </Button>
                    </form>
                </div>
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-3xl font-bold text-center mb-12">
                        Camisetas Existentes
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {camisetas.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden"
                            >
                                <div className="p-4">
                                    <h3 className="font-semibold mb-2">id: {item.id}</h3>
                                    <h3 className="font-semibold mb-2">Nombre camiseta: {item.attributes.name}</h3>
                                    <h3 className="font-semibold mb-2">Material: {item.attributes.material}</h3>
                                    <h3 className="font-semibold mb-2">Slogan: {item.attributes.slug}</h3>
                                    <h3 className="font-semibold mb-2">Color: {item.attributes.colors}</h3>
                                    <h3 className="font-semibold mb-2">Size: {item.attributes.sizes}</h3>
                                    <p className="text-indigo-600 font-bold">precio: {item.attributes.base_price}</p>
                                    <p className="text-indigo-600 font-bold">
                                        {item.attributes.is_available ? 'Disponible' : 'No disponible'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
