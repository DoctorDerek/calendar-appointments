import { connect } from "react-redux"

import App from "@/src/components/App/App"
import { openAddReminder } from "@/src/redux/actions"

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
