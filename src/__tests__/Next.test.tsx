import { format } from "date-fns"
import { getPage } from "next-page-tester"

import CatchAllSlug from "@/src/pages/[[...slug]]"
import { render, screen, waitFor } from "@testing-library/react"

const formatDateAsMonth = (date: Date) => format(date, "LLLL yyyy")
const todaysMonthAsString = formatDateAsMonth(new Date())

const appRenders = async () =>
  await waitFor(() => {
    expect(screen.getByText(todaysMonthAsString)).toBeVisible() // month
    expect(screen.getByRole("button", { name: /add/i })).toBeVisible()
    // "Add Reminder"
  })

test("renders the calendar app using the optional catch-all [[...slug]]", async () => {
  render(<CatchAllSlug />)
  appRenders()
})

test("renders page wrapped in custom _app wrapped in _document", async () => {
  const { serverRender } = await getPage({
    route: "/my-page",
    useDocument: true,
  })
  serverRender()

  expect(document.title).toEqual("My SEO optimized title")

  const html = document.documentElement
  expect(html).toHaveAttribute("lang", "en")

  const head = document.head
  expect(head.querySelector('meta[name="Description"]')).toHaveAttribute(
    "Content",
    "My custom page description"
  )
})
