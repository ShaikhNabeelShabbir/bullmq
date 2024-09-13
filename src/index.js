import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { authRoutes } from "./authRoutes";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
const app = new Hono();
app.use("*", prettyJSON());
const corsOption = {
    origin: ["https://1155-103-232-238-200.ngrok-free.app"],
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowHeaders: ["*"],
};
app.use(cors(corsOption));
// Basic endpoint to check if the server is working
app.get("/", (c) => {
    return c.text("Hello Hono how are you!");
});
// Use the auth routes
app.route("/", authRoutes);
const port = 3000;
console.log(`Server is running on port ${port}`);
serve({
    fetch: app.fetch,
    port,
});
