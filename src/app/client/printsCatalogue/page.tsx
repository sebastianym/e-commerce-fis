"use client";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";

// Datos de ejemplo para las estampas
const estampas = [
  {
    id: 1,
    nombre: "Estampa Montaña",
    precio: 10.9,
    imagen:
      "https://png.pngtree.com/png-clipart/20230914/ourmid/pngtree-colorful-flowers-plants-sunglasses-skulls-abstract-retro-trendy-cartoon-illustrations-comics-png-image_10097795.png",
  },
  {
    id: 2,
    nombre: "Estampa Playa",
    precio: 24.9,
    imagen:
      "https://png.pngtree.com/png-clipart/20230914/ourmid/pngtree-colorful-flowers-plants-sunglasses-skulls-abstract-retro-trendy-cartoon-illustrations-comics-png-image_10097795.png",
  },
  {
    id: 3,
    nombre: "Estampa Ciudad",
    precio: 17.9,
    imagen:
      "https://png.pngtree.com/png-clipart/20230914/ourmid/pngtree-colorful-flowers-plants-sunglasses-skulls-abstract-retro-trendy-cartoon-illustrations-comics-png-image_10097795.png",
  },
  {
    id: 4,
    nombre: "Estampa Bosque",
    precio: 16.9,
    imagen:
      "https://png.pngtree.com/png-clipart/20230914/ourmid/pngtree-colorful-flowers-plants-sunglasses-skulls-abstract-retro-trendy-cartoon-illustrations-comics-png-image_10097795.png",
  },
  {
    id: 5,
    nombre: "Estampa Desierto",
    precio: 15.9,
    imagen:
      "https://png.pngtree.com/png-clipart/20230914/ourmid/pngtree-colorful-flowers-plants-sunglasses-skulls-abstract-retro-trendy-cartoon-illustrations-comics-png-image_10097795.png",
  },
  {
    id: 6,
    nombre: "Estampa Galaxia",
    precio: 12.9,
    imagen:
      "https://png.pngtree.com/png-clipart/20230914/ourmid/pngtree-colorful-flowers-plants-sunglasses-skulls-abstract-retro-trendy-cartoon-illustrations-comics-png-image_10097795.png",
  },
  {
    id: 7,
    nombre: "Estampa Océano",
    precio: 18.9,
    imagen:
      "https://png.pngtree.com/png-clipart/20230914/ourmid/pngtree-colorful-flowers-plants-sunglasses-skulls-abstract-retro-trendy-cartoon-illustrations-comics-png-image_10097795.png",
  },
  {
    id: 8,
    nombre: "Estampa Selva",
    precio: 30.9,
    imagen:
      "https://png.pngtree.com/png-clipart/20230914/ourmid/pngtree-colorful-flowers-plants-sunglasses-skulls-abstract-retro-trendy-cartoon-illustrations-comics-png-image_10097795.png",
  },
];

export default function Prints() {
  const [busqueda, setBusqueda] = useState("");
  const [ordenar, setOrdenar] = useState("relevancia");

  const estampasFiltradas = estampas
    .filter((Estampa) =>
      Estampa.nombre.toLowerCase().includes(busqueda.toLowerCase())
    )
    .sort((a, b) => {
      if (ordenar === "precio-asc") return a.precio - b.precio;
      if (ordenar === "precio-desc") return b.precio - a.precio;
      return 0;
    });
  return (
    <main className="min-h-screen">
      {/* Encabezado */}
      <Header />

      {/* Main Content */}
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Catálogo de estampas
        </h1>

        {/* Filtros y Búsqueda */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/3">
            <Input
              type="text"
              placeholder="Buscar estampas..."
              className="w-full"
            />
          </div>
          <Select placeholder="Ordenar por" className="w-96">
            <SelectItem key={1} value="relevancia">
              Relevancia
            </SelectItem>
            <SelectItem key={2} value="precio-asc">
              Precio: Menor a Mayor
            </SelectItem>
            <SelectItem key={3} value="precio-desc">
              Precio: Mayor a Menor
            </SelectItem>
          </Select>
        </div>

        {/* Grid de estampas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {estampasFiltradas.map((estampa) => (
            <Card key={estampa.id} className="overflow-hidden items-center">
              <Image
                src={estampa.imagen}
                alt={estampa.nombre}
                width={300}
                height={300}
                className="w-fit h-fit justify-center object-cover"
              />
              <CardBody className="p-4">
                <h3 className="text-lg font-semibold mb-2">{estampa.nombre}</h3>
                <p className="text-gray-600">${estampa.precio.toFixed(3)}</p>
              </CardBody>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  Ver Detalles
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Pie de página */}
      <Footer />
    </main>
  );
}
