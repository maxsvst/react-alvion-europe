import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./List.module.css";
import { formatListDate } from "../../../common/dateHelpers";
import { RootState } from "../../../store/store";
import { setCurrentProjectId } from "../../../features/projectsSlice";
import { IItem } from "../../../types";

export default function List() {
  const selector = useSelector(
    (state: RootState) => state.reducer.projects.list?.Projects
  );
  const dispatch = useDispatch();

  const formatDate = (item: IItem) => formatListDate(item.startDate) +
    " - " +
    formatListDate(item.endDate)


  return (
    <>
      {selector && (
        <ul className={styles.list}>
          {selector.map((item) => (
            <Link className={styles.link}
              key={item.id}
              to={`/projects/${item.id}`}>
              <li
                key={item.id}
                onClick={() => dispatch(setCurrentProjectId(item.id))}
                className={styles.list_item}
              >
                <div className={styles.date}>
                  {formatDate(item)}
                </div>
                <div className={styles.subject}>{item.subject}</div>
                <div className={styles.name}>{item.createdBy}</div>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </>
  );
}
