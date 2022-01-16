import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
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

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userModel.find().lean();
      return users;
    } catch (error) {
      throw error;
    }
  }

  //Todo Operations

  async createTodo(input: CreateTodoInput): Promise<User> {
    try {
      const user = await this.userModel.findOne({ _id: input.userId });
      const todo = {
        id: nanoid(),
        createdAt: new Date(),
        updatedAt: new Date(),
        task: input.task,
        completed: input.completed,
      };
      user.todos.push(todo);
      await user.save();

      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateTodo(input: UpdateTodoInput): Promise<User> {
    try {
      const user = await this.userModel.findOne({ _id: input.userId });
      const todo = user.todos.find((todo) => todo.id === input.id);
      todo.task = input.task;
      todo.completed = input.completed;
      todo.updatedAt = new Date();
      await user.save();

      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteTodo(input: DeleteTodoInput): Promise<User> {
    try {
      const user = await this.userModel.findOne({ _id: input.userId });
      user.todos = user.todos.filter((todo) => todo.id !== input.id);
      await user.save();

      return user;
    } catch (error) {
      throw error;
    }
  }
}
