import { Hono } from "hono";
import { scheduleJobController } from "./authController";

const authRoutes = new Hono();

authRoutes.post("/schedule-job", scheduleJobController);

export { authRoutes };
