import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, Todo } from './user.schema';
import { CreateUserInput, CreateTodoInput, UpdateTodoInput, DeleteTodoInput } from './user.dto';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';

@Injectable()
export default class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(input: CreateUserInput): Promise<User> {
    try {
      const user = await new this.userModel(input).save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findOneByFireId(fireId: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ fireId }).lean();

      return user;
    } catch (error) {
      throw error;
    }
  }

  //Todo Operations

  async createTodo(fireId: string, input: CreateTodoInput): Promise<Todo> {
    try {
      const user = await this.userModel.findOne({ fireId });
      const todo = {
        id: nanoid(),
        createdAt: new Date(),
        updatedAt: new Date(),
        task: input.task,
        completed: input.completed,
      };
      user.todos.push(todo);
      await user.save();

      return todo;
    } catch (error) {
      throw error;
    }
  }

  async updateTodo(fireId: string, input: UpdateTodoInput): Promise<Todo> {
    try {
      const user = await this.userModel.findOne({ fireId });
      const todo = user.todos.find((todo) => todo.id === input.id);
      todo.task = input.task !== undefined ? input.task : todo.task;
      todo.completed = input.completed !== undefined ? input.completed : todo.completed;
      todo.updatedAt = new Date();
      await this.userModel.findByIdAndUpdate(user._id, user, { new: true });
      return todo;
    } catch (error) {
      throw error;
    }
  }

  async deleteTodo(fireId: string, input: DeleteTodoInput): Promise<Todo> {
    try {
      const user = await this.userModel.findOne({ fireId });
      const todo = user.todos.find((todo) => todo.id === input.id);

      user.todos = user.todos.filter((todo) => todo.id !== input.id);
      await this.userModel.findByIdAndUpdate(user._id, user, {
        new: true,
      });

      return todo;
    } catch (error) {
      throw error;
    }
  }
}
