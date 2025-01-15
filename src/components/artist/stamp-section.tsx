"use client";

import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CircularProgress, Input } from "@nextui-org/react";
import { fetchGET } from "@/data/services/fetchGET";
import { StampPostModel, StampGetModel } from "@/lib/types/Stamp";
import { fetchPOST } from "@/data/services/fetchPOST";
import { fetchDELETE } from "@/data/services/fetchDELETE";
import { fetchFile } from "@/data/services/fetchFile";
import { MdError } from "react-icons/md";

export function StampSection() {
    const [stamps, setStamps] = useState<StampGetModel[]>([]); // Estado para almacenar las camisetas
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEstampas = async () => {
            try {
                const url = "/api/stamps?populate=*"
                const response = await fetchGET({
                    url,
                    error: "Error get camisetas",
                });
                const data = response.data;

                // Validar y mapear los datos para ajustarlos al modelo
                const mappedStamps: StampGetModel[] = data.map((item: any) => ({
                    id: item.id,
                    name: item.attributes.name,
                    description: item.attributes.description,
                    rating: item.attributes.rating,
                    image: item.attributes.image.data.attributes.url,

                }));
                console.log(mappedStamps)
                setStamps(mappedStamps); // Asume que data es un array de camisetas
            } catch (error) {
                console.error(error);
                setError("Hubo un problema al cargar las estampas.");
            } finally {
                setLoading(false); // Finaliza el estado de carga
            }
        };

        fetchEstampas();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        const file = formData.get('files');
        const fileForm = new FormData();
        fileForm.append('files', file as Blob);

        try {
            let url = "/api/upload"
            const response = await fetchFile({
                url,
                fileForm,
                error: "Error al subir imagen"
            });

            console.log("Respuesta 1: " + response)

            const image = response[0]?.id;

            const body: StampPostModel = {
                data: {
                    name: formData.get('name') as string,
                    description: formData.get('description') as string,
                    rating: 0,
                    image: image
                }
            };

            url = "/api/stamps"
            // Segunda petición: usa `id`, `name` y `age`
            const secondResponse = await fetchPOST<StampPostModel>({
                url,
                body,
                error: "Error al crear la Estampa"
            });
            console.log(secondResponse)
            window.alert("Estampa creada con exito")
            window.location.reload()
        } catch (error) {
            console.error("Hubo un error:", error);
            window.alert("Hubo un error:" + error);
            window.location.reload();
        }

    };

    const stampDeleteSubmit = async (id: string) => {

        let url = `/api/stamps/${id}?populate=*`

        try {

            const response = await fetchDELETE({
                url,
                error: "Error al Eliminar estampa",
            });
            const id_image = response.data.attributes.image.data.id;
            url = `/api/upload/files/${id_image}`

            const imageDelete = await fetchDELETE({
                url,
                error: "Error al Eliminar estampa",
            });
            console.log("Estampa eliminada con éxito:", response, imageDelete);
            window.alert("Estampa eliminada con éxito");
            window.location.reload();
        } catch (error) {
            console.error("Hubo un error:", error);
            window.alert("Hubo un error:" + error);
            window.location.reload();
        }
    }

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
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Camisetas</h2>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-indigo-600">
                            <Plus className="mr-2 h-4 w-4" />
                            Nueva Camiseta
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Crear Nueva Camiseta</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="imagen">Imagen</label>
                                    <Input type="file" id="files" name="files" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="nombre">Nombre estampa</label>
                                    <Input type="text" id="name" name="name" placeholder="Nombre de la estampa" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="nombre">Descripción</label>
                                    <Input type="text" id="description" name="description" placeholder="Descripción de la estampa" />
                                </div>
                            </div>
                            <Button type="submit" className="mt-2">
                                Crear Estampa
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Descripción</TableHead>
                            <TableHead>Imagen</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {stamps.map((stamp) => (
                            <TableRow key={stamp.id}>
                                <TableCell>{stamp.id}</TableCell>
                                <TableCell>{stamp.name}</TableCell>
                                <TableCell>{stamp.description}</TableCell>
                                <TableCell>
                                    <img
                                        src={stamp.image}
                                        alt={`Estampa ${stamp.name}`}
                                        className="w-20 h-fit object-cover"
                                    />
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
                                                className="text-red-600"
                                                onClick={() =>
                                                    stampDeleteSubmit(stamp.id.toString())
                                                }
                                            >
                                                <Trash className="mr-2 h-4 w-4" />
                                                Eliminar
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