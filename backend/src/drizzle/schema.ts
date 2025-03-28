import { pgTable, uuid, text, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";


export const profile = pgTable("profile", {
  id: uuid("id").defaultRandom().primaryKey(),

  user_id: uuid("user_id")
    .notNull()
    .unique() // 1:1 relationship with users
    .references(() => users.id, { onDelete: "cascade" }),

  full_name: text("full_name"),
  username: text("username").notNull(),
  description: text("description"),
  profile_image_url: text("profile_image_url"),

  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});


//display the image pfp
export const images = pgTable('images', {
    id: text('id').primaryKey(),
    filename: text('filename').notNull(),
    mime_type: text('mime_type'),
    uploaded_at: timestamp('uploaded_at').defaultNow(),
    user_id: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }) // Optional
  });
  

// Define Enum for User Roles
export const userRoleEnum = pgEnum("user_role", ["user", "admin", "moderator"]);

// Users Table (Authentication)
export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    username: text("username").unique().notNull(),
    email: text("email").unique().notNull(),
    password_hash: text("password_hash").notNull(),
    first_name: text("first_name"),
    last_name: text("last_name"),
    role: userRoleEnum("role").default("user").notNull(),
    is_active: boolean("is_active").default(true),
    created_at: timestamp("created_at").defaultNow(),
});

// Sessions Table (For Supertokens Session Management)
export const sessions = pgTable("sessions", {
    id: uuid("id").defaultRandom().primaryKey(),
    user_id: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    created_at: timestamp("created_at").defaultNow(),
    expires_at: timestamp("expires_at").notNull(),
});

// Password Reset Table (For Forgot Password Functionality)
export const passwordResetTokens = pgTable("password_reset_tokens", {
    id: uuid("id").defaultRandom().primaryKey(),
    user_id: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    token: text("token").unique().notNull(),
    expires_at: timestamp("expires_at").notNull(),
});

// Posts Table (Content Management System Example)
export const posts = pgTable("posts", {
    id: uuid("id").defaultRandom().primaryKey(),
    user_id: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    content: text("content"),
    created_at: timestamp("created_at").defaultNow(),
});
