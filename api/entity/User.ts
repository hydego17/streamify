import { prop as Property, getModelForClass } from '@typegoose/typegoose';

import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'User' })
export class User {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  email: string;

  // Field() decorator is used to access the property, hence we dont use it on password
  @Property({ required: true })
  password: string;
}

export const UserModel = getModelForClass(User);
