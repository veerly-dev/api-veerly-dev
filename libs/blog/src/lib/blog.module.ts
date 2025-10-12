import { Module } from '@nestjs/common';
import { PrismaModule } from '@veerly.dev/prisma';
import { BlogResolver } from './blog.resolver';
import { BlogService } from './blog.service';

@Module({
  controllers: [],
  providers: [BlogService, BlogResolver],
  exports: [PrismaModule],
})
export class VeerlyDevBlogModule {}
