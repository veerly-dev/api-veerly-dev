// libs/auth/src/lib/auth.resolver.ts
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './services.auth';
import { SignInInput, SignUpInput } from './dto/req.auth';
import { AuthResponse } from './dto/resp.auth';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async signUp(@Args('input') input: SignUpInput): Promise<AuthResponse> {
    return this.authService.signUp(input);
  }

  @Mutation(() => AuthResponse)
  async signIn(@Args('input') input: SignInInput): Promise<AuthResponse> {
    return this.authService.signIn(input);
  }
}
