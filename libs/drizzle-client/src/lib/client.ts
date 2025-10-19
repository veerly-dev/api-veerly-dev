// libs/drizzle-client/src/lib/client.ts
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

const sql = neon(
  'postgresql://neondb_owner:npg_gzAdSVbBtn40@ep-odd-credit-adstx87s-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
);
export const db = drizzle(sql, { schema });
