// libs/auth/src/lib/dto/auth.input.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignUpInput {
  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;
}

@InputType()
export class SignInInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}
