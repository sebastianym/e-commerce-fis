"use client";
import RegisterForm from "@/components/auth/RegisterForm";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { LogIn } from "lucide-react";
import { Link } from "next-view-transitions";

export default function Login() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-between px-4">
      {/* Encabezado */}
      <Navbar position="static">
        <NavbarBrand>
          <p className="font-bold text-inherit">Camisetas</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="end">
          <NavbarItem isActive>
            <Link color="foreground" href="/#inicio">
              Inicio
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/#diseños">
              Diseños
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/#personalizar">
              Personalizar
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/#sobre-nosotros">
              Sobre Nosotros
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* Formulario ingreso */}
      <Card className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md">
        <CardHeader className="flex flex-col p-6 space-y-1">
          <h1 className="tracking-tight text-2xl font-bold text-center">
            Registrar
          </h1>
          <p className="text-sm text-muted-foreground text-center">
            Ingresa tus datos
          </p>
        </CardHeader>
        <CardBody className="p-6 pt-0">
          <RegisterForm />
        </CardBody>
        <CardFooter className="items-center p-6 pt-0 flex flex-col space-y-2">
          <div className="text-sm text-gray-600">
            <Link href="/login" className="text-indigo-600 hover:underline">
              Inciar Sesión
            </Link>
          </div>
        </CardFooter>
      </Card>

      {/* Pie de página */}
      <footer className="text-center text-sm text-gray-600 py-4">
        &copy; 2024 Camisetas. Todos los derechos reservados.
      </footer>
    </main>
  );
}
