import { IPage } from "../../../types";

import styles from "./Header.module.css";
import { useLocation, Link } from "react-router-dom";

const pages = [
  { name: "Данные", to: "/" },
  { name: "Проекты", to: "/projects" },
];

export default function Header() {
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
