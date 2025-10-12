// tools/stitch-prisma-schema.ts
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const fragments = [
  'libs/blog/src/prisma/blog.prisma',
  'libs/organization/src/prisma/organization.prisma',
];

const header = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
`;

const stitched = fragments
  .map((path) => readFileSync(join(process.cwd(), path), 'utf8'))
  .join('\n\n');

writeFileSync(join(__dirname, 'schema.prisma'), header + stitched);
console.log('✅ Prisma schema stitched successfully.');
