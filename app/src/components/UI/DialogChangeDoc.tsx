import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import { ISO, UserDocs } from "../../models/userDocs";
import MenuItem from "@mui/material/MenuItem";
import fetchUserDocs from "../../services/UserDocs";
import { UserDocsContext } from "../Logic/UserDocsLogic";
import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";
import { enqueueSnackbar } from "notistack";

const Form = styled("form")({
  display: "flex",
  margin: "8px 0",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "16px",
  "& .MuiTextField-root": {
    width: "100%",
  },
});
export default function ChangeDocButton({ data }: { data?: UserDocs }) {
  const [open, setOpen] = React.useState(false);
  const { value, setValue } = React.useContext(UserDocsContext);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formatToIsoDate = (dates: string): ISO => {
    let result = "";
    try {
      result = new Date(dates).toISOString();
    } catch (error) {
      enqueueSnackbar("Некорректная дата", { variant: "error" });
    }
    return result as ISO;
  };

  const handleChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newData = Object.fromEntries(formData as any);
    newData.companySigDate = formatToIsoDate(newData.companySigDate);
    newData.employeeSigDate = formatToIsoDate(newData.employeeSigDate);

    const newValue = value.map((doc) => {
      if (doc.id === data?.id) {
        return { ...doc, ...newData };
      }
      return doc;
    });
    try {
      const response = await fetchUserDocs.updateDoc(
        newData as UserDocs,
        data?.id!
      );
      if (response.data.error_code === 0) {
        setValue(() => newValue);
        enqueueSnackbar("Документ изменен", { variant: "success" });
      } else {
        enqueueSnackbar(response.data.error_message, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Не удалось изменить документ", { variant: "error" });
    }
    handleClose();
  };

  return (
    <React.Fragment>
      <MenuItem onClick={handleClickOpen} disableRipple>
        <EditIcon />
        Редактировать
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Изменить документ"}</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ textAlign: "center", width: "300px" }}
            id="alert-dialog-description"
          >
            <Form onSubmit={handleChange} action="">
              <TextField
                name="documentName"
                defaultValue={data?.documentName}
                label="Название"
                size="small"
              />
              <TextField
                name="documentType"
                defaultValue={data?.documentType}
                label="Тип документа"
                size="small"
              />
              <TextField
                name="documentStatus"
                defaultValue={data?.documentStatus}
                label="Статус документа"
                size="small"
              />
              <TextField
                name="companySignatureName"
                defaultValue={data?.companySignatureName}
                label="Подпись компании"
                size="small"
              />
              <TextField
                name="employeeSignatureName"
                defaultValue={data?.employeeSignatureName}
                label="Подпись сотрудника"
                size="small"
              />
              <TextField
                name="companySigDate"
                defaultValue={data?.companySigDate}
                label="Дата подписи компании"
                size="small"
              />
              <TextField
                name="employeeSigDate"
                defaultValue={data?.employeeSigDate}
                label="Дата подписи сотрудника"
                size="small"
              />
              <TextField
                name="employeeNumber"
                defaultValue={data?.employeeNumber}
                label="Номер сотрудника"
                size="small"
              />
              <DialogActions>
                <Button type="reset" onClick={handleClose}>
                  Отмена
                </Button>
                <Button type="submit" autoFocus>
                  Подтвердить
                </Button>
              </DialogActions>
            </Form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
