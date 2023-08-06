import { createSlice } from '@reduxjs/toolkit'
import { ProjectsState } from '../types'

const initialState: ProjectsState = {
  list: null,
}

export const projectsSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addListTolocalStorage: (state, action) => {
      state.list = action.payload
    },
    changeElement: (state, action) => {
      state.list!.Projects[state.list!.Projects.findIndex((item) => item.id === action.payload.id)] = action.payload
    },
  },
})

export const { addListTolocalStorage, changeElement } = projectsSlice.actions
export default projectsSlice.reducer
