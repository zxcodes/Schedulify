import { CSSProperties } from "react";

type HeaderProps = {
  title: string;
  style?: CSSProperties;
};

export default function Header({ title, style }: HeaderProps): JSX.Element {
  return (
    <h1 style={style} className="header-primary">
      {title}
    </h1>
  );
}
