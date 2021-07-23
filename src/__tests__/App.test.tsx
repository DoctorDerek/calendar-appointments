import { addMonths, format, subMonths } from "date-fns"
import { Provider } from "react-redux"

import App from "@/src/components/App"
import { MaterialUIWrapper } from "@/src/components/NextIndexWrapper"
import store from "@/src/redux/store"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const formatDateAsMonth = (date: Date) => format(date, "LLLL yyyy")
const todaysDate = new Date()
const todaysMonthAsString = formatDateAsMonth(new Date())
const previousMonthAsString = formatDateAsMonth(subMonths(todaysDate, 1))
const nextMonthAsString = formatDateAsMonth(addMonths(todaysDate, 1))

const renderApp = () =>
  render(
    <MaterialUIWrapper>
      <Provider store={store}>
        <App />
      </Provider>
    </MaterialUIWrapper>
  )

beforeEach(() => renderApp())

test("renders the App with the default Redux store", () => {
  expect(screen.getByText(todaysMonthAsString)).toBeVisible() // month
  expect(screen.getByRole("button", { name: /add/i })).toBeVisible()
  // "Add Reminder"
})

test("opens the Add Reminder modal when clicking the button", async () => {
  userEvent.click(screen.getByRole("button", { name: /add/i }))
  await waitFor(() => expect(screen.getByText(/add reminder/i)).toBeVisible())
})

test("shows the next month when clicking the button", async () => {
  userEvent.click(screen.getByRole("button", { name: /next/i }))
  await waitFor(() => expect(screen.getByText(nextMonthAsString)).toBeVisible())
})

test("shows the previous month when clicking the button", async () => {
  userEvent.click(screen.getByRole("button", { name: /(previous|last)/i }))
  await waitFor(() =>
    expect(screen.getByText(previousMonthAsString)).toBeVisible()
  )
})
