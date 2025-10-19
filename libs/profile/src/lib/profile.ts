// libs/profile/src/lib/profile.resolver.ts
import { Resolver, Query } from '@nestjs/graphql';
import { db, profiles } from '@api-veerly-dev/drizzle-client';

@Resolver()
export class ProfileResolver {
  @Query(() => String)
  async hello(): Promise<string> {
    const result = await db.select().from(profiles).limit(1);
    return result[0]?.headline ?? 'Hello, GraphQL!';
  }
}
