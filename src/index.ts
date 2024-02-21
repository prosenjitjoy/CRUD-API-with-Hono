import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from "zod"
import TodoController from "./controller/controller"

const app = new Hono()

app.post("/create",
  zValidator("json",
    z.object({
      title: z.string(),
      completed: z.literal(false)
    })
  ),
  async (c) => {
    const body = c.req.valid("json")
    return c.json(await TodoController.addTodo(body))
  }
)

app.get("/read",
  zValidator("query",
    z.object({
      limit: z.string(),
      offset: z.string()
    })
  ),
  async (c) => {
    const query = c.req.valid("query")
    return c.json(await TodoController.getTodos(query))
  }
)

app.get("/read/:id",
  async (c) => {
    const id = c.req.param("id")
    return c.json(await TodoController.getTodoByID(id))
  }
)

app.put("/update/:id",
  async (c) => {
    const id = c.req.param("id")
    return c.json(await TodoController.updateTodoByID(id))
  }
)

app.delete("/delete/:id",
  async (c) => {
    const id = c.req.param("id")
    return c.json(await TodoController.removeTodoByID(id))
  }
)

export default app
