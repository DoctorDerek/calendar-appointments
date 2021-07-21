import { connect } from "react-redux"

import AddReminder from "@/src/components/AddReminder/AddReminder"
import { closeAddReminder } from "@/src/redux/actions"

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
