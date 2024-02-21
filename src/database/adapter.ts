import { DocumentCollection } from "arangojs/collection";
import { aql } from "arangojs"
import { db } from "../database/database"
import { Todo } from "../model/model";


class TodoAdapter {
    async FindAll(limit: number, offset: number, col: DocumentCollection<any>) {
        try {
            var arr = []
            const cursor = await db.query(aql`
            FOR doc IN ${col}
            LIMIT ${offset}, ${limit}
            RETURN doc
        `)
            for await (const value of cursor) {
                arr.push(value)
            }
            return arr
        } catch (e) {
            console.error(e)
            return "Something went wrong"
        }
    }

    async FindOne(key: string, col: DocumentCollection<any>) {
        try {
            const cursor = await db.query<Todo>(aql`
        FOR doc IN ${col}
        FILTER doc._key == ${key}
        RETURN doc
    `)
            for await (const value of cursor) {
                return value
            }
        } catch (e) {
            console.error(e)
            return "Something went wrong"
        }
    }

    async Create(todo: Todo, col: DocumentCollection<any>) {
        try {
            const result = await col.save({
                _key: todo._key,
                title: todo.title,
                completed: todo.completed,
                created_at: todo.created_at,
                updated_at: todo.updated_at
            });
            return result
        } catch (e) {
            console.error(e)
            return "Something went wrong"
        }
    }

    async Update(update: any, col: DocumentCollection<any>) {
        try {
            const result = await col.update(update._key, {
                completed: !update.completed,
                updated_at: new Date().toISOString()
            })
            return result
        } catch (e) {
            console.error(e)
            return "Something went wrong"
        }
    }

    async Delete(id: string, col: DocumentCollection<any>) {
        try {
            const result = await col.remove(id)
            return result
        } catch (e) {
            console.error(e)
            return "Something went wrong"
        }
    }
}

export default new TodoAdapter()