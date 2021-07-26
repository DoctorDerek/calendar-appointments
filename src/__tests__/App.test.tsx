import { addDays, addMonths, format, subMonths } from "date-fns"
import { Provider } from "react-redux"

import App from "@/src/components/App"
import { MaterialUIWrapper } from "@/src/components/NextIndexWrapper"
import store from "@/src/redux/store"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const todaysDate = new Date()
const formatDateAsMonth = (date: Date) => format(date, "LLLL yyyy")
const todaysMonthAsString = formatDateAsMonth(todaysDate)
const previousMonthAsString = formatDateAsMonth(subMonths(todaysDate, 1))
const nextMonthAsString = formatDateAsMonth(addMonths(todaysDate, 1))
const formatDateAsString = (date: Date) => format(date, "LLLL do, yyyy")
const todaysDateAsString = formatDateAsString(todaysDate)
const tomorrowsDateAsString = formatDateAsString(addDays(todaysDate, 1))
const formatDatePicker = (value: Date) => format(value, "MM/dd/yyyy")
const formatTimePicker = (value: Date) => format(value, "hh:mm aaa")
const todaysDatePicker = formatDatePicker(todaysDate) // current date
const tomorrowsDate = addDays(todaysDate, 1)
const tomorrowsDatePicker = formatDatePicker(tomorrowsDate)
const getCurrentTimePicker = () => formatTimePicker(new Date()) // current time

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

test("opens today's agenda when clicking on today's date", async () => {
  userEvent.click(
    screen.getByRole("button", { name: new RegExp(todaysDateAsString, "i") })
  )
  await waitFor(() => {
    // <AgendaDay> should be open with today's date
    expect(screen.getByLabelText(/close/i)).toBeVisible() // close button
    expect(screen.getByLabelText(/add/i)).toBeVisible() // add reminder FAB
    expect(screen.getByText(todaysDateAsString)).toBeVisible() // date
  })
})

test("opens tomorrow's agenda when clicking on tomorrow's date", async () => {
  userEvent.click(
    screen.getByRole("button", { name: new RegExp(tomorrowsDateAsString, "i") })
  )
  await waitFor(() => {
    // <AgendaDay> should be open with tomorrow's date
    expect(screen.getByLabelText(/close/i)).toBeVisible() // close button
    expect(screen.getByLabelText(/add/i)).toBeVisible() // add reminder FAB
    expect(screen.getByText(tomorrowsDateAsString)).toBeVisible()
  })
})

test("use current date and time when opening add reminder over today's agenda", async () => {
  userEvent.click(
    screen.getByRole("button", { name: new RegExp(todaysDateAsString, "i") })
  )
  await waitFor(() =>
    // open <AddReminder> over top of today's agenda
    userEvent.click(screen.getByRole("button", { name: /add/i }))
  )
  await waitFor(() => {
    // <AddReminder> should have a date-picker with the current date and time
    expect(screen.getByLabelText(/close/i)).toBeVisible() // close button
    expect(
      screen.getByLabelText(new RegExp(todaysDatePicker, "i"))
    ).toBeVisible()
    expect(
      screen.getByLabelText(new RegExp(getCurrentTimePicker(), "i"))
    ).toBeVisible()
    // Note: this test is fragile if the time changes between the two renders
  })
})

test("use current time and tomorrow's date when opening add reminder over tomorrow's agenda", async () => {
  userEvent.click(
    screen.getByRole("button", { name: new RegExp(todaysDateAsString, "i") })
  )
  await waitFor(() =>
    // open <AddReminder> over top of today's agenda
    userEvent.click(screen.getByRole("button", { name: /add/i }))
  )
  await waitFor(() => {
    // <AddReminder> should have date-picker w/ current time and tomorrow's date
    expect(screen.getByLabelText(/close/i)).toBeVisible() // close button
    expect(
      screen.getByLabelText(new RegExp(tomorrowsDatePicker, "i"))
    ).toBeVisible()
    expect(
      screen.getByLabelText(new RegExp(getCurrentTimePicker(), "i"))
    ).toBeVisible()
    // Note: this test is fragile if the time changes between the two renders
  })
})
