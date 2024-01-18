import { Spaces } from "@app/utils";

type AppSpaces = keyof typeof Spaces;

type SpacerProps = {
  space: AppSpaces | number;
  between?: boolean;
};

export default function Spacer({ space = "md", between }: SpacerProps) {
  const finalSpace = typeof space === "number" ? space : Spaces[space];

  return space ? (
    <div
      style={{
        height: between ? 0 : finalSpace,
        width: between ? finalSpace : 0,
      }}
    />
  ) : null;
}

// Example usage:
// <Spacer space="lg" between />
