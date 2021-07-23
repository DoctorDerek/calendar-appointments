import { format } from "date-fns"

import CatchAllSlug from "@/src/pages/[[...slug]]"
import { render, screen, waitFor } from "@testing-library/react"

const formatDateAsMonth = (date: Date) => format(date, "LLLL yyyy")
const todaysMonthAsString = formatDateAsMonth(new Date())

test("renders the calendar app using the optional catch-all [[...slug]]", async () => {
  render(<CatchAllSlug />)
  await waitFor(() => {
    expect(screen.getByText(todaysMonthAsString)).toBeVisible() // month
    expect(screen.getByRole("button", { name: /add/i })).toBeVisible()
    // "Add Reminder"
  })
})
