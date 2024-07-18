import styled from "@emotion/styled";
import AuthForm from "../components/Form/AuthForm";
import { useEffect } from "react";
import useAuthToken from "../hooks/useAuth";

const Container = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100vw",
});
const LoginPage = () => {
  const { token, status } = useAuthToken();

  useEffect(() => {
    if (status === "authorized") {
      window.location.href = "/";
    } else if (status === "unauthorized") {
      return;
    }
  }, [token, status]);

  return (
    <Container>
      <AuthForm />
    </Container>
  );
};

export default LoginPage;
