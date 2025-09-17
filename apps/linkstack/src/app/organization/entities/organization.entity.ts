import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Organization {
  @Field(() => String)
  id!: string;
  @Field(() => String)
  name!: string;
  @Field(() => String)
  type!: string;
  @Field(() => String)
  parentId!: string;
  @Field(() => Date)
  createdAt!: Date;
}
