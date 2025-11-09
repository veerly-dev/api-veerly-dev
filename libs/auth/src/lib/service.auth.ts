import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
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

  /**
   * User Registration
   */
  async signUp({ name, email, password }: SignUpInput) {
    // Check for existing user
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (existingUser) {
      return {
        message: 'This email is already in use. Please log in.',
      };
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert new user
    const [newUser] = await db
      .insert(users)
      .values({ name, email, passwordHash })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
      });

    // Generate JWT token
    const token = this.jwtService.sign({
      sub: newUser.id,
      email: newUser.email,
    });

    return {
      message: 'User registered successfully',
      user: newUser,
      token,
    };
  }

  /**
   * User Login
   */
  async signIn({ email, password }: SignInInput) {
    // Find user
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (!user) {
      return {
        message:
          'This email doesn’t exist in our system. Sign up to get started.',
      };
    }

    // Validate password
    const isValid = await bcrypt.compare(password, user.passwordHash ?? '');
    if (!isValid) {
      return {
        message: 'Incorrect password. Please try again.',
      };
    }

    // Generate token
    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }
}
