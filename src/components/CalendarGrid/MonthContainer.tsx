import CalendarDayContainer from "@/src/components/CalendarDay/CalendarDayContainer"
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

const MonthContainer = ({
  classes,
  calendarCells,
  date,
}: WithStyles<typeof styles> & {
  calendarCells: DateObject[]
} & DateObject) => (
  <div className={classes.monthContainer}>
    {calendarCells.map((dateObject, i) => (
      <CalendarDayContainer
        key={i}
        calendarDate={date}
        dateObject={dateObject}
      />
    ))}
  </div>
)

export default withStyles(styles)(MonthContainer)
