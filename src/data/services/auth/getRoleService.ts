import { getAuthToken } from "../user/getToken";

export const getRoleService = async () => {
  const url = new URL(
    "/api/users/me?populate=*",
    process.env.NEXT_PUBLIC_BACKEND_URL
  );

  const authToken = await getAuthToken();

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-cache",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    throw error;
  }
};
