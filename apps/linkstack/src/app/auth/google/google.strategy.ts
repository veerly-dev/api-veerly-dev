// auth/strategies/google.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(config: ConfigService) {
    const clientID =
      config.get('GOOGLE_CLIENT_ID') || process.env.GOOGLE_CLIENT_ID;
    const clientSecret =
      config.get('GOOGLE_CLIENT_SECRET') || process.env.GOOGLE_CLIENT_SECRET;
    const callbackURL =
      config.get('GOOGLE_CALLBACK_URL') || process.env.GOOGLE_CALLBACK_URL;
    console.log({
      clientID: config.get('GOOGLE_CLIENT_ID'),
      clientSecret: config.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: config.get('GOOGLE_CALLBACK_URL'),
    });
    if (clientID && clientSecret && callbackURL) {
      super({
        clientID:
          '204313397467-1vbr1j79oun0itfojvd20amntvos8kjt.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL:
          'https://api-veerly-dev.up.railway.app/api/auth/google/redirect',
        scope: ['email', 'profile'],
      });
    } else {
      throw new Error('Google OAuth environment variables are not set');
    }
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return {
      email: profile.emails?.[0]?.value ?? null,
      name: profile.displayName,
      googleId: profile.id,
    };
  }
}
