// Note: this file will run before any test file and will run on all tests.
import "@testing-library/jest-dom/extend-expect" // add better assertions

import { resetReduxStore } from "@/src/redux/actions"
import store from "@/src/redux/store"

global.afterEach(() => {
  // reset the state of the Redux store after each test
  store.dispatch(resetReduxStore())
})
