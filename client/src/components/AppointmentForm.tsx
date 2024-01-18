import React, { CSSProperties } from "react";
import Button from "./Button";
import Spacer from "./Spacer";

interface AppointmentFormProps {
  appointmentName: string;
  selectedTime: string;
  handleAppointmentName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTimeSelection: (time: string) => void;
  createAppointment: () => void;
}

const TEMP_APPOINTMENT_TIMES = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"];

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  appointmentName,
  selectedTime,
  handleAppointmentName,
  handleTimeSelection,
  createAppointment,
}) => {
  return (
    <div className="primary-content-container">
      <h1 className="primary-heading">Schedule an Appointment</h1>
      <Spacer space="lg" />
      <p className="heading-small">Appointment Name</p>
      <Spacer space="sm" />
      <input
        value={appointmentName}
        onChange={handleAppointmentName}
        className="input-primary"
        placeholder="Enter appointment name"
      />
      <Spacer space="lg" />
      <p className="heading-small">Time Slot</p>
      <Spacer space="sm" />
      <div className="appointment-buttons-holder">
        {TEMP_APPOINTMENT_TIMES.map((time) => {
          const activeButtonStyle = {
            backgroundColor: time === selectedTime ? "#202020" : "#fff",
            color: time === selectedTime ? "#fff" : "#202020",
          };
          return (
            <Button
              key={time}
              onClick={() => handleTimeSelection(time)}
              style={activeButtonStyle}
            >
              {time}
            </Button>
          );
        })}
      </div>
      <Spacer space="lg" />
      <Button style={styles.scheduleButton} onClick={createAppointment}>
        Schedule
      </Button>
      <Spacer space="sm" />
    </div>
  );
};

export default AppointmentForm;

const styles: Record<string, CSSProperties> = {
  scheduleButton: {
    width: "100%",
    backgroundColor: "#875ae8",
    color: "#fff",
    padding: "0.9rem",
    fontSize: "1rem",
  },
};
