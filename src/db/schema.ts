import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: text('email').unique().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const profiles = pgTable('profiles', {
    id: uuid('id').primaryKey().references(() => users.id, { onDelete: 'cascade' }),
    fullName: text('full_name'),
    avatarUrl: text('avatar_url'),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
