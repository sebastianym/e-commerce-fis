"use client";
import type { CamisetaGetModel } from "@/lib/types/Camiseta";
import {
  Button,
  CircularProgress,
  Image,
  useDisclosure,
} from "@nextui-org/react";
import { PencilIcon, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { MdError } from "react-icons/md";
import { CustomizationModal } from "@/components/catalog/CustomizationModal";
import { toast } from "react-hot-toast";
import { cartService } from "@/lib/services/cartService";
import { getRoleService } from "@/data/services/auth/getRoleService";
import { useTransitionRouter } from "next-view-transitions";

export default function ShirtPage({
  params,
}: {
  params: { tshirtId: number };
}) {
  const [tshirt, setTshirt] = useState<CamisetaGetModel>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [customizedImage, setCustomizedImage] = useState<string>("");
  const [stampData, setStampData] = useState<{
    stampId: number;
    position: { x: number; y: number };
  } | null>(null);
  const [role, setRole] = useState("");
  const router = useTransitionRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getRoleService();
      console.log(userData);
      if (userData.role) {
        console.log(userData.role);
        setRole(userData.role);
      }
    };

    const fetchCamisetas = async () => {
      try {
        const url = new URL(
          "/api/t-shirts/" + params.tshirtId + "?populate=*",
          process.env.NEXT_PUBLIC_BACKEND_URL
        );
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error al obtener la camiseta");
        }
        const data = await response.json();
        setTshirt(data.data);
        console.log(data.data);
      } catch (error) {
        setError("Hubo un problema al cargar las camisetas.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
    fetchCamisetas();
  }, [params.tshirtId]); // Added params.tshirtId to the dependency array

  const handleSaveCustomization = (
    customizedImage: string,
    stampData: { stampId: number; position: { x: number; y: number } }
  ) => {
    setCustomizedImage(customizedImage);
    setStampData(stampData);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Por favor selecciona una talla");
      return;
    }

    if (tshirt) {
      const cartItem = {
        id: tshirt.id,
        name: tshirt.attributes.name,
        price: tshirt.attributes.base_price,
        size: selectedSize,
        quantity: 1,
        originalImage: tshirt.attributes.image.data.attributes.url,
        customizedImage: customizedImage,
        ...(stampData && {
          stampId: stampData.stampId,
          stampPosition: stampData.position,
        }),
      };
      cartService.addToCart(cartItem);
    }
    toast.success("¡Producto añadido al carrito con éxito!");
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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative overflow-hidden rounded-lg bg-white hover:bg-gray-100 justify-center items-center w-[607px] h-[404px] mx-auto">
            <Image
              src={
                customizedImage ||
                (tshirt?.attributes.image.data.attributes.url ??
                  "/placeholder.svg")
              }
              alt="Personalized T-Shirt"
              className="transition-all duration-300 ease-in-out transform hover:scale-105 object-cover w-full h-full"
              crossOrigin="anonymous"
            />
          </div>
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {tshirt?.attributes.name}
            </h1>
            <p className="text-xl font-semibold text-indigo-600">
              ${tshirt?.attributes.base_price.toLocaleString("es-ES")}
            </p>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Seleccione tamaño
              </h2>
              <div className="flex gap-2">
                {tshirt?.attributes.sizes.split(",").map((size) => (
                  <div key={size}>
                    <input
                      type="radio"
                      id={`size-${size}`}
                      name="size"
                      value={size}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="hidden peer"
                    />
                    <label
                      htmlFor={`size-${size}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-sm font-medium peer-checked:bg-indigo-600 peer-checked:text-white cursor-pointer"
                    >
                      {size.toUpperCase()}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                onPress={() => {
                  !role && router.push("/login");
                  role && onOpen();
                }}
              >
                <PencilIcon className="mr-2 h-4 w-4" />
                Personalizar
              </Button>
              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                onPress={() => {
                  !role && router.push("/login");
                  role && handleAddToCart();
                }}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Añadir a la cesta
              </Button>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-gray-900">
                Detalles del producto
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>{tshirt?.attributes.material}</li>
                <li>Tintas ecológicas a base de agua</li>
                <li>Ajuste unisex</li>
                <li>Lavable en la lavadora</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <CustomizationModal
        isOpen={isOpen}
        onClose={onClose}
        tshirtImage={tshirt?.attributes.image.data.attributes.url || ""}
        onSaveCustomization={handleSaveCustomization}
      />
    </div>
  );
}
