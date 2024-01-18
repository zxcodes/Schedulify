import { ButtonHTMLAttributes, CSSProperties } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ style, ...props }: ButtonProps): JSX.Element => {
  return <button style={{ ...buttonStyles, ...style }} {...props} />;
};

export default Button;

const buttonStyles: CSSProperties = {
  padding: "0.7rem 1.4rem",
  border: "none",
  backgroundColor: "#FFF",
  borderRadius: "0.6rem",
  color: "#202020",
  cursor: "pointer",
};
