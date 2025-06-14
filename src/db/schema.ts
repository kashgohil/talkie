import * as s from "drizzle-orm/sqlite-core";

export const projects = s.sqliteTable("projects", {
	id: s.text("id").primaryKey(),
	createdAt: s.integer("created_at", { mode: "timestamp" }),
	updatedAt: s.integer("updated_at", { mode: "timestamp" }),
	userId: s.text("user_id").notNull(),
	name: s.text("name").notNull(),
	description: s.text("description"),
	createdBy: s.text("created_by").notNull(),
	systemPrompt: s.text("system_prompt"),
});

export const chats = s.sqliteTable("chats", {
	id: s.text("id").primaryKey(),
	projectId: s.text("project_id").references(() => projects.id),
	createdAt: s.integer("created_at", { mode: "timestamp" }),
	updatedAt: s.integer("updated_at", { mode: "timestamp" }),
	userId: s.text("user_id").notNull(),
	name: s.text("name").notNull(),
});

export const messages = s.sqliteTable("messages", {
	id: s.text("id").primaryKey(),
	chatId: s.text("chat_id").references(() => chats.id),
	createdAt: s.integer("created_at", { mode: "timestamp" }),
	updatedAt: s.integer("updated_at", { mode: "timestamp" }),
	userId: s.text("user_id").notNull(),
	message: s.text("message").notNull(),
	model: s.text("model").notNull(),
	role: s.text("role").notNull(),
	response: s.text("response"),
	responseTokens: s.integer("response_tokens"),
	responseTime: s.integer("response_time"),
});
