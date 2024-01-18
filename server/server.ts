import cors from "cors";
import express, { Express } from "express";
import {
  createAppointmentRouter,
  deleteAppointmentRouter,
  getAppointmentsRouter,
} from "./src/routes/appointments";
import { APPOINTMENTS_ROUTE } from "./src/constants";

const app: Express = express();
const PORT: number = 3001;

app.use(cors());
app.use(express.json());

app.use(APPOINTMENTS_ROUTE, getAppointmentsRouter);
app.use(APPOINTMENTS_ROUTE, createAppointmentRouter);
app.use(APPOINTMENTS_ROUTE, deleteAppointmentRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port: ${PORT}`);
});

export { app };
