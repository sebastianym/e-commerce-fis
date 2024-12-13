export interface StampPostModel {
    data: {
        name: string,
        description: string,
        rating: number,
        image: number
    }
}

export interface StampGetModel {
    id: number,
    name: string,
    description: string,
    rating: number,
    image: string
}