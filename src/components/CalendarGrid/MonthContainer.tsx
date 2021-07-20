import React from "react"

import { Theme } from "@material-ui/core/styles"
import { createStyles, WithStyles, withStyles } from "@material-ui/styles"

import CalendarDayContainer from "../CalendarDay/CalendarDayContainer"

const styles = (theme: Theme) =>
  createStyles({
    monthContainer: {
      display: "flex",
      width: "100%",
      flexGrow: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      border: "1px solid lightgray",
    },
  })

interface Props extends WithStyles<typeof styles> {
  calendarCells: {
    date: Date
  }[]
  date: Date
}

const MonthContainer = (props: Props) => (
  <div className={props.classes.monthContainer}>
    {props.calendarCells.map((dateObj, i) => (
      <CalendarDayContainer
        key={i}
        calendarDate={props.date}
        dateObj={dateObj}
      />
    ))}
  </div>
)

export default withStyles(styles)(MonthContainer)
