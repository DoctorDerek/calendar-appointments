import { connect } from "react-redux"

import { closeAddReminder } from "../../redux/actions"
import AddReminder from "./AddReminder"

interface State {
  addReminderStatus: {
    isOpen: boolean
  }
}

const mapStateToProps = (state: State) => {
  return {
    isOpen: state.addReminderStatus.isOpen,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onClose: () => {
      dispatch(closeAddReminder())
    },
  }
}

const AddReminderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddReminder)

export default AddReminderContainer
