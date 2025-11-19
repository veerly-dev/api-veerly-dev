import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  uuid,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// --- USERS ---
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }),
  email: varchar('email', { length: 150 }).notNull().unique(),
  refreshToken: text('refresh_token'),
  passwordHash: varchar('password_hash', { length: 255 }),
  role: varchar('role', { length: 20 }).default('admin'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// --- PROFILES ---
export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  headline: varchar('headline', { length: 255 }),
  about: text('about'),
  location: varchar('location', { length: 150 }),
  experienceYears: integer('experience_years'),
  skills: text('skills'), // JSON array or comma-separated
  socialLinks: text('social_links'), // JSON stringified
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// --- CATEGORIES ---
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  description: text('description'),
});

// --- TAGS ---
export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
});

// --- POSTS ---
export const posts = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  categoryId: integer('category_id').references(() => categories.id),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  content: text('content'),
  isPublished: boolean('is_published').default(false),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// --- POST TAG RELATION ---
export const postTags = pgTable(
  'post_tags',
  {
    postId: uuid('post_id')
      .notNull()
      .references(() => posts.id),
    tagId: integer('tag_id')
      .notNull()
      .references(() => tags.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.postId, t.tagId] }),
  })
);

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [posts.categoryId],
    references: [categories.id],
  }),
  tags: many(postTags),
}));

// --- INTERVIEW QUESTIONS ---
export const questions = pgTable('questions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  categoryId: integer('category_id').references(() => categories.id),
  title: varchar('title', { length: 255 }).notNull(),
  difficulty: varchar('difficulty', { length: 20 }).default('medium'),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// --- ANSWERS ---
export const answers = pgTable('answers', {
  id: uuid('id').defaultRandom().primaryKey(),
  questionId: uuid('question_id')
    .references(() => questions.id)
    .notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
