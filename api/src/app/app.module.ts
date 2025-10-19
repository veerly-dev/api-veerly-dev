import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { ProfileResolver } from '@api-veerly-dev/profile';
import { AuthModule } from '@api-veerly-dev/auth';
import { BlogModule } from '@api-veerly-dev/blog';
@Module({
  imports: [
    AuthModule,
    BlogModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'dist/apps/api/schema.gql'),
      path: '/serve/graphql',
      playground: true,
    }),
  ],
  providers: [ProfileResolver],
})
export class AppModule {}
