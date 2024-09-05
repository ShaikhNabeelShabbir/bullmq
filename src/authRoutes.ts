import { Hono } from "hono";
import {
  handleDeleteJob,
  //handleUpdateJob,
  scheduleJobController,
} from "./authController";

const authRoutes = new Hono();

// Route to schedule a job (POST request)
authRoutes.post("/schedule-job", scheduleJobController);

// Route to delete a job by ID (DELETE request with JSON body)
authRoutes.delete("/schedule-job", handleDeleteJob); // Remove `:timestamp` as jobId is used

// Route to update a job (PATCH request with JSON body)
//authRoutes.patch("/schedule-job", handleUpdateJob);

export { authRoutes };
