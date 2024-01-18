import "@app/App.css";
import {
  AppointmentForm,
  AppointmentsList,
  Header,
  Spacer,
} from "@app/components";
import { AppointmentType } from "@app/types";
import { deleteData, getData, postData } from "@app/utils/functions";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Layout = (): JSX.Element => {
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [appointmentName, setAppointmentName] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const resetAppointmentState = () => {
    setAppointmentName("");
    setSelectedTime("");
  };

  const handleAppointmentName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppointmentName(e.target.value);
  };

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
  };

  const validateAppointmentDetails = () => {
    if (!appointmentName || !selectedTime) {
      alert("Name and time are required fields.");
      return false;
    }

    if (appointments.some((appointment) => appointment.time === selectedTime)) {
      alert("This time slot already booked! Try another one.");
      return false;
    }

    return true;
  };

  const getAppointments = async () => {
    try {
      const appointmentsData = await getData<AppointmentType[]>(
        "api/appointments"
      );
      if (appointmentsData) {
        setAppointments(appointmentsData);
      }
    } catch (error) {
      console.error("Failed to get appointments: ", error);
    }
  };

  const createAppointment = async () => {
    const isValidAppointment = validateAppointmentDetails();

    if (isValidAppointment) {
      try {
        const newAppointment: AppointmentType = {
          name: appointmentName,
          time: selectedTime,
          id: uuidv4(),
        };

        const response = await postData<AppointmentType>(
          "api/appointments/create",
          newAppointment
        );
        setAppointments([...appointments, response]);
        resetAppointmentState();
      } catch (error) {
        console.error("Error creating appointment: ", error);
      }
    }
  };

  const deleteAppointment = async (id: string) => {
    try {
      await deleteData<AppointmentType>(`api/appointments/delete/${id}`);
      setAppointments(
        appointments.filter((appointment) => appointment.id !== id)
      );
    } catch (error) {
      console.error("Error deleting appointment: ", error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div className="app-wrapper">
      <Header title="Schedulify" />

      <Spacer space="lg" />
      <div className="content-holder">
        <AppointmentForm
          appointmentName={appointmentName}
          createAppointment={createAppointment}
          handleAppointmentName={handleAppointmentName}
          handleTimeSelection={handleTimeSelection}
          selectedTime={selectedTime}
        />
        <AppointmentsList
          appointmentsList={appointments}
          deleteAppointment={deleteAppointment}
        />
      </div>
    </div>
  );
};

export default Layout;
