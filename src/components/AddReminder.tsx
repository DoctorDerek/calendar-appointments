import { format, parseISO } from "date-fns"
import { useEffect, useState } from "react"

import CustomDialog from "@/src/components/CustomDialog"
import { closeAddReminder } from "@/src/redux/addReminderSlice"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import { TextField } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import CheckIcon from "@material-ui/icons/Check"
import AdapterDateFns from "@material-ui/lab/AdapterDateFns"
import DateTimePicker from "@material-ui/lab/DateTimePicker"
import LocalizationProvider from "@material-ui/lab/LocalizationProvider"

const classNames = (...classes: string[]) => classes.join(" ")

// This date mask is the same as the agenda format, i.e. with long month name
const maskPicker = "LLLL do, yyyy hh:mm aaa" // (e.g. "July 22, 2021 09:00 am")
// <DateTimePicker> default is "MM/dd/yyyy hh:mm aaa" (07/22/2021 09:00 am)
const formatDateAndTimePicker = (value: Date) => format(value, maskPicker)

export default function AddReminder() {
  const { addReminderIsOpen } = useAppSelector(({ addReminder }) => addReminder)
  const dispatch = useAppDispatch()
  const onClose = () => {
    dispatch(closeAddReminder())
  }

  // get the selected date from store if the agenda is also open
  const { dateISOString } = useAppSelector(({ agenda }) => agenda)
  // use selected date from store if it exists (Redux state can't store Dates)
  const date = dateISOString ? parseISO(dateISOString) : new Date()
  // otherwise, the default is now (today's date and the current time)
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(date)
  useEffect(() => {
    setSelectedDateTime(dateISOString ? parseISO(dateISOString) : new Date())
  }, [dateISOString]) // update the selected date if the Redux store changes

  const [selectedColor, setSelectedColor] = useState<Color>("DodgerBlue")
  const [reminder, setReminder] = useState("test")
  const REMINDER_MAX_LENGTH = 30 // characters
  const remainingCharacters = REMINDER_MAX_LENGTH - reminder.length
  const handleReminderChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setReminder(() => event.target.value.slice(0, REMINDER_MAX_LENGTH))

  return (
    <CustomDialog
      title="Add Reminder"
      open={addReminderIsOpen}
      onClose={onClose}
    >
      <div className="space-y-2">
        <Typography className="text-3xl">
          Select the date and time for the reminder:
        </Typography>
        <div className="w-full text-3xl">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              value={selectedDateTime}
              onChange={setSelectedDateTime}
              getOpenDialogAriaText={(value) =>
                `Choose date and time, selected date and time is ${
                  value && formatDateAndTimePicker(value as Date)
                }`
              }
              renderInput={(props) => (
                <TextField
                  {...props}
                  inputProps={{
                    className: "text-3xl bg-gray-200",
                    ...props.inputProps,
                  }}
                  fullWidth={true}
                />
              )}
            />
          </LocalizationProvider>
        </div>
      </div>
      <ColorPicker
        selectedColor={selectedColor}
        handleChange={setSelectedColor}
      />
      <div className="space-y-2">
        <Typography className="text-3xl">Enter your reminder here:</Typography>
        <TextField
          inputProps={{
            className: "text-3xl bg-gray-200",
          }}
          fullWidth={true}
          value={reminder}
          onChange={handleReminderChange}
        />
        <Typography
          className={classNames(
            "text-3xl italic text-right",
            remainingCharacters < 5 ? "text-red-600" : "text-gray-800"
          )}
        >
          {remainingCharacters} characters {reminder ? "remaining" : "max"}
        </Typography>
      </div>
    </CustomDialog>
  )
}

function ColorPicker({
  selectedColor,
  handleChange,
}: {
  selectedColor: Color
  handleChange: React.Dispatch<React.SetStateAction<Color>>
}) {
  /** HTML colors for the color picker */
  const COLORS = [
    "DodgerBlue",
    "Gray",
    "LightGray",
    "MediumSeaGreen",
    "Orange",
    "SlateBlue",
    "Tomato",
    "Violet",
  ] as readonly Color[]

  return (
    <div className="space-y-2">
      <Typography className="text-3xl">
        Select a color for the reminder:
      </Typography>
      <div className="flex bg-gray-200 border-gray-400 border-solid rounded border-1">
        {COLORS.map((color) => (
          <button
            className={classNames(
              "w-16 h-16 m-4 border-black border-solid rounded",
              color === selectedColor ? "border-2" : "border-1"
            )}
            key={color}
            onClick={() => handleChange(color)}
            style={{ backgroundColor: color }}
            aria-label={
              (color === selectedColor ? "Selected color is" : "Select color") +
              ` ${color}`
            }
          >
            {color === selectedColor ? (
              <CheckIcon aria-hidden={true} className="w-12 h-12" />
            ) : null}
          </button>
        ))}
      </div>
    </div>
  )
}
