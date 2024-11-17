"use client";
import LoginForm from "@/components/auth/LoginForm";
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
            Iniciar Sesión
          </h1>
          <p className="text-sm text-muted-foreground text-center">
            Ingresa tus credenciales para acceder a tu cuenta
          </p>
        </CardHeader>
        <CardBody className="p-6 pt-0">
          <LoginForm />
        </CardBody>
        <CardFooter className="items-center p-6 pt-0 flex flex-col space-y-2">
          <Link
            href="/forgot-password"
            className="text-sm text-indigo-600 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
          <div className="text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link href="/register" className="text-indigo-600 hover:underline">
              Regístrate
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
