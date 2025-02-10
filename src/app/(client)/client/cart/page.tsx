"use client";
import { Button } from "@/components/ui/button";
import { Image, Input } from "@nextui-org/react";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "next-view-transitions";
import React, { useEffect, useState } from "react";

export default function Cart() {
  // Inicializamos el estado leyendo el carrito del localStorage (si existe)
  const [productosCarrito, setProductosCarrito] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const carritoGuardado = localStorage.getItem("shopping-cart");
      return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    }
    return [];
  });

  // Cada vez que cambia el carrito, lo guardamos en localStorage
  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(productosCarrito));
  }, [productosCarrito]);

  // Manejar cantidad (usamos "quantity" de forma consistente)
  const handleCantidad = (id: string, delta: number) => {
    setProductosCarrito((prev) =>
      prev.map((producto) =>
        producto.id === id
          ? { ...producto, quantity: Math.max(1, producto.quantity + delta) }
          : producto
      )
    );
  };

  // Eliminar producto
  const handleEliminar = (id: string) => {
    setProductosCarrito((prev) =>
      prev.filter((producto) => producto.id !== id)
    );
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Tu Carrito de Compras
          </h1>
          <Link href="/client/catalog">
            <Button
              variant="ghost"
              color="primary"
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Seguir Comprando
            </Button>
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <table className="w-full text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50">
                <th className="h-12 px-4 text-left font-medium w-1/3">
                  Producto
                </th>
                <th className="h-12 px-4 text-left font-medium">Talla</th>
                <th className="h-12 px-4 text-left font-medium">Precio</th>
                <th className="h-12 px-4 text-left font-medium">Cantidad</th>
                <th className="h-12 px-4 text-left font-medium">Subtotal</th>
                <th className="h-12 px-4 text-left font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosCarrito.map((producto) => (
                <tr key={producto.id} className="border-b hover:bg-muted/50">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={
                            producto.customizedImage
                              ? producto.customizedImage
                              : producto.originalImage
                          }
                          alt={producto.name}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {producto.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {producto.customizedImage
                            ? "Personalizada"
                            : "Original"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 font-semibold">{producto.size}</td>
                  <td className="px-4 font-semibold">
                    {producto.customizedImage
                      ? `$${(producto.price + 10000).toFixed(3)}`
                      : `$${producto.price.toFixed(3)}`}
                  </td>
                  <td className="px-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        className="px-0"
                        onClick={() => handleCantidad(producto.id, -1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={producto.quantity}
                        readOnly
                        className="w-16 text-center"
                      />
                      <Button
                        variant="ghost"
                        className="px-0"
                        onClick={() => handleCantidad(producto.id, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                  <td className="px-4 font-semibold">
                    {producto.customizedImage
                      ? `$${(
                          (producto.price + 10000) *
                          producto.quantity
                        ).toFixed(3)}`
                      : `$${(producto.price * producto.quantity).toFixed(3)}`}
                  </td>
                  <td className="px-4">
                    <Button
                      variant="ghost"
                      color="danger"
                      className="px-0"
                      onClick={() => handleEliminar(producto.id)}
                    >
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
            Total de productos:{" "}
            <span className="font-semibold">
              {productosCarrito.reduce((acc, prod) => acc + prod.quantity, 0)}
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            Total: $
            {productosCarrito
              .reduce(
                (acc, prod) =>
                  acc +
                  (prod.customizedImage
                    ? (prod.price + 10000) * prod.quantity
                    : prod.price * prod.quantity),
                0
              )
              .toFixed(3)}
          </div>
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
