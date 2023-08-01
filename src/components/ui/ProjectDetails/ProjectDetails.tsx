import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";

import styles from "./ProjectDetails.module.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import Button from "../Button/Button";
import { addListTolocalStorage, deleteListElement } from "../../../features/projectsSlice";
import { IItem } from "../../../types/index";
import { RootState } from "../../../store/store";

export default function ProjectDetails() {
  const { list, projectId } = useSelector(
    (state: RootState) => state?.reducer.projects
  );
  const dispatch = useDispatch()

  const [currentProject, setCurrentProject] = useState<IItem | null>(() =>
    list !== null ? list[0] : null
  );

  const [subject, setSubject] = useState(currentProject?.subject)
  const [startDate, setStartDate] = useState<Date>(new Date(currentProject?.startDate!));
  const [endDate, setEndDate] = useState<Date>(new Date(currentProject?.endDate!));
  const [createdBy, setCreatedBy] = useState(currentProject?.createdBy);
  const [description, setDescription] = useState(currentProject?.description);

  useEffect(() => {
    list &&
      projectId &&
      setCurrentProject(list.find((item) => item.id === projectId)!);
    setSubject(currentProject?.subject)
    setStartDate(new Date(currentProject?.startDate!));
    setEndDate(new Date(currentProject?.endDate!));
    setCreatedBy(currentProject?.createdBy);
    setDescription(currentProject?.description);
  }, [currentProject, list, projectId]);

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = {
      subject,
      description,
      createdBy,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    }
    const elementToChange = list.filter(item => item.id === projectId)[0]
    const changedElement = { id: elementToChange.id, ...data, cost: elementToChange.cost }
    dispatch(deleteListElement())
    dispatch(addListTolocalStorage(changedElement))
  };

  return (
    currentProject && (
      <div className={styles.wrapper}>
        <form onSubmit={e => (handleClick(e))} className={styles.form}>
          <input
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={styles.title} />
          <div className={styles.details}>
            <div className={styles.date_wrapper}>
              <span className={styles.name}>Дата начала</span>
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date!)}
                dateFormat="dd.MM.yyyy"
                className={styles.date_picker}
              />
            </div>
            <div className={styles.date_wrapper}>
              <span className={styles.name}>Дата окончания</span>
              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => setEndDate(date!)}
                dateFormat="dd.MM.yyyy"
                className={styles.date_picker}
              />
            </div>
            <div className={styles.createdby_wrapper}>
              <span className={styles.name}>Автор</span>
              <input
                name="createdBy"
                value={createdBy}
                onChange={(e) => setCreatedBy(e.target.value)}
                className={styles.createdby}
              />
            </div>
            <div className={styles.description_wrapper}>
              <span className={styles.description_title}>Описание</span>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={styles.description}
              />
            </div>
          </div>
          <Button title="Изменить" />
        </form>
      </div>
    )
  );
}
