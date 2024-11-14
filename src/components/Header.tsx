"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

export default function Header() {
  return (
    <Navbar position="static">
      <NavbarBrand>
        <p className="font-bold text-inherit">Camisetas</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link color="foreground" href="#inicio">
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#diseños">
            Diseños
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#personalizar">
            Personalizar
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#sobre-nosotros">
            Sobre Nosotros
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            color="primary"
            variant="solid"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
