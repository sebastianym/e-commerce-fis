"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, UserCog } from "lucide-react";
import { fetchPUT } from "@/data/services/fetchPUT";

// Datos de ejemplo
const users = [
  {
    id: 1,
    nombre: "Juan Pérez",
    email: "juan@example.com",
    role: "cliente",
  },
  {
    id: 2,
    nombre: "María García",
    email: "maria@example.com",
    role: "artista",
  },
  {
    id: 3,
    nombre: "Carlos López",
    email: "carlos@example.com",
    role: "cliente",
  },
];

export function ArtistSection() {
  const [asignarRole, setAsignarRole] = useState<string>("");

  //!!!Todavía no funciona!!
  const artistSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const id = formData.get("id");
    const url = `/api/users/${id}`;
    const body = {
      role: 3,
    };
    try {
      const response = await fetchPUT<{ role: number }>({
        url, // Endpoint relativo
        body, // Datos a enviar
        error: "Error al asignar Role",
      });
      console.log("Role asignado con éxito:", response);
      setAsignarRole("Role asignado con éxito");
    } catch (error) {
      console.error("Hubo un error:", error);
      setAsignarRole("Hubo un error:" + error);
    }
  };

  const handleRoleUpdate = (userId: number, newRole: string) => {
    // Implementar lógica de actualización de rol
    console.log("Actualizar rol:", userId, newRole);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Usuarios</h2>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol Actual</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.nombre}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.role === "artista"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          handleRoleUpdate(
                            user.id,
                            user.role === "artista" ? "cliente" : "artista"
                          )
                        }
                      >
                        <UserCog className="mr-2 h-4 w-4" />
                        Cambiar a{" "}
                        {user.role === "artista" ? "Cliente" : "Artista"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
