import { connect } from "react-redux"

import { openAgenda } from "../../redux/actions"
import CalendarDay from "./CalendarDay"

interface Props {}

interface State {}

interface DateObj {
  date: Date
}

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
