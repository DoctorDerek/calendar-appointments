import { format } from "date-fns"
import { Provider } from "react-redux"

import AgendaDay from "@/src/components/AgendaDay"
import { calendarAppReducer } from "@/src/redux/reducers"
import store from "@/src/redux/store"
import { configureStore } from "@reduxjs/toolkit"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const todaysDateAsString = format(new Date(), "LLLL do, yyyy")
test("does not render anything with default Redux store", () => {
  render(
    <Provider store={store}>
      <AgendaDay />
    </Provider>
  )
  expect(screen.queryByRole("button")).toBeNull() // close button
  expect(screen.queryByText(todaysDateAsString)).toBeNull() // date
})

const customStore = configureStore({
  reducer: calendarAppReducer,
  preloadedState: {
    agendaStatus: {
      isOpen: true,
      date: new Date(),
    },
  },
})

test("renders correctly with custom Redux store for initial state", () => {
  render(
    <Provider store={customStore}>
      <AgendaDay />
    </Provider>
  )

  expect(screen.getByRole("button")).toBeVisible() // close button
  expect(screen.getByRole("button")).toHaveAccessibleName(/close/i)
  expect(screen.getByText(todaysDateAsString)).toBeVisible() // date
})

test("closes modal when clicking the close button", async () => {
  render(
    <Provider store={customStore}>
      <AgendaDay />
    </Provider>
  )
  userEvent.click(screen.getByRole("button"))
  await waitFor(() => expect(screen.queryByRole("button")).toBeNull())
  await waitFor(() => expect(screen.queryByText(todaysDateAsString)).toBeNull())
})

test("closes modal when clicking outside the modal", async () => {
  render(
    <Provider store={customStore}>
      <AgendaDay />
    </Provider>
  )
  userEvent.click(document.body)
  await waitFor(() => expect(screen.queryByRole("button")).toBeNull())
  await waitFor(() => expect(screen.queryByText(todaysDateAsString)).toBeNull())
})
