// auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  issueJwt(user: { email: string; name: string; googleId: string }) {
    const payload = {
      sub: user.googleId,
      email: user.email,
      name: user.name,
    };
    return this.jwtService.sign(payload);
  }
}
