import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";

import styles from "./ProjectDetails.module.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import Button from "../Button/Button";
import { changeElement } from "../../../features/projectsSlice";
import { IFormData, IHandleChangeArgs, IItem } from "../../../types/index";
import { RootState } from "../../../store/store";

export default function ProjectDetails() {
  const { list, projectId } = useSelector(
    (state: RootState) => state?.reducer.projects
  );
  const dispatch = useDispatch()

  const [currentProject, setCurrentProject] = useState<IItem | null>(() =>
    list?.Projects !== null ? list!.Projects[0] : null
  );

  const [formData, setFormData] = useState<IFormData>({
    subject: currentProject?.subject!,
    description: currentProject?.description!,
    createdBy: currentProject?.createdBy!,
    startDate: new Date(currentProject?.startDate!),
    endDate: new Date(currentProject?.endDate!)
  })

  useEffect(() => {
    if (list && projectId) {
      setCurrentProject(list?.Projects.find((item) => item.id === projectId)!)
    }

    if (currentProject) {
      setFormData({
        subject: currentProject?.subject!,
        description: currentProject?.description!,
        createdBy: currentProject?.createdBy!,
        startDate: new Date(currentProject?.startDate!),
        endDate: new Date(currentProject?.endDate!)
      })
    }
  }, [currentProject, list, projectId]);

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = {
      subject: formData.subject,
      description: formData.description,
      createdBy: formData.createdBy,
      startDate: formData.startDate.toISOString(),
      endDate: formData.endDate.toISOString(),
    }

    const elementToChange = list?.Projects.filter(item => item.id === projectId)[0]
    const changedElement = { id: elementToChange!.id, ...data, cost: elementToChange!.cost } // Собрать новый элемент
    dispatch(changeElement(changedElement))
  };

  const handleTextInputChange = (e: IHandleChangeArgs) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleDateInputChange = (name: string, value: Date | null) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  return (
    currentProject && (
      <div className={styles.wrapper}>
        <form onSubmit={e => (handleClick(e))} className={styles.form}>
          <input
            name="subject"
            value={formData.subject}
            onChange={handleTextInputChange}
            className={styles.title} />
          <div className={styles.details}>
            <div className={styles.date_wrapper}>
              <span className={styles.name}>Дата начала</span>
              <DatePicker
                name="startDate"
                selected={formData.startDate}
                onChange={(date) => handleDateInputChange('startDate', date)}
                dateFormat="dd.MM.yyyy"
                className={styles.date_picker}
              />
            </div>
            <div className={styles.date_wrapper}>
              <span className={styles.name}>Дата окончания</span>
              <DatePicker
                name="endDate"
                selected={formData.endDate}
                onChange={(date) => handleDateInputChange('endDate', date)}
                dateFormat="dd.MM.yyyy"
                className={styles.date_picker}
              />
            </div>
            <div className={styles.createdby_wrapper}>
              <span className={styles.name}>Автор</span>
              <input
                name="createdBy"
                value={formData.createdBy}
                onChange={handleTextInputChange}
                className={styles.createdby}
              />
            </div>
            <div className={styles.description_wrapper}>
              <span className={styles.description_title}>Описание</span>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleTextInputChange}
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
