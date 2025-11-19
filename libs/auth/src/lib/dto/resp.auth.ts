// libs/auth/src/lib/dto/resp.auth.ts
import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class UserResponse {
  @Field()
  id!: string;

  @Field({ nullable: true })
  name!: string | null;

  @Field()
  email!: string;

  @Field({ nullable: true })
  role!: string | null;
}

@ObjectType()
export class AuthResponse {
  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  accessToken?: string;

  @Field({ nullable: true })
  refreshToken?: string;

  @Field({ nullable: true })
  valid?: boolean;

  @Field(() => UserResponse, { nullable: true })
  user?: UserResponse;
}
