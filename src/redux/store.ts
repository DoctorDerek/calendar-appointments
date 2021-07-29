import { combineReducers } from "redux"

import addReminder from "@/src/redux/addReminderSlice"
import agenda from "@/src/redux/agendaSlice"
import reset from "@/src/redux/resetSlice"
import { configureStore } from "@reduxjs/toolkit"

/** combineReducers | Redux https://redux.js.org/api/combinereducers
 * "The combineReducers helper function turns an object whose values are
 * different reducing functions into a single reducing function you can pass to
 * createStore. The resulting reducer calls every child reducer, and gathers
 * their results into a single state object. "
 */
export const rootReducer = combineReducers({
  addReminder,
  agenda,
  reset,
})

/** configureStore | https://redux-toolkit.js.org/api/configureStore
 * "A friendly abstraction over the standard Redux createStore function that
 * adds good defaults to the store setup for a better development experience."
 */
const store = configureStore({
  reducer: rootReducer,
  // Note: The Redux DevTools extension is now on by default in Redux Toolkit.
})

// Export the `RootState` and `AppDispatch` types from the Redux store itself
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export default store
