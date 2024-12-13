export interface CamisetaGetModel {
    id: number;
    attributes: {
        name: string;
        material: string;
        base_price: number;
        slug: string;
        sizes: string;
        colors: string;
        createdAt: string;  // Puedes usar `Date` si prefieres manejarlo como un objeto de fecha
        updatedAt: string;  // Igualmente, puedes usar `Date` para convertirlo en un objeto `Date`
        publishedAt: string; // Lo mismo para `publishedAt`
        is_available: boolean;
        is_active: boolean;
    };
}

export interface CamisetaPostModel {
    data: {
        name: string;
        material: string;
        base_price: number;
        slug: string;
        sizes: string;
        colors: string;
        is_available: boolean;
        is_active: boolean;
    };
}