import { createSlice } from "@reduxjs/toolkit"

const initialAddReminderState: {
  addReminderIsOpen: boolean
} = {
  addReminderIsOpen: false,
}

const addReminderSlice = createSlice({
  name: "addReminder",
  initialState: initialAddReminderState,
  reducers: {
    // note: the state object is intentionally mutable in Redux Toolkit
    openAddReminder(state) {
      state.addReminderIsOpen = true
    },
    closeAddReminder(state) {
      state.addReminderIsOpen = false
    },
  },
})

export const { openAddReminder, closeAddReminder } = addReminderSlice.actions
export default addReminderSlice.reducer
