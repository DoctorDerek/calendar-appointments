import CalendarDay from "@/src/components/CalendarDay"
import { Theme } from "@material-ui/core/styles"
import { createStyles, WithStyles, withStyles } from "@material-ui/styles"

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

const CalendarGridMonth = ({
  classes,
  calendarCells,
  todaysDate,
}: WithStyles<typeof styles> & {
  calendarCells: DateObject[]
  todaysDate: Date
}) => (
  <div className={classes.monthContainer}>
    {calendarCells.map((dateObject) => (
      <CalendarDay
        key={String(dateObject.date)}
        todaysDate={todaysDate}
        selectedDate={dateObject}
      />
    ))}
  </div>
)

export default withStyles(styles)(CalendarGridMonth)
