import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: uuid().notNull(),
  name: varchar({ length: 255 }),
  email: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp().notNull().defaultNow(),
});

export const userNotesTable = pgTable("user_notes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: uuid().notNull(),
  title: varchar({ length: 255 }).notNull(),
  content: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});
