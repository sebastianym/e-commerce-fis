export const registerService = async (payload: any) => {
  const url = new URL("/api/auth/local/register", process.env.NEXT_PUBLIC_BACKEND_URL);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};
