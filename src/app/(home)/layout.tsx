"use client";

import { LogoutButton } from "@/components/custom/LogoutButton";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getRoleService } from "@/data/services/auth/getRoleService";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { useTransitionRouter } from "next-view-transitions";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [logged, setLogged] = useState(false);
  const router = useTransitionRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getRoleService()
      console.log(userData)
      if (userData.role) {
        setLogged(true);
      }
    };

    fetchUser();
  }, []);

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
                color="primary"
                variant="solid"
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
