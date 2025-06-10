import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new chat session
export const createSession = mutation({
	args: {
		title: v.string(),
		userId: v.string(),
	},
	handler: async (ctx, args) => {
		const now = Date.now();
		const sessionId = await ctx.db.insert("chatSessions", {
			title: args.title,
			createdAt: now,
			updatedAt: now,
			userId: args.userId,
		});
		return sessionId;
	},
});

// Add a message to a session
export const addMessage = mutation({
	args: {
		sessionId: v.id("chatSessions"),
		role: v.string(),
		content: v.string(),
		images: v.optional(v.array(v.string())),
	},
	handler: async (ctx, args) => {
		const messageId = await ctx.db.insert("messages", {
			sessionId: args.sessionId,
			role: args.role,
			content: args.content,
			timestamp: Date.now(),
			images: args.images,
		});

		// Update the session's updatedAt timestamp
		await ctx.db.patch(args.sessionId, {
			updatedAt: Date.now(),
		});

		return messageId;
	},
});

// Get all sessions for a user
export const getSessions = query({
	args: {
		userId: v.string(),
	},
	handler: async (ctx, args) => {
		const sessions = await ctx.db
			.query("chatSessions")
			.filter((q) => q.eq(q.field("userId"), args.userId))
			.order("desc")
			.collect();

		return sessions;
	},
});

// Get all messages for a session
export const getMessages = query({
	args: {
		sessionId: v.id("chatSessions"),
	},
	handler: async (ctx, args) => {
		const messages = await ctx.db
			.query("messages")
			.filter((q) => q.eq(q.field("sessionId"), args.sessionId))
			.order("asc")
			.collect();

		return messages;
	},
});

// Delete a session and its messages
export const deleteSession = mutation({
	args: {
		sessionId: v.id("chatSessions"),
	},
	handler: async (ctx, args) => {
		// Delete all messages in the session
		const messages = await ctx.db
			.query("messages")
			.filter((q) => q.eq(q.field("sessionId"), args.sessionId))
			.collect();

		for (const message of messages) {
			await ctx.db.delete(message._id);
		}

		// Delete the session
		await ctx.db.delete(args.sessionId);
	},
});
