import { Appointment } from "@app/types";
import AppointmentListCard from "./AppointmentListCard";
import { Spacer } from ".";

interface AppointmentsListProps {
  appointmentsList: Appointment[];
  deleteAppointment: (time: string) => void;
}

const AppointmentsList = ({
  appointmentsList,
  deleteAppointment,
}: AppointmentsListProps): JSX.Element => {
  return (
    <div className="primary-content-container">
      <h1 className="primary-heading">Scheduled Appointments</h1>
      <Spacer space="lg" />

      {!appointmentsList.length ? (
        <p className="heading-small"> No appointments at the moment!</p>
      ) : null}

      {appointmentsList.map((appointment) => (
        <AppointmentListCard
          key={appointment.time}
          appointmentData={appointment}
          onDelete={() => deleteAppointment(appointment.time)}
        />
      ))}
    </div>
  );
};

export default AppointmentsList;
