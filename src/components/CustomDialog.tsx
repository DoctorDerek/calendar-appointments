import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"

export default function CustomDialog({
  title,
  open,
  onClose,
  children,
}: {
  title: string
  open: boolean
  onClose: () => void
  children: React.ReactNode
}) {
  const id = title.replace(/\W/g, "-")
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={id}
      fullWidth={true}
      maxWidth={false}
      PaperProps={{
        classes: {
          // Paper.root is the root wrapper <div> in <Dialog>
          root: "rounded-3xl bg-white min-h-[80vh] min-w-[80vw] max-w-3xl",
        },
      }}
    >
      <DialogTitle id={id} className="text-6xl rounded-3xl">
        {title}
        <IconButton
          aria-label={`Close ${title}`}
          className="absolute w-16 h-16 text-gray-500 transition-all duration-500 bg-gray-100 border-gray-300 border-solid fill-current right-2 top-2 border-1 hover:bg-gray-300 hover:text-gray-700 hover:border-gray-500"
          onClick={onClose}
        >
          <CloseIcon className="w-12 h-12" />
        </IconButton>
      </DialogTitle>
      <Divider light />
      <DialogContent className="flex flex-col space-y-6 text-3xl">
        {children}
      </DialogContent>
    </Dialog>
  )
}
