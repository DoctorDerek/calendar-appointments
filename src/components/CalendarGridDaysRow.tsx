import { daysArray } from "@/src/utils/dateUtils"
import { Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
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

function CalendarGridDaysRow({ classes }: WithStyles<typeof styles>) {
  // daysArray is Sunday, Monday, ..., Saturday
  return (
    <div className={classes.daysRow}>
      {daysArray.map((day) => (
        <Typography variant="h6" key={day}>
          {day}
        </Typography>
      ))}
    </div>
  )
}

export default withStyles(styles)(CalendarGridDaysRow)
