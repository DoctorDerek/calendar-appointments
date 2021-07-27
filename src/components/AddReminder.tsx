import { format } from "date-fns"
import { useEffect, useState } from "react"
import { Color, ColorResult, TwitterPicker } from "react-color"

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
const classNames = (...classes: string[]) => classes.join(" ")

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

  // get the selected date from store if the agenda is also open
  const { date } = useAppSelector(({ agendaStatus }) => agendaStatus)
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(
    date ? date : new Date() // use selected date from store if it exists
    // otherwise, the default is now (today's date and the current time)
  )
  useEffect(() => {
    setSelectedDateTime(date ? date : new Date())
  }, [date]) // update the selected date if the Redux store changes

  const skyBlue: ColorResult = {
    // interface ColorResult { hex: string, hsl: HSLColor, rgb: RGBColor}
    hex: "#FFFFFF",
    hsl: { h: 203, l: 95, s: 77 },
    rgb: { r: 141, g: 209, b: 252 },
  }
  const [color, setColor] = useState<Color>(skyBlue.hex)

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
      <DialogContent
        className={classNames("flex", classes.addReminderFormContainer)}
      >
        <Typography>
          Use this space to create the UI to add a reminder to the calendar.
        </Typography>
        <div className="w-auto">
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
        </div>
        <div className="flex flex-col">
          <div
            style={{ backgroundColor: color as string }}
            className="w-[276px] h-[48px] border-gray-500 border-solid rounded-lg border-1"
            aria-label={`Selected color is ${color}`}
          />
          {/*TwitterPicker has a fixed width of 276px and height of 26px */}
          <TwitterPicker
            color={color}
            onChangeComplete={(newColorResult) => {
              setColor(newColorResult.hex)
              console.log(newColorResult.hex)
            }}
            aria-label="Choose a color"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default withStyles(styles)(AddReminder)
