"use server";

import { loginService } from "@/data/services/auth/loginService";
import { getRoleService } from "@/data/services/auth/getRoleService";
import { config } from "@/lib/config/auth/cookieConfig";
import { schemaLogin } from "@/lib/schemas/schemaLogin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const loginAction = async (prevState: any, formData: FormData) => {
  let redirectPath: string | null = null;

  try {
    const validatedFields = schemaLogin.safeParse({
      identifier: formData.get("identifier"),
      password: formData.get("password"),
    });

    if (
      !validatedFields.success ||
      !validatedFields.data.identifier ||
      !validatedFields.data.password
    ) {
      return {
        ...prevState,
        apiErrors: null,
        zodErrors: validatedFields.error?.flatten().fieldErrors,
        message: "Faltan campos por completar. No se pudo iniciar sesión.",
      };
    }

    const responseData = await loginService({
      identifier: validatedFields.data.identifier,
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

      const responseUser = await getRoleService();

      if (responseUser.role.type === "administrador") {
        redirectPath = `/admin`;
      } 
      
      if(responseUser.role.type === "artista") {
        redirectPath = `/`;
      }
      
      if(responseUser.role.type === "authenticated") {
        redirectPath = `/`;
      }
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
