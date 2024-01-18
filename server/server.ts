import cors from "cors";
import express, { Express } from "express";
import {
  createAppointmentRouter,
  deleteAppointmentRouter,
  getAppointmentsRouter,
} from "./src/routes/appointments";
import { BASE_API_ROUTE } from "./src/constants";

const app: Express = express();
const PORT: number = 3001;

app.use(cors());
app.use(express.json());

app.use(BASE_API_ROUTE, getAppointmentsRouter);
app.use(BASE_API_ROUTE, createAppointmentRouter);
app.use(BASE_API_ROUTE, deleteAppointmentRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port: ${PORT}`);
});

export { app };
