import { pgTable, bigint, timestamp, varchar, index } from "drizzle-orm/pg-core";

// Platform table
export const platforms = pgTable('platforms', {
    id: bigint('id', { mode: 'bigint' }).primaryKey().generatedAlwaysAsIdentity(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
    
    name: varchar('name', { length: 100 }).notNull(),
  }, (table) => ({
    nameIndex: index('platforms_name_idx').on(table.name),
  }));
  
  