import * as yup from 'yup'

export const addSchema = yup
  .object({
    subject: yup.string().required("Должно содержаться поле 'subject'"),
    description: yup.string().required("Должно содержаться поле 'description'"),
    createdBy: yup.string().required("Должно содержаться поле 'createdBy'"),
    startDate: yup.string().required("Должно содержаться поле 'startDate'"),
    endDate: yup.string().required("Должно содержаться поле 'endDate'"),
    cost: yup.number().required("Должно содержаться поле 'cost'").positive(),
  })
  .strict()
