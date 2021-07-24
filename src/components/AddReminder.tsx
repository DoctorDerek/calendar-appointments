import { format } from "date-fns"
import { useState } from "react"

import { closeAddReminder } from "@/src/redux/actions"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import { TextField } from "@material-ui/core"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import { Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import CloseIcon from "@material-ui/icons/Close"
import AdapterDateFns from "@material-ui/lab/AdapterDateFns"
import DateTimePicker from "@material-ui/lab/DateTimePicker"
import LocalizationProvider from "@material-ui/lab/LocalizationProvider"
import { createStyles, WithStyles, withStyles } from "@material-ui/styles"

const formatDateAndTime = (value: Date) => format(value, "MM/dd/yyyy hh:mm aaa")

const styles = (theme: Theme) =>
  createStyles({
    addReminderFormContainer: {
      minHeight: "250px",
      marginTop: "10px",
      display: "flex",
      flexDirection: "column",
    },
    closeButton: {
      position: "absolute",
      right: "10px",
      top: "10px",
    },
  })
const AddReminder = ({ classes }: WithStyles<typeof styles>) => {
  const { isOpen } = useAppSelector(
    ({ addReminderStatus }) => addReminderStatus
  )
  const dispatch = useAppDispatch()
  const onClose = () => {
    dispatch(closeAddReminder())
  }
  const [selectedDateTime, setSelectedDateTime] = useState<null | Date>(
    new Date()
  )
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">
        Add Reminder
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider light />
      <DialogContent className={classes.addReminderFormContainer}>
        <Typography>
          Use this space to create the UI to add a reminder to the calendar.
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            value={selectedDateTime}
            onChange={setSelectedDateTime}
            getOpenDialogAriaText={(value) =>
              `Choose date and time, selected date and time is ${
                value && formatDateAndTime(value as Date)
              }`
            }
            renderInput={(props) => (
              <TextField {...props} helperText="selected time" />
            )}
          />
        </LocalizationProvider>
      </DialogContent>
    </Dialog>
  )
}
export default withStyles(styles)(AddReminder)
