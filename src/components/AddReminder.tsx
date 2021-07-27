import { format } from "date-fns"
import { useEffect, useState } from "react"
import { Color, ColorResult, TwitterPicker } from "react-color"

import CustomDialog from "@/src/components/CustomDialog"
import { closeAddReminder } from "@/src/redux/actions"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import { TextField } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import AdapterDateFns from "@material-ui/lab/AdapterDateFns"
import DateTimePicker from "@material-ui/lab/DateTimePicker"
import LocalizationProvider from "@material-ui/lab/LocalizationProvider"

const formatDateAndTime = (value: Date) => format(value, "MM/dd/yyyy hh:mm aaa")

export default function AddReminder() {
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
    <CustomDialog title="Add Reminder" open={isOpen} onClose={onClose}>
      <Typography className="text-3xl">
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
    </CustomDialog>
  )
}
