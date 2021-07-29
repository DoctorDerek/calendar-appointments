import { format } from "date-fns"

import CatchAllSlug from "@/src/pages/[[...slug]]"
import { render, screen } from "@testing-library/react"

const formatDateAsMonthApp = (date: Date) => format(date, "LLLL yyyy")
const todaysMonthApp = formatDateAsMonthApp(new Date())

test("renders the calendar app using the optional catch-all [[...slug]]", async () => {
  render(<CatchAllSlug />)
  expect(await screen.findByText(new RegExp(todaysMonthApp, "i"))).toBeVisible() // month
  expect(screen.getByRole("button", { name: /add/i })).toBeVisible()
  // "Add Reminder"
})
