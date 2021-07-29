import { addMonths, format, subMonths } from "date-fns"
import Image from "next/image"
import { useState } from "react"

import AddReminder from "@/src/components/AddReminder"
import AddReminderFab from "@/src/components/AddReminderFab"
import AgendaDay from "@/src/components/AgendaDay"
import CalendarGrid from "@/src/components/CalendarGrid"
import IconButton from "@material-ui/core/IconButton"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight"

const formatDateAsMonthApp = (date: Date) => format(date, "LLLL yyyy")
export default function App() {
  const [todaysDate, setTodaysDate] = useState(new Date())

  const prevMonth = () => {
    setTodaysDate((currentDate) => subMonths(currentDate, 1))
  }

  const nextMonth = () => {
    setTodaysDate((currentDate) => addMonths(currentDate, 1))
  }

  return (
    <>
      <div className="relative z-10 flex items-center justify-center w-full">
        <Paper
          className="flex flex-col items-center justify-center w-full h-full p-3 m-6 rounded-3xl"
          classes={{
            root: "backdrop-filter backdrop-grayscale backdrop-blur bg-[rgba(255,255,255,0.3)]",
          }}
        >
          <header className="flex items-center justify-between w-full my-10">
            <IconButton
              aria-label="Previous Month"
              className="w-16 h-16 mb-4 ml-4 text-blue-500 transition-all duration-500 bg-blue-100 border-blue-300 border-solid fill-current right-2 top-2 border-1 hover:bg-blue-300 hover:text-blue-700 hover:border-blue-500"
              onClick={prevMonth}
            >
              <KeyboardArrowLeftIcon className="w-12 h-12" />
            </IconButton>
            <Typography className="text-6xl font-bold">
              {formatDateAsMonthApp(todaysDate)}
            </Typography>
            <IconButton
              aria-label="Next Month"
              className="w-16 h-16 mb-4 text-blue-500 transition-all duration-500 bg-blue-100 border-blue-300 border-solid fill-current right-2 top-2 border-1 hover:bg-blue-300 hover:text-blue-700 hover:border-blue-500"
              onClick={nextMonth}
            >
              <KeyboardArrowRightIcon fontSize="large" className="w-12 h-12" />
            </IconButton>
          </header>
          <CalendarGrid todaysDate={todaysDate} />
          <AddReminderFab />
        </Paper>
        <AgendaDay />
        {/* unique React key props are used to refresh state; otherwise, the */}
        {/* most recent reminder's state will persist for new reminders */}
        <AddReminder key={Math.random()} />
      </div>
      <div className="absolute inset-0 z-0 w-screen h-screen">
        <Image
          src="/benjamin-patin-dOzoyaYjCbM-unsplash.jpg"
          alt="Ocean waves breaking by Benjamin Patin on Unsplash"
          layout="fill"
        />
      </div>
    </>
  )
}
