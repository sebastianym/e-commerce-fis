import { getAuthToken } from "./user/getToken";

interface fetchPOSTProps {
    url: string;
    fileForm: FormData;
    error: string;
}

export async function fetchFile<R = any>(props: fetchPOSTProps): Promise<R> {
    const url = new URL(props.url, process.env.NEXT_PUBLIC_BACKEND_URL);
    const authToken = await getAuthToken();

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            body: props.fileForm,
            cache: "no-cache",
        });

        return await response.json();

    } catch (error) {
        console.error(props.error, error);
        throw error;
    }
}