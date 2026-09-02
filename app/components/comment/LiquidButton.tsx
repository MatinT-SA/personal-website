import type { ReactNode, ButtonHTMLAttributes } from "react";
import styles from "./comment.module.css";

type LiquidButtonProps = {
  children: ReactNode;
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "disabled">;

export const LiquidButton = ({
  children,
  type = "submit",
  disabled = false,
}: LiquidButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${styles.liquidButtonContainer} transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <span>{children}</span>
      <div className={styles.liquid}></div>
    </button>
  );
};
