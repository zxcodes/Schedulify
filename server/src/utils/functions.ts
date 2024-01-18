import { Appointment } from "../types";

const validateInput = (
  name: string | undefined,
  time: string | undefined
): boolean => {
  return !(!name || !time);
};

const isDuplicate = (time: string, appointments: Appointment[]): boolean => {
  return appointments.some((appointment) => appointment.time === time);
};

export { validateInput, isDuplicate };
