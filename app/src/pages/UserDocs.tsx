import Layout from "../components/Layout/Layout";
import UserDocsLogic from "../components/Logic/UserDocsLogic";

const UserDocsPage = () => {
  return (
    <Layout>
      <h1>Документы</h1>
      <UserDocsLogic />
    </Layout>
  );
};
export default UserDocsPage;
