import React from "react"
import Typography from "@material-ui/core/Typography"

interface Props {
  day: string
}

const DayName = (props: Props) => (
  <Typography variant="h6">{props.day}</Typography>
)

export default DayName
