// libs/auth/src/lib/dto/auth.response.ts
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AuthResponse {
  @Field()
  message?: string;

  @Field({ nullable: true })
  token?: string;
}
