import { calendarAppReducer } from "@/src/redux/reducers"
import { configureStore } from "@reduxjs/toolkit"

// A friendly abstraction over the standard Redux createStore function that
// adds good defaults to the store setup for a better development experience.
// https://redux-toolkit.js.org/api/configureStore
const store = configureStore({ reducer: calendarAppReducer })
// Note: The Redux DevTools extension is now on by default in the Redux Toolkit.

// Export the `RootState` and `AppDispatch` types from the Redux store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
