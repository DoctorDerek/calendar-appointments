import { connect } from "react-redux"

import AgendaDay from "@/src/components/AgendaDay/AgendaDay"
import { closeAgenda } from "@/src/redux/actions"

interface Props {}

interface State {
  agendaStatus: {
    isOpen: boolean
    date: Date
  }
}

const mapStateToProps = (state: State, ownProps: Props) => {
  const { agendaStatus } = state

  return { agendaStatus }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onClose: () => {
      dispatch(closeAgenda())
    },
  }
}

const AgendaDayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AgendaDay)

export default AgendaDayContainer
