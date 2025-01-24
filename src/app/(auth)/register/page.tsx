"use client";
import RegisterForm from "@/components/auth/RegisterForm";
import { Image } from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";
import { Link } from "next-view-transitions";

export default function Login() {
  return (
    <div className="flex min-h-screen">
      {/* Columna de imagen */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="img/login.png"
          alt="Imagen de fondo"
          className="brightness-75 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-indigo-900/50" />
        <div className="absolute bottom-0 left-0 p-12 text-white z-10">
          <h2 className="text-5xl font-bold mb-4">Únete a nosotros</h2>
          <p className="text-2xl">
            Crea tu cuenta y comienza tu viaje con nosotros.
          </p>
        </div>
      </div>

      {/* Columna de formulario */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Registrar
          </h1>
          <p className="text-gray-600 mb-8">
            Ingresa tus datos para crear una cuenta
          </p>
          <RegisterForm />
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-800"
          >
            Iniciar Sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
