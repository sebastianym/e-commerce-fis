import { Button, Image, User } from "@nextui-org/react";
import { ArrowLeft, Link, ShoppingCart } from "lucide-react";
import React from "react";

export default function ShirtPage() {
  return (
    <div className="min-h-screen bg-rose-50">
      <div className="container mx-auto px-4 py-8">
        <a
          href="/"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al catálogo
        </a>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative overflow-hidden rounded-lg bg-gray-100 hover:bg-gray-200 justify-center items-center">
            <Image
              src="https://static.vecteezy.com/system/resources/previews/008/847/318/non_2x/isolated-black-t-shirt-front-free-png.png"
              alt="Personalized T-Shirt"
              className="transition-all duration-300 ease-in-out transform hover:scale-105"
            />
          </div>
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Camiseta personalizada
            </h1>
            <p className="text-xl font-semibold text-indigo-600">$29.900</p>
            <p className="text-gray-600">
              Expresa tu estilo único con esta camiseta de diseño personalizado
              que presenta un paisaje de ensueño. Fabricada con 100 % algodón
              orgánico para máxima comodidad y sostenibilidad.
            </p>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Seleccione tamaño
              </h2>
              <div className="flex gap-2">
                {["xs", "s", "m", "l", "xl"].map((size) => (
                  <div key={size}>
                    <label
                      htmlFor={`size-${size}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-sm font-medium peer-data-[state=checked]:bg-indigo-600 peer-data-[state=checked]:text-white"
                    >
                      {size.toUpperCase()}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Añadir a la cesta
            </Button>
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-gray-900">
                Detalles del producto
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>100% algodón orgánico</li>
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
