import { useEffect } from "react";
import LoadingSession from "../components/Layout/LoadingSession";
import useAuthToken from "../hooks/useAuth";
import Layout from "../components/Layout/Layout";

const MainPage = () => {
  const { token, status } = useAuthToken();
  const sessionLoading = status === "loading";

  useEffect(() => {
    if (status === "authorized") {
      return;
    } else if (status === "unauthorized") {
      window.location.href = "/login";
    }
  }, [token, status]);
  return (
    <>
      <Layout>1</Layout>
    </>
  );
};

export default MainPage;
