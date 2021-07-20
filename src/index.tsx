// import './index.css';
import React from "react"
import { Provider } from "react-redux"
import { createStore } from "redux"

import { createTheme, ThemeProvider } from "@material-ui/core/styles"

import AppContainer from "./components/App/AppContainer"
import calendarApp from "./redux/reducers"
import * as serviceWorker from "./serviceWorker"

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any
  }
}

const store = createStore(
  calendarApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default function NextIndexWrapper() {
  // "Make sure to add a ThemeProvider at the root of your application,
  // as the defaultTheme is no longer available."
  // https://next.material-ui.com/guides/migration-v4/
  const defaultTheme = createTheme()
  return (
    <ThemeProvider theme={defaultTheme}>
      <Provider store={store as any}>
        <AppContainer />
      </Provider>
    </ThemeProvider>
  )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
