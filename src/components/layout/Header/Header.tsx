import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { IPage } from "../../../types";
import { RootState } from "../../../store/store";

import styles from "./Header.module.css";

export default function Header() {
  const { projectId } = useSelector(
    (state: RootState) => state?.reducer.projects
  );

  const pages = [
    { name: "Данные", to: "/" },
    { name: "Проекты", to: `/projects/${projectId}` },
  ];

  const location = useLocation();

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
