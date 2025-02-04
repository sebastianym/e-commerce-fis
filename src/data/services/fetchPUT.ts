import { getAuthToken } from "./user/getToken";

interface fetchPUTProps<T> {
    url: string;
    body_put: T;
    error: string;
}

export async function fetchPUT<T, R = any>(props: fetchPUTProps<T>): Promise<R> {
    const url = new URL(props.url, process.env.NEXT_PUBLIC_BACKEND_URL);
    const authToken = await getAuthToken();

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(props.body_put),
            cache: "no-cache",
        });
        
        return await response.json();

    } catch (error) {
        console.error(props.error, error);
        throw error;
    }
}