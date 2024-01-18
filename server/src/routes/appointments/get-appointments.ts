import express, { Request, Response } from "express";
import { appointments } from "../../models/appointment-model";

const getAppointmentsRouter = express.Router();

getAppointmentsRouter.get("/", (req: Request, res: Response) => {
  try {
    res.json(appointments);
  } catch (error) {
    console.error("Error getting appointments:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default getAppointmentsRouter;
