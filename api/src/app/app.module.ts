import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { ProfileResolver } from '@api-veerly-dev/profile';
import { AuthModule } from '@api-veerly-dev/auth';
import { UploadResolver } from './cloudinary.resolver';
import { UploadScalar } from './cloudinary.scalar';
import { CloudinaryService } from './cloudinary.service';

@Module({
  imports: [
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'dist/apps/api/schema.gql'),
      path: '/serve/graphql',
      playground: true,
      csrfPrevention: false,
    }),
  ],
  providers: [ProfileResolver, UploadResolver, CloudinaryService],
})
export class AppModule {}
