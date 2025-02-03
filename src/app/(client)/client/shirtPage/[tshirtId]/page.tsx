"use client";
import { fetchGET } from "@/data/services/fetchGET";
import { CamisetaGetModel } from "@/lib/types/Camiseta";
import { Button, CircularProgress, Image } from "@nextui-org/react";
import { ArrowLeft, PencilIcon, ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { MdError } from "react-icons/md";

export default function ShirtPage({
  params,
}: {
  params: { tshirtId: number };
}) {
  const [tshirt, setTshirt] = useState<CamisetaGetModel>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCamisetas = async () => {
      try {
        const url = "/api/t-shirts/" + params.tshirtId;
        const response = await fetchGET({
          url,
          error: "Error al obtener las camisetas",
        });
        if (response.data) {
          setTshirt(response.data);
        }
      } catch (error) {
        setError("Hubo un problema al cargar las camisetas.");
      } finally {
        setLoading(false);
      }
    };

    fetchCamisetas();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <CircularProgress color="primary" label="Cargando ..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-auto items-center justify-center">
        <MdError className="mr-2 h-6 w-6" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <a
          href="/client/catalog"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al catálogo
        </a>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative overflow-hidden rounded-lg bg-white hover:bg-gray-100 justify-center items-center">
            <Image
              src="https://static.vecteezy.com/system/resources/previews/008/847/318/non_2x/isolated-black-t-shirt-front-free-png.png"
              alt="Personalized T-Shirt"
              className="transition-all duration-300 ease-in-out transform hover:scale-105"
            />
          </div>
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {tshirt?.attributes.name}
            </h1>
            <p className="text-xl font-semibold text-indigo-600">
              ${tshirt?.attributes.base_price.toLocaleString("es-ES")}
            </p>
            <p className="text-gray-600">{tshirt?.attributes.slug}</p>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Seleccione tamaño
              </h2>
              <div className="flex gap-2">
                {/* <p>{tshirt?.attributes.sizes}</p> */}
                {["S", "M", "L", "XL"].map((size) => (
                  <div key={size}>
                    <input
                      type="radio"
                      id={`size-${size}`}
                      name="size"
                      className="hidden peer"
                    />
                    <label
                      htmlFor={`size-${size}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-sm font-medium peer-checked:bg-indigo-600 peer-checked:text-white"
                    >
                      {size.toUpperCase()}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                <PencilIcon className="mr-2 h-4 w-4" />
                Personalizar
              </Button>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Añadir a la cesta
              </Button>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-gray-900">
                Detalles del producto
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>{tshirt?.attributes.material}</li>
                <li>Tintas ecológicas a base de agua</li>
                <li>Ajuste unisex</li>
                <li>Lavable en la lavadora</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
