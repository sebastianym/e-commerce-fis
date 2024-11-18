"use server";

import { registerService } from "@/data/services/auth/registerService";
import { config } from "@/lib/config/auth/cookieConfig";
import { schemaRegister } from "@/lib/schemas/schemaRegister";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const registerAction = async (prevState: any, formData: FormData) => {
  let redirectPath: string | null = null;

  try {
    const validatedFields = schemaRegister.safeParse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
    });

    if (
      !validatedFields.success ||
      !validatedFields.data.firstName ||
      !validatedFields.data.lastName ||
      !validatedFields.data.email ||
      !validatedFields.data.username ||
      !validatedFields.data.password
    ) {
      return {
        ...prevState,
        apiErrors: null,
        zodErrors: validatedFields.error?.flatten().fieldErrors,
        message: "Faltan campos por completar. No se pudo iniciar sesión.",
      };
    }

    const responseData = await registerService({
      firstName: validatedFields.data.firstName,
      lastName: validatedFields.data.lastName,
      email: validatedFields.data.email,
      username: validatedFields.data.username,
      password: validatedFields.data.password,
    });

    if (!responseData) {
      return {
        ...prevState,
        apiErrors: responseData.error,
        zodErrors: null,
        message: "Ocurrió un error. Por favor, intenta de nuevo.",
      };
    }

    if (responseData.error) {
      return {
        ...prevState,
        apiErrors: responseData.error.message,
        zodErrors: null,
        message: "Error al iniciar sesión.",
      };
    }

    if (responseData.jwt) {
      cookies().set("jwt", responseData.jwt, config);

      redirectPath = `/`;
    }
  } catch (error) {
    console.error("Login action error:", error);
    throw error;
  } finally {
    if (redirectPath) {
      redirect(redirectPath);
    }
  }
};
