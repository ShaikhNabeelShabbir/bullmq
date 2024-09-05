import { Hono } from "hono";
import {
  handleDeleteJob,
  handleUpdateJob,
  scheduleJobController,
} from "./authController";

const authRoutes = new Hono();

authRoutes.post("/schedule-job", scheduleJobController);
authRoutes.delete("/schedule-job/:timestamp", handleDeleteJob);
authRoutes.patch("/schedule-job/", handleUpdateJob);

export { authRoutes };
