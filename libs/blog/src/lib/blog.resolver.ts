import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { BlogPost, CreatePostInput, UpdatePostInput } from './blog.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RolesGuard, Roles } from '@api-veerly-dev/auth';

@Resolver(() => BlogPost)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  // 📘 Public: Fetch all posts
  @Query(() => [BlogPost])
  async posts() {
    return this.blogService.getAllPosts();
  }

  // 📘 Public: Fetch single post
  @Query(() => BlogPost, { nullable: true })
  async post(@Args('id') id: string) {
    return this.blogService.getPostById(id);
  }

  // ✍️ Admin only: Create post
  @Mutation(() => BlogPost)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async createPost(@Args('input') input: CreatePostInput) {
    return this.blogService.createPost(input);
  }

  // ✍️ Admin only: Update post
  @Mutation(() => BlogPost)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async updatePost(
    @Args('id') id: string,
    @Args('input') input: UpdatePostInput
  ) {
    return this.blogService.updatePost(id, input);
  }

  // ❌ Admin only: Delete post
  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async deletePost(@Args('id') id: string) {
    await this.blogService.deletePost(id);
    return true;
  }
}
