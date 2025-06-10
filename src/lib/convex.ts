import { ConvexClient } from "convex/browser";
import { api } from "../../convex/_generated/api";

// Create a Convex client
const convex = new ConvexClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// Export the client and API
export { api, convex };
