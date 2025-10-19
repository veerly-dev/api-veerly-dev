import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from '@api-veerly-dev/drizzle-client';
import { posts, postTags } from '@api-veerly-dev/drizzle-client';

@Injectable()
export class BlogService {
  async getAllPosts() {
    return db.select().from(posts);
  }

  async getPostById(id: string) {
    return await db.select().from(posts).where(eq(posts.id, id));
  }

  async createPost(data: any) {
    return db.insert(posts).values(data).returning();
  }

  async updatePost(id: string, data: any) {
    return db.update(posts).set(data).where(eq(posts.id, id)).returning();
  }

  async deletePost(id: string) {
    return db.delete(posts).where(eq(posts.id, id));
  }
}
