import { AppointmentType } from "../types";

const validateInput = (name: string, time: string): boolean => {
  return !(!name || !time);
};

const isDuplicate = (
  time: string,
  appointments: AppointmentType[]
): boolean => {
  return appointments.some((appointment) => appointment.time === time);
};

export { validateInput, isDuplicate };
