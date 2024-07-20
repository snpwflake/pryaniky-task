import { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import UserDocsLogic from "../components/Logic/UserDocsLogic";
import useAuthToken from "../hooks/useAuth";
import LoadingSession from "../components/Layout/LoadingSession";

const UserDocsPage = () => {
  const { token, status } = useAuthToken();

  useEffect(() => {
    if (status === "authorized") {
      return;
    } else if (status === "unauthorized") {
      window.location.href = "/login";
    }
  }, [token, status]);

  return (
    <Layout>
      <LoadingSession loading={status === "loading"} />
      <h1>Документы</h1>
      <UserDocsLogic />
    </Layout>
  );
};
export default UserDocsPage;
