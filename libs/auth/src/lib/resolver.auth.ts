import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './service.auth';
import { SignInInput, SignUpInput } from './dto/req.auth';
import { AuthResponse } from './dto/resp.auth';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  /** User Registration */
  @Mutation(() => AuthResponse)
  async signUp(@Args('input') input: SignUpInput): Promise<AuthResponse> {
    return this.authService.signUp(input);
  }

  /** User Login */
  @Mutation(() => AuthResponse)
  async signIn(@Args('input') input: SignInInput): Promise<AuthResponse> {
    return this.authService.signIn(input);
  }

  /** Verify Access Token */
  @Mutation(() => AuthResponse)
  async verifyAccessToken(@Args('token') token: string): Promise<AuthResponse> {
    return this.authService.verifyAccessToken(token);
  }

  /** Refresh Tokens */
  @Mutation(() => AuthResponse)
  async refreshAccessToken(
    @Args('refreshToken') refreshToken: string
  ): Promise<AuthResponse> {
    return this.authService.refreshTokens(refreshToken);
  }
}
