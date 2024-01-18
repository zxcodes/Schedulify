import express, { Request, Response } from "express";
import { appointments } from "../../models/appointment-model";

const deleteAppointmentRouter = express.Router();

deleteAppointmentRouter.delete("/delete/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== id
    );

    appointments.length = 0;
    Array.prototype.push.apply(appointments, updatedAppointments);

    res.json({ message: "Appointment deleted successfully." });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default deleteAppointmentRouter;
