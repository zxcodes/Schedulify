import { AppointmentType } from "@app/types";
import { CSSProperties } from "react";
import Button from "./Button";

type AppointmentListCardProps = {
  appointmentData: AppointmentType;
  onDelete: () => void;
};

export default function AppointmentListCard({
  onDelete,
  appointmentData,
}: AppointmentListCardProps) {
  return (
    <div style={cardStyles}>
      <p className="heading-small appointment-name">
        {`${appointmentData.name} - ${appointmentData.time}`}
      </p>
      <Button
        onClick={onDelete}
        style={{ backgroundColor: "#f24444", color: "#fff" }}
      >
        Delete
      </Button>
    </div>
  );
}

const cardStyles: CSSProperties = {
  padding: "1rem 1.5rem",
  backgroundColor: "#fff",
  borderRadius: "0.9rem",
  display: "flex",
  alignItems: "center",
  width: "100%",
  justifyContent: "space-between",
  marginBottom: "1rem",
};
