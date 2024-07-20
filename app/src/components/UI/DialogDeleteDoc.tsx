import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserDocs } from "../../models/userDocs";
import MenuItem from "@mui/material/MenuItem";
import fetchUserDocs from "../../services/UserDocs";
import { UserDocsContext } from "../Logic/UserDocsLogic";
import { enqueueSnackbar } from "notistack";

export default function DeleteUserDocButton({ data }: { data?: UserDocs }) {
  const [open, setOpen] = React.useState(false);
  const { value, setValue } = React.useContext(UserDocsContext);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    const id = data?.id;
    try {
      const response = await fetchUserDocs.deleteDoc(id as string);
      if (response.data.error_code === 0) {
        setValue(value.filter((item) => item.id !== id));
        enqueueSnackbar("Документ удален", { variant: "success" });
      } else {
        enqueueSnackbar("Не удалось удалить документ", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Не удалось удалить документ", { variant: "error" });
    }
    handleClose();
  };

  return (
    <React.Fragment>
      <MenuItem onClick={handleClickOpen} disableRipple>
        <DeleteIcon />
        Удалить
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Удаление документа"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Вы действительно хотите удалить документ "{data?.documentName}" ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleDelete} autoFocus>
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
