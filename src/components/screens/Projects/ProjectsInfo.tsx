import styles from "./Projects.module.css";
import List from "../../ui/List/List";
import ProjectDetails from "../../ui/ProjectDetails/ProjectDetails";

import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export default function Projects() {
    const selector = useSelector(
        (state: RootState) => state.reducer.projects.list?.Projects
    );

    return (
        <div className={styles.main}>
            {selector ? (
                <>
                    <List />
                    <ProjectDetails />
                </>
            ) : (
                "Проекты отсутствуют"
            )}
        </div>
    );
}