import { AnyAction } from "redux"

import { calendarAppReducer } from "@/src/redux/reducers"
import { configureStore, Reducer } from "@reduxjs/toolkit"

// rootReducer with RESET functionality to allow resetting store when testing
const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === "RESET") {
    state = {} as RootState
  }
  return calendarAppReducer(state, action)
}

// A friendly abstraction over the standard Redux createStore function that
// adds good defaults to the store setup for a better development experience.
// https://redux-toolkit.js.org/api/configureStore
const store = configureStore({ reducer: rootReducer })
// Note: The Redux DevTools extension is now on by default in the Redux Toolkit.

// Export the `RootState` and `AppDispatch` types from the Redux store itself
export type RootState = ReturnType<typeof calendarAppReducer>
export type AppDispatch = typeof store.dispatch

export default store
