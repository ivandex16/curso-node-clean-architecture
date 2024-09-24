import { CreateTodoDto, TodoDataSource, TodoEntity, TodoRepository } from "../../domain";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";



export class TodoRepositoryImpl implements TodoRepository {
    
    constructor(
        private readonly datasource: TodoDataSource
    ){}
    
    
    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
       return await  this.datasource.create(createTodoDto)
    }
    async getAll(): Promise<TodoEntity[]> {
        return await this.datasource.getAll();
    }
   async findById(id: number): Promise<TodoEntity> {
    return await this.datasource.findById(id);
        
    }
    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.datasource.updateById(updateTodoDto)
    }
    async deleteById(id: number): Promise<TodoEntity> {
       return this.datasource.deleteById(id)
    }

}