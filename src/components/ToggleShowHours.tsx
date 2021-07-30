import { Frame } from "framer"

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
  const color = showHours ? "gray" : "blue" // color scheme for toggleShowHours

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
    <Frame // toggle
      width="6rem"
      height="2rem" // same as the handle width
      onTap={toggleShowHours}
      aria-label={ariaLabel}
      title={ariaLabel}
      position="relative" // defaults to "absolute"
      className={classNames(
        "text-lg font-bold rounded-full transition-all duration-500",
        "bg-gray-100", // same colors as <CustomIcon>
        color === "blue"
          ? "text-blue-500 border-blue-300 hover:bg-blue-300 hover:text-blue-700 hover:border-blue-500"
          : color === "gray"
          ? "text-gray-500 border-gray-300 hover:bg-gray-300 hover:text-gray-700 hover:border-gray-500"
          : ""
      )}
      backgroundColor={"rgb(243, 244, 246)"} // bg-gray-100
    >
      {showHours ? (
        <span className="absolute top-0.5 right-2">Hours</span>
      ) : (
        <span className="absolute top-0.5 left-3">Icons</span>
      )}
      <Frame // handle
        size="2rem" // same as the toggle height
        className="rounded-full"
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
      </Frame>
    </Frame>
  )
}
