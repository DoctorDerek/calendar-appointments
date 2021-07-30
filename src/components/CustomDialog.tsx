import CustomIcon from "@/src/components/CustomIcon"
import { Dialog, DialogContent, DialogTitle, Divider } from "@material-ui/core"
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
      <DialogTitle
        id={id}
        className="flex justify-between text-6xl rounded-3xl"
      >
        {title}
        <CustomIcon
          ariaLabel={`Close ${title}`}
          color="gray"
          onClick={onClose}
          Icon={CloseIcon}
        />
      </DialogTitle>
      <Divider light />
      <DialogContent className="flex flex-col space-y-6 text-3xl">
        {children}
      </DialogContent>
    </Dialog>
  )
}
