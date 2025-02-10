"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { CamisetaGetModel } from "@/lib/types/Camiseta";
import { MdError } from "react-icons/md";
import { CircularProgress } from "@nextui-org/react";
import { CatalogSkeleton } from "@/components/catalog/catalog-skeleton";
import { Suspense } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CatalogPage() {
  const [tshirts, setTshirts] = useState<CamisetaGetModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortValue, setSortValue] = useState<string>("newest");
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Función para normalizar cadenas (remover tildes, pasar a minúsculas, etc.)
  const normalizeString = (str: string) => {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  // Filtrado según el término de búsqueda
  const filteredTshirts = tshirts.filter((tshirt) =>
    normalizeString(tshirt.attributes.name).includes(
      normalizeString(searchTerm)
    )
  );

  // Ordenamiento según el valor seleccionado en el select.
  // Se asume que para "newest" se usa el id (o se puede usar un campo "createdAt")
  // y que para "popular" existe un campo "popularity" en los atributos.
  const sortedTshirts = [...filteredTshirts].sort((a, b) => {
    switch (sortValue) {
      case "newest":
        return b.id - a.id;
      case "price-low":
        return a.attributes.base_price - b.attributes.base_price;
      case "price-high":
        return b.attributes.base_price - a.attributes.base_price;
      default:
        return 0;
    }
  });

  // Reiniciamos la página actual al cambiar el filtro o el orden, para evitar inconsistencias en la paginación.
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortValue]);

  const totalPages = Math.ceil(sortedTshirts.length / itemsPerPage);
  const paginatedTshirts = sortedTshirts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const fetchCamisetas = async () => {
      try {
        const url = new URL(
          "/api/t-shirts?populate=*",
          process.env.NEXT_PUBLIC_BACKEND_URL
        );
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error al obtener las camisetas");
        }
        const data = await response.json();
        setTshirts(data.data);
      } catch (error) {
        setError("Hubo un problema al cargar las camisetas.");
      } finally {
        setLoading(false);
      }
    };

    fetchCamisetas();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <CircularProgress />
        <p className="text-black/80">Cargando catálogo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center">
        <MdError className="mr-2 h-6 w-6" />
        <p>{error}</p>
      </div>
    );
  }

  if (tshirts.length > 0 && !loading && !error) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-12 py-8">
          <div className="mb-8 space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Catálogo de Camisetas
            </h1>
            <p className="text-muted-foreground">
              Explora nuestra colección de camisetas y personalízalas a tu
              gusto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="search" className="sr-only">
                  Buscar camisetas
                </label>
                <Input
                  id="search"
                  placeholder="Buscar camisetas..."
                  className="max-w-96"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full sm:w-[200px]">
                <Select
                  defaultValue="newest"
                  onValueChange={(value) => setSortValue(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Más recientes</SelectItem>
                    <SelectItem value="price-low">
                      Precio: Menor a Mayor
                    </SelectItem>
                    <SelectItem value="price-high">
                      Precio: Mayor a Menor
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            <main className="flex-1">
              <Suspense fallback={<CatalogSkeleton />}>
                <div className="space-y-12">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {paginatedTshirts && paginatedTshirts.length > 0 ? (
                      paginatedTshirts.map((tshirt) => (
                        <Card
                          key={tshirt.id}
                          className="overflow-hidden group hover:shadow-xl transition-shadow duration-300"
                        >
                          <div className="relative aspect-square overflow-hidden flex items-center justify-center">
                            <img
                              src={tshirt.attributes.image.data.attributes.url}
                              alt={tshirt.attributes.name}
                              className="w-fit h-fit object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold text-lg mb-2">
                              {tshirt.attributes.name}
                            </h3>
                            <p className="text-indigo-600 font-bold">
                              $
                              {tshirt.attributes.base_price.toLocaleString(
                                "es-ES"
                              )}
                            </p>
                          </CardContent>
                          <CardFooter className="p-4 pt-0">
                            <Button
                              asChild
                              className="w-full bg-indigo-600 hover:bg-indigo-700"
                            >
                              <Link href={`/client/shirtPage/${tshirt.id}`}>
                                Ver Detalles
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))
                    ) : (
                      <p className="flex items-center justify-center text-black/80">
                        No se encontraron camisetas...
                      </p>
                    )}
                  </div>
                  {paginatedTshirts && paginatedTshirts.length > 0 ? (
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <Button disabled={currentPage === 1} variant="ghost">
                            <PaginationPrevious
                              href="#"
                              onClick={() =>
                                currentPage !== 1 &&
                                handlePageChange(currentPage - 1)
                              }
                            />
                          </Button>
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, index) => (
                          <PaginationItem key={index}>
                            <PaginationLink
                              href="#"
                              isActive={currentPage === index + 1}
                              onClick={() => handlePageChange(index + 1)}
                            >
                              {index + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <Button
                            disabled={currentPage === totalPages}
                            variant="ghost"
                          >
                            <PaginationNext
                              href="#"
                              onClick={() =>
                                currentPage !== totalPages &&
                                handlePageChange(currentPage + 1)
                              }
                            />
                          </Button>
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  ) : null}
                </div>
              </Suspense>
            </main>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center">
        <p className="text-black/80">No se encontraron camisetas...</p>
      </div>
    );
  }
}
