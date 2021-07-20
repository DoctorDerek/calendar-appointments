import * as dateFns from "date-fns"
// import './App.css';
import React, { Component } from "react"

import green from "@material-ui/core/colors/green"
import Fab from "@material-ui/core/Fab"
import IconButton from "@material-ui/core/IconButton"
import Paper from "@material-ui/core/Paper"
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import AddIcon from "@material-ui/icons/Add"
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight"

import AddReminderContainer from "../AddReminder/AddReminderContainer"
import AgendaDayContainer from "../AgendaDay/AgendaDayContainer"
import CalendarGrid from "../CalendarGrid"

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    calendar: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "10px",
      margin: "25px",
      width: "100%",
      height: "90%",
    },
    calendarHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "100px",
      width: "100%",
    },
    fabAdd: {
      position: "absolute",
      bottom: "60px",
      right: "50px",
      color: "#FFF",
      backgroundColor: green[600],
      "&:hover": {
        backgroundColor: green[800],
      },
    },
  })

interface Props extends WithStyles<typeof styles> {
  onFabAddClick: () => void
}

interface State {
  date: Date
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      date: new Date(),
    }
  }

  compnentDidMount() {}

  // arrow functions to skip binding in constructor
  prevMonth = () => {
    this.setState({ date: dateFns.subMonths(this.state.date, 1) })
  }

  nextMonth = () => {
    this.setState({ date: dateFns.addMonths(this.state.date, 1) })
  }

  render() {
    const { classes, onFabAddClick } = this.props
    const { date } = this.state

    const month = date.toLocaleString("en-us", { month: "long" })
    const year = dateFns.getYear(date)

    return (
      <div className={classes.root}>
        <Paper className={classes.calendar}>
          <header className={classes.calendarHeader}>
            <IconButton aria-label="Last Month" onClick={this.prevMonth}>
              <KeyboardArrowLeftIcon fontSize="large" />
            </IconButton>
            <Typography variant="h3">
              {month} {year}
            </Typography>
            <IconButton aria-label="Next Month" onClick={this.nextMonth}>
              <KeyboardArrowRightIcon fontSize="large" />
            </IconButton>
          </header>
          <CalendarGrid date={date} />
          <Fab
            aria-label="Add"
            className={classes.fabAdd}
            onClick={onFabAddClick}
          >
            <AddIcon />
          </Fab>
        </Paper>
        <AgendaDayContainer />
        <AddReminderContainer />
      </div>
    )
  }
}

export default withStyles(styles)(App)
