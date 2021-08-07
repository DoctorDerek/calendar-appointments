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
  color: "blue" | "gray" | "purple" // Tailwind CSS
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
        // consistent background color for better contrast:
        "bg-gray-100 dark:bg-opacity-80",
        (color === "blue" &&
          "text-blue-500 border-blue-300 hover:bg-blue-300 hover:text-blue-700 hover:border-blue-500") as string,
        (color === "gray" &&
          "text-gray-500 border-gray-300 hover:bg-gray-300 hover:text-gray-700 hover:border-gray-500") as string,
        (color === "purple" &&
          "text-purple-500 border-purple-300 hover:bg-purple-300 hover:text-purple-700 hover:border-purple-500") as string
      )}
      onClick={onClick}
    >
      {<Icon className={size === "small" ? "w-6 h-6" : "w-12 h-12"} />}
    </IconButton>
  )
}
