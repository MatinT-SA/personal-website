import type { MouseEventHandler } from "react";
import { FaBars } from "react-icons/fa";

type HamburgerButtonProps = {
  openMenu: MouseEventHandler<HTMLButtonElement>;
};

export default function HamburgerButton({ openMenu }: HamburgerButtonProps) {
  return (
    <button
      type="button"
      onClick={openMenu}
      className="block mx-auto p-5 text-center w-12 h-12 text-dark-primary hamburger:hidden"
      aria-label="Open menu"
    >
      <FaBars className="w-8 h-8" />
    </button>
  );
}
