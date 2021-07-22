import { Provider } from "react-redux"

import App from "@/src/components/App"
import store from "@/src/redux/store"
import * as serviceWorker from "@/src/utils/serviceWorker"
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@material-ui/core/styles"

export default function NextIndexWrapper() {
  // "Make sure to add a ThemeProvider at the root of your application,
  // as the defaultTheme is no longer available."
  // https://next.material-ui.com/guides/migration-v4/
  const defaultTheme = createTheme()
  /**
   * The style library used by default in v5 is emotion. While migrating from
   * JSS to emotion, and if you are using JSS style overrides for your
   * components (for example overrides created by makeStyles), you will need to
   * take care of the CSS injection order. To do so, you need to have the
   * StyledEngineProvider with the injectFirst option at the top of your
   * component tree.
   * https://next.material-ui.com/guides/migration-v4/#style-library */
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={defaultTheme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
