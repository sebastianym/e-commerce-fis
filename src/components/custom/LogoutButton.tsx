import { useTransitionRouter } from "next-view-transitions";

export function LogoutButton({ onLogout }: { onLogout: () => void }) {

	const router = useTransitionRouter()

	const handleLogout = async () => {
		const url = new URL('/api/logout', "http://localhost:3000");

		try {
			const response = await fetch(url, {
				method: "GET",
			});
		} catch (error) {
			console.error("Error during logout", error);
		}
		router.push("/");
		() => onLogout();
	};


	return (
		<div onClick={handleLogout} className="font-semibold text-sm text-red-500 rounded-sm hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-700 nav-link-dashboard">
			<button type="submit" className="font-semibold text-sm text-red-500 rounded-sm hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-700 nav-link-dashboard">
				Cerrar sesión
			</button>
		</div>
	);
}