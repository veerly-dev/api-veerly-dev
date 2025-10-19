import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogResolver } from './blog.resolver';
import { BlogController } from './blog.controller';
import { JwtAuthGuard, RolesGuard } from '@api-veerly-dev/auth';
import { Reflector } from '@nestjs/core';

@Module({
  imports: [],
  controllers: [BlogController],
  providers: [BlogService, BlogResolver, Reflector, JwtAuthGuard, RolesGuard],
  exports: [BlogService],
})
export class BlogModule {}
