import React from "react"

import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from "@material-ui/core/styles"

import { getMonthCells } from "../../utils/dateUtils"
import DaysRow from "./DaysRow"
import MonthContainer from "./MonthContainer"

const styles = (theme: Theme) =>
  createStyles({
    calendarGrid: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
  })

interface Props extends WithStyles<typeof styles> {
  date: Date
}

const CalendarGrid = (props: Props) => {
  const { classes, date } = props
  const calendarCells = getMonthCells(date)
  return (
    <div className={classes.calendarGrid}>
      <DaysRow />
      <MonthContainer date={date} calendarCells={calendarCells} />
    </div>
  )
}

export default withStyles(styles)(CalendarGrid)
