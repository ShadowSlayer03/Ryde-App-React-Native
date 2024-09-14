import {
  pgTable,
  serial,
  varchar,
  integer,
  decimal,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 50 }).notNull().unique(),
  clerk_id: varchar("clerk_id", { length: 100 }).notNull().unique(),
});

// Drivers table
export const drivers = pgTable("drivers", {
  id: serial("id").primaryKey(),
  first_name: varchar("first_name", { length: 50 }).notNull(),
  last_name: varchar("last_name", { length: 50 }).notNull(),
  profile_image_url: text("profile_image_url"),
  car_image_url: text("car_image_url"),
  car_seats: integer("car_seats").notNull(),
  rating: decimal("rating", { precision: 3, scale: 2 }),
});

// Rides table
export const rides = pgTable("rides", {
  ride_id: serial("ride_id").primaryKey(),
  origin_address: varchar("origin_address", { length: 255 }).notNull(),
  destination_address: varchar("destination_address", {
    length: 255,
  }).notNull(),
  origin_latitude: decimal("origin_latitude", {
    precision: 9,
    scale: 6,
  }).notNull(),
  origin_longitude: decimal("origin_longitude", {
    precision: 9,
    scale: 6,
  }).notNull(),
  destination_latitude: decimal("destination_latitude", {
    precision: 9,
    scale: 6,
  }).notNull(),
  destination_longitude: decimal("destination_longitude", {
    precision: 9,
    scale: 6,
  }).notNull(),
  ride_time: integer("ride_time").notNull(),
  fare_price: decimal("fare_price", { precision: 10, scale: 2 }).notNull(),
  payment_status: varchar("payment_status", { length: 20 }).notNull(),
  driver_id: integer("driver_id").references(() => drivers.id),
  user_id: varchar("user_id", { length: 100 }).notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Relationships
export const ridesRelations = relations(rides, ({ one }) => ({
  driver: one(drivers, {
    fields: [rides.driver_id],
    references: [drivers.id],
  }),
  user: one(users, {
    fields: [rides.user_id],
    references: [users.id],
  }),
}));

export const driversRelations = relations(drivers, ({ many }) => ({
  rides: many(rides),
}));

export const usersRelations = relations(users, ({ many }) => ({
  rides: many(rides),
}));
