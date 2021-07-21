import React from "react"

import { getMonthCells } from "@/src/utils/dateUtils"
import { Theme } from "@material-ui/core/styles"
import { createStyles, WithStyles, withStyles } from "@material-ui/styles"

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

const CalendarGrid = ({
  classes,
  date,
}: WithStyles<typeof styles> & DateObject) => {
  const calendarCells = getMonthCells(date)
  return (
    <div className={classes.calendarGrid}>
      <DaysRow />
      <MonthContainer date={date} calendarCells={calendarCells} />
    </div>
  )
}

export default withStyles(styles)(CalendarGrid)
