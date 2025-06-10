import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	chatSessions: defineTable({
		title: v.string(),
		createdAt: v.number(),
		updatedAt: v.number(),
		userId: v.string(),
	}),
	messages: defineTable({
		sessionId: v.id("chatSessions"),
		role: v.string(),
		content: v.string(),
		timestamp: v.number(),
		images: v.optional(v.array(v.string())),
	}),
});
