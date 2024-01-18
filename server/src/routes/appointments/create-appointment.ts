import express, { Request, Response } from "express";
import { appointments } from "../../models/appointment-model";
import { Appointment } from "../../types";
import {
  isDuplicate as isDuplicateAppointment,
  validateInput,
} from "../../utils/functions";

const createAppointmentRouter = express.Router();

createAppointmentRouter.post("/", (req: Request, res: Response) => {
  try {
    const { name, time } = req.body;

    if (!validateInput(name, time)) {
      return res
        .status(400)
        .json({ error: "Name and time are required fields." });
    }

    if (isDuplicateAppointment(time, appointments)) {
      return res
        .status(400)
        .json({ error: "Time slot already booked. Try another time!" });
    }

    const newAppointment: Appointment = { name, time };
    appointments.push(newAppointment);

    res.status(201).json(newAppointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default createAppointmentRouter;
