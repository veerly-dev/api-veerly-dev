// apps/linkstack/src/app/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './google/jwt.service';
import { GoogleStrategy } from './google/google.strategy';
import { GoogleAuthGuard } from './google/google-auth.guard';
import { GoogleController } from './google/google.controller';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_SECRET') || process.env.JWT_SECRET,
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [GoogleController],
  providers: [GoogleStrategy, GoogleAuthGuard, AuthService],
})
export class AuthModule {}
