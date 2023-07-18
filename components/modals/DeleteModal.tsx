import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Tooltip } from "@mui/material";
import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteBlogBanner } from "@/utils";
import { useRouter } from "next/navigation";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  id: string;
};

export default function DeleteModal({ id }: Props) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    // delete product from firestore
    try {
      const docRef = doc(firestore, "blogs", id);
      await deleteDoc(docRef);
      await deleteBlogBanner(id);
      router.push("/blogs");
    } catch (error) {}
  };

  return (
    <div>
      <Tooltip title="Delete Blog">
        <button onClick={handleClickOpen}>
          <TrashIcon className="w-8 h-8 rounded-full p-1 hover:bg-gray-200" />{" "}
        </button>
      </Tooltip>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        // make a dark background with rounded corners
        PaperProps={{
          style: {
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            width: "300px",
          },
        }}
      >
        <DialogContent>
          <DialogContentText className="text-slate-800">
            Are you sure you want to delete this blog?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            className="!text-slate-800 hover:!bg-red-900 hover:!bg-opacity-20"
          >
            No{" "}
          </Button>
          <Button
            onClick={handleDelete}
            className="!text-slate-800 hover:!bg-green-500 hover:!bg-opacity-20"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
