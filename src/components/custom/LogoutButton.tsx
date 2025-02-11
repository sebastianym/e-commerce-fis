// LogoutButton.tsx
import { useTransitionRouter } from "next-view-transitions";
import { useAuth } from "@/components/auth/authContext";

export function LogoutButton() {
  const router = useTransitionRouter();
  const { setLogged } = useAuth();

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "GET" });
    } catch (error) {
      console.error("Error during logout", error);
    }
    // Actualiza el estado global de autenticación:
    setLogged(false);
    // Navega a la página principal:
    router.push("/");
  };

  return (
    <button onClick={handleLogout} className="font-semibold text-sm text-red-500 rounded-sm hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-700">
      Cerrar sesión
    </button>
  );
}
