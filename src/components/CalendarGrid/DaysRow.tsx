import React from "react"

import DayName from "@/src/components/CalendarGrid/DayName"
import { daysArr } from "@/src/utils/dateUtils"
import { Theme } from "@material-ui/core/styles"
import { createStyles, WithStyles, withStyles } from "@material-ui/styles"

const styles = (theme: Theme) =>
  createStyles({
    daysRow: {
      display: "flex",
      width: "100%",
      flexBasis: "50px",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
  })

interface Props extends WithStyles<typeof styles> {}

const DaysRow = (props: Props) => (
  <div className={props.classes.daysRow}>
    {daysArr.map((day, i) => (
      <DayName key={i} day={day} />
    ))}
  </div>
)

export default withStyles(styles)(DaysRow)
