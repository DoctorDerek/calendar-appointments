import { compareAsc, parseISO } from "date-fns"

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialRemindersState: {
  reminders: Reminder[]
} = {
  reminders: [],
}

const remindersSlice = createSlice({
  name: "reminders",
  initialState: initialRemindersState,
  reducers: {
    // note: the state object is intentionally mutable in Redux Toolkit
    addNewReminder(state, action: PayloadAction<Reminder>) {
      action.payload.id = generateUniqueId()
      state.reminders.push(action.payload)
      state.reminders.sort((left, right) =>
        compareAsc(parseISO(left.dateISOString), parseISO(right.dateISOString))
      ) // sort reminders in ascending order by date and time
    },
    deleteReminder(state, action: PayloadAction<string>) {
      state.reminders = state.reminders.filter(
        (reminder) => reminder.id !== action.payload
      )
    },
  },
})

export const { addNewReminder, deleteReminder } = remindersSlice.actions
export default remindersSlice.reducer

/**
 * Generate a 36-digit unique id.
 *
 * @remarks Per the birthday problem, there is a low chance of hash collision
 * as long as the number of hash keys is significantly less than the square
 * root of the number of bits. In this case, the square root of 10^36 is 10^18.
 * Reference: https://en.wikipedia.org/wiki/Birthday_problem
 * */
function generateUniqueId() {
  return (
    String(Math.random() * 1000000000000000000) +
    String(Math.random() * 1000000000000000000)
  )
}
