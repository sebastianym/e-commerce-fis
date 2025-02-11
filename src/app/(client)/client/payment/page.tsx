"use client";

import { useEffect, useState } from "react";
import { CreditCard, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getUserMeLoader } from "@/data/services/user/getUserMeLoader";
import { toast } from "react-hot-toast";
import { useTransitionRouter } from "next-view-transitions";

export default function PaymentForm() {
  // Estado para el procesamiento del pago
  const [isProcessing, setIsProcessing] = useState(false);
  // Estado para almacenar la información del usuario
  const [userData, setUserData] = useState<any>(null);
  // Estado para almacenar el total del carrito
  const [cartTotal, setCartTotal] = useState(0);
  const router = useTransitionRouter();

  // Obtener la información del usuario
  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUserMeLoader();
      if (response.ok) {
        if ("data" in response) {
          setUserData(response.data);
        }
      }
    };
    fetchUser();
  }, []);

  // Calcular el total del carrito leyendo el localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const carritoGuardado = localStorage.getItem("shopping-cart");
      const productos = carritoGuardado ? JSON.parse(carritoGuardado) : [];
      const total = productos.reduce((acc: number, prod: any) => {
        // Se suma el precio incrementado en 10,000 si es personalizada, o el precio original
        const precio = prod.customizedImage ? prod.price + 10000 : prod.price;
        return acc + precio * prod.quantity;
      }, 0);
      setCartTotal(total);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simular procesamiento de pago
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Vaciar el carrito: eliminar el item del localStorage o reiniciarlo
    localStorage.removeItem("shopping-cart");
    // Si manejas un estado para el carrito, puedes actualizarlo, por ejemplo:
    setCartTotal(0);

    setIsProcessing(false);
    toast.success("¡Pago procesado!");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-3xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al carrito
        </Button>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Información del Cliente */}
            <Card>
              <CardHeader>
                <CardTitle>Información del Cliente</CardTitle>
                <CardDescription>Ingresa tus datos personales</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input
                      id="firstName"
                      placeholder="Juan"
                      required
                      defaultValue={userData?.firstName || ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input
                      id="lastName"
                      placeholder="Pérez"
                      required
                      defaultValue={userData?.lastName || ""}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="juan@ejemplo.com"
                    required
                    defaultValue={userData?.email || ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+57 300 123 4567"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección de Envío</Label>
                  <Input id="address" placeholder="Calle 123 #45-67" required />
                </div>
              </CardContent>
            </Card>

            {/* Información de Pago y Resumen */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información de Pago</CardTitle>
                  <CardDescription>
                    Ingresa los datos de tu tarjeta
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Fecha de Vencimiento</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="MM/AA" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => (
                            <SelectItem key={i + 1} value={`${i + 1}`}>
                              {String(i + 1).padStart(2, "0")}/23
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Resumen de la Orden */}
              <Card>
                <CardHeader>
                  <CardTitle>Resumen de la Orden</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${(cartTotal / 1000).toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Envío</span>
                    <span>Gratis</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${(cartTotal / 1000).toFixed(3)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    type="submit"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Procesando...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Pagar ${cartTotal.toFixed(3)}
                      </span>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
