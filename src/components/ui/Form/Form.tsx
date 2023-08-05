import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";

import styles from "./Form.module.css";
import Button from "../Button/Button";
import { addListTolocalStorage, setCurrentProjectId } from "../../../features/projectsSlice";
import { addSchema } from "../../../common/shemas";
import { IAddForm } from "../../../types";
import { RootState } from "../../../store/store";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddForm>();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector(
    (state: RootState) => state.reducer.projects.list?.Projects
  );

  const errorClassname = errors.data ? styles.error_show : styles.error_hidden

  const clickHandler: SubmitHandler<IAddForm> = async (data) => {
    try {
      const parsedData = JSON.parse(data.data)
      const validatedData = await addSchema.validate(parsedData)
      dispatch(addListTolocalStorage(validatedData))
      dispatch(setCurrentProjectId(selector![0].id))
      navigate(`/projects/${selector![0].id}`)
    } catch (error) {
      console.error("Невалидный JSON");
      return;
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(clickHandler)}>
      <div className={styles.wrapper}>
        <span className={styles.title}>Введите JSON:</span>
        <textarea
          {...register("data", { required: true })}
          className={styles.textarea}
        />
      </div>
      <span className={errorClassname}>
        Поле обязательно к заполнению
      </span>
      <Button title="Сохранить" />
    </form>
  );
}
