"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
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
          <form className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Nombre
              </label>
              <Input
                id="name"
                placeholder="nombre"
                type={"name"}
                autoCapitalize="none"
                autoComplete="nombre"
                autoCorrect="off"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Correo Electrónico
              </label>
              <Input
                id="email"
                placeholder="tu@ejemplo.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password">Contraseña</label>
              <div className="relative">
                <Input
                  id="password"
                  type={"password"}
                  autoCapitalize="none"
                  autoComplete="current-password"
                  autoCorrect="off"
                  placeholder="********"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="role"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Rol
              </label>
              <select
                id="role"
                name="role"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              >
                <option value="" disabled selected>
                  Selecciona un rol
                </option>
                <option value="artist">Artista</option>
                <option value="client">Cliente</option>
              </select>
            </div>
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <LogIn className="mr-2 h-4 w-4" /> Registrarse
            </Button>
          </form>
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
