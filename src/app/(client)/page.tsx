"use client";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { getRoleService } from "@/data/services/auth/getRoleService";
import { CamisetaGetModel } from "@/lib/types/Camiseta";
import { Button } from "@nextui-org/react";
import { ChevronRight, Star } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import { useEffect, useState } from "react";

export default function Home() {
  const [role, setRole] = useState("");
  const [tshirts, setTshirts] = useState<CamisetaGetModel[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useTransitionRouter();
  //authenticated
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getRoleService();
      console.log(userData);
      if (userData.role) {
        setRole(userData.role);
      }
    };

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
        console.log(data.data);
      } catch (error) {
        console.log("Hubo un problema al cargar las camisetas.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchCamisetas();
  }, []);

  return (
    <main className="min-h-screen">
      {/* Banner principal */}
      <section className="bg-indigo-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Crea tu camiseta única
          </h1>
          <p className="text-xl mb-8">
            Diseña y personaliza tu propia camiseta en minutos
          </p>
          <Button
            className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-full hover:bg-indigo-50 transition duration-300"
            onClick={() => {
              !role && router.push("/login");
              role && role === "authenticated" && router.push("/client");
            }}
          >
            Empezar a Diseñar
          </Button>
        </div>
      </section>

      {/* Características del producto */}
      <section className="py-16 bg-white" id="inicio">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            ¿Por qué elegir Camisetas?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full p-6 inline-block mb-4">
                <svg
                  className="h-8 w-8 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Diseños Únicos</h3>
              <p className="text-gray-600">
                Crea diseños que reflejen tu estilo personal
              </p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full p-6 inline-block mb-4">
                <svg
                  className="h-8 w-8 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Calidad Premium</h3>
              <p className="text-gray-600">
                Utilizamos los mejores materiales para tu comodidad
              </p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full p-6 inline-block mb-4">
                <svg
                  className="h-8 w-8 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">Recibe tu pedido en tiempo récord</p>
            </div>
          </div>
        </div>
      </section>

      {/* Galería de diseños populares */}
      <section className="py-16 bg-gray-100" id="diseños">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Camisetas Populares
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tshirts.slice(0, 4).map((tshirt) => (
              <div
                key={tshirt.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative aspect-square overflow-hidden flex items-center justify-center">
                  <img
                    src={tshirt.attributes.image.data.attributes.url}
                    alt={`Diseño ${tshirt.attributes.name}`}
                    className="w-fit h-fit object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">
                    {tshirt.attributes.name}
                  </h3>
                  <p className="text-indigo-600 font-bold">
                    {tshirt.attributes.base_price}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button
              className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-full hover:bg-indigo-700 transition duration-300"
              onClick={() => {
                router.push("/client/catalog");
              }}
            >
              Ver Más Camisetas
            </Button>
          </div>
        </div>
      </section>

      {/* Sección de personalización */}
      <section className="py-16 bg-white" id="personalizar">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img
                src="https://static.vecteezy.com/system/resources/previews/008/847/318/non_2x/isolated-black-t-shirt-front-free-png.png"
                alt="Personalización"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl font-bold mb-4">
                Personaliza tu Camiseta
              </h2>
              <p className="text-gray-600 mb-6">
                Elige entre una amplia gama de colores, estilos y tallas. Añade
                estampas para crear algo verdaderamente único.
              </p>
              <ul className="mb-8">
                <li className="flex items-center mb-2">
                  <ChevronRight className="h-5 w-5 text-indigo-600 mr-2" />
                  <span>Múltiples estilos de camisetas</span>
                </li>
                <li className="flex items-center mb-2">
                  <ChevronRight className="h-5 w-5 text-indigo-600 mr-2" />
                  <span>Herramientas de diseño fáciles de usar</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-indigo-600 mr-2" />
                  <span>Vista previa en tiempo real</span>
                </li>
              </ul>
              <Button
                className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition duration-300"
                onClick={() => {
                  !role && router.push("/login");
                  role && role === "authenticated" && router.push("/shirtPage");
                }}
              >
                Comenzar a Personalizar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 bg-gray-100" id="sobre-nosotros">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Lo que dicen nuestros clientes
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Santiago",
                comment:
                  "Increíble calidad y el proceso de diseño fue muy divertido. ¡Volveré a comprar!",
              },
              {
                name: "Santiago",
                comment:
                  "Las camisetas quedaron exactamente como las imaginé. El servicio al cliente es excelente.",
              },
              {
                name: "Santiago",
                comment:
                  "Rápido, fácil y con resultados profesionales. Totalmente recomendado.",
              },
            ].map((testimonio, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <img
                      src={`https://avatars.githubusercontent.com/u/64699496?v=4`}
                      alt={testimonio.name}
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonio.name}</h3>
                    <div className="flex text-yellow-400">
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                      <Star className="h-5 w-5 fill-current" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{testimonio.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pie de página */}
      <Footer />
    </main>
  );
}
