"use client";

import { useEffect, useState } from "react";
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
import { UserGetModel } from "@/lib/types/User";
import { fetchGET } from "@/data/services/fetchGET";
import { MdError } from "react-icons/md";
import { CircularProgress } from "@nextui-org/react";

export function ArtistSection() {
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<UserGetModel[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const url = "/api/users?populate=role";
        const response = await fetchGET<any[]>({
          url,
          error: "Error al obtener las camisetas",
        });
        const filteredUsers: UserGetModel[] = response
        .filter((user) => user.role.name !== "Administrador") // Filtra usuarios si es necesario
        .map((user) => ({
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role.name,
        }));
        setUsers(filteredUsers);
      } catch (error) {
        setError("Hubo un problema al cargar los usuarios.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [reload]);

  const handleRoleUpdate = async (userId: number, newRole: number) => {
    
    const url = `/api/users/${userId}`;
    const body_put = {
      role: newRole,
    };
    try {
      setLoading(true);
      const response = await fetchPUT<{ role: number }>({
        url, // Endpoint relativo
        body_put, // Datos a enviar
        error: "Error al asignar Role",
      });
      // console.log("Role asignado con éxito:", response);
      // window.alert("Role asignado con éxito");
      setReload(!reload);
      } catch (error) {
      console.error("Hubo un error:", error);
      window.alert("Hubo un error:" + error);
      setReload(!reload);
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <CircularProgress color="primary" label="Cargando ..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-auto items-center justify-center">
        <MdError className="mr-2 h-6 w-6" />
        <p>{error}</p>
      </div>
    );
  }
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
                <TableCell>{user.firstName}{" "}{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.role === "Artista"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-green-100 text-green-800"
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
                            user.role === "Artista" ? 1 : 3
                          )
                        }
                      >
                        <UserCog className="mr-2 h-4 w-4" />
                        Cambiar a{" "}
                        {user.role === "Artista" ? "Cliente" : "Artista"}
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
