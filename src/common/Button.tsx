import { ButtonProps } from "./types";

export const Button = ({
  className,
  children,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={
        "mt-4 w-full bg-blue-600 text-white hover:bg-blue-700" +
        (" " + className || "")
      }
    >
      {children}
    </button>
  );
};
