"use client";
import { Button, Image } from "@nextui-org/react";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import React from "react";

export default function ArtistPage() {

    //!!!Todavía no funciona!!
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        // Extraer solo el archivo para la primera petición
        const file = formData.get('file');
        const firstRequestFormData = new FormData();
        firstRequestFormData.append('file', file as Blob);

        try {

            const response = await fetch('https://stripe-backend-bojy.onrender.com/api/upload', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzMxNjE0ODQ4LCJleHAiOjE3MzQyMDY4NDh9.x6aiJgKsxqHdpNK-s-Zq-wYcRkWaDt-LnTQ_5waTbUA'
                },
                body: firstRequestFormData
            });

            if (!response.ok) {
                throw new Error("Error en la carga de archivo");
            }

            // Obtener el ID del primer objeto en la respuesta
            const data = await response.json();
            const image = data[0]?.id; // Solo obtener el id del primer objeto

            // Extraer otros datos del formulario para la segunda petición
            const name = formData.get('name');
            const description = formData.get('description');
            const rating = 0;

            // Segunda petición: usa `id`, `name` y `age`
            const secondResponse = await fetch('https://stripe-backend-bojy.onrender.com/api/stamps', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzMxNjE0ODQ4LCJleHAiOjE3MzQyMDY4NDh9.x6aiJgKsxqHdpNK-s-Zq-wYcRkWaDt-LnTQ_5waTbUA'
                },
                body: JSON.stringify({ data: { image, name, description, rating } })
            });

            if (!secondResponse.ok) {
                throw new Error("Error en la segunda petición");
            }

            const secondData = await secondResponse.json();
            console.log("Respuesta de la segunda petición:", secondData);
        } catch (error) {
            console.error("Hubo un error:", error);
        }

    };

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
                        Página Administrador
                    </h1>
                    <h3 className="text-3xl font-bold text-center mb-12">
                        Agregar Camiseta
                    </h3>
                    {/* Formulario de carga de archivos */}
                    <form onSubmit={handleSubmit} className="mb-6 flex flex-col space-y-4">
                        <input type="text" name="name" placeholder="Nombre camiseta" className="p-2 border rounded w-64" />
                        <input type="number" name="base_price" placeholder="Precio" className="p-2 border rounded w-64" />
                        <input type="text" name="slug" placeholder="slug" className="p-2 border rounded w-64" />
                        <input type="text" name="sizes" placeholder="sizes" className="p-2 border rounded w-64" />
                        <input type="text" name="colors" placeholder="colors" className="p-2 border rounded w-64" />
                        <Button type="submit" color="primary" className="w-64">
                            Agregar Camiseta
                        </Button>
                    </form>
                    <h3 className="text-3xl font-bold text-center mb-12">
                        Modificar Camiseta
                    </h3>
                    {/* Formulario de carga de archivos */}
                    <form onSubmit={handleSubmit} className="mb-6 flex flex-col space-y-4">
                        <input type="number" name="id" placeholder="id" className="p-2 border rounded w-64" />
                        <input type="text" name="name" placeholder="Nombre camiseta" className="p-2 border rounded w-64" />
                        <input type="number" name="base_price" placeholder="Precio" className="p-2 border rounded w-64" />
                        <input type="text" name="slug" placeholder="slug" className="p-2 border rounded w-64" />
                        <input type="text" name="sizes" placeholder="sizes" className="p-2 border rounded w-64" />
                        <input type="text" name="colors" placeholder="colors" className="p-2 border rounded w-64" />
                        <Button type="submit" color="primary" className="w-64">
                            Modificar Camiseta
                        </Button>
                    </form>
                    <h3 className="text-3xl font-bold text-center mb-12">
                        Eliminar Camiseta
                    </h3>
                    {/* Formulario de carga de archivos */}
                    <form onSubmit={handleSubmit} className="mb-6 flex flex-col space-y-4">
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
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="bg-white rounded-lg shadow-md overflow-hidden"
                            >
                                <div className="p-4">
                                    <h3 className="font-semibold mb-2">id {item}</h3>
                                    <h3 className="font-semibold mb-2">Nombre camiseta {item}</h3>
                                    <h3 className="font-semibold mb-2">Size {item}</h3>
                                    <p className="text-indigo-600 font-bold">precio {item}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
