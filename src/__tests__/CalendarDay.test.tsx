import { addDays, format, getDate, subDays } from "date-fns"
import { Provider } from "react-redux"

import CalendarDay from "@/src/components/CalendarDay"
import { MaterialUIWrapper } from "@/src/components/NextIndexWrapper"
import store from "@/src/redux/store"
import { cleanup, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const todaysDate = new Date()
const todaysDayAsNumber = getDate(todaysDate) // e.g. 22
const tomorrowsDate = addDays(todaysDate, 1)
// const tomorrowsDayAsNumber = getDate(tomorrowsDate) // e.g. 23
const yesterdaysDate = subDays(todaysDate, 1)
const yesterdaysDayAsNumber = getDate(yesterdaysDate) // e.g. 21
const formatDateAgenda = (date: Date) => format(date, "LLLL do, yyyy")
const todaysDateAgenda = formatDateAgenda(todaysDate)
const tomorrowsDateAgenda = formatDateAgenda(tomorrowsDate)
const yesterdaysDateAgenda = formatDateAgenda(yesterdaysDate)
const formatDateAsDayOfWeek = (date: Date) => format(date, "EEEE")
const todaysDateAsDayOfWeek = formatDateAsDayOfWeek(todaysDate)

const renderCalendarDay = () =>
  render(
    <MaterialUIWrapper>
      <Provider store={store}>
        <CalendarDay todaysDate={todaysDate} selectedDate={todaysDate} />
      </Provider>
    </MaterialUIWrapper>
  )

test("renders correctly with today's date as selectedDate prop", () => {
  renderCalendarDay()
  expect(screen.getByText(String(todaysDayAsNumber))).toBeVisible()
  // the day (e.g. 23) itself is a button
  expect(
    screen.getByRole("button", { name: new RegExp(todaysDateAgenda, "i") })
  ).toBeVisible() // its aria-label is the full date  (e.g. July 22, 2021)
  expect(
    screen.getByRole("button", { name: new RegExp(todaysDateAsDayOfWeek, "i") })
  ).toBeVisible() // its aria-label also has the day of the week (e.g. Thursday)
})

const renderYesterdaysCalendarDay = () =>
  render(
    <MaterialUIWrapper>
      <Provider store={store}>
        <CalendarDay todaysDate={todaysDate} selectedDate={yesterdaysDate} />
      </Provider>
    </MaterialUIWrapper>
  )

test("renders correctly with yesterdays's date as selectedDate props", () => {
  renderYesterdaysCalendarDay()
  expect(screen.getByText(String(yesterdaysDayAsNumber))).toBeVisible()
  // the day itself (e.g. 22) is a button
  expect(
    screen.getByRole("button", {
      name: new RegExp(yesterdaysDateAgenda, "i"),
    })
  ).toBeVisible() // its aria-label is the full date (e.g. July 22, 2021)
})

test("updates the Redux store when clicking the button", async () => {
  renderCalendarDay()
  userEvent.click(
    screen.getByRole("button", { name: new RegExp(todaysDateAgenda, "i") })
  )
  // "Use .toMatchObject to check that a JavaScript object matches a subset of
  // the properties of an object. It will match received objects with
  // properties that are **not** in the expected object."
  // Source: https://jestjs.io/docs/expect#tomatchobjectobject
  await waitFor(() =>
    expect(store.getState()).toMatchObject({
      agenda: {
        isOpen: true,
        date: todaysDate,
      },
    })
  )
  // Note: This is a fragile test, as it tests the implementation details of
  // the state of the store directly, not the functionality of the component.
  // However, it is less fragile than testing the dispatch action by itself.
})

test("updates the Redux store when using the keyboard", async () => {
  renderCalendarDay()
  userEvent.tab()
  userEvent.keyboard("{enter}")
  await waitFor(() =>
    expect(store.getState()).toMatchObject({
      agenda: {
        isOpen: true,
        date: todaysDate,
      },
    })
  ) // Note: This is a fragile test, as it tests the implementation details.
})

test("has a CSS hover effect when hovered over with the mouse", async () => {
  renderCalendarDay()
  // CSS classes are applied to the inner MUI Avatar, not the button (day cell)
  const classNameBeforeFocus = screen.getByTestId(
    new RegExp(todaysDateAgenda, "i")
  ).className

  userEvent.hover(
    screen.getByRole("button", { name: new RegExp(todaysDateAgenda, "i") })
  )
  // place the focus on the button
  await waitFor(() =>
    expect(
      screen.getByTestId(new RegExp(todaysDateAgenda, "i")).className
    ).not.toEqual(classNameBeforeFocus)
  )

  userEvent.unhover(
    screen.getByRole("button", { name: new RegExp(todaysDateAgenda, "i") })
  )
  // remove focus from the button
  await waitFor(() =>
    expect(
      screen.getByTestId(new RegExp(todaysDateAgenda, "i")).className
    ).toEqual(classNameBeforeFocus)
  )
})

test("has a CSS hover effect when focused using the keyboard", async () => {
  renderCalendarDay()
  // CSS classes are applied to the inner MUI Avatar, not the button (day cell)
  const classNameBeforeFocus = screen.getByTestId(
    new RegExp(todaysDateAgenda, "i")
  ).className

  userEvent.tab() // place the focus on the button
  await waitFor(() =>
    expect(
      screen.getByTestId(new RegExp(todaysDateAgenda, "i")).className
    ).not.toEqual(classNameBeforeFocus)
  )

  userEvent.tab() // remove focus from the button
  await waitFor(() =>
    expect(
      screen.getByTestId(new RegExp(todaysDateAgenda, "i")).className
    ).toEqual(classNameBeforeFocus)
  )
})

const renderTomorrowsCalendarDay = () =>
  render(
    <MaterialUIWrapper>
      <Provider store={store}>
        <CalendarDay todaysDate={todaysDate} selectedDate={tomorrowsDate} />
      </Provider>
    </MaterialUIWrapper>
  )

test("has a CSS hover effect on hover for a date that is not today", async () => {
  // render another component with tomorrow as props but the same Redux store
  renderTomorrowsCalendarDay()
  // CSS classes are applied to the inner MUI Avatar, not the button (day cell)
  const classNameTomorrowBeforeFocus = screen.getByTestId(
    new RegExp(tomorrowsDateAgenda, "i")
  ).className

  userEvent.hover(
    screen.getByRole("button", { name: new RegExp(tomorrowsDateAgenda, "i") })
  ) // place the focus on tomorrow's button
  await waitFor(() => {
    expect(
      screen.getByTestId(new RegExp(tomorrowsDateAgenda, "i")).className
    ).not.toEqual(classNameTomorrowBeforeFocus)
  })

  userEvent.unhover(
    screen.getByRole("button", {
      name: new RegExp(tomorrowsDateAgenda, "i"),
    })
  ) // remove focus from the button
  await waitFor(() =>
    expect(
      screen.getByTestId(new RegExp(tomorrowsDateAgenda, "i")).className
    ).toEqual(classNameTomorrowBeforeFocus)
  )
})

test("has a CSS effect highlighting today's date compared to tomorrow", async () => {
  renderCalendarDay()
  // CSS classes are applied to the inner MUI Avatar, not the button (day cell)
  const classNameSameDate = screen.getByTestId(
    new RegExp(todaysDateAgenda, "i")
  ).className

  cleanup()
  renderTomorrowsCalendarDay() // swap to tomorrow's date

  // the className should be different, as it is not highlighting the date
  await waitFor(() =>
    expect(
      screen.getByTestId(new RegExp(tomorrowsDateAgenda, "i")).className
    ).not.toEqual(classNameSameDate)
  )
})
