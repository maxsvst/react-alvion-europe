export interface IItem {
  id: number
  subject: string
  description: string
  createdBy: string
  startDate: string
  endDate: string
  cost: number
}

export interface ProjectsState {
  list: IItem[]
  projectId: number | null
}

export interface IPage {
  name: string
  to: string
}

export type IButtonProps = {
  title: string
}

export type IAddForm = {
  data: string
}
