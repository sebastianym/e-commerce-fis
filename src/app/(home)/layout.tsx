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
  const [role, setRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useTransitionRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getRoleService();
      if (userData.data) {
        setUserName(userData.firstName + " " + userData.lastName);
        setRole(userData.role.type);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <Navbar position="static">
        <NavbarBrand>
          <p className="font-bold text-inherit">Camisetas</p>
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
            {role === "authenticated" || role === "administrador" ? (
              <LogoutButton />
            ) : (
              <Button
                color="primary"
                variant="solid"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <div>{children}</div>
    </div>
  );
}
