"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { fetchGET } from "@/data/services/fetchGET";
import { CamisetaGetModel } from "@/lib/types/Camiseta";
import { MdError } from "react-icons/md";
import { CircularProgress } from "@nextui-org/react";

export function CatalogGrid() {
  const [tshirts, setTshirts] = useState<CamisetaGetModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(tshirts.length / itemsPerPage);

  useEffect(() => {
    const fetchCamisetas = async () => {
      try {
        const url = new URL("/api/t-shirts", process.env.NEXT_PUBLIC_BACKEND_URL);
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

  const paginatedTshirts = tshirts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
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
    <div className="space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {paginatedTshirts.map((tshirt) => (
          <Card
            key={tshirt.id}
            className="overflow-hidden group hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative aspect-square overflow-hidden flex items-center justify-center">
              <img
                src="https://static.vecteezy.com/system/resources/previews/008/847/318/non_2x/isolated-black-t-shirt-front-free-png.png"
                alt={tshirt.attributes.name}
                className="w-fit h-fit object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                {tshirt.attributes.name}
              </h3>
              <p className="text-indigo-600 font-bold">
                ${tshirt.attributes.base_price.toLocaleString("es-ES")}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button
                asChild
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                <Link href={`/client/shirtPage/${tshirt.id}`}>Ver Detalles</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button disabled={currentPage == 1} variant="ghost">
              <PaginationPrevious
                href="#"
                onClick={() =>
                  currentPage != 1 && handlePageChange(currentPage - 1)
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
            <Button disabled={currentPage === totalPages} variant="ghost">
              <PaginationNext
                href="#"
                onClick={() =>
                  currentPage != totalPages && handlePageChange(currentPage + 1)
                }
              />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
