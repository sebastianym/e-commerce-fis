"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CircularProgress, Input } from "@nextui-org/react";
import { fetchGET } from "@/data/services/fetchGET";
import { CamisetaGetModel, CamisetaPostModel } from "@/lib/types/Camiseta";
import { fetchPOST } from "@/data/services/fetchPOST";
import { fetchDELETE } from "@/data/services/fetchDELETE";
import { MdError } from "react-icons/md";

export function TShirtSection() {
  const [camisetas, setCamisetas] = useState<CamisetaGetModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCamisetas = async () => {
      try {
        const url = "/api/t-shirts";
        const response = await fetchGET({
          url,
          error: "Error al obtener las camisetas",
        });
        if (response.data) {
          setCamisetas(response.data);
        }
      } catch (error) {
        setError("Hubo un problema al cargar las camisetas.");
      } finally {
        setLoading(false);
      }
    };

    fetchCamisetas();
  }, []);

  const camisetasPostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const url = "/api/t-shirts";
    const body: CamisetaPostModel = {
      data: {
        name: formData.get("name") as string,
        material: formData.get("material") as string,
        base_price: Number(formData.get("base_price")),
        slug: formData.get("slug") as string,
        sizes: formData.get("sizes") as string,
        colors: formData.get("colors") as string,
        is_available: true, // Convierte el valor a booleano
        is_active: true, // Convierte el valor a booleano
      },
    };
    try {
      const response = await fetchPOST<CamisetaPostModel>({
        url, // Endpoint relativo
        body, // Datos a enviar
        error: "Error al crear Camiseta",
      });
      console.log("Camiseta creado con éxito:", response);
      window.alert("Camiseta creado con éxito");
      window.location.reload();
    } catch (error) {
      console.error("Hubo un error:", error);
      window.alert("Hubo un error:" + error);
      window.location.reload();
    }
  };

  const camisetasDeleteSubmit = async (id: string) => {
    const url = `/api/t-shirts/${id}`;

    try {
      const response = await fetchDELETE({
        url,
        error: "Error al Eliminar Camiseta",
      });
      console.log("Camiseta eliminada con éxito:", response);
      window.alert("Camiseta eliminada con éxito");
      window.location.reload();
    } catch (error) {
      console.error("Hubo un error:", error);
      window.alert("Hubo un error:" + error);
      window.location.reload();
    }
  };

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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Camisetas</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600">
              <Plus className="mr-2 h-4 w-4" />
              Nueva Camiseta
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Crear Nueva Camiseta</DialogTitle>
            </DialogHeader>
            <form onSubmit={camisetasPostSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="nombre">Nombre camiseta</label>
                  <Input id="nombre" placeholder="Nombre de la camiseta" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="precio">Precio</label>
                  <Input id="precio" type="number" placeholder="Precio" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="slug">Slug</label>
                  <Input id="slug" placeholder="slug-de-camiseta" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="sizes">Tallas</label>
                  <Input id="sizes" placeholder="S, M, L, XL" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="colors">Colores</label>
                  <Input id="colors" placeholder="Rojo, Azul, Verde" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="material">Material</label>
                  <Input id="material" placeholder="Algodón, Lana, etc" />
                </div>
              </div>
              <Button type="submit" className="mt-2">
                Crear Camiseta
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Material</TableHead>
              <TableHead>Slogan</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Talla</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {camisetas.map((shirt) => (
              <TableRow key={shirt.id}>
                <TableCell>{shirt.id}</TableCell>
                <TableCell>{shirt.attributes.name}</TableCell>
                <TableCell>{shirt.attributes.material}</TableCell>
                <TableCell>{shirt.attributes.slug}</TableCell>
                <TableCell>{shirt.attributes.colors}</TableCell>
                <TableCell>{shirt.attributes.sizes}</TableCell>
                <TableCell>{shirt.attributes.base_price}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      shirt.attributes.is_available
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {shirt.attributes.is_available
                      ? "Disponible"
                      : "No disponible"}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() =>
                          camisetasDeleteSubmit(shirt.id.toString())
                        }
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
