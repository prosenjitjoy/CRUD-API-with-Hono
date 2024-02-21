import { openCollection } from "../database/database"
import TodoAdapter from "../database/adapter";
import { Body, Query, Todo } from "../model/model";
import { v4 as uuid } from 'uuid';

const collection = await openCollection("todo")


class TodoController {
  async getTodos(query: Query) {
    const limit = Number(query.limit)
    const offset = Number(query.offset)
    return await TodoAdapter.FindAll(limit, offset, collection)
  }

  async getTodoByID(id: string) {
    const record = await TodoAdapter.FindOne(id, collection) as Todo
    if (!record) {
      return "can not find record"
    } else {
      return record
    }
  }

  async addTodo(body: Body) {
    var todo: Todo = {
      _key: uuid(),
      title: body.title,
      completed: body.completed,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    return await TodoAdapter.Create(todo, collection)
  }

  async updateTodoByID(id: string) {
    const record = await TodoAdapter.FindOne(id, collection) as Todo
    if (!record) {
      return "can not find record"
    } else {
      return await TodoAdapter.Update(record, collection)
    }
  }

  async removeTodoByID(id: string) {
    const record = await TodoAdapter.FindOne(id, collection) as Todo
    if (!record) {
      return "can not find record"
    } else {
      return await TodoAdapter.Delete(id, collection)
    }
  }
}

export default new TodoController()