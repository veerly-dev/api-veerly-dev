import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { JwtAuthGuard, RolesGuard, Roles } from '@api-veerly-dev/auth';

@Controller('posts')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  getAllPosts() {
    return this.blogService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.blogService.getPostById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  createPost(@Body() data: any) {
    return this.blogService.createPost(data);
  }
}
