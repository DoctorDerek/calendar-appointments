import { motion } from "framer-motion"

import CustomIcon from "@/src/components/CustomIcon"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import {
  hideHoursOnCalendar,
  showHoursOnCalendar,
} from "@/src/redux/showHoursSlice"
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm"
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder"

const classNames = (...classes: string[]) => classes.join(" ")
export default function ToggleShowHours() {
  // Use the useAppSelector hook to get the showHours state from the Redux store
  const { showHours } = useAppSelector(({ showHours }) => showHours)
  // When showHours is false, only icons will be shown on the calendar, no hours
  const color = showHours ? "gray" : "purple" // color scheme for the toggle

  // Set up the dispatch actions for showing hours or icons on the calendar
  const dispatch = useAppDispatch()
  const toggleShowHours = () => {
    if (showHours) dispatch(hideHoursOnCalendar())
    else dispatch(showHoursOnCalendar())
  }

  const ariaLabel = showHours
    ? "Currently showing hours on the calendar"
    : "Currently showing icons on the calendar"

  return (
    <motion.div // toggle
      onTap={toggleShowHours}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={classNames(
        "relative text-lg font-bold rounded-full transition-all duration-500  bg-transparent backdrop-filter backdrop-blur w-24 h-8",
        // the background is different, but other colors are like <CustomIcon>
        `text-${color}-500 border-${color}-300 hover:bg-${color}-300 hover:text-${color}-700 hover:border-${color}-500`
      )}
    >
      {showHours ? (
        <span className="absolute top-0.5 right-2">Hours</span>
      ) : (
        <span className="absolute top-0.5 left-3">Icons</span>
      )}
      <motion.div // handle
        className="w-16 rounded-full"
        // sizes should be the same as in <CustomIcon>:
        // large === "w-16 h-16" === 4rem
        // small === "w-8 h-8" === 2rem
        animate={{ x: showHours ? "0rem" : "4rem" }}
        // x starts at 0 and goes to (toggle width - handle width)
      >
        {showHours ? (
          <CustomIcon
            ariaLabel={ariaLabel}
            color={color}
            Icon={QueryBuilderIcon}
            onClick={() => {}} // captured by onTap above
            size="small"
          />
        ) : (
          <CustomIcon
            ariaLabel={ariaLabel}
            color={color}
            Icon={AccessAlarmIcon}
            onClick={() => {}} // captured by onTap above
            size="small"
          />
        )}
      </motion.div>
    </motion.div>
  )
}
