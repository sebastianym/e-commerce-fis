"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
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
          <form className="space-y-4">
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
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <LogIn className="mr-2 h-4 w-4" /> Iniciar Sesión
            </Button>
          </form>
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
    </main>
  );
}
