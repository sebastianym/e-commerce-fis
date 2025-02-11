import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "./data/services/user/getUserMeLoader";

const accessControl = {
  // "/admin": {
  //   roles: ["administrador"],
  // },
  // "/cart": {
  //   roles: ["cliente"],
  // },
};
function isAuthorized(path: string, role: string | undefined): boolean {
  // @ts-ignore
  const accessRule = accessControl[path];

  if (!accessRule) return true;

  const allowedRoles = accessRule.roles;

  if (!allowedRoles.includes(role)) {
    return false;
  }

  return true;
}

export async function middleware(request: NextRequest) {
  const user = await getUserMeLoader();
  console.log(user);
  const currentPath = request.nextUrl.pathname;

  // if (user && "data" in user && user.data && user.data.role) {
  //   const role = user.data.role.type;

  //   // Si la ruta está restringida y el usuario no está autorizado, redirigir
  //   if (currentPath in accessControl && !isAuthorized(currentPath, role)) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // }

  // // Comprobaciones adicionales para rutas específicas
  // if (currentPath.startsWith("/admin") && user.ok === false) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // if (currentPath.startsWith("/cart") && user.ok === false) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // if (currentPath.startsWith("/login") && user.ok === true) {
  //   return NextResponse.redirect(new URL("/admin", request.url));
  // }

  return NextResponse.next();
}
