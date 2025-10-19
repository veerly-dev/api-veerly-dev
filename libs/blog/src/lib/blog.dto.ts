import { Field, ID, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
export class BlogPost {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  author?: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

@InputType()
export class CreatePostInput {
  @Field()
  title!: string;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  author?: string;
}

@InputType()
export class UpdatePostInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  content?: string;
}
