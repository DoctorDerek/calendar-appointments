import { createSlice } from "@reduxjs/toolkit"

const initialShowHoursState: {
  showHours: boolean
} = {
  showHours: false, // start with icons, not hours
}

const showHoursSlice = createSlice({
  name: "showHours",
  initialState: initialShowHoursState,
  reducers: {
    // note: the state object is intentionally mutable in Redux Toolkit
    showHoursOnCalendar(state) {
      state.showHours = true
    },
    hideHoursOnCalendar(state) {
      state.showHours = false
    },
  },
})

export const { showHoursOnCalendar, hideHoursOnCalendar } =
  showHoursSlice.actions
export default showHoursSlice.reducer
