import styles from "./Projects.module.css";
import List from "../../ui/List/List";

import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export default function Projects() {
  const selector = useSelector(
    (state: RootState) => state.reducer.projects.list?.Projects
  );

  return (
    <div className={styles.main}>
      {selector ? (
        <div className={styles.wrapper}>
          <List />
          <span> Нажмите на проект из списка, чтобы увидеть детали</span>
        </div>
      ) : (
        "Проекты отсутствуют"
      )}
    </div>
  );
}
