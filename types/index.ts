export type TDataApi = {
    id: string
    title: string
    publishDate: string
    author: TAuthor
    summary: string
    categories: TCategories[]
}

export type TAuthor = {
    name: string
    avatar: string
}

export type TCategories = {
    id: string
    name: string
}

export type TCategoriesSelected = {
    id: string
    name: string
}
