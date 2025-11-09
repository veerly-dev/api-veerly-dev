import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { eq } from 'drizzle-orm';
import { db } from '@api-veerly-dev/drizzle-client';
import { users } from '@api-veerly-dev/drizzle-client';

@Injectable()
export class GoogleAuthService {
  constructor(private jwtService: JwtService) {}

  async findOrCreateUser(profile: any) {
    const email = profile.emails[0].value;
    const name = profile.displayName;

    const userRecords = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .execute();

    let userRecord = userRecords[0];
    if (!userRecord) {
      const insertedUsers = await db
        .insert(users)
        .values({
          name,
          email,
          role: 'user',
        })
        .returning()
        .execute();
      userRecord = insertedUsers[0];
    }
    const token = this.jwtService.sign(userRecord);

    return token;
  }

  async promoteToAdmin(email: string) {
    const updatedUsers = await db
      .update(users)
      .set({ role: 'admin' })
      .where(eq(users.email, email))
      .returning()
      .execute();

    return updatedUsers[0];
  }
}
