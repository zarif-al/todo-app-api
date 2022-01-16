import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateUserInput, CreateTodoInput, UpdateTodoInput, DeleteTodoInput } from './user.dto';
import { User } from './user.schema';
import UserService from './user.service';
import { CurrentUser } from 'src/decorator/current-user.decorator';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.userService.createUser(input);
  }

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User, { nullable: true })
  currentUser(@CurrentUser() fireId: string): Promise<User | null> {
    return this.userService.findOneByFireId(fireId);
  }

  //Todo Operations
  @Mutation(() => User)
  async createTodo(@Args('input') input: CreateTodoInput): Promise<User> {
    return this.userService.createTodo(input);
  }

  @Mutation(() => User)
  async updateTodo(@Args('input') input: UpdateTodoInput): Promise<User> {
    return this.userService.updateTodo(input);
  }

  @Mutation(() => User)
  async deleteTodo(@Args('input') input: DeleteTodoInput): Promise<User> {
    return this.userService.deleteTodo(input);
  }
}
