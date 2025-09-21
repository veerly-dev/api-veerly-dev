// apps/linkstack/src/app/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './google/google.strategy';
import { GoogleAuthGuard } from './google/google-auth.guard';
import { GoogleController } from './google/google.controller';

@Module({
  imports: [ConfigModule], // 👈 This makes ConfigService available
  controllers: [GoogleController],
  providers: [GoogleStrategy, GoogleAuthGuard],
})
export class AuthModule {}
