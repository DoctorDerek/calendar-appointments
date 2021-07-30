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
  color: "blue" | "gray"
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
        "bg-gray-100", // consistent background color for better contrast
        color === "blue"
          ? "text-blue-500 border-blue-300 hover:bg-blue-300 hover:text-blue-700 hover:border-blue-500" // was: "bg-blue-100"
          : color === "gray"
          ? "text-gray-500 border-gray-300 hover:bg-gray-300 hover:text-gray-700 hover:border-gray-500" // was: "bg-gray-100"
          : ""
      )}
      onClick={onClick}
    >
      {<Icon className={size === "small" ? "w-6 h-6" : "w-12 h-12"} />}
    </IconButton>
  )
}
