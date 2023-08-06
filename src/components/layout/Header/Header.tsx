import { useLocation, Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./Header.module.css";
import { IPage } from "../../../types";
import { RootState } from "../../../store/store";

export default function Header() {

  const selector = useSelector(
    (state: RootState) => state.reducer.projects.list?.Projects[0]
  );
  const { id = selector?.id ? selector.id : 1 } = useParams()
  const location = useLocation();

  const pages = [
    { name: "Данные", to: "/" },
    { name: "Проекты", to: `/projects/${id}` },
  ]

  const linkClassName = (page: IPage) =>
    location.pathname === page.to ? styles.active_link : styles.link

  return (
    <header className={styles.header}>
      {pages.map((page) => (
        <Link
          key={page.to}
          to={page.to}
          className={linkClassName(page)}
        >
          {page.name}
        </Link>
      ))}
    </header>
  );
}
