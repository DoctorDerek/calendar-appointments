import { getDate, isSameDay, isSameMonth } from "date-fns"
import { useState } from "react"

import { openAgenda } from "@/src/redux/actions"
import { useAppDispatch } from "@/src/redux/hooks"
import Avatar from "@material-ui/core/Avatar"
import deepPurple from "@material-ui/core/colors/deepPurple"
import { Theme } from "@material-ui/core/styles"
import { createStyles, WithStyles, withStyles } from "@material-ui/styles"

const styles = (theme: Theme) =>
  createStyles({
    dayCell: {
      display: "flex",
      flex: "1 0 13%",
      flexDirection: "column",
      border: "1px solid lightgray",
      cursor: "pointer",
    },
    dayCellOutsideMonth: {
      display: "flex",
      flex: "1 0 13%",
      flexDirection: "column",
      border: "1px solid lightgray",
      backgroundColor: "rgba( 211, 211, 211, 0.4 )",
      cursor: "pointer",
    },
    dateNumber: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#000",
      backgroundColor: "transparent",
    },
    todayAvatar: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#fff",
      backgroundColor: deepPurple[400],
    },
    focusedAvatar: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#000",
      backgroundColor: "#f1f1f1",
    },
    focusedTodayAvatar: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#fff",
      backgroundColor: deepPurple[800],
    },
    remindersContainer: {
      height: "100%",
    },
  })

const CalendarDay = ({
  classes,
  dateObject,
  todaysDate,
}: WithStyles<typeof styles> & {
  todaysDate: Date
  dateObject: DateObject
}) => {
  const dispatch = useAppDispatch()
  const onDayClick = (dateObject: DateObject) => {
    dispatch(openAgenda(dateObject))
  }
  const [focused, setFocused] = useState(false)

  const isToday = isSameDay(dateObject.date, new Date())
  const avatarClass =
    isToday && focused
      ? classes.focusedTodayAvatar
      : isToday
      ? classes.todayAvatar
      : focused
      ? classes.focusedAvatar
      : classes.dateNumber

  const onMouseOver = () => setFocused(true)
  const onMouseOut = () => setFocused(false)
  const onClick = () => onDayClick(dateObject)

  return (
    <div
      onMouseOver={onMouseOver}
      onFocus={onMouseOver}
      onMouseOut={onMouseOut}
      onBlur={onMouseOut}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
      className={
        isSameMonth(dateObject.date, todaysDate)
          ? classes.dayCell
          : classes.dayCellOutsideMonth
      }
    >
      <Avatar className={avatarClass}>{getDate(dateObject.date)}</Avatar>
      <div className={classes.remindersContainer}>
        {/* reminders go here */}
      </div>
    </div>
  )
}

export default withStyles(styles)(CalendarDay)
