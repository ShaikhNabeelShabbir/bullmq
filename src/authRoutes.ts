import { Hono } from "hono";
import { handleDeleteJob, scheduleJobController } from "./authController";

const authRoutes = new Hono();

authRoutes.post("/schedule-job", scheduleJobController);
authRoutes.delete("/schedule-job/:timestamp", handleDeleteJob);

export { authRoutes };
