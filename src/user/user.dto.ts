import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  userName: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  fireId: string;
}

@InputType()
export class CreateTodoInput {
  @Field(() => ID)
  userId: string;

  @Field(() => String)
  task: string;

  @Field(() => Boolean)
  completed: boolean;
}

@InputType()
export class UpdateTodoInput {
  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  task?: string;

  @Field(() => Boolean, { nullable: true })
  completed?: boolean;
}

@InputType()
export class DeleteTodoInput {
  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  id: string;
}
