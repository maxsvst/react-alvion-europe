import { createSlice } from '@reduxjs/toolkit'
import { ProjectsState } from '../types'

const initialState: ProjectsState = {
  list: null,
  projectId: null,
}

export const projectsSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addListTolocalStorage: (state, action) => {
      state.list = action.payload
    },
    changeElement: (state, action) => {
      state.list!.Projects[action.payload.id - 1] = action.payload
    },
    setCurrentProjectId: (state, action) => {
      state.projectId = action.payload
    },
  },
})

export const { addListTolocalStorage, changeElement, setCurrentProjectId } = projectsSlice.actions
export default projectsSlice.reducer
