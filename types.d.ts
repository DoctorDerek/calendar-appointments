/// <reference types="react-scripts" />
declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

/** HTML colors for the color picker */
type Color =
  | "DodgerBlue"
  | "Gray"
  | "LightGray"
  | "MediumSeaGreen"
  | "Orange"
  | "SlateBlue"
  | "Tomato"
  | "Violet"
