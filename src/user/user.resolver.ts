import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateUserInput, CreateTodoInput, UpdateTodoInput, DeleteTodoInput } from './user.dto';
import { User, Todo } from './user.schema';
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
  @Mutation(() => Todo)
  async createTodo(
    @CurrentUser() fireId: string,
    @Args('input') input: CreateTodoInput,
  ): Promise<Todo> {
    return this.userService.createTodo(fireId, input);
  }

  @Mutation(() => Todo)
  async updateTodo(
    @CurrentUser() fireId: string,
    @Args('input') input: UpdateTodoInput,
  ): Promise<Todo> {
    return this.userService.updateTodo(fireId, input);
  }

  @Mutation(() => Todo)
  async deleteTodo(
    @CurrentUser() fireId: string,
    @Args('input') input: DeleteTodoInput,
  ): Promise<Todo> {
    return this.userService.deleteTodo(fireId, input);
  }
}
