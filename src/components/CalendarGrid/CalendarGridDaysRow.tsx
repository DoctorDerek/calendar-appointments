import CalendarGridDayName from "@/src/components/CalendarGrid/CalendarGridDayName"
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

const CalendarGridDaysRow = ({ classes }: WithStyles<typeof styles>) => (
  <div className={classes.daysRow}>
    {daysArr.map((day, i) => (
      <CalendarGridDayName key={i} day={day} />
    ))}
  </div>
)

export default withStyles(styles)(CalendarGridDaysRow)
