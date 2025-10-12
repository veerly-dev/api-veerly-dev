import { Module } from '@nestjs/common';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { Request } from 'express';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OrganizationModule } from '@veerly-dev/organization';
import { AuthGoogleModule, ContextGqlAuthGuard } from '@veerly-dev/auth-google';

import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'apps/linkstack/dist/schema.gql'),
      context: ({ req }: { req: Request }) => {
        const jwtService = new JwtService({ secret: process.env.JWT_SECRET });
        const token = req.headers.authorization?.replace('Bearer ', '');
        const user = token ? jwtService.verify(token) : null;
        return { user };
      },
    }),
    OrganizationModule,
    AuthGoogleModule,
  ],
  controllers: [AppController],
  providers: [AppService, ContextGqlAuthGuard],
})
export class AppModule {}
