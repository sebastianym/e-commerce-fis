import { z } from "zod";

export const schemaLogin = z.object({
  identifier: z.string().min(5, { message: "El identificador no es válido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener por lo menos 6 caracteres" })
    .max(100, { message: "La contraseña debe tener entre 6 y 100 caracteres" }),
  academyIdSelected: z.number().optional(),
});
