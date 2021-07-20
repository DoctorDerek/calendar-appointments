import React from "react"
import {
  WithStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles"
import DayName from "./DayName"
import { daysArr } from "../../utils/dateUtils"

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
