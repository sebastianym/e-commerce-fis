"use client";

import { LogoutButton } from "@/components/custom/LogoutButton";
import { Link } from "next-view-transitions";
import { useEffect, useState } from "react";
import { getRoleService } from "@/data/services/auth/getRoleService";
import {
  CircularProgress,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { useTransitionRouter } from "next-view-transitions";
import { Button } from "@/components/ui/button";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useTransitionRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getRoleService();
      console.log(userData);
      if (userData.role) {
        setLogged(true);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CircularProgress color="primary" label="Cargando ..." />
      </div>
    );
  }

  return (
    <div>
      <Navbar position="static">
        <NavbarBrand>
          <p className="font-bold text-inherit text-xl">CamiXpress</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
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
        <NavbarContent justify="end">
          <NavbarItem>
            {logged ? (
              <LogoutButton />
            ) : (
              <Button
                className="bg-indigo-600"
                onClick={() => router.push("/login")}
              >
                Iniciar Sesión
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <div>{children}</div>
    </div>
  );
}
