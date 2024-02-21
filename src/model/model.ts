export interface Query {
    limit: string
    offset: string
}

export interface Body {
    title: string
    completed: boolean
}

export interface Todo {
    _key: string
    title: string
    completed: boolean
    created_at: string
    updated_at: string
}
