import { addDays, getDate } from "date-fns"
import { Provider } from "react-redux"

import CalendarDay from "@/src/components/CalendarDay"
import { MaterialUIWrapper } from "@/src/components/NextIndexWrapper"
import store from "@/src/redux/store"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const todaysDate = new Date()
const todaysDateObject = { date: todaysDate }
const todaysDayAsNumber = getDate(todaysDate) // e.g. 22
const tomorrowsDate = addDays(todaysDate, 1)
const tomorrowsDateObject = { date: tomorrowsDate }
const tomorrowsDayAsNumber = getDate(tomorrowsDate) // e.g. 23

const renderCalendarDay = () =>
  render(
    <MaterialUIWrapper>
      <Provider store={store}>
        <CalendarDay todaysDate={todaysDate} selectedDate={todaysDateObject} />
      </Provider>
    </MaterialUIWrapper>
  )

beforeEach(() => renderCalendarDay())

test("renders the CalendarDay with today's date as props", () => {
  expect(
    screen.getByRole("button", { name: String(todaysDayAsNumber) })
  ).toBeVisible() // the day itself is a button
})

test("updates the Redux store when clicking the button", async () => {
  userEvent.click(
    screen.getByRole("button", { name: String(todaysDayAsNumber) })
  )
  // "Use .toMatchObject to check that a JavaScript object matches a subset of
  // the properties of an object. It will match received objects with
  // properties that are **not** in the expected object."
  // Source: https://jestjs.io/docs/expect#tomatchobjectobject
  await waitFor(() =>
    expect(store.getState()).toMatchObject({
      agendaStatus: {
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
  userEvent.tab()
  userEvent.keyboard("{enter}")
  await waitFor(() =>
    expect(store.getState()).toMatchObject({
      agendaStatus: {
        isOpen: true,
        date: todaysDate,
      },
    })
  ) // Note: This is a fragile test, as it tests the implementation details.
})

test("has a CSS hover effect when hovered over with the mouse", async () => {
  // CSS classes are applied to the inner MUI Avatar, not the button (day cell)
  const classNameBeforeFocus = screen.getByText(
    String(todaysDayAsNumber)
  ).className

  userEvent.hover(
    screen.getByRole("button", { name: String(todaysDayAsNumber) })
  ) // place the focus on the button
  await waitFor(() =>
    expect(screen.getByText(String(todaysDayAsNumber)).className).not.toEqual(
      classNameBeforeFocus
    )
  )

  userEvent.unhover(
    screen.getByRole("button", { name: String(todaysDayAsNumber) })
  ) // remove focus from the button
  await waitFor(() =>
    expect(screen.getByText(String(todaysDayAsNumber)).className).toEqual(
      classNameBeforeFocus
    )
  )
})

test("has a CSS hover effect when focused using the keyboard", async () => {
  // CSS classes are applied to the inner MUI Avatar, not the button (day cell)
  const classNameBeforeFocus = screen.getByText(
    String(todaysDayAsNumber)
  ).className

  userEvent.tab() // place the focus on the button
  await waitFor(() =>
    expect(screen.getByText(String(todaysDayAsNumber)).className).not.toEqual(
      classNameBeforeFocus
    )
  )

  userEvent.tab() // remove focus from the button
  await waitFor(() =>
    expect(screen.getByText(String(todaysDayAsNumber)).className).toEqual(
      classNameBeforeFocus
    )
  )
})

test("has a CSS effect highlighting today's date", async () => {
  // CSS classes are applied to the inner MUI Avatar, not the button (day cell)
  const classNameSameDate = screen.getByText(
    String(todaysDayAsNumber)
  ).className

  // render another component with tomorrow as props but the same Redux store
  render(
    <Provider store={store}>
      <CalendarDay todaysDate={todaysDate} selectedDate={tomorrowsDateObject} />
    </Provider>
  )

  // the className should be different, as it is not highlighting the date
  await waitFor(() =>
    expect(
      screen.getByText(String(tomorrowsDayAsNumber)).className
    ).not.toEqual(classNameSameDate)
  )
})

test("has a CSS hover effect on hover for a date that is not today", async () => {
  // render another component with tomorrow as props but the same Redux store
  render(
    <Provider store={store}>
      <CalendarDay todaysDate={todaysDate} selectedDate={tomorrowsDateObject} />
    </Provider>
  )

  // CSS classes are applied to the inner MUI Avatar, not the button (day cell)
  const classNameTomorrowBeforeFocus = screen.getByText(
    String(tomorrowsDayAsNumber)
  ).className

  userEvent.hover(
    screen.getByRole("button", { name: String(tomorrowsDayAsNumber) })
  ) // place the focus on tomorrow's button
  await waitFor(() =>
    expect(
      screen.getByText(String(tomorrowsDayAsNumber)).className
    ).not.toEqual(classNameTomorrowBeforeFocus)
  )

  userEvent.unhover(
    screen.getByRole("button", { name: String(tomorrowsDayAsNumber) })
  ) // remove focus from the button
  await waitFor(() =>
    expect(screen.getByText(String(tomorrowsDayAsNumber)).className).toEqual(
      classNameTomorrowBeforeFocus
    )
  )
})
