import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
export type UserDocument = User & Document;

@ObjectType()
export class Todo {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => String)
  task: string;

  @Field(() => Boolean)
  completed: boolean;
}

@Schema()
@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

  @Prop()
  @Field(() => String)
  firstName: string;

  @Prop()
  @Field(() => String)
  lastName: string;

  @Prop()
  @Field(() => String)
  email: string;

  @Prop()
  fireId: string;

  @Prop([Todo])
  @Field(() => [Todo], { nullable: true })
  todos?: Todo[];
}

export const UserSchema = SchemaFactory.createForClass(User);
