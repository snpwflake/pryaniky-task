import { redirect } from "react-router-dom";
import { IAuth } from "../../models/auth";
import AuthProvider from "../../services/AuthProvider";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
const Form = styled.form({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
  border: "1px solid black",
  width: "fit-content",
  margin: "0 auto",
  gap: "16px",
  padding: "16px",
  borderRadius: "10px",
});

const Title = styled.h2({
  fontSize: "24px",
  margin: 0,
  padding: 0,
  textAlign: "center",
  fontWeight: "bold",
});

const Error = styled.p({
  color: "red",
  margin: 0,
  padding: 0,
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "14px",
});
const AuthForm = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    setIsLoading(true);
    setError("");
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: IAuth = Object.fromEntries(formData as any) as IAuth;
    try {
      const response = await AuthProvider.auth(data);
      if (response.data.error_code === 0) {
        const token = response.data.data.token;
        localStorage.setItem("token", token);
        redirect("/profile");
        setIsSuccess(true);
      } else {
        setError("Неверный логин или пароль");
      }
    } catch (error) {
      setError("Неверный логин или пароль");
    }
    setIsLoading(false);
  };

  if (isSuccess) {
    return (
      <div>
        <p>Вы успешно авторизовались!</p>
        <p>Сейчас вы будете перенаправлены</p>
      </div>
    );
  }
  return (
    <Form onSubmit={onSubmit} action="">
      <Title>Авторизация</Title>
      <TextField
        required
        label="Логин"
        size="small"
        type="text"
        name="username"
        placeholder="username"
      />
      <TextField
        required
        label="Пароль"
        size="small"
        type="password"
        name="password"
        placeholder="password"
      />
      <Button
        disabled={isLoading}
        sx={{ width: "100%" }}
        variant="contained"
        type="submit"
      >
        Войти
      </Button>
      {error && <Error>{error}</Error>}
    </Form>
  );
};

export default AuthForm;
