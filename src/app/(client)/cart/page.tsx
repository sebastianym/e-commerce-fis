"use client";
import { Button, Image, Input } from "@nextui-org/react";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { Link } from 'next-view-transitions'

import React, { useState } from "react";

export default function Cart() {
  const [productosCarrito, setProductosCarrito] = useState<any[]>([
    {
      id: "1",
      nombre: "Camiseta Personalizada",
      diseno: "Paisaje de Montaña",
      talla: "M",
      precio: 29.900,
      cantidad: 1,
      imagen:
        "https://static.vecteezy.com/system/resources/previews/008/847/318/non_2x/isolated-black-t-shirt-front-free-png.png",
    },
    {
      id: "2",
      nombre: "Camiseta Personalizada",
      diseno: "Frase Divertida",
      talla: "L",
      precio: 29.900,
      cantidad: 2,
      imagen:
        "https://static.vecteezy.com/system/resources/previews/008/847/318/non_2x/isolated-black-t-shirt-front-free-png.png",
    },
  ]);
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Tu Carrito de Compras
          </h1>
          <Link href="/catalogo">
            <Button variant="solid" color="primary" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Seguir Comprando
            </Button>
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-1/3">
                  Producto
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Talla
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Precio
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Cantidad
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {productosCarrito.map((producto) => (
                <tr
                  key={producto.id}
                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    <div className="flex items-center space-x-3">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={producto.imagen}
                          alt={producto.nombre}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {producto.nombre}
                        </div>
                        <div className="text-sm text-gray-500">
                          {producto.diseno}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 font-semibold">{producto.talla}</td>
                  <td className="px-4 font-semibold">${producto.precio.toFixed(3)}</td>
                  <td className="px-4 font-semibold">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="flat"
                        aria-label="Disminuir cantidad"
                        className="px-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        min="0"
                        value={producto.cantidad}
                        className="w-16 text-center"
                      />
                      <Button variant="flat" className="px-0" aria-label="Aumentar cantidad">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                  <td className="px-4 font-semibold">
                    <span>$50.000</span>
                  </td>
                  <td>
                    <Button variant="light" color="danger" className="px-0" aria-label="Eliminar producto">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="text-gray-600">
            Total de productos: <span className="font-semibold">2</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">Total: $29.900</div>
        </div>
        <div className="mt-8 flex justify-end">
          <Button className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white">
            Proceder al Pago
          </Button>
        </div>
      </div>
    </main>
  );
}
