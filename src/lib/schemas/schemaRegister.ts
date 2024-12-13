import { z } from "zod";

export const schemaRegister = z.object({
  firstName: z.string().min(1, { message: "El nombre no es válido" }),
  lastName: z.string().min(1, { message: "El apellido no es válido" }),
  email: z.string()
    .email({ message: "El email no es válido" }),
  username: z.string().min(5, { message: "El username no es válido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener por lo menos 6 caracteres" })
    .max(100, { message: "La contraseña debe tener entre 6 y 100 caracteres" }),
  academyIdSelected: z.number().optional(),
});
