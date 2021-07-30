import { SvgIconTypeMap } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import { OverridableComponent } from "@material-ui/types"

/** Easier-to-read version of the Material UI icon type */
type MUIIcon = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  muiName: string
}

export default function CustomIcon({
  ariaLabel,
  onClick,
  color,
  Icon,
  size = "large",
}: {
  ariaLabel: string
  onClick: () => void
  color: "blue" | "gray" | "purple" | "green" | "red" | "yellow" // Tailwind CSS
  Icon: MUIIcon
  size?: "small" | "large"
}) {
  const classNames = (...classes: string[]) => classes.join(" ")
  return (
    <IconButton
      aria-label={ariaLabel}
      title={ariaLabel}
      className={classNames(
        "border-solid fill-current border-1 transition-all duration-500",
        size === "small" ? "w-8 h-8" : "w-16 h-16", // "large"
        "bg-gray-100 dark:bg-opacity-80", // consistent background color for better contrast
        `text-${color}-500 border-${color}-300 hover:bg-${color}-300 hover:text-${color}-700 hover:border-${color}-500`
      )}
      onClick={onClick}
    >
      {<Icon className={size === "small" ? "w-6 h-6" : "w-12 h-12"} />}
    </IconButton>
  )
}
