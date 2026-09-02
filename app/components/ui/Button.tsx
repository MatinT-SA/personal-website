import type { MouseEventHandler, ReactNode } from "react";

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children: ReactNode;
};

export default function Button({
  onClick,
  className = "",
  children,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-lg shadow transition duration-300 cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
