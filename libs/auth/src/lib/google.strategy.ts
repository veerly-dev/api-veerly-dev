import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID:
        '204313397467-1vbr1j79oun0itfojvd20amntvos8kjt.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/api/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ) {
    const user = await this.authService.findOrCreateUser(profile);
    done(null, user);
  }
}
