import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialAgendaState: {
  agendaIsOpen: boolean
  date: null | Date
} = { agendaIsOpen: false, date: null }

/** createSlice | Redux Toolkit https://redux-toolkit.js.org/api/createslice
 * "A function that accepts an initial state, an object full of reducer
 * functions, and a 'slice name', and automatically generates action creators
 * and action types that correspond to the reducers and state.
 *
 * This API is the standard approach for writing Redux logic.
 *
 * Internally, it uses createAction and createReducer."
 *
 * @returns {actions, reducers}: "The generated reducer function is suitable for
 * passing to the Redux combineReducers function as a 'slice reducer'."
 * Reference:https://redux-toolkit.js.org/api/createslice#return-value*/
const agendaSlice = createSlice({
  name: "agenda",
  initialState: initialAgendaState,
  reducers: {
    // note: the state object is intentionally mutable in Redux Toolkit
    openAgenda(state, action: PayloadAction<Date>) {
      state.agendaIsOpen = true
      state.date = action.payload
    },
    closeAgenda(state) {
      state.agendaIsOpen = false
    },
  },
})

export const { openAgenda, closeAgenda } = agendaSlice.actions
export default agendaSlice.reducer
