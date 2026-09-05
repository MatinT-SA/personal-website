import type { MouseEventHandler, ReactNode } from "react";

type ModalContainerProps = {
  show: boolean;
  closing: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
};

export default function ModalContainer({
  show,
  closing,
  onClick,
  children,
}: ModalContainerProps) {
  return (
    <div
      className={`fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-md ${
        closing ? "" : "transition-opacity duration-300"
      } ${show ? "opacity-100" : "opacity-0"}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
