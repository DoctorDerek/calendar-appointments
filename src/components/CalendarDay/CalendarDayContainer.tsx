import { connect } from "react-redux"

import CalendarDay from "@/src/components/CalendarDay/CalendarDay"
import { openAgenda } from "@/src/redux/actions"

interface Props {}

interface State {}

const mapStateToProps = (state: State, ownProps: Props) => {
  return { ...state, ...ownProps }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onDayClick: (dateObj: DateObj) => {
      dispatch(openAgenda(dateObj))
    },
  }
}

const CalendarDayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarDay)

export default CalendarDayContainer
