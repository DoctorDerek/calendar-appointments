import { connect } from "react-redux"

import { openAddReminder } from "../../redux/actions"
import App from "./App"

interface Props {}
interface State {}

const mapStateToProps = (state: State, ownProps: Props) => {
  return {}
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFabAddClick: () => {
      dispatch(openAddReminder())
    },
  }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppContainer
