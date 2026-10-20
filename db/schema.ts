import { sqliteTable, text } from "drizzle-orm/sqlite-core";
export const inquiries = sqliteTable("inquiries", {
 id: text("id").primaryKey(),
 audience: text("audience").notNull(),
 name: text("name").notNull(),
 email: text("email").notNull(),
 organization: text("organization").notNull(),
 role: text("role"),
 portfolio: text("portfolio"),
 message: text("message"),
 consentVersion: text("consent_version").notNull(),
 createdAt: text("created_at").notNull(),
});
