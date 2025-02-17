import { addMonths, format, subMonths } from "date-fns"
import Image from "next/image"
import { useState } from "react"

import AddReminder from "@/src/components/AddReminder"
import AddReminderFab from "@/src/components/AddReminderFab"
import AgendaDay from "@/src/components/AgendaDay"
import CalendarGrid from "@/src/components/CalendarGrid"
import CustomIcon from "@/src/components/CustomIcon"
import ToggleDarkMode from "@/src/components/ToggleDarkMode"
import ToggleShowHours from "@/src/components/ToggleShowHours"
import Paper from "@material-ui/core/Paper"
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight"

const formatDateAsMonthApp = (date: Date) => format(date, "LLLL yyyy")
export default function App() {
  // Set up the previous and next month button handlers
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
            root: "backdrop-filter backdrop-grayscale backdrop-blur bg-[rgba(255,255,255,0.3)] dark:bg-[rgba(0,0,0,0.3)]",
          }}
        >
          <header className="flex items-center justify-between w-full my-10">
            <CustomIcon
              ariaLabel="Previous Month"
              onClick={prevMonth}
              color="blue"
              Icon={KeyboardArrowLeftIcon}
            />
            <ToggleDarkMode />
            <div className="mb-2 font-bold text-gray-800 text-7xl dark:text-gray-300 drop-shadow-xl">
              {formatDateAsMonthApp(todaysDate)}
            </div>
            <ToggleShowHours />
            <CustomIcon
              ariaLabel="Next Month"
              onClick={nextMonth}
              color="blue"
              Icon={KeyboardArrowRightIcon}
            />
          </header>
          <CalendarGrid todaysDate={todaysDate} />
        </Paper>
        <AddReminderFab position="fixed" />
        <AgendaDay />
        <AddReminder />
      </div>
      <div className="fixed inset-0 z-0 w-full h-full">
        {/* background image */}
        <Image
          src="/benjamin-patin-dOzoyaYjCbM-unsplash.jpg"
          alt="Ocean waves breaking by Benjamin Patin on Unsplash"
          layout="fill"
          className="object-cover"
        />
        <div className="absolute backdrop-filter backdrop-brightness-50 opacity-0 dark:opacity-100 transition-all duration-500 dark:bg-[rgba(0,0,0,0.3)] inset-0 z-0 w-full h-full">
          {/* dark mode filter for background image */}
        </div>
      </div>
    </>
  )
}
