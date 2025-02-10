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
import { fetchFile } from "@/data/services/fetchFile";
import { CamisetaGetModel, CamisetaPostModel } from "@/lib/types/Camiseta";
import { fetchPOST } from "@/data/services/fetchPOST";
import { fetchDELETE } from "@/data/services/fetchDELETE";
import { MdError } from "react-icons/md";

export function TShirtSection() {
  const [camisetas, setCamisetas] = useState<CamisetaGetModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredCamisetas, setFilteredCamisetas] = useState<CamisetaGetModel[]>([]);
  const [filters, setFilters] = useState({
    color: "",
    size: "",
    material: "",
    priceMin: "",
    priceMax: "",
    isAvailable: "",
  });

  useEffect(() => {
    const fetchCamisetas = async () => {
      try {
        const url = "/api/t-shirts?populate=*";
        const response = await fetchGET({
          url,
          error: "Error al obtener las camisetas",
        });
        if (response.data) {
          const data = response.data;
          // Validar y mapear los datos para ajustarlos al modelo
          const mappedCamisetas: CamisetaGetModel[] = data.map((item: any) => ({
            id: item.id,
            attributes: {
              name: item.attributes.name,
              material: item.attributes.material,
              base_price: item.attributes.base_price,
              slug: item.attributes.slug,
              sizes: item.attributes.sizes,
              colors: item.attributes.colors,
              createdAt: item.attributes.createdAt,
              updatedAt: item.attributes.updatedAt,
              publishedAt: item.attributes.publishedAt,
              is_available: item.attributes.is_available,
              is_active: item.attributes.is_active,
              image: item.attributes.image.data.attributes.url,
              stock: item.attributes.stock,
            }
          }));
          console.log(mappedCamisetas)
          setCamisetas(mappedCamisetas);
        }
      } catch (error) {
        setError("Hubo un problema al cargar las camisetas.");
      } finally {
        setLoading(false);
      }
    };
    fetchCamisetas();
  }, []);

  // Sincronizar filteredCamisetas con camisetas
  useEffect(() => {
    setFilteredCamisetas(camisetas); // Se ejecuta cada vez que camisetas cambia
  }, [camisetas]);

  const handleFilter = () => {
    const filteredCamisetas = camisetas.filter((shirt) => {
      const { color, size, material, priceMin, priceMax, isAvailable } = filters;

      return (
        (!color || shirt.attributes.colors.includes(color)) &&
        (!size || shirt.attributes.sizes.includes(size)) &&
        (!material || shirt.attributes.material === material) &&
        (!priceMin || shirt.attributes.base_price >= Number(priceMin)) &&
        (!priceMax || shirt.attributes.base_price <= Number(priceMax)) &&
        (isAvailable === "" || shirt.attributes.is_available === (isAvailable === "true"))
      );
    });

    setFilteredCamisetas(filteredCamisetas); // Usa un estado para las camisetas filtradas
  };

  const camisetasPostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const file = formData.get('files');

    // Validación del archivo
    if (!file || (file instanceof File && file.size === 0)) {
      alert("Debes seleccionar un archivo.");
      return;
    }

    //Validar que no esten nulo 
    const requiredFields = ["name", "material", "base_price", "slug", "sizes", "colors", "stock"];
    for (const field of requiredFields) {
      const value = formData.get(field);
      if (!value || value.toString().trim() === "") {
        alert(`El campo "${field}" es obligatorio.`);
        return;
      }
    }
    // Validación del campo slug
    const slug = formData.get("slug") as string;
    const slugRegex = /^[A-Za-z0-9-_.~]*$/;
    if (!slugRegex.test(slug)) {
      alert("El campo 'slug' solo puede contener letras, números, guiones, puntos, guiones bajos y el símbolo ~.");
      return;
    }
    // Validación del material
    const material = formData.get("material") as string;
    const allowedMaterials = ["Cotton", "Linen", "Polyester", "Silk", "Wool", "Satin"];
    if (!allowedMaterials.includes(material)) {
      alert(`El material '${material}' no es válido. Solo se permiten: ${allowedMaterials.join(", ")}.`);
      return;
    }


    const fileForm = new FormData();
    fileForm.append('files', file as Blob);

    try {

      let url = "/api/upload"
      const response_img = await fetchFile({
        url,
        fileForm,
        error: "Error al subir imagen"
      });

      const image = response_img[0]?.id;


      url = "/api/t-shirts";
      const body: CamisetaPostModel = {
        data: {
          name: formData.get("name") as string,
          material: material,
          base_price: Number(formData.get("base_price")),
          slug: slug,
          sizes: formData.get("sizes") as string,
          colors: formData.get("colors") as string,
          is_available: true,
          is_active: true,
          image: image,
          stock: Number(formData.get("stock")),
        },
      };

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
    setLoading(true);
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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFilter();
          }}
          className="grid grid-cols-2 gap-4 md:grid-cols-6"
        >
          <div>
            <label htmlFor="color" className="block text-sm font-medium">
              Color
            </label>
            <Input
              type="text"
              id="color"
              name="color"
              value={filters.color}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, color: e.target.value }))
              }
              className="mt-1 block w-full border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="size" className="block text-sm font-medium">
              Talla
            </label>
            <Input
              type="text"
              id="size"
              name="size"
              value={filters.size}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, size: e.target.value }))
              }
              className="mt-1 block w-full border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="material" className="block text-sm font-medium">
              Material
            </label>
            <Input
              type="text"
              id="material"
              name="material"
              value={filters.material}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, material: e.target.value }))
              }
              className="mt-1 block w-full border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="priceMin" className="block text-sm font-medium">
              Precio mínimo
            </label>
            <Input
              type="number"
              id="priceMin"
              name="priceMin"
              value={filters.priceMin}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, priceMin: e.target.value }))
              }
              className="mt-1 block w-full border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="priceMax" className="block text-sm font-medium">
              Precio máximo
            </label>
            <Input
              type="number"
              id="priceMax"
              name="priceMax"
              value={filters.priceMax}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, priceMax: e.target.value }))
              }
              className="mt-1 block w-full border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="isAvailable" className="block text-sm font-medium">
              Disponibilidad
            </label>
            <select
              id="isAvailable"
              name="isAvailable"
              value={filters.isAvailable}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, isAvailable: e.target.value }))
              }
              className="mt-1 block w-full border rounded-md"
            >
              <option value="">Cualquiera</option>
              <option value="true">Disponible</option>
              <option value="false">No disponible</option>
            </select>
          </div>
          <div className="col-span-2 md:col-span-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Aplicar filtros
            </button>
          </div>
        </form>
      </div>
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
                  <label htmlFor="imagen">Imagen</label>
                  <Input type="file" id="files" name="files" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="nombre">Nombre camiseta</label>
                  <Input id="name" name="name" placeholder="Nombre de la camiseta" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="precio">Precio</label>
                  <Input id="base_price" name="base_price" type="number" placeholder="Precio" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="slug">Slug</label>
                  <Input id="slug" name="slug" placeholder="slug-de-camiseta" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="sizes">Tallas</label>
                  <Input id="sizes" name="sizes" placeholder="S, M, L, XL" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="colors">Colores</label>
                  <Input id="colors" name="colors" placeholder="Rojo, Azul, Verde" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="material">Material</label>
                  <Input id="material" name="material" placeholder="Ingrese el material" />
                  <p className="text-sm text-gray-500">
                    Material permitido: Cotton, Linen, Polyester, Silk, Wool, Satin
                  </p>
                </div>
                <div className="space-y-2">
                  <label htmlFor="stock">Stock</label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    placeholder="Stock"
                    min="0"
                    step="1"
                    onKeyDown={(e) => {
                      if (e.key === '-' || e.key === 'e' || e.key === '.') {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
              </div>
              <Button type="submit" className="mt-2 bg-indigo-600 hover:text-indigo-800">
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
              <TableHead>Stock</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCamisetas.map((shirt) => (
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
                    className={`px-2 py-1 rounded-full text-xs ${shirt.attributes.is_available
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                      }`}
                  >
                    {shirt.attributes.is_available
                      ? "Disponible"
                      : "No disponible"}
                  </span>
                </TableCell>
                <TableCell>{shirt.attributes.stock}</TableCell>
                <TableCell className="min-w-[200px] min-h-[200px]">
                  <img
                    src={shirt.attributes.image}
                    alt={`Estampa ${shirt.attributes.name}`}
                    className="w-20 h-24 object-cover"
                  />
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
