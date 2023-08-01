import { createSlice } from '@reduxjs/toolkit'
import { ProjectsState } from '../types'

const initialState: ProjectsState = {
  list: [],
  projectId: null,
}

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addListTolocalStorage: (state, action) => {
      state.list?.push({
        ...action.payload,
      })
    },
    deleteListElement: (state) => {
      const copy = { ...state }
      copy.list = state.list.filter((item) => item.id !== state.projectId)
      return copy
    },
    setCurrentProjectId: (state, action) => {
      state.projectId = action.payload
    },
  },
})

export const { addListTolocalStorage, deleteListElement, setCurrentProjectId } = projectsSlice.actions
export default projectsSlice.reducer
