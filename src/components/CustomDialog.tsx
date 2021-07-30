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
          root: "rounded-3xl bg-gray-200 dark:bg-gray-800 min-h-[80vh] min-w-[80vw] max-w-3xl",
        },
      }}
    >
      <DialogTitle
        id={id}
        className="flex justify-between text-6xl text-gray-800 rounded-3xl dark:text-gray-200"
      >
        {title}
        <CustomIcon
          ariaLabel={`Close ${title}`}
          color="gray"
          onClick={onClose}
          Icon={CloseIcon}
        />
      </DialogTitle>
      <Divider className="bg-gray-200 dark:hidden" />
      <Divider className="hidden bg-gray-400 dark:block" />
      <DialogContent className="flex flex-col space-y-6 text-3xl text-gray-800 dark:text-gray-200">
        {children}
      </DialogContent>
    </Dialog>
  )
}
