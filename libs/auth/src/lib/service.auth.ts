import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcryptjs';
import { db } from '@api-veerly-dev/drizzle-client';
import { users } from '@api-veerly-dev/drizzle-client';

interface SignUpInput {
  name: string;
  email: string;
  password: string;
}

interface SignInInput {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  /** Generate and store access + refresh tokens */
  private async generateAndStoreTokens(user: any) {
    const accessToken = this.jwtService.sign(
      { sub: user.id, email: user.email },
      { expiresIn: '15m' }
    );

    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: '7d' }
    );

    // Persist refresh token in DB
    await db.update(users).set({ refreshToken }).where(eq(users.id, user.id));

    return { accessToken, refreshToken };
  }

  /** Verify access token */
  async verifyAccessToken(token: string) {
    if (!token) throw new UnauthorizedException('Access token required');

    try {
      const { sub: userId } = this.jwtService.verify(token);

      const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
        columns: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });

      if (!user) throw new UnauthorizedException('User not found');

      return {
        valid: true,
        message: 'Access token is valid',
        user: {
          id: user.id,
          name: user.name ?? null,
          email: user.email,
          role: user.role ?? null,
        },
      };
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }

  /** Refresh tokens */
  async refreshTokens(refreshToken: string) {
    if (!refreshToken) throw new UnauthorizedException('Refresh token missing');

    let payload: any;
    try {
      payload = this.jwtService.verify(refreshToken);
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, payload.sub),
    });

    if (!user) throw new UnauthorizedException('User not found');

    // Validate DB refresh token
    if (user.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Refresh token mismatch');
    }

    const tokens = await this.generateAndStoreTokens(user);

    return {
      message: 'Tokens refreshed successfully',
      user: {
        id: user.id,
        name: user.name ?? null,
        email: user.email,
        role: user.role ?? null,
      },
      ...tokens,
    };
  }

  /** Register user */
  async signUp({ name, email, password }: SignUpInput) {
    const existing = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existing) return { message: 'Email already in use. Please log in.' };

    const passwordHash = await bcrypt.hash(password, 10);

    const [newUser] = await db
      .insert(users)
      .values({ name, email, passwordHash })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
      });

    const tokens = await this.generateAndStoreTokens(newUser);

    return {
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        name: newUser.name ?? null,
        email: newUser.email,
        role: newUser.role ?? null,
      },
      ...tokens,
    };
  }

  /** Login user */
  async signIn({ email, password }: SignInInput) {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) return { message: 'Email not found. Sign up to get started.' };

    const isValid = await bcrypt.compare(password, user.passwordHash ?? '');
    if (!isValid) return { message: 'Incorrect password. Please try again.' };

    const tokens = await this.generateAndStoreTokens(user);

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name ?? null,
        email: user.email,
        role: user.role ?? null,
      },
      ...tokens,
    };
  }
}
