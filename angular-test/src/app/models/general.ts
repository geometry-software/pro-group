import { User } from "./user"

export type Response = {
    results: User[]
    info: Info
}

export type Info = {
    page: number
    results: number
    seed: string
    version: string
}

export enum LoadingStatus {
    NotLoaded = 'NotLoaded',
    Loading = 'Loading',
    Loaded = 'Loaded',
    LoadingFailed = 'LoadingFailed'
}