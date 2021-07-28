import { createSlice } from "@reduxjs/toolkit"

const initialResetState: {} = {}

/** resetSlice has a "force reset" action to reset the store when testing */
const resetSlice = createSlice({
  name: "reset",
  initialState: initialResetState,
  reducers: {
    // note: the state object is intentionally mutable in Redux Toolkit
    resetReduxStore(state) {
      state = {}
    },
  },
})

export const { resetReduxStore } = resetSlice.actions
export default resetSlice.reducer
