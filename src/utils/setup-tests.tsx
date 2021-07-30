// Note: this file will run before any test file and will run on all tests.
import "@testing-library/jest-dom/extend-expect" // add better assertions

import { resetReduxStore } from "@/src/redux/resetSlice"
import store from "@/src/redux/store"

global.afterEach(() => {
  // reset the state of the Redux store after each test
  store.dispatch(resetReduxStore())
})

// fix "Error: Uncaught [TypeError: window.matchMedia is not a function]",
// which is caused by the package next-themes when the server-side tests run
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
