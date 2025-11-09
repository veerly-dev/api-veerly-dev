import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { GoogleAuthService } from './service.google';
import { GoogleStrategy } from './google.strategy';
import { GoogleAuthController } from './controller.google';
import { AuthResolver } from './resolver.auth';
import { AuthService } from './services.auth';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    JwtModule.register({
      secret: 'veerly-fullstack-developer',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService, GoogleStrategy, AuthResolver, AuthService],
  exports: [GoogleAuthService, PassportModule],
})
export class AuthModule {}
