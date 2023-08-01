import styles from "./Button.module.css";
import { IButtonProps } from "../../../types";

export default function Button({ title }: IButtonProps) {
  return (
    <button className={styles.button}>
      {title}
    </button>
  );
}
