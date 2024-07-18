// @ts-ignore
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserDocs } from "../../models/userDocs";
import fetchUserDocs from "../../services/UserDocs";
import { UserDocsContext } from "../Logic/UserDocsLogic";

export default function DeleteUserDocButton({ data }: { data?: UserDocs }) {
  const [open, setOpen] = React.useState(false);
  const setDocs = React.useContext(UserDocsContext);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id: string) => {
    setOpen(false);
    setDocs((data) => data.filter((item) => item.id !== id));
    try {
      const response = fetchUserDocs.deleteUsers(id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
          <Button onClick={handleClose} autoFocus>
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
