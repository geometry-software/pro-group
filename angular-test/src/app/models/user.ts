export type User = {
    name: Name
    email: string
    picture: PictureSize,
    location: Location
}

export type PictureSize = {
    large: string
    medium: string
    thumbnail: string
}

export type Location = {
    city: string
    coordinates: Coordinates
}

export type Coordinates = {
    latitude: string
    longitude: string
}

export type Name = {
    first: string
    last: string
    title: string
}