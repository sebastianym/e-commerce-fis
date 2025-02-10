"use client";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardBody,
  CardFooter,
  CircularProgress,
  Image,
} from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { MdError } from "react-icons/md";

export default function Prints() {
  const [busqueda, setBusqueda] = useState("");
  const [ordenar, setOrdenar] = useState("relevancia");
  const [estampas, setEstampas] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEstampas = async () => {
      try {
        const url = new URL(
          "/api/stamps?populate=*",
          process.env.NEXT_PUBLIC_BACKEND_URL
        );
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error al obtener las estampas");
        }
        const data = await response.json();
        console.log(data.data);
        setEstampas(data.data);
      } catch (error) {
        setError("Hubo un problema al cargar las estampas.");
      } finally {
        setLoading(false);
      }
    };

    fetchEstampas();
  }, []);

  const estampasFiltradas = estampas
    .filter((Estampa: any) =>
      Estampa.attributes.name.toLowerCase().includes(busqueda.toLowerCase())
    )

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

  if (estampas.length > 0 && !loading && !error) {
    return (
      <main className="min-h-screen">
        {/* Main Content */}
        <div className="container mx-auto px-12 py-8">
          <div className="mb-8 space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Catálogo de artistas y estampas
            </h1>
            <p className="text-muted-foreground">
              Explora las estampas de nuestros artistas y encuentra la que más
              te guste.
            </p>
            {/* Filtros y Búsqueda */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="search" className="sr-only">
                  Buscar estampas
                </label>
                <Input
                  id="search"
                  placeholder="Buscar estampas..."
                  className="max-w-96"
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Grid de estampas */}
              <main className="flex-1">
                <div className="space-y-12">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {estampasFiltradas.map((estampa: any) => (
                      <Card
                        key={estampa.id}
                        className="overflow-hidden items-center"
                      >
                        <Image
                          src={estampa.attributes.image.data.attributes.url}
                          alt={estampa.attributes.name}
                          width={300}
                          height={300}
                          className="w-fit h-fit justify-center object-cover"
                        />
                        <CardBody className="p-4">
                          <h3 className="text-lg font-semibold mb-2">
                            {estampa.attributes.name}
                          </h3>
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
              </main>
            </div>
          </div>
        </div>

        {/* Pie de página */}
        <Footer />
      </main>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center">
        <p className="text-black/80">No se encontraron estampas...</p>
      </div>
    );
  }
}
