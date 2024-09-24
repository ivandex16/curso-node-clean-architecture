import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";
import { TodoRepository } from "../../domain";

// const todos = [
//   { id: 1, text: "Buy milk", completedAt: new Date() },
//   { id: 2, text: "Clean the house", completedAt: null },
//   { id: 3, text: "Learn Node.js", completedAt: new Date() },
// ];

export class TodosController {
  constructor(
    private readonly todoRepository: TodoRepository,
  ) {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll()
    return res.json(todos);
  };

  public getTodoById = async(req: Request, res: Response) => {
    const id = +req.params.id;
    try {
      const todo = await this.todoRepository.findById(id)
      console.log('todo', todo)
       res.json(todo);
    } catch (error) {
      console.log('error in getToodoById', error)
       res.status(400).json({error})
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [ error, createTodoDto] = CreateTodoDto.create(req.body)
    if (error) return res.status(400).json({ error: error })
      const todo = await this.todoRepository.create(createTodoDto!)
    //const { text } = req.body;

   // if (!text) return res.status(400).json({ error: "Text is required" });
  //  const todo = await prisma.todo.create({
  //     data:createTodoDto!
  //   })
    res.json(todo);
  };

  public updateTodo = async(req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({...req.body,id})
    if ( error ) return res.status(400).json({ error: error })
      const updatedTodo = await this.todoRepository.updateById(updateTodoDto!)
   return  res.json(updatedTodo);
  };

  public deleteTodo = async (req:Request, res: Response) => {
    const id  = +req.params.id;
    const deletedTodo = await this.todoRepository.deleteById(id)
    res.json(deletedTodo);

  }
}
